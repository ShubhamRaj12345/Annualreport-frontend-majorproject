import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState('');

    const openModal = (modalId) => {
        setIsModalOpen(modalId);
    };

    const closeModal = () => {
        setIsModalOpen('');
    };

  return (
    <>
      <nav>
        <div className="nav-left">
          <Link to="/">Home</Link>
          <a href="#" onClick={() => openModal('about')}>About</a>
          <a href="#" onClick={() => openModal('contact')}>Contact</a>
          <a href="#" onClick={() => openModal('help')}>Help</a>
        </div>
        <div className="nav-right">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

        {/* Modals */}
        {isModalOpen === 'about' && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>About Us</h2>
                    <p>Information about the institute's annual report process...</p>
                </div>
            </div>
        )}

        {isModalOpen === 'contact' && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Contact Us</h2>
                    <p>Contact information goes here...</p>
                </div>
            </div>
        )}

        {isModalOpen === 'help' && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Help</h2>
                    <p>Help and support details go here...</p>
                </div>
            </div>
        )}
    </>
  );
}

export default Navigation;
