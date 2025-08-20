import React from 'react';
import { Link } from 'react-router-dom';

function Research() {
  return (
    <div className="research-container">
      <style>{`
        .research-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f4f8;
          padding: 20px;
          text-align: center;
        }

        .research-box {
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .research-title {
          color: #1e3a8a;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .research-message {
          color: #444;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .research-link {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .research-link:hover {
          color: #2563eb;
        }
      `}</style>

      <div className="research-box">
        <h1 className="research-title">Service Unavailable</h1>
        <p className="research-message">
          The research section is currently under development or temporarily unavailable.
        </p>
        <Link to="/" className="research-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Research;
