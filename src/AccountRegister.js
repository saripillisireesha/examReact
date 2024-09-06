import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './AccountRegister.css';

const AccountRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the selected bank from the location state
    const selectedBank = location.state?.bank || '';

    const [accountData, setAccountData] = useState({
        bankName: selectedBank,
        accountNumber: '',
        upiPin: '',
        transactionLimit: '',
        userId: '', // Added userId to the state
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedBank) {
            setAccountData(prevData => ({ ...prevData, bankName: selectedBank }));
        }
    }, [selectedBank]);

    const handleChange = (e) => {
        setAccountData({
            ...accountData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create account by making a POST request
            const response = await axios.post('http://localhost:9095/bank-accounts/170', accountData);
            setMessage('Account created successfully!');
            console.log(response.data);
            setTimeout(() => {
                navigate('/transaction');
            }, 2000);
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            setMessage(`Error creating account: ${err.response?.data?.message || err.message}`);
        }
    };
    const handleLists = () => {
      // Navigate to HomePage
      navigate('/getList');
    };
    const handleBalance = () => {
      // Navigate to HomePage
      navigate('/balance');
    };
    return (
        <div className="account-register-container">
            <h2 className="account-register-heading">Register New Account</h2>
            <form onSubmit={handleSubmit} className="account-register-form">
                <label className="form-label">
                    Bank:
                    <select
                        name="bankName"
                        value={accountData.bankName}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="HDFC">HDFC</option>
                        <option value="ANDHRA Bank">ANDHRA Bank</option>
                        <option value="ICICI">ICICI</option>
                    </select>
                </label>
                <label className="form-label">
                    Account Number:
                    <input
                        type="text"
                        name="accountNumber"
                        value={accountData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        required
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    UPI PIN:
                    <input
                        type="password"
                        name="upiPin"
                        value={accountData.upiPin}
                        onChange={handleChange}
                        placeholder="Enter 4-digit UPI PIN"
                        required
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    Transaction Limit:
                    <input
                        type="number"
                        name="transactionLimit"
                        value={accountData.transactionLimit}
                        onChange={handleChange}
                        placeholder="Enter transaction limit"
                        required
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    User ID:
                    <input
                        type="text"
                        name="userId"
                        value={accountData.userId}
                        onChange={handleChange}
                        placeholder="Enter user ID"
                        required
                        className="form-input"
                    />
                </label>
                <button type="submit" className="submit-button">Save</button>
                {message && <p className="message">{message}</p>}
            </form>
<div>
<button onClick={handleLists} className="home-button">Bank Details</button>
<button onClick={handleBalance} className="home-button">Bank Details</button>


</div>
        </div>
    );
};

export default AccountRegister;
