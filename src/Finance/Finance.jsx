// Finance.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Finance.css";

export default function Finance() {
  return (
    <div className="finance-page">
      <header className="finance-header">
        <h1>College Finance Dashboard</h1>
        <p className="subtitle">Enter, manage & visualize yearly financial activities</p>
      </header>

      <nav className="finance-nav">
        <NavLink to="/finance/expense" className="nav-item" activeclassname="active">Expense Summary</NavLink>
        <NavLink to="/finance/fees" className="nav-item" activeclassname="active">Fee & Scholarship</NavLink>
        <NavLink to="/finance/budget" className="nav-item" activeclassname="active">Budget Allocation</NavLink>
      </nav>

      <main className="finance-content">
        <Outlet />
      </main>
    </div>
  );
}
