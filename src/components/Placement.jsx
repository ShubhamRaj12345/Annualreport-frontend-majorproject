import React from 'react';
import { Link } from 'react-router-dom';

function Placement() {
  return (
    <div className="placement-container">
      <style>{`
        .placement-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 20px;
          text-align: center;
        }

        .placement-box {
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .placement-title {
          color: #0f766e;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .placement-message {
          color: #374151;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .placement-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .placement-link:hover {
          color: #2563eb;
        }
      `}</style>

      <div className="placement-box">
        <h1 className="placement-title">Service Unavailable</h1>
        <p className="placement-message">
          The placement section is currently under development or temporarily unavailable.
        </p>
        <Link to="/" className="placement-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Placement;
