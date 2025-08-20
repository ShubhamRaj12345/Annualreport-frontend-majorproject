import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Research from './components/Research';
import Finance from './components/Finance';
import Collaboration from './components/Collaboration';
import Report from './components/Report';
import AdminLogin from './Admin/AdminLogin';
import Placement from './components/Placement';

import AdminHome1 from './Admin/AdminHome1';
import Academics from './components/Academics';
import ComputerScience from './StudentAcademics/ComputerScience/ComputerScience';
import Mechanical from './StudentAcademics/Mechanical/Mechanical';
import Infrastructure from './components/Infrastructure';






function App() {
  

  return (
    <Router>
      <div className="app">
    

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/research" element={<Research />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/report" element={<Report />} />
          <Route path="/computer-science" element={<ComputerScience />} />
          <Route path="/mechanical" element={<Mechanical />} />
          <Route path="/admin-home1" element={<AdminHome1/>} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/infrastructure" element={<Infrastructure />} />

    

          
        </Routes>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
