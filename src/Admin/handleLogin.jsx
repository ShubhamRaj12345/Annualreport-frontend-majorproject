import axios from 'axios';

const handleLogin = (e) => {
  e.preventDefault();

  axios.post('http://localhost:7070/api/login', {
    username: username,
    password: password
  })
  .then(response => {
    alert('Login Successful!');
    // Handle successful login logic
  })
  .catch(error => {
    setError(error.response.data || 'Error: Unable to login');
  });
};
