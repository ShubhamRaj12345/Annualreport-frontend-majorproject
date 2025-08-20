import React from 'react';
import { Link } from 'react-router-dom';

function Report() {
  return (
    <div className="report-container">
      <style>{`
        .report-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
        }

        .report-box {
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
        }

        .report-title {
          color: #1e40af;
          font-size: 26px;
          margin-bottom: 10px;
        }

        .report-description {
          color: #4b5563;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .report-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .report-link:hover {
          color: #2563eb;
        }
      `}</style>

      <div className="report-box">
        <h2 className="report-title">Welcome to the Final Report Page</h2>
        <p className="report-description">
          This section allows you to view the final report.
        </p>
        <Link to="/" className="report-link">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Report;
