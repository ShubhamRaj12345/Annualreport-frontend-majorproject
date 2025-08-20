import React from 'react';
import { Link } from 'react-router-dom';

function Collaboration() {
  return (
    <div className="collaboration-container">
      <style>{`
        .collaboration-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f4f8;
          padding: 20px;
          text-align: center;
        }

        .collaboration-message-box {
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .collaboration-title {
          color: #d97706;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .collaboration-message {
          color: #444;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .collaboration-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .collaboration-link:hover {
          color: #2563eb;
        }
      `}</style>

      <div className="collaboration-message-box">
        <h1 className="collaboration-title">Service Unavailable</h1>
        <p className="collaboration-message">
          The collaboration section is currently under development or temporarily unavailable.
        </p>
        <Link to="/" className="collaboration-link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default Collaboration;
