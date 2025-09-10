

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Doughnut, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// } from 'chart.js';
// import './style.css';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// );

// const Academics = () => {
//   const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
//   const [filterSession, setFilterSession] = useState('');
//   const [selectedDept, setSelectedDept] = useState('');
//   const [visibleSemester, setVisibleSemester] = useState(null);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     if (filterSession && selectedDept) {
//       for (let i = 1; i <= 8; i++) {
//         fetchStudentsBySemester(i);
//       }
//     }
//   }, [filterSession, selectedDept]);

//   const fetchStudentsBySemester = async (sem) => {
//     if (!filterSession || !selectedDept) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:7070/students/semester/${sem}/session/${filterSession}?department=${encodeURIComponent(selectedDept)}`
//       );
//       setSemesterWiseStudents(prev => ({ ...prev, [sem]: res.data }));
//     } catch (err) {
//       console.error(`Error fetching semester ${sem}:`, err);
//       showMessage(`Failed to load semester ${sem} data`, false);
//     }
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
//       const isPass = s.subjects 
//         ? Object.values(s.subjects).every(subject => {
//             // Check if any subject has grade 'F'
//             return subject.grade !== 'F';
//           })
//         : false;
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

//   const prepareAnnualChartData = () => {
//     const years = [
//       { label: '1st Year', semesters: [1, 2] },
//       { label: '2nd Year', semesters: [3, 4] },
//       { label: '3rd Year', semesters: [5, 6] },
//       { label: '4th Year', semesters: [7, 8] }
//     ];

//     const labels = years.map(year => year.label);
//     const passedData = [];
//     const failedData = [];

//     years.forEach(year => {
//       let passed = 0;
//       let failed = 0;

//       year.semesters.forEach(sem => {
//         const students = semesterWiseStudents[sem] || [];
//         students.forEach(s => {
//           const isPass = s.subjects 
//             ? Object.values(s.subjects).every(subject => {
//                 return subject.grade !== 'F';
//               })
//             : false;
//           isPass ? passed++ : failed++;
//         });
//       });

//       passedData.push(passed);
//       failedData.push(failed);
//     });

//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Passed',
//           data: passedData,
//           backgroundColor: '#4CAF50',
//         },
//         {
//           label: 'Failed',
//           data: failedData,
//           backgroundColor: '#FF6347',
//         }
//       ]
//     };
//   };

//   const showMessage = (msg, isSuccess) => {
//     setMessage({ text: msg, type: isSuccess ? 'success' : 'error' });
//     setTimeout(() => setMessage(null), 5000);
//   };

//   return (
//     <div className="academics-container">
//       <h1>Academics Department</h1>

//       <div className="filter-container">
//         <div className="dropdown-wrapper">
//           <h3>Choose Department</h3>
//           <select
//             value={selectedDept}
//             onChange={(e) => setSelectedDept(e.target.value)}
//             className="dropdown-select"
//           >
//             <option value="">-- Select Department --</option>
//             <option value="Computer Science">Computer Science</option>
//             <option value="Mechanical">Mechanical</option>
//             <option value="Electrical">Electrical</option>
//             <option value="Civil">Civil</option>
//           </select>
//         </div>

//         <div className="dropdown-wrapper">
//           <h3>Filter by Session</h3>
//           <select
//             value={filterSession}
//             onChange={(e) => setFilterSession(e.target.value)}
//             className="dropdown-select"
//           >
//             <option value="">-- Select Session --</option>
//             <option value="2022-2023">2022-2023</option>
//             <option value="2023-2024">2023-2024</option>
//             <option value="2024-2025">2024-2025</option>
//             <option value="2025-2026">2025-2026</option>
//           </select>
//         </div>
//       </div>

//       {filterSession && selectedDept && (
//         <p className="current-session">
//           Currently viewing: <strong>{selectedDept}</strong> | <strong>{filterSession}</strong>
//         </p>
//       )}

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
//           <h3>Semester {visibleSemester} - Session: {filterSession} | Dept: {selectedDept}</h3>
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
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {semesterWiseStudents[visibleSemester]?.map((s) => {
//                         const isPass = s.subjects 
//                           ? Object.values(s.subjects).every(subject => {
//                               return subject.grade !== 'F';
//                             })
//                           : false;
//                         return (
//                           <tr key={s.id}>
//                             <td>{s.name}</td>
//                             <td>{s.rollNo}</td>
//                             <td className={isPass ? 'pass' : 'fail'}>
//                               {isPass ? 'Pass' : 'Fail'}
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

//       {filterSession && selectedDept && (
//         <div className="annual-performance">
//           <h2>Annual Performance Overview</h2>
//           <div className="bar-chart-wrapper">
//             <Bar
//               data={prepareAnnualChartData()}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: { position: 'top' },
//                   title: { display: true, text: 'Annual Pass/Fail Statistics' },
//                 },
//                 scales: {
//                   y: { beginAtZero: true }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Academics;



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
import './style.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Academics = () => {
  const [semesterWiseStudents, setSemesterWiseStudents] = useState({});
  const [filterSession, setFilterSession] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [visibleSemester, setVisibleSemester] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [toppers, setToppers] = useState([]);
  const [slowLearners, setSlowLearners] = useState([]);

  useEffect(() => {
    if (filterSession && selectedDept) {
      for (let i = 1; i <= 8; i++) {
        fetchStudentsBySemester(i);
      }
    }
  }, [filterSession, selectedDept]);

  const fetchStudentsBySemester = async (sem) => {
    if (!filterSession || !selectedDept) return;
    try {
      const res = await axios.get(
        `http://localhost:7070/students/semester/${sem}/session/${filterSession}?department=${encodeURIComponent(selectedDept)}`
      );
      setSemesterWiseStudents(prev => ({ ...prev, [sem]: res.data }));
    } catch (err) {
      console.error(`Error fetching semester ${sem}:`, err);
      showMessage(`Failed to load semester ${sem} data`, false);
    }
  };

  const calculateStudentPercentage = (student) => {
    if (!student.subjects) return 0;
    
    let totalMarks = 0;
    let maxMarks = 0;
    
    Object.values(student.subjects).forEach(subject => {
      const subjectTotal = (subject.mid1 || 0) + (subject.mid2 || 0) + (subject.training || 0) + (subject.final || 0);
      totalMarks += subjectTotal;
      maxMarks += 100; // Each subject has max 100 marks
    });
    
    return maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
  };

  const analyzePerformance = () => {
    if (!filterSession || !selectedDept) {
      showMessage('Please select both department and session first', false);
      return;
    }

    // Get all students from the selected session and department
    const allStudents = [];
    for (let sem = 1; sem <= 8; sem++) {
      if (semesterWiseStudents[sem]) {
        allStudents.push(...semesterWiseStudents[sem]);
      }
    }

    if (allStudents.length === 0) {
      showMessage('No students found for the selected criteria', false);
      return;
    }

    // Calculate percentage and pass status for each student
    const studentsWithPerformance = allStudents.map(student => {
      let totalMarks = 0;
      let maxMarks = 0;
      let isFail = false;
      
      if (student.subjects) {
        Object.values(student.subjects).forEach(subject => {
          const subjectTotal = (subject.mid1 || 0) + (subject.mid2 || 0) + (subject.training || 0) + (subject.final || 0);
          totalMarks += subjectTotal;
          maxMarks += 100; // Each subject has max 100 marks
          
          // Check if student failed in any subject (less than 40%)
          if (subjectTotal < 40) {
            isFail = true;
          }
        });
      }
      
      const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
      
      return {
        ...student,
        percentage,
        isFail
      };
    });

    // Sort by percentage (descending) for toppers
    const sortedByPercentage = [...studentsWithPerformance].sort((a, b) => b.percentage - a.percentage);
    
    // Get top 5 toppers (regardless of pass/fail status)
    const top5 = sortedByPercentage.slice(0, 5);
    
    // Get failed students and sort them by percentage (ascending)
    const failedStudents = studentsWithPerformance.filter(student => student.isFail);
    const sortedFailedStudents = [...failedStudents].sort((a, b) => a.percentage - b.percentage);
    
    // Get last 5 failed students (lowest percentages)
    const last5Failed = sortedFailedStudents.slice(-5);

    setToppers(top5);
    setSlowLearners(last5Failed);
    setShowPerformanceModal(true);
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
      const isPass = s.subjects 
        ? Object.values(s.subjects).every(subject => {
            // Check if any subject has grade 'F'
            return subject.grade !== 'F';
          })
        : false;
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
          const isPass = s.subjects 
            ? Object.values(s.subjects).every(subject => {
                return subject.grade !== 'F';
              })
            : false;
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

  return (
    <div className="academics-container">
      <h1>Academics Department</h1>

      {/* Performance Analysis Button */}
      <div className="performance-button-container">
        <button 
          className="performance-btn"
          onClick={analyzePerformance}
        >
          <i className="fas fa-chart-line"></i> View Top Performers & Slow Learners
        </button>
      </div>

      <div className="filter-container">
        <div className="dropdown-wrapper">
          <h3>Choose Department</h3>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="dropdown-select"
          >
            <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        <div className="dropdown-wrapper">
          <h3>Filter by Session</h3>
          <select
            value={filterSession}
            onChange={(e) => setFilterSession(e.target.value)}
            className="dropdown-select"
          >
            <option value="">-- Select Session --</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
        </div>
      </div>

      {filterSession && selectedDept && (
        <p className="current-session">
          Currently viewing: <strong>{selectedDept}</strong> | <strong>{filterSession}</strong>
        </p>
      )}

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
          <h3>Semester {visibleSemester} - Session: {filterSession} | Dept: {selectedDept}</h3>
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
                      </tr>
                    </thead>
                    <tbody>
                      {semesterWiseStudents[visibleSemester]?.map((s) => {
                        const isPass = s.subjects 
                          ? Object.values(s.subjects).every(subject => {
                              return subject.grade !== 'F';
                            })
                          : false;
                        return (
                          <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.rollNo}</td>
                            <td className={isPass ? 'pass' : 'fail'}>
                              {isPass ? 'Pass' : 'Fail'}
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

      {filterSession && selectedDept && (
        <div className="annual-performance">
          <h2>Annual Performance Overview</h2>
          <div className="bar-chart-wrapper">
            <Bar
              data={prepareAnnualChartData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Annual Pass/Fail Statistics' },
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {showPerformanceModal && (
        <div className="modal-overlay" onClick={() => setShowPerformanceModal(false)}>
          <div className="performance-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Performance Analysis - {selectedDept} | {filterSession}</h2>
              <button className="close-btn" onClick={() => setShowPerformanceModal(false)}>
                &times;
              </button>
            </div>
            
            <div className="performance-content">
              <div className="toppers-section">
                <h3>Top 5 Performers</h3>
                {toppers.length > 0 ? (
                  <table className="performance-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Semester</th>
                        <th>Percentage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toppers.map((student, index) => (
                        <tr key={student.id} className="topper-row">
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.rollNo}</td>
                          <td>Semester {student.semester}</td>
                          <td className="percentage">{student.percentage.toFixed(2)}%</td>
                          <td className={student.isFail ? "fail-status" : "pass-status"}>
                            {student.isFail ? "Fail" : "Pass"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No data available</p>
                )}
              </div>
              
              <div className="slow-learners-section">
                <h3>Students Needing Attention (Failed)</h3>
                {slowLearners.length > 0 ? (
                  <table className="performance-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Semester</th>
                        <th>Percentage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slowLearners.map((student, index) => (
                        <tr key={student.id} className="slow-learner-row">
                          <td>{student.name}</td>
                          <td>{student.rollNo}</td>
                          <td>Semester {student.semester}</td>
                          <td className="percentage">{student.percentage.toFixed(2)}%</td>
                          <td className="fail-status">Fail</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No failed students found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Academics;







