import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Transaction.css'; // Import the CSS file for styling

const Transaction = () => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Retrieve userId from local storage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9095/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error(err);
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:9095/users/${userId}/accounts`);
        setAccounts(response.data); // Assuming response.data is an array of account objects
      } catch (err) {
        setError('Failed to fetch accounts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchAccounts();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new transaction by sending a POST request
      const response = await axios.post('http://localhost:9095/transactions', {
        userId,
        mobileNumber,
        amount,
        upiPin,
        accountId: selectedAccount, // Include accountId in the request payload
      });
      setMessage('Transaction successful!');
      console.log(response.data);
      // Navigate to another page if needed
      setTimeout(() => {
        navigate('/transaction-success');
      }, 2000);
    } catch (err) {
      setError('Transaction failed: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="transaction-container">
      <h1>Transaction</h1>
      {user && (
        <div className="user-details">
          <p><strong>User Name:</strong> {user.name}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="mobileNumber">Receiver's Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter receiver's mobile number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="selectedAccount">Select Account:</label>
          <select
            id="selectedAccount"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            required
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.accountNumber}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="upiPin">Sender's UPI PIN:</label>
          <input
            type="password"
            id="upiPin"
            value={upiPin}
            onChange={(e) => setUpiPin(e.target.value)}
            placeholder="Enter sender's UPI PIN"
            required
          />
        </div>
        <button type="submit" className="submit-button">Pay</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Transaction;
