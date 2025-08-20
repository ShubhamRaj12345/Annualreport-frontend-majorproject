
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './style.css';

const AdminHome1 = () => {
  const [mainCategory, setMainCategory] = useState('');
  const [optionType, setOptionType] = useState('');
  const [subOption, setSubOption] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    department: '',
    email: '',
    role: 'faculty',
    password: ''
  });
  const [generatedId, setGeneratedId] = useState('');
  const [facultyList, setFacultyList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    try {
      const res = await axios.get('http://localhost:7070/api/faculty/all');
      setFacultyList(res.data);
    } catch (err) {
      console.error('Error fetching faculty:', err);
    }
  };

  const handleCategorySelection = (mainCat, type) => {
    setMainCategory(mainCat);
    setOptionType(type);
    setSubOption('');
    setSelectedBranch('');
  };

  const handleOptionSelection = (option, e) => {
    e.preventDefault();
    setSubOption(option);
    setSelectedBranch('');
    if (option === 'Mechanical Engineering') navigate('/mechanical');
    else if (option === 'Computer Science') navigate('/computer-science');
    else if (option === 'Electrical Engineering') navigate('/electrical');
    else if (option === 'Civil Engineering') navigate('/civil');
  };

  const handleFacultyInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty(prev => ({ ...prev, [name]: value }));
  };

  const generateFacultyId = async (e) => {
    e.preventDefault();
    if (!newFaculty.password) {
      alert("Please enter a password");
      return;
    }
    if (!newFaculty.name || !newFaculty.email || !newFaculty.department) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post('http://localhost:7070/api/faculty/add', newFaculty);
      const savedFaculty = res.data;
      setGeneratedId(savedFaculty.generatedId);
      setFacultyList([...facultyList, savedFaculty]);
      setNewFaculty({ name: '', department: '', email: '', role: 'faculty', password: '' });
      alert(`Login ID generated: ${savedFaculty.generatedId}`);
    } catch (err) {
      console.error('Error saving faculty:', err);
      alert('Failed to save faculty. Check backend server.');
    }
  };

  // New: Delete faculty by generatedId
  const deleteFaculty = async (generatedId) => {
    if (!window.confirm(`Are you sure you want to delete faculty with ID ${generatedId}?`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:7070/api/faculty/delete-by-generatedId/${generatedId}`);
      // Remove deleted faculty from list
      setFacultyList(facultyList.filter(faculty => faculty.generatedId !== generatedId));
      alert(`Faculty ${generatedId} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting faculty:', err);
      alert('Failed to delete faculty.');
    }
  };

  return (
    <div className="admin-container">
      <header><h1>Admin Panel</h1></header>

      <nav>
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
        </div>

        {!mainCategory && (
          <>
            <div className="dropdown">
              <button type="button" className="session-link">Finance</button>
              <div className="dropdown-content">
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Finance', 'Department'); }}>Budget Allocation & Utilization</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Finance', 'Student Placement'); }}>Fee Structure & Scholarship</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Finance', 'Student Placement'); }}>Expense Summary</a>
              </div>
            </div>
            <div className="dropdown">
              <button type="button" className="session-link">Research</button>
              <div className="dropdown-content">
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Research', 'Department'); }}>Research Projects</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Research', 'Student Placement'); }}>Publications</a>
              </div>
            </div>
            <div className="dropdown">
              <button type="button" className="session-link">Infrastructure</button>
              <div className="dropdown-content">
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Infrastructure', 'Department'); }}>Lab Detail</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Infrastructure', 'Student Placement'); }}>Classroom</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Infrastructure', 'Student Placement'); }}>Library</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Infrastructure', 'Student Placement'); }}>Hostel and Sports Facility</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Infrastructure', 'Student Placement'); }}>Maintenance Report</a>
              </div>
            </div>
            <div className="dropdown">
              <button type="button" className="session-link">Academics</button>
              <div className="dropdown-content">
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Academics', 'Department'); }}>Department</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategorySelection('Academics', 'Student Placement'); }}>Student Placement</a>
              </div>
            </div>
          </>
        )}

        {optionType === 'Department' && (
          <div className="dropdown">
            <button type="button" className="session-link">Select Department</button>
            <div className="dropdown-content">
              <a href="#" onClick={(e) => handleOptionSelection('Computer Science', e)}>Computer Science</a>
              <a href="#" onClick={(e) => handleOptionSelection('Mechanical Engineering', e)}>Mechanical Engineering</a>
              <a href="#" onClick={(e) => handleOptionSelection('Electrical Engineering', e)}>Electrical Engineering</a>
              <a href="#" onClick={(e) => handleOptionSelection('Civil Engineering', e)}>Civil Engineering</a>
            </div>
          </div>
        )}
      </nav>

      <div className="faculty-management-container">
        <div className="faculty-form-compact card1">
          <h2>Faculty Login ID</h2>
          <form onSubmit={generateFacultyId}>
            <div className="form-group-compact">
              <label>Name:</label>
              <input type="text" name="name" value={newFaculty.name} onChange={handleFacultyInputChange} required />
            </div>

            <div className="form-group-compact">
              <label>Dept:</label>
              <select name="department" value={newFaculty.department} onChange={handleFacultyInputChange} required>
                <option value="">Select</option>
                <option value="Computer Science">CS</option>
                <option value="Mechanical Engineering">ME</option>
                <option value="Electrical Engineering">EE</option>
                <option value="Civil Engineering">CE</option>
              </select>
            </div>

            <div className="form-group-compact">
              <label>Email:</label>
              <input type="email" name="email" value={newFaculty.email} onChange={handleFacultyInputChange} required />
            </div>

            <div className="form-group-compact">
              <label>Role:</label>
              <select name="role" value={newFaculty.role} onChange={handleFacultyInputChange}>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group-compact">
              <label>Password:</label>
              <input type="password" name="password" value={newFaculty.password} onChange={handleFacultyInputChange} required />
            </div>

            <button type="submit" className="generate-btn-compact">Generate ID</button>
          </form>

          {generatedId && <p className="generated-id"><strong>Faculty ID:</strong> {generatedId}</p>}
        </div>

        <div className="faculty-list-compact">
          <h3>Existing Faculty</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Faculty ID</th>
                  <th>Email</th>             {/* New Email Column */}
                  <th>Password</th>          {/* New Password Column */}
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty.generatedId}>
                    <td>{faculty.name}</td>
                    <td>{faculty.department}</td>
                    <td>{faculty.generatedId}</td>
                    <td>{faculty.email}</td>              {/* Display Email */}
                    <td>{faculty.password}</td>           {/* Display Password */}
                    <td>{faculty.dateAdded ? new Date(faculty.dateAdded).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => deleteFaculty(faculty.generatedId)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <footer>
        <p>&copy; 2025 Institute Annual Report Portal</p>
      </footer>
    </div>
  );
};

export default AdminHome1;
