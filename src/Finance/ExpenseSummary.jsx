// ExpenseSummary.jsx
import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { saveAs } from "file-saver";
import "./finance.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const LS_KEY = "finance_expenses_v1";

export default function ExpenseSummary() {
  const [form, setForm] = useState({
    date: "",
    category: "Staff Salary",
    department: "",
    amount: "",
    notes: ""
  });
  const [expenses, setExpenses] = useState([]);
  const [filterYear, setFilterYear] = useState("all");
  const categories = ["Staff Salary","Infrastructure & Maintenance","Utilities","Events & Functions","Lab & Library","Miscellaneous"];

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if(raw) setExpenses(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(expenses));
  }, [expenses]);

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  }
  function addExpense(e){
    e.preventDefault();
    if(!form.date || !form.amount) { alert("Date and amount required"); return; }
    const rec = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
      year: new Date(form.date).getFullYear()
    };
    setExpenses(prev => [...prev, rec]);
    setForm({ date:"", category:"Staff Salary", department:"", amount:"", notes:"" });
  }

  function deleteExpense(id){
    if(!window.confirm("Delete this expense?")) return;
    setExpenses(prev => prev.filter(p=>p.id!==id));
  }

  // filters
  const visible = filterYear === "all" ? expenses : expenses.filter(e => e.year === Number(filterYear));

  // pie data
  const catMap = {};
  visible.forEach(e => catMap[e.category] = (catMap[e.category]||0) + e.amount);
  const pieData = { labels: Object.keys(catMap), datasets:[{ data: Object.values(catMap), backgroundColor:["#4caf50","#2196f3","#ff9800","#e91e63","#9c27b0","#00bcd4"] }] };

  // line (yearly totals)
  const yearMap = {};
  expenses.forEach(e => yearMap[e.year] = (yearMap[e.year]||0) + e.amount);
  const sortedYears = Object.keys(yearMap).sort();
  const lineData = { labels: sortedYears, datasets:[{ label:"Yearly Expenses (₹)", data: sortedYears.map(y=>yearMap[y]), borderColor:"#3f51b5", fill:false }] };

  // export CSV
  const exportCSV = () => {
    const header = ["Date","Category","Department","Amount","Notes","Year"];
    const rows = visible.map(r => [r.date, r.category, r.department, r.amount, (r.notes||""), r.year]);
    const csv = [header, ...rows].map(r => r.map(cell => `"${(cell||"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type:"text/csv;charset=utf-8;" });
    saveAs(blob, "expenses.csv");
  };

  // years for filter dropdown
  const years = Array.from(new Set(expenses.map(e=>e.year))).sort((a,b)=>b-a);

  return (
    <div>
      <div className="card">
        <h3>Enter Expense</h3>
        <form onSubmit={addExpense} style={{marginTop:10}}>
          <div className="form-row">
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input name="department" placeholder="Department (optional)" value={form.department} onChange={handleChange} className="wide" />
            <input type="number" name="amount" placeholder="Amount (₹)" value={form.amount} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input name="notes" placeholder="Description / Notes" value={form.notes} onChange={handleChange} className="wide" />
            <button className="btn btn-primary" type="submit">Save Expense</button>
            <button type="button" className="btn" onClick={()=>{ setForm({date:"",category:"Staff Salary",department:"",amount:"",notes:""}) }}>Reset</button>
          </div>
        </form>
      </div>

      <div style={{height:18}} />

      <div className="grid-2">
        <div className="card">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h3>Category Distribution</h3>
            <div className="controls">
              <select value={filterYear} onChange={e=>setFilterYear(e.target.value)}>
                <option value="all">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button className="btn" onClick={exportCSV}>Export CSV (visible)</button>
            </div>
          </div>
          <div style={{maxWidth:480, margin:"10px auto"}}><Pie data={pieData} /></div>
        </div>

        <div className="card">
          <h3>Yearly Trend</h3>
          <div style={{maxWidth:520, margin:"10px auto"}}><Line data={lineData} /></div>
        </div>
      </div>

      <div style={{height:18}} />

      <div className="card">
        <h3>Detailed Expenses ({visible.length})</h3>
        <table className="table" style={{marginTop:8}}>
          <thead>
            <tr><th>Date</th><th>Category</th><th>Department</th><th>Amount (₹)</th><th>Notes</th><th>Action</th></tr>
          </thead>
          <tbody>
            {visible.slice().reverse().map(r => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.category}</td>
                <td>{r.department || "-"}</td>
                <td>₹{r.amount.toLocaleString()}</td>
                <td>{r.notes || "-"}</td>
                <td><button className="btn btn-danger" onClick={()=>deleteExpense(r.id)}>Delete</button></td>
              </tr>
            ))}
            {visible.length===0 && <tr><td colSpan={6} style={{padding:12}}>No records found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
