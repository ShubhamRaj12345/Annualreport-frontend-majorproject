import React from 'react';
import { Link } from 'react-router-dom';

function Finance() {
  return (
    <div className="finance-container">
      <style>{`
        .finance-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 20px;
          text-align: center;
        }

        .finance-message-box {
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .finance-title {
          color: #e63946;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .finance-message {
          color: #555;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .finance-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .finance-link:hover {
          color: #2563eb;
        }
      `}</style>

      <div className="finance-message-box">
        <h1 className="finance-title">Service Unavailable</h1>
        <p className="finance-message">
          The finance section is currently under maintenance or not yet available.
        </p>
        <Link to="/" className="finance-link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default Finance;
