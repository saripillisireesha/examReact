import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Import the CSS file

const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pin: '',
    mobileNumber: ''
  });
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState(null); // State for response data
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9095/users", registerUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle the response data
      console.log('Response data:', response.data);
      setResponseData(response.data);
      setMessage('Registration successful!');
      
      // Redirect to login page or another page
      navigate('/login');
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        const errorMessage = data?.message || err.response.statusText;
        setMessage(`Registration failed. Status: ${status}. Message: ${errorMessage}`);
      } else if (err.request) {
        setMessage('Registration failed. No response from the server.');
      } else {
        setMessage(`Registration failed. Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Register Form</h1>
      <form onSubmit={handleRegister} className="register-form">
        <label className="form-label">
          First Name:
          <input
            type="text"
            value={registerUser.firstName}
            onChange={(e) => setRegisterUser({ ...registerUser, firstName: e.target.value })}
            placeholder="Enter first name"
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Last Name:
          <input
            type="text"
            value={registerUser.lastName}
            onChange={(e) => setRegisterUser({ ...registerUser, lastName: e.target.value })}
            placeholder="Enter last name"
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            value={registerUser.email}
            onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
            placeholder="Enter email"
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Pin:
          <input
            type="password"
            value={registerUser.pin}
            onChange={(e) => setRegisterUser({ ...registerUser, pin: e.target.value })}
            placeholder="Enter pin number"
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Mobile Number:
          <input
            type="text"
            value={registerUser.mobileNumber}
            onChange={(e) => setRegisterUser({ ...registerUser, mobileNumber: e.target.value })}
            placeholder="Enter mobile number"
            required
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">Register</button>
      </form>
      {message && <p className={`message ${message.includes('failed') ? 'error' : 'success'}`}>{message}</p>}
      {responseData && (
        <div className="response-data">
          <h2>Response Data</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Register;
