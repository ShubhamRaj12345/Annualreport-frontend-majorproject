// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
// } from 'chart.js';
// import './ComputerScience.css';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// const ComputerScience = () => {
//   const [students, setStudents] = useState([]);
//   const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
//   const [formData, setFormData] = useState({
//     name: '',
//     rollNo: '',
//     semester: '',
//     session: '',
//     grades: {}
//   });
//   const [filterSession, setFilterSession] = useState('');
//   const [visibleSemester, setVisibleSemester] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);

//   const subjects = {
//     1: ['Math', 'Data Structures', 'OS', 'DBMS'],
//     2: ['Math', 'Algorithms', 'OS', 'DBMS'],
//     3: ['ES-301 - Energy & Environmental Engineering', 'CS-302 - Discrete Structure', 'CS-303 - Data Structure', 'CS-304 - Digital Systems','CS-305 - Object Oriented Programming & Methodology'],
//     4: ['BT-401 - Mathematics- III', 'CS-402 - Analysis Design of Algorithm', 'CS-403 - Software Engineering', 'CS-404 - Computer Org. & Architecture','CS-405 - Operating Systems'],
//     5: ['CS-501 - Theory of Computation', 'CS-502 - Database Management Systems', 'CS-503 - Pattern Recognition', 'CS-504 - Internet and Web Technology'],
//     6: ['CS-603 - Compiler Design', 'CS-601 - Machine Learning', 'CS-604 - Project Management', 'CS-602 - Computer Networks'],
//     7: ['Math', 'Machine Learning', 'AI', 'DBMS'],
//     8: ['Math', 'Big Data', 'Machine Learning', 'DBMS'],
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (filterSession) {
//       for (let i = 1; i <= 8; i++) {
//         fetchStudentsBySemester(i);
//       }
//     }
//   }, [filterSession]);

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get('http://localhost:7070/students');
//       setStudents(res.data);
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       showMessage('Failed to load students data', false);
//     }
//   };

//   const fetchStudentsBySemester = async (sem) => {
//     if (!filterSession) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:7070/students/semester/${sem}/session/${filterSession}`
//       );
//       setSemesterWiseStudents(prev => ({ ...prev, [sem]: res.data }));
//     } catch (err) {
//       console.error(`Error fetching semester ${sem}:`, err);
//       showMessage(`Failed to load semester ${sem} data`, false);
//     }
//   };

//   const handleAddStudent = async (e) => {
//     e.preventDefault();
//     setIsAdding(true);
    
//     const newStudent = {
//       name: formData.name,
//       rollNo: formData.rollNo,
//       semester: parseInt(formData.semester),
//       session: formData.session,
//       subjects: formData.grades,
//     };

//     try {
//       await axios.post('http://localhost:7070/students', newStudent);
//       // Set filter to the new student's session
//       setFilterSession(formData.session);
//       setFormData({
//         name: '',
//         rollNo: '',
//         semester: '',
//         session: '',
//         grades: {}
//       });
//       showMessage('Student added successfully!', true);
//     } catch (err) {
//       console.error('Error adding student:', err);
//       showMessage('Failed to add student. Please check the form.', false);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleDeleteStudent = async (id, semester) => {
//     try {
//       await axios.delete(`http://localhost:7070/students/${id}`);
//       await fetchStudentsBySemester(semester);
//       showMessage('Student deleted successfully!', true);
//     } catch (err) {
//       console.error('Error deleting student:', err);
//       showMessage('Error deleting student!', false);
//     }
//   };

//   const handleCSVUpload = async (file) => {
//     if (!file) {
//       showMessage('Please select a file first!', false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     setIsUploading(true);

//     try {
//       const response = await axios.post(
//         'http://localhost:7070/students/upload', 
//         formData, 
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           timeout: 10000
//         }
//       );

//       if (response.data.success) {
//         const uploadedSession = response.data.session;
//         setFilterSession(uploadedSession);
//         showMessage(
//           `CSV uploaded successfully! ${response.data.count} students added. Session: ${uploadedSession}`,
//           true
//         );
        
//         // Refresh data for all semesters
//         for (let i = 1; i <= 8; i++) {
//           await fetchStudentsBySemester(i);
//         }
//         setVisibleSemester(1);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       const errorMsg = error.response?.data?.message || 
//                       error.message || 
//                       'Failed to upload CSV. Please check the file format.';
//       showMessage(errorMsg, false);
//     } finally {
//       setIsUploading(false);
//       setSelectedFile(null);
//     }
//   };

//   const downloadTemplate = (sem) => {
//     const headers = ['name', 'rollNo', 'semester', 'session', ...subjects[sem]];
//     const csvContent = [headers.join(',')].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `semester_${sem}_template.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const prepareChartData = (students) => {
//     if (!students || students.length === 0) {
//       return {
//         labels: ['No Data'],
//         datasets: [{
//           data: [1],
//           backgroundColor: ['#CCCCCC'],
//         }]
//       };
//     }

//     let passed = 0;
//     let failed = 0;
//     students.forEach((s) => {
//       const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
//       isPass ? passed++ : failed++;
//     });

//     return {
//       labels: ['Passed', 'Failed'],
//       datasets: [{
//         data: [passed, failed],
//         backgroundColor: ['#4CAF50', '#FF6347'],
//         hoverOffset: 4,
//       }],
//     };
//   };

//   const showMessage = (msg, isSuccess) => {
//     setMessage({ text: msg, type: isSuccess ? 'success' : 'error' });
//     setTimeout(() => setMessage(null), 5000);
//   };

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.name.endsWith('.csv')) {
//       showMessage('Please upload a valid CSV file', false);
//       e.target.value = '';
//       return;
//     }

//     setSelectedFile(file);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleGradeChange = (subject, value) => {
//     setFormData(prev => ({
//       ...prev,
//       grades: { ...prev.grades, [subject]: value }
//     }));
//   };

//   return (
//     <div className="admin-home-container1">
//       <h1>Department of Computer Science</h1>

//       {message && (
//         <div className={`toast-message ${message.type}`}>
//           <span className="toast-icon">{message.type === 'success' ? '✅' : '❌'}</span>
//           <span className="toast-text">{message.text}</span>
//           <button className="toast-close" onClick={() => setMessage(null)}>×</button>
//         </div>
//       )}

//       <div className="student-form">
//         <div className="student-form1">
//           <h3>Upload Students via CSV</h3>
//           <label htmlFor="csvFile" className="upload-btn">
//             {selectedFile ? selectedFile.name : 'Choose CSV File'}
//           </label>
//           <input
//             type="file"
//             id="csvFile"
//             accept=".csv"
//             onChange={handleFileSelect}
//             className="hidden-file"
//           />
//           <button
//             type="button"
//             className="upload-confirm-btn"
//             onClick={() => handleCSVUpload(selectedFile)}
//             disabled={!selectedFile || isUploading}
//           >
//             {isUploading ? 'Uploading...' : 'Upload CSV'}
//           </button>

//           <div className="csv-templates">
//             <h4>Download Semester-wise CSV Templates</h4>
//             <div className="template-buttons">
//               {[...Array(8)].map((_, i) => {
//                 const sem = i + 1;
//                 return (
//                   <button 
//                     type="button" 
//                     key={sem} 
//                     onClick={() => downloadTemplate(sem)}
//                     className="template-btn"
//                   >
//                     Semester {sem}
//                   </button>
//                 );
//               })}
//             </div>
//           </div> 
 




// {/* 
// <div className="csv-templates-section">
//   <div className="section-header">
//     <h3>Download CSV Templates</h3>
//     <p className="section-description">Get pre-formatted templates for each semester</p>
//   </div>
  
//   <div className="template-grid">
//     {[...Array(8)].map((_, i) => {
//       const sem = i + 1;
//       return (
//         <div key={sem} className="template-card">
//           <div className="template-info">
//             <div className="semester-badge">Semester {sem}</div>
//             <div className="subjects-list">
//               {subjects[sem].map(subject => (
//                 <span key={subject} className="subject-tag">{subject}</span>
//               ))}
//             </div>
//           </div>
//           <button 
//             onClick={() => downloadTemplate(sem)}
//             className="download-button"
//             aria-label={`Download Semester ${sem} Template`}
//           >
//             <svg className="download-icon" viewBox="0 0 24 24">
//               <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
//             </svg>
//             Download
//           </button>
//         </div>
//       );
//     })}
//   </div>
// </div> */}


//         </div>

//         <form onSubmit={handleAddStudent} className="student-form2">
//           <input 
//             type="text" 
//             name="name"
//             placeholder="Student Name" 
//             value={formData.name} 
//             onChange={handleInputChange} 
//             required 
//           />
//           <input 
//             type="text" 
//             name="rollNo"
//             placeholder="Roll Number" 
//             value={formData.rollNo} 
//             onChange={handleInputChange} 
//             required 
//           />
//           <select 
//             name="semester"
//             value={formData.semester} 
//             onChange={(e) => {
//               handleInputChange(e);
//               setFormData(prev => ({ ...prev, grades: {} }));
//             }} 
//             required
//           >
//             <option value="">Select Semester</option>
//             {[...Array(8)].map((_, i) => (
//               <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
//             ))}
//           </select>
//           <select 
//             name="session"
//             value={formData.session} 
//             onChange={handleInputChange} 
//             required
//           >
//             <option value="">Select Session</option>
//             <option value="2022-2023">2022-2023</option>
//             <option value="2023-2024">2023-2024</option>
//             <option value="2024-2025">2024-2025</option>
//             <option value="2025-2026">2025-2026</option>
//           </select>
          
//           {formData.semester && subjects[formData.semester]?.map((sub) => (
//             <select 
//               key={sub} 
//               value={formData.grades[sub] || ''} 
//               onChange={(e) => handleGradeChange(sub, e.target.value)} 
//               required
//             >
//               <option value="">{sub} Grade</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//               <option value="D">D</option>
//               <option value="F">F</option>
//             </select>
//           ))}
          
//           <button type="submit" disabled={isAdding}>
//             {isAdding ? 'Adding...' : 'Add Student'}
//           </button>
//         </form>
//       </div>

//       <div className="session-selector-container">
//         <h3>Filter by Session</h3>
//         <select 
//           value={filterSession} 
//           onChange={(e) => setFilterSession(e.target.value)}
//           className="session-select"
//         >
//           <option value="">-- Select Session --</option>
//           <option value="2022-2023">2022-2023</option>
//           <option value="2023-2024">2023-2024</option>
//           <option value="2024-2025">2024-2025</option>
//           <option value="2025-2026">2025-2026</option>
//         </select>
//         {filterSession && (
//           <p className="current-session">Currently viewing: {filterSession}</p>
//         )}
//       </div>

//       <div className="student-list1">
//         <h2>Semester-wise Students</h2>
//         <div className="semester-buttons">
//           {[...Array(8)].map((_, i) => {
//             const sem = i + 1;
//             return (
//               <button 
//                 key={sem} 
//                 onClick={() => { 
//                   setVisibleSemester(sem); 
//                   fetchStudentsBySemester(sem); 
//                 }}
//                 className={visibleSemester === sem ? 'active' : ''}
//               >
//                 Semester {sem}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {visibleSemester && (
//         <div className="semester-container">
//           <h3>Semester {visibleSemester} - Session: {filterSession || 'All'}</h3>
//           <div className="semester-content">
//             <div className="student-list-container">
//               <div className="scrollable-list">
//                 <h4>Student List</h4>
//                 {semesterWiseStudents[visibleSemester]?.length > 0 ? (
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Roll No</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {semesterWiseStudents[visibleSemester]?.map((s) => {
//                         const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
//                         return (
//                           <tr key={s.id}>
//                             <td>{s.name}</td>
//                             <td>{s.rollNo}</td>
//                             <td className={isPass ? 'pass' : 'fail'}>
//                               {isPass ? 'Pass' : 'Fail'}
//                             </td>
//                             <td>
//                               <button 
//                                 onClick={() => handleDeleteStudent(s.id, visibleSemester)}
//                                 className="delete-btn"
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p className="no-data">No students found for this semester and session.</p>
//                 )}
//               </div>
//             </div>
            
//             <div className="graph-container">
//               <h4>Semester Performance</h4>
//               <div className="chart-wrapper">
//                 <Doughnut 
//                   data={prepareChartData(semesterWiseStudents[visibleSemester])} 
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         position: 'bottom',
//                       },
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComputerScience;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import './ComputerScience.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ComputerScience = () => {
  const [students, setStudents] = useState([]);
  const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    semester: '',
    session: '',
    grades: {}
  });
  const [filterSession, setFilterSession] = useState('');
  const [visibleSemester, setVisibleSemester] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const subjects = {
    1: ['BT-101 - Engineering Chemistry', 'BT-102 - Mathematics-I', 'BT-104 - Basic Electrical & Electronics Engineering','BT-103 - English for Communication', 'BT-105 - Engineering Graphics'],
    2: ['BT-201 - Engineering Physics', 'BT-202 - Mathematics-II', 'BT-203 - Basic Mechanical Engineering', 'BT-204 - Basic Civil Engineering & Mechanics','BT-205 - Basic Computer Engineering'],
    3: ['ES-301 - Energy & Environmental Engineering', 'CS-302 - Discrete Structure', 'CS-303 - Data Structure', 'CS-304 - Digital Systems','CS-305 - Object Oriented Programming & Methodology'],
    4: ['BT-401 - Mathematics- III', 'CS-402 - Analysis Design of Algorithm', 'CS-403 - Software Engineering', 'CS-404 - Computer Org. & Architecture','CS-405 - Operating Systems'],
    5: ['CS-501 - Theory of Computation', 'CS-502 - Database Management Systems', 'CS-503 - Pattern Recognition', 'CS-504 - Internet and Web Technology'],
    6: ['CS-603 - Compiler Design', 'CS-601 - Machine Learning', 'CS-604 - Project Management', 'CS-602 - Computer Networks'],
    7: ['Math', 'Machine Learning', 'AI', 'DBMS'],
    8: ['Math', 'Big Data', 'Machine Learning', 'DBMS'],
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (filterSession) {
      for (let i = 1; i <= 8; i++) {
        fetchStudentsBySemester(i);
      }
    }
  }, [filterSession]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:7070/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      showMessage('Failed to load students data', false);
    }
  };

  const fetchStudentsBySemester = async (sem) => {
    if (!filterSession) return;
    try {
      const res = await axios.get(
        `http://localhost:7070/students/semester/${sem}/session/${filterSession}`
      );
      setSemesterWiseStudents(prev => ({ ...prev, [sem]: res.data }));
    } catch (err) {
      console.error(`Error fetching semester ${sem}:`, err);
      showMessage(`Failed to load semester ${sem} data`, false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    
    const newStudent = {
      name: formData.name,
      rollNo: formData.rollNo,
      semester: parseInt(formData.semester),
      session: formData.session,
      subjects: formData.grades,
    };

    try {
      await axios.post('http://localhost:7070/students', newStudent);
      setFilterSession(formData.session);
      setFormData({
        name: '',
        rollNo: '',
        semester: '',
        session: '',
        grades: {}
      });
      showMessage('Student added successfully!', true);
    } catch (err) {
      console.error('Error adding student:', err);
      showMessage('Failed to add student. Please check the form.', false);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteStudent = async (id, semester) => {
    try {
      await axios.delete(`http://localhost:7070/students/${id}`);
      await fetchStudentsBySemester(semester);
      showMessage('Student deleted successfully!', true);
    } catch (err) {
      console.error('Error deleting student:', err);
      showMessage('Error deleting student!', false);
    }
  };

  const handleCSVUpload = async (file) => {
    if (!file) {
      showMessage('Please select a file first!', false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);

    try {
      const response = await axios.post(
        'http://localhost:7070/students/upload', 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 10000
        }
      );

      if (response.data.success) {
        const uploadedSession = response.data.session;
        setFilterSession(uploadedSession);
        showMessage(
          `CSV uploaded successfully! ${response.data.count} students added. Session: ${uploadedSession}`,
          true
        );
        
        for (let i = 1; i <= 8; i++) {
          await fetchStudentsBySemester(i);
        }
        setVisibleSemester(1);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Failed to upload CSV. Please check the file format.';
      showMessage(errorMsg, false);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };

  const downloadTemplate = (sem) => {
    const headers = ['name', 'rollNo', 'semester', 'session', ...subjects[sem]];
    const csvContent = [headers.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `semester_${sem}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const prepareChartData = (students) => {
    if (!students || students.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#CCCCCC'],
        }]
      };
    }

    let passed = 0;
    let failed = 0;
    students.forEach((s) => {
      const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
      isPass ? passed++ : failed++;
    });

    return {
      labels: ['Passed', 'Failed'],
      datasets: [{
        data: [passed, failed],
        backgroundColor: ['#4CAF50', '#FF6347'],
        hoverOffset: 4,
      }],
    };
  };

  const prepareAnnualChartData = () => {
    const years = [
      { label: '1st Year', semesters: [1, 2] },
      { label: '2nd Year', semesters: [3, 4] },
      { label: '3rd Year', semesters: [5, 6] },
      { label: '4th Year', semesters: [7, 8] }
    ];

    const labels = years.map(year => year.label);
    const passedData = [];
    const failedData = [];

    years.forEach(year => {
      let passed = 0;
      let failed = 0;

      year.semesters.forEach(sem => {
        const students = semesterWiseStudents[sem] || [];
        students.forEach(s => {
          const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
          isPass ? passed++ : failed++;
        });
      });

      passedData.push(passed);
      failedData.push(failed);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Passed',
          data: passedData,
          backgroundColor: '#4CAF50',
        },
        {
          label: 'Failed',
          data: failedData,
          backgroundColor: '#FF6347',
        }
      ]
    };
  };

  const showMessage = (msg, isSuccess) => {
    setMessage({ text: msg, type: isSuccess ? 'success' : 'error' });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      showMessage('Please upload a valid CSV file', false);
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGradeChange = (subject, value) => {
    setFormData(prev => ({
      ...prev,
      grades: { ...prev.grades, [subject]: value }
    }));
  };

  return (
    <div className="admin-home-container1">
      <h1>Department of Computer Science</h1>

      {message && (
        <div className={`toast-message ${message.type}`}>
          <span className="toast-icon">{message.type === 'success' ? '✅' : '❌'}</span>
          <span className="toast-text">{message.text}</span>
          <button className="toast-close" onClick={() => setMessage(null)}>×</button>
        </div>
      )}

      <div className="student-form">
        <div className="student-form1">
          <h3>Upload Students via CSV</h3>
          <label htmlFor="csvFile" className="upload-btn">
            {selectedFile ? selectedFile.name : 'Choose CSV File'}
          </label>
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden-file"
          />
          <button
            type="button"
            className="upload-confirm-btn"
            onClick={() => handleCSVUpload(selectedFile)}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload CSV'}
          </button>

          <div className="csv-templates">
            <h4>Download Semester-wise CSV Templates</h4>
            <div className="template-buttons">
              {[...Array(8)].map((_, i) => {
                const sem = i + 1;
                return (
                  <button 
                    type="button" 
                    key={sem} 
                    onClick={() => downloadTemplate(sem)}
                    className="template-btn"
                  >
                    Semester {sem}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleAddStudent} className="student-form2">
          <input 
            type="text" 
            name="name"
            placeholder="Student Name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="rollNo"
            placeholder="Roll Number" 
            value={formData.rollNo} 
            onChange={handleInputChange} 
            required 
          />
          <select 
            name="semester"
            value={formData.semester} 
            onChange={(e) => {
              handleInputChange(e);
              setFormData(prev => ({ ...prev, grades: {} }));
            }} 
            required
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
            ))}
          </select>
          <select 
            name="session"
            value={formData.session} 
            onChange={handleInputChange} 
            required
          >
            <option value="">Select Session</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
          
          {formData.semester && subjects[formData.semester]?.map((sub) => (
            <select 
              key={sub} 
              value={formData.grades[sub] || ''} 
              onChange={(e) => handleGradeChange(sub, e.target.value)} 
              required
            >
              <option value="">{sub} Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          ))}
          
          <button type="submit" disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>

      <div className="session-selector-container">
        <h3>Filter by Session</h3>
        <select 
          value={filterSession} 
          onChange={(e) => setFilterSession(e.target.value)}
          className="session-select"
        >
          <option value="">-- Select Session --</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>
        {filterSession && (
          <p className="current-session">Currently viewing: {filterSession}</p>
        )}
      </div>

      <div className="student-list1">
        <h2>Semester-wise Students</h2>
        <div className="semester-buttons">
          {[...Array(8)].map((_, i) => {
            const sem = i + 1;
            return (
              <button 
                key={sem} 
                onClick={() => { 
                  setVisibleSemester(sem); 
                  fetchStudentsBySemester(sem); 
                }}
                className={visibleSemester === sem ? 'active' : ''}
              >
                Semester {sem}
              </button>
            );
          })}
        </div>
      </div>

      {visibleSemester && (
        <div className="semester-container">
          <h3>Semester {visibleSemester} - Session: {filterSession || 'All'}</h3>
          <div className="semester-content">
            <div className="student-list-container">
              <div className="scrollable-list">
                <h4>Student List</h4>
                {semesterWiseStudents[visibleSemester]?.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semesterWiseStudents[visibleSemester]?.map((s) => {
                        const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
                        return (
                          <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.rollNo}</td>
                            <td className={isPass ? 'pass' : 'fail'}>
                              {isPass ? 'Pass' : 'Fail'}
                            </td>
                            <td>
                              <button 
                                onClick={() => handleDeleteStudent(s.id, visibleSemester)}
                                className="delete-btn"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-data">No students found for this semester and session.</p>
                )}
              </div>
            </div>
            
            <div className="graph-container">
              <h4>Semester Performance</h4>
              <div className="chart-wrapper">
                <Doughnut 
                  data={prepareChartData(semesterWiseStudents[visibleSemester])} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Annual Performance Graph - Added at the very bottom */}
      <div className="annual-graph-container">
        <h2>Annual Performance Summary</h2>
        <div className="chart-wrapper">
          <Bar
            data={prepareAnnualChartData()}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Year-wise Performance Comparison',
                },
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComputerScience;