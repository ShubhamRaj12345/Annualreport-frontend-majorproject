import React from 'react';
import { Link } from 'react-router-dom';

function Infrastructure() {
  return (
    <div className="infrastructure-container">
      <style>{`
        .infrastructure-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 20px;
          text-align: center;
        }

        .infrastructure-box {
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .infrastructure-title {
          color: #7c3aed;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .infrastructure-message {
          color: #4b5563;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .infrastructure-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .infrastructure-link:hover {
          color: #2563eb;
        }
      `}</style>

      <div className="infrastructure-box">
        <h1 className="infrastructure-title">Service Unavailable</h1>
        <p className="infrastructure-message">
          The infrastructure section is currently under development or temporarily unavailable.
        </p>
        <Link to="/" className="infrastructure-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Infrastructure;
