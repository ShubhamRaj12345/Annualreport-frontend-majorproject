// // import React, { useState } from 'react';
// // import './AdminLogin.css';
// // import Header from './Header';
// // import { useNavigate } from 'react-router-dom'; // Import hook

// // const AdminLogin = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate(); // Hook for redirection

// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     fetch(`http://localhost:7070/api/login?username=${username}&password=${password}`, {
// //       method: 'POST',
// //     })
// //       .then(response => {
// //         if (response.ok) {
// //           // Redirect to admin home
// //           navigate('/admin-home1');
// //         } else {
// //           return response.text().then(text => {
// //             setError(text);
// //           });
// //         }
// //       })
// //       .catch(err => {
// //         setError('Error: ' + err.message);
// //       });
// //   };

// //   return (
// //     <div className="admin-login-container">
// //       <Header />
// //       <form onSubmit={handleLogin} className="admin-login-form">
// //         <h2 className="title">Admin Login</h2>
// //         {error && <p className="error-message">{error}</p>}
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           className="input-field"
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="input-field"
// //           required
// //         />
// //         <button type="submit" className="submit-btn">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AdminLogin;


// import React, { useState } from 'react';
// import './AdminLogin.css';
// import Header from './Header';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [role, setRole] = useState('admin');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     fetch(`http://localhost:7070/api/login?username=${username}&password=${password}&role=${role}`, {
//       method: 'POST',
//     })
//       .then(response => {
//         if (response.ok) {
//           if (role === 'admin') {
//             navigate('/admin-home1');
//           } else if (role === 'faculty') {
//             navigate('/faculty-home');
//           }
//         } else {
//           return response.text().then(text => {
//             setError(text);
//           });
//         }
//       })
//       .catch(err => {
//         setError('Error: ' + err.message);
//       });
//   };

//   return (
//     <div className="admin-login-container">
//       <Header />
//       <form onSubmit={handleLogin} className="admin-login-form">
//         <h2 className="title">Login</h2>

//         {error && <p className="error-message">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="input-field"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input-field"
//           required
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="input-field role-selector"
//         >
//           <option value="admin">Administrator Login</option>
//           <option value="faculty">Faculty Login</option>
//           <option value="studentlogin">Student Login</option>
//         </select>
        
//         <button type="submit" className="submit-btn">Login</button>

        
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;



// import React, { useState } from 'react';
// import './AdminLogin.css';
// import Header from './Header';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [role, setRole] = useState('admin');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [department, setDepartment] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const departments = [
//     'Computer Science',
//     'Electrical Engineering',
//     'Mechanical Engineering',
//     'Civil Engineering',
//   ];

//   const handleLogin = (e) => {
//     e.preventDefault();

//     let apiUrl = `http://localhost:7070/api/login?username=${username}&password=${password}&role=${role}`;
    
//     if (role === 'faculty') {
//       apiUrl += `&department=${department}`;
//     }

//     fetch(apiUrl, {
//       method: 'POST',
//     })
//       .then(response => {
//         if (response.ok) {
//           if (role === 'admin') {
//             navigate('/admin-home1');
//           } else if (role === 'faculty') {
//             navigate('/computer-science');
//           } else if (role === 'studentlogin') {
//             navigate('/student-home');
//           }
//         } else {
//           return response.text().then(text => {
//             setError(text);
//           });
//         }
//       })
//       .catch(err => {
//         setError('Error: ' + err.message);
//       });
//   };

//   return (
//     <div className="admin-login-container">
//       <Header />
//       <form onSubmit={handleLogin} className="admin-login-form">
//         <h2 className="title">Login</h2>

//         {error && <p className="error-message">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="input-field"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input-field"
//           required
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="input-field role-selector"
//         >
//           <option value="admin">Administrator Login</option>
//           <option value="faculty">Faculty Login</option>
//           <option value="studentlogin">Student Login</option>
//         </select>
        
//         {role === 'faculty' && (
//           <select
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//             className="input-field department-selector"
//             required
//           >
//             <option value="">Select Department</option>
//             {departments.map((dept, index) => (
//               <option key={index} value={dept}>{dept}</option>
//             ))}
//           </select>
//         )}
        
//         <button type="submit" className="submit-btn">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;




import React, { useState } from 'react';
import './AdminLogin.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    let apiUrl;

    if (role === 'faculty') {
      apiUrl = `http://localhost:7070/api/faculty/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}&department=${encodeURIComponent(department)}`;
    } else {
      apiUrl = `http://localhost:7070/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;
    }

    fetch(apiUrl, {
      method: 'POST',
    })
     
      .then(response => {
  if (response.ok) {
    if (role === 'admin') {
      navigate('/admin-home1');
    } else if (role === 'faculty') {
      if (department === 'Computer Science') {
        navigate('/computer-science');
      } else if (department === 'Mechanical Engineering') {
        navigate('/mechanical');
      } else if (department === 'Electrical Engineering') {
        navigate('/electrical-engineering');
      } else if (department === 'Civil Engineering') {
        navigate('/civil-engineering');
      } else {
        navigate('/faculty-home');
      }
    } else if (role === 'studentlogin') {
      navigate('/student-home');
    }
  } else {
    return response.text().then(text => {
      setError(text);
    });
  }
})

      .catch(err => {
        setError('Error: ' + err.message);
      });
  };

  return (
    <div className="admin-login-container">
      <Header />
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2 className="title">Login</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field role-selector"
        >
          <option value="admin">Administrator Login</option>
          <option value="faculty">Faculty Login</option>
          <option value="studentlogin">Student Login</option>
        </select>

        {role === 'faculty' && (
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="input-field department-selector"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        )}

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
