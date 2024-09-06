// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import CSS for styling

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    // Logic to check if the user is registered
    // For this example, we'll always allow navigation
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1>Welcome to This Website</h1>
        <div className="button-container">
          <button className="home-button" onClick={handleRegisterClick}>
            Register
          </button>
          <button className="home-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
