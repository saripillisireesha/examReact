import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    pin: '',
  });
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post("http://localhost:9095/users/login", formData);
      console.log(response.data);

      // Redirect based on successful login
       navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login Form</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="form-label">
            Mobile Number:
            <input
              type="number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Pin:
            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter your pin"
              required
              className="form-input"
            />
          </label>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
