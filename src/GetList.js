// src/components/UserAccountDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './GetList.css'; // Import CSS file for styling

const UserAccountDetailsPage = ({ userId }) => {
  const [userAccountDetails, setUserAccountDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  //const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserAccountDetails = async () => {
      try {
        // Adjust the API call to use the userId if needed
        const response = await axios.get(`http://localhost:9095/bank-accounts/user/171`);
        setUserAccountDetails(response.data);
      } catch (error) {
        setError('Failed to fetch user account details.');
        console.error('Error fetching user account details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccountDetails();
  }, [userId]);

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-account-details-container">
      <h1>User Account Details</h1>
      {userAccountDetails && (
        <div>
          <h2>User Info</h2>
          <p><strong>Email:</strong> {userAccountDetails.user.email}</p>

          <h2>Bank Accounts</h2>
          <ul>
            {userAccountDetails.accounts.map(account => (
              <li key={account.id}>
                <p><strong>Bank Name:</strong> {account.bankName}</p>
                <p><strong>Account Number:</strong> {account.accountNumber}</p>
                <p><strong>Transaction Limit:</strong> {account.transactionLimit}</p>
                <p><strong>Balance:</strong> {account.balance}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAccountDetailsPage;
