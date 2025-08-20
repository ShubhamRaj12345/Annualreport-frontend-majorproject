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
//   const [visibleSemester, setVisibleSemester] = useState(null);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     if (filterSession) {
//       for (let i = 1; i <= 8; i++) {
//         fetchStudentsBySemester(i);
//       }
//     }
//   }, [filterSession]);

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
//           const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
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

//       {filterSession && (
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

  return (
    <div className="academics-container">
      <h1>Academics Department</h1>

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
                        const isPass = s.subjects ? !Object.values(s.subjects).includes('F') : false;
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
    </div>
  );
};

export default Academics;

