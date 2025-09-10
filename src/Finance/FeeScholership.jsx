// FeeScholarship.jsx
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";
import "./finance.css";

const LS_KEY = "finance_fees_v1";

export default function FeeScholarship() {
  const [form, setForm] = useState({ studentId:"", dept:"CSE", feeTotal:"", feePaid:"", scholarship:"no", scholarshipType:"", scholarshipAmount:"" });
  const [records, setRecords] = useState([]);
  const depts = ["CSE","ME","EE","CE","MBA","MTech","PhD"];

  useEffect(()=> {
    const raw = localStorage.getItem(LS_KEY);
    if(raw) setRecords(JSON.parse(raw));
  },[]);
  useEffect(()=> localStorage.setItem(LS_KEY, JSON.stringify(records)), [records]);

  function handleChange(e){ setForm({...form, [e.target.name]: e.target.value }); }
  function addRecord(e){
    e.preventDefault();
    if(!form.studentId || !form.feeTotal) { alert("Student ID and total fee required"); return; }
    const rec = { id:Date.now(), studentId:form.studentId, dept:form.dept, feeTotal:Number(form.feeTotal), feePaid:Number(form.feePaid||0), feePending: (Number(form.feeTotal)-Number(form.feePaid||0)), scholarship: form.scholarship==="yes", scholarshipType: form.scholarshipType, scholarshipAmount: Number(form.scholarshipAmount||0) };
    setRecords(prev => [...prev, rec]);
    setForm({ studentId:"", dept:"CSE", feeTotal:"", feePaid:"", scholarship:"no", scholarshipType:"", scholarshipAmount:"" });
  }

  function deleteRecord(id){ if(!window.confirm("Delete this record?")) return; setRecords(prev => prev.filter(r=>r.id!==id)); }

  // aggregated data
  const feesByDept = {};
  let totalFee = 0, totalScholar=0, totalPending=0, totalStudentsWithScholar=0;
  records.forEach(r => {
    feesByDept[r.dept] = (feesByDept[r.dept]||0) + r.feePaid;
    totalFee += r.feePaid;
    totalScholar += r.scholarshipAmount||0;
    totalPending += r.feePending;
    if(r.scholarship) totalStudentsWithScholar++;
  });

  const barData = { labels: Object.keys(feesByDept), datasets:[{ label:"Fee Collected (₹)", data:Object.values(feesByDept), backgroundColor:"#009688" }] };
  const pieData = { labels:["Fees","Scholarships"], datasets:[{ data:[totalFee, totalScholar], backgroundColor:["#3f51b5","#ff5722"] }] };

  // export CSV all records
  function exportCSV(){
    const header = ["StudentID","Dept","FeeTotal","FeePaid","Pending","Scholarship","ScholarshipType","ScholarshipAmt"];
    const rows = records.map(r => [r.studentId,r.dept,r.feeTotal,r.feePaid,r.feePending,r.scholarship ? "Yes":"No", r.scholarshipType||"", r.scholarshipAmount||0]);
    const csv = [header, ...rows].map(r => r.map(c=>`"${(""+c).replace(/"/g,'""')}"`).join(",")).join("\n");
    saveAs(new Blob([csv],{type:"text/csv;charset=utf-8;"}),"fee_scholarship.csv");
  }

  return (
    <div>
      <div className="card">
        <h3>Add Student Fee / Scholarship</h3>
        <form onSubmit={addRecord} style={{marginTop:10}}>
          <div className="form-row">
            <input name="studentId" placeholder="Student ID / Roll No." value={form.studentId} onChange={handleChange} required />
            <select name="dept" value={form.dept} onChange={handleChange}>
              {depts.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
            <input type="number" name="feeTotal" placeholder="Total Fee" value={form.feeTotal} onChange={handleChange} className="wide" required/>
            <input type="number" name="feePaid" placeholder="Fee Paid" value={form.feePaid} onChange={handleChange} />
          </div>
          <div className="form-row">
            <select name="scholarship" value={form.scholarship} onChange={handleChange}>
              <option value="no">No Scholarship</option>
              <option value="yes">Scholarship</option>
            </select>
            <input name="scholarshipType" placeholder="Scholarship Type (Merit/Govt/...)" value={form.scholarshipType} onChange={handleChange} />
            <input type="number" name="scholarshipAmount" placeholder="Scholarship Amount" value={form.scholarshipAmount} onChange={handleChange} />
            <button className="btn btn-primary" type="submit">Save</button>
            <button type="button" className="btn" onClick={()=>setForm({studentId:"",dept:"CSE",feeTotal:"",feePaid:"",scholarship:"no",scholarshipType:"",scholarshipAmount:""})}>Reset</button>
          </div>
        </form>
      </div>

      <div style={{height:16}} />

      <div className="grid-2">
        <div className="card">
          <h3>Department-wise Fee Collected</h3>
          <div style={{maxWidth:520, margin:"10px auto"}}><Bar data={barData} /></div>
        </div>
        <div className="card">
          <h3>Fee vs Scholarships</h3>
          <div style={{maxWidth:420, margin:"10px auto"}}><Pie data={pieData} /></div>
          <div style={{marginTop:10}}>
            <div><strong>Total Fee Collected:</strong> ₹{totalFee.toLocaleString()}</div>
            <div><strong>Total Scholarships Paid:</strong> ₹{totalScholar.toLocaleString()}</div>
            <div><strong>Pending Fees:</strong> ₹{totalPending.toLocaleString()}</div>
            <div><strong>Students with Scholarship:</strong> {totalStudentsWithScholar}</div>
          </div>
        </div>
      </div>

      <div style={{height:16}} />

      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h3>Student Fee / Scholarship Table ({records.length})</h3>
          <div>
            <button className="btn" onClick={exportCSV}>Export CSV</button>
          </div>
        </div>
        <table className="table" style={{marginTop:8}}>
          <thead>
            <tr><th>StudentID</th><th>Dept</th><th>Fee Paid</th><th>Pending</th><th>Scholarship</th><th>Type</th><th>Amt</th><th>Action</th></tr>
          </thead>
          <tbody>
            {records.slice().reverse().map(r => (
              <tr key={r.id}>
                <td>{r.studentId}</td>
                <td>{r.dept}</td>
                <td>₹{r.feePaid.toLocaleString()}</td>
                <td>₹{r.feePending.toLocaleString()}</td>
                <td>{r.scholarship ? "Yes":"No"}</td>
                <td>{r.scholarshipType||"-"}</td>
                <td>₹{(r.scholarshipAmount||0).toLocaleString()}</td>
                <td><button className="btn btn-danger" onClick={()=>deleteRecord(r.id)}>Delete</button></td>
              </tr>
            ))}
            {records.length===0 && <tr><td colSpan={8} style={{padding:12}}>No records yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
