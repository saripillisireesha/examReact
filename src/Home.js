// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import CSS file

const Home = () => {
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await axios.get('http://localhost:9095/bank-accounts/names');
                setBanks(response.data); // Assuming response.data is an array of bank names
            } catch (err) {
                setError('Failed to fetch bank list. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false); // Stop loading when done
            }
        };

        fetchBanks();
    }, []);

    const handleSelection = (event) => {
        setSelectedBank(event.target.value);
        setError(''); // Clear any previous error message
    };

    const handleProceed = () => {
        if (!selectedBank) {
            setError('Please select a bank');
            return;
        }

        // Navigate to AccountRegister and pass selected bank and userId
        navigate('/account-register', { state: { bank: selectedBank, userId: userId } });
    };

    if (loading) {
        return <p>Loading banks...</p>;
    }

    return (
        <div className="bank-selection-container">
            <h2 className="heading">Select a Bank</h2>
            {error && <p className="error-message">{error}</p>}
            {banks.length > 0 ? (
                banks.map((bank) => (
                    <div key={bank} className="bank-option">
                        <input
                            type="radio"
                            id={bank}
                            name="bank"
                            value={bank}
                            checked={selectedBank === bank}
                            onChange={handleSelection}
                            className="radio-input"
                        />
                        <label htmlFor={bank} className="radio-label">{bank}</label>
                    </div>
                ))
            ) : (
                <p>No banks available</p>
            )}
            <button onClick={handleProceed} className="proceed-button">Proceed</button>
        </div>
    );
};

export default Home;
