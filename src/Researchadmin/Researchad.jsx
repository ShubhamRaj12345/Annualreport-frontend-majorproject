import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Researchad.css";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const Research = () => {
  const [researchProjects, setResearchProjects] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [researchData, setResearchData] = useState({
    projectName: "",
    principalInvestigator: "",
    publicationYear: "",
  });

  // Pie chart data
  const chartData = useMemo(() => {
    const yearCount = {};
    researchProjects.forEach((project) => {
      yearCount[project.publicationYear] = (yearCount[project.publicationYear] || 0) + 1;
    });
    return Object.keys(yearCount).map((year) => ({
      name: year,
      value: yearCount[year],
    }));
  }, [researchProjects]);

  // handle input change
  const handleInputChange = (e) => {
    setResearchData({ ...researchData, [e.target.name]: e.target.value });
  };

  // save project
  const saveResearchProject = (e) => {
    e.preventDefault();
    if (!researchData.projectName || !researchData.principalInvestigator || !researchData.publicationYear) {
      alert("Please complete all required fields");
      return;
    }
    setResearchProjects([...researchProjects, { 
      projectId: researchProjects.length + 1, 
      ...researchData 
    }]);
    setResearchData({ 
      projectName: "", 
      principalInvestigator: "", 
      publicationYear: "" 
    });
    setDisplayForm(false);
  };

  // cancel form
  const cancelForm = () => {
    setResearchData({ 
      projectName: "", 
      principalInvestigator: "", 
      publicationYear: "" 
    });
    setDisplayForm(false);
  };

  return (
    <div className="research-container">
      {!displayForm ? (
        <>
          {/* Header Section */}
          <div className="research-header">
            <div className="header-content">
              <img src="/logo.jpg" alt="Research Logo" className="header-logo" />
              <div className="header-text">
                <h1>Research Analytics Dashboard</h1>
                <p>Monitor research initiatives and track progress metrics</p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              className="theme-toggle-button" 
              onClick={() => document.body.classList.toggle("dark-theme")}
            >
              Switch Theme
            </button>
          </div>

          {/* Statistics Section */}
          <div className="statistics-section">
            <div className="metrics-container">
              <div className="metric-card">
                <h2>{researchProjects.length}</h2>
                <p>Research Projects</p>
              </div>
              <div className="metric-card">
                <h2>8</h2>
                <p>Publications</p>
              </div>
              <div className="metric-card">
                <h2>15</h2>
                <p>Research Funding (Cr)</p>
              </div>
            </div>

            <div className="visualization-card">
              <h2>Project Distribution by Year</h2>
              {researchProjects.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`segment-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="no-data-message">
                  No research data available
                </p>
              )}
            </div>
          </div>
          
          {/* Research Projects Table */}
          <div className="data-card">
            <div className="table-controls">
              <h2>Research Portfolio</h2>
              <button className="add-project-button" onClick={() => setDisplayForm(true)}>
                + New Project
              </button>
            </div>

            <div className="table-wrapper">
              <table className="research-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Project Title</th>
                    <th>Lead Researcher</th>
                    <th>Publication Year</th>
                  </tr>
                </thead>
                <tbody>
                  {researchProjects.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-table-message">
                        No research projects recorded yet
                      </td>
                    </tr>
                  ) : (
                    researchProjects.map((project, index) => (
                      <tr key={project.projectId}>
                        <td>{index + 1}</td>
                        <td>{project.projectName}</td>
                        <td>{project.principalInvestigator}</td>
                        <td>{project.publicationYear}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // Project Submission Form
        <div className="form-section">
          <h2>Register New Research Project</h2>
          <form className="project-submission-form" onSubmit={saveResearchProject}>
            <input
              type="text"
              name="projectName"
              placeholder="Research Project Title"
              value={researchData.projectName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="principalInvestigator"
              placeholder="Principal Investigator"
              value={researchData.principalInvestigator}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="publicationYear"
              placeholder="Publication Year"
              value={researchData.publicationYear}
              onChange={handleInputChange}
              required
            />

            <div className="form-controls">
              <button type="button" className="cancel-button" onClick={cancelForm}>
                Discard
              </button>
              <button type="submit" className="submit-button">
                Save Research Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Research;