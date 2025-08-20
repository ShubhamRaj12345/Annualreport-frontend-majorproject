import { useState, useEffect } from 'react';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Dashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const cards = [
    { icon: 'fas fa-tachometer-alt', title: 'Dashboard', link: '/dashboard' },
    { icon: 'fas fa-book', title: 'Research', link: '/research' },
    { icon: 'fas fa-dollar-sign', title: 'Finance', link: '/finance' },
    { icon: 'fas fa-building', title: 'Infrastructure', link: '/infrastructure' },
    { icon: 'fas fa-graduation-cap', title: 'Academics', link: '/academics' },
    { icon: 'fas fa-users', title: 'Collaboration', link: '/collaboration' },
    { icon: 'fas fa-clipboard-list', title: 'Final Report', link: '/report' },
    { icon: 'fas fa-graduation-cap', title: 'Placement', link: '/placement' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 8);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* <header className={isScrolled ? 'scrolled' : ''}>
        <h1>Annual Report Portal</h1>
      </header> */}

      <header className={`header1 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header1-content">
          <img src="logo.jpg" alt="Institute Logo" className="header1-logo" />
          <h1>Annual Report Portal</h1>
        </div>
      </header>


      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <a href="/">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('about'); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('contact'); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('help'); }}>Help</a>
        </div>

        <div className="nav-right">
          <a href="/admin-login" className="admin-login-btn">Admin Login</a>
        </div>
      </nav>

      <div className="slider">
        <div className="slides">
          <img src="/photo1.jpg" alt="Slide 1" style={{ display: currentSlide === 0 ? 'block' : 'none' }} />
          <img src="/photo2.jpg" alt="Slide 2" style={{ display: currentSlide === 1 ? 'block' : 'none' }} />
          <img src="/photo3.jpg" alt="Slide 3" style={{ display: currentSlide === 2 ? 'block' : 'none' }} />
          <img src="/photo4.jpg" alt="Slide 4" style={{ display: currentSlide === 3 ? 'block' : 'none' }} />
          <img src="/photo5.jpg" alt="Slide 5" style={{ display: currentSlide === 4 ? 'block' : 'none' }} />
          <img src="/photo6.jpg" alt="Slide 6" style={{ display: currentSlide === 5 ? 'block' : 'none' }} />
          <img src="/photo7.jpg" alt="Slide 7" style={{ display: currentSlide === 6 ? 'block' : 'none' }} />
          <img src="/photo8.jpg" alt="Slide 8" style={{ display: currentSlide === 7 ? 'block' : 'none' }} />
        </div>
      </div>
      <div className="top-container">
        <div className="container">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <i className={card.icon}></i>
              <h3>{card.title}</h3>
              <a href={card.link}>Go to {card.title}</a>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Institute Annual Report Portal</p>
        <p>&copy; Developed By Shubham Raj</p>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            {activeModal === 'about' && (
              <>
                <h2>About Us</h2>
                <p>
                  Established in 2007, the Sagar Institute of Science and Technology (SISTec), Gandhinagar, Bhopal, stands as a beacon of technical education in Madhya Pradesh...
                </p>
                <br />

                <p>
                  The institute boasts a sprawling 40+ acre campus equipped with over 250 laboratories, digital classrooms, a comprehensive library housing more than 45,000 books, and modern amenities including hostels, a gym, and a swimming pool. SISTec's commitment to excellence is reflected in its NAAC accreditation and NBA-accredited departments, ensuring quality education and continuous improvement.
                </p>
                <br />


                <p>
                  SISTec's dedication to holistic development is evident through its various initiatives, including the annual techno-cultural fest 'Sagar Fiesta', training programs like 'Sagar Manthan', and the 'Sagar Samarthya' student assessment program. These endeavors, combined with a robust academic framework, position SISTec Gandhinagar as a leading institution committed to shaping the technocrats and leaders of tomorrow.
                </p>


              </>
            )}
            {activeModal === 'contact' && (
              <>
                <h2>Contact Us</h2>
                <div className="contact-info">
                  <div className="contact-detail">
                    <h3>Campus Address</h3>
                    <p>Sagar Institute of Science and Technology (SISTec)</p>
                    <p>Gandhinagar, Bhopal - 462036, Madhya Pradesh, India</p>
                  </div>
                  <div className="contact-detail">
                    <h3>Phone Numbers</h3>
                    <p>+91 755 408 5571</p>
                    <p>+91 755 408 5572</p>
                  </div>
                  <div className="contact-detail">
                    <h3>Email</h3>
                    <p>info@sistec.ac.in</p>
                    <p>admissions@sistec.ac.in</p>
                  </div>
                </div>
                <h3>Send Us a Message</h3>
                <form className="contact-form">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" required />
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" required />
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Write your message here" required></textarea>
                  <button type="submit">Submit</button>
                </form>
              </>
            )}
            {activeModal === 'help' && (
              <>
                <h2>Help & Support</h2>
                <p>If you are facing any difficulties, please find help below:</p>
                <div className="faq">
                  <h3>Frequently Asked Questions (FAQs)</h3>
                  <ul>
                    <li><strong>How do I apply for admission?</strong> <p>Online at <a href="https://sistec.ac.in" target="_blank" rel="noopener noreferrer">sistec.ac.in</a>.</p></li>
                    <li><strong>Where can I check placement info?</strong> <p>Visit the Training and Placement page.</p></li>
                    <li><strong>Technical Support?</strong> <p>Email: <strong>support@sistec.ac.in</strong></p></li>
                  </ul>
                </div>
                <div className="support">
                  <h3>Support Details</h3>
                  <ul>
                    <li>Email: support@sistec.ac.in</li>
                    <li>Phone: +91 755 408 5571</li>
                  </ul>
                  <p>Support: Mon-Sat, 9:00 AM to 5:00 PM.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
