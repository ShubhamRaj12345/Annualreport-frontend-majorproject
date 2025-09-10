// BudgetAllocation.jsx
import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import "./finance.css";
import { saveAs } from "file-saver";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const LS_KEY = "finance_budget_v1";

export default function BudgetAllocation(){
  const [form, setForm] = useState({ year:new Date().getFullYear(), dept:"Engineering", allocated:"", utilized:"", project:"" });
  const [records, setRecords] = useState([]);
  const depts = ["Science","Engineering","Arts","Commerce","Special Projects","Research"];

  useEffect(()=> {
    const raw = localStorage.getItem(LS_KEY);
    if(raw) setRecords(JSON.parse(raw));
  },[]);
  useEffect(()=> localStorage.setItem(LS_KEY, JSON.stringify(records)), [records]);

  function handleChange(e){ setForm({...form, [e.target.name]: e.target.value }); }
  function addRecord(e){
    e.preventDefault();
    if(!form.allocated){ alert("Allocated amount required"); return; }
    const rec = { id:Date.now(), year: Number(form.year), dept: form.dept, allocated: Number(form.allocated), utilized: Number(form.utilized||0), project: form.project || "" };
    setRecords(prev => [...prev, rec]);
    setForm({ year:new Date().getFullYear(), dept:"Engineering", allocated:"", utilized:"", project:"" });
  }
  function deleteRecord(id){ if(!window.confirm("Delete?")) return; setRecords(prev => prev.filter(r=>r.id!==id)); }

  // charts
  const labels = records.map(r => `${r.dept} (${r.year})`);
  const allocatedArr = records.map(r=>r.allocated);
  const utilizedArr = records.map(r=>r.utilized);
  const barData = { labels, datasets:[ { label:"Allocated", data:allocatedArr, backgroundColor:"#2196f3" }, { label:"Utilized", data:utilizedArr, backgroundColor:"#4caf50" } ] };

  const totalAllocated = records.reduce((s,r)=>s+r.allocated,0);
  const totalUtilized = records.reduce((s,r)=>s+r.utilized,0);
  const doughData = { labels:["Allocated","Utilized","Remaining"], datasets:[{ data:[totalAllocated,totalUtilized, totalAllocated-totalUtilized], backgroundColor:["#3f51b5","#ff9800","#e91e63"] }] };

  // export
  function exportCSV(){
    const header = ["Year","Department","Allocated","Utilized","Remaining","Project"];
    const rows = records.map(r => [r.year,r.dept,r.allocated,r.utilized, r.allocated-r.utilized, r.project]);
    const csv = [header, ...rows].map(r=>r.map(c=>`"${(""+c).replace(/"/g,'""')}"`).join(",")).join("\n");
    saveAs(new Blob([csv],{type:"text/csv;charset=utf-8;"}),"budget_allocation.csv");
  }

  return (
    <div>
      <div className="card12">
        <h3>Add Budget Allocation</h3>
        <form onSubmit={addRecord} style={{marginTop:10}}>
          <div className="form-row">
            <input type="number" name="year" value={form.year} onChange={handleChange} />
            <select name="dept" value={form.dept} onChange={handleChange}>
              {depts.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
            <input name="allocated" type="number" placeholder="Allocated Amount" value={form.allocated} onChange={handleChange} />
            <input name="utilized" type="number" placeholder="Utilized Amount" value={form.utilized} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input name="project" placeholder="Project (optional)" value={form.project} onChange={handleChange} className="wide" />
            <button className="btn btn-primary" type="submit">Save</button>
            <button type="button" className="btn" onClick={()=>setForm({ year:new Date().getFullYear(), dept:"Engineering", allocated:"", utilized:"", project:"" })}>Reset</button>
          </div>
        </form>
      </div>

      <div style={{height:16}} />

      <div className="grid-2">
        <div className="card">
          <h3>Department-wise Allocation vs Utilization</h3>
          <div style={{maxWidth:680, margin:"0 auto"}}><Bar data={barData} /></div>
        </div>
        <div className="card">
          <h3>Allocation Summary</h3>
          <div style={{maxWidth:360, margin:"0 auto"}}><Doughnut data={doughData} /></div>
          <div style={{marginTop:10}}>
            <div><strong>Total Allocated:</strong> ₹{totalAllocated.toLocaleString()}</div>
            <div><strong>Total Utilized:</strong> ₹{totalUtilized.toLocaleString()}</div>
            <div><strong>Remaining:</strong> ₹{(totalAllocated - totalUtilized).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{height:16}} />

      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h3>Budget Table ({records.length})</h3>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
        </div>
        <table className="table" style={{marginTop:8}}>
          <thead><tr><th>Year</th><th>Department</th><th>Allocated</th><th>Utilized</th><th>Remaining</th><th>Project</th><th>Action</th></tr></thead>
          <tbody>
            {records.slice().reverse().map(r=>(
              <tr key={r.id}>
                <td>{r.year}</td>
                <td>{r.dept}</td>
                <td>₹{r.allocated.toLocaleString()}</td>
                <td>₹{r.utilized.toLocaleString()}</td>
                <td>₹{(r.allocated - r.utilized).toLocaleString()}</td>
                <td>{r.project || "-"}</td>
                <td><button className="btn btn-danger" onClick={()=>deleteRecord(r.id)}>Delete</button></td>
              </tr>
            ))}
            {records.length===0 && <tr><td colSpan={7} style={{padding:12}}>No records yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
