import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LatestBalance.css'; // Import CSS file for styling

const LatestBalancePage = ({ accountId }) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:9095/bank-accounts/balance/174`);
        setBalance(response.data);
      } catch (error) {
        setError('Failed to fetch account balance.');
        console.error('Error fetching account balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [accountId]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="latest-balance-container">
      <h1>Latest Account Balance</h1>
      {balance !== null ? (
        <p><strong>Balance:</strong> ${balance.toFixed(2)}</p>
      ) : (
        <p>No balance available.</p>
      )}
    </div>
  );
};

export default LatestBalancePage;
