// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import AccountRegister from './AccountRegister';
import Transaction from './Transaction';
import GetList from './GetList';
import LatestBalancePage from './LastBalancePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/getList" element={<GetList />} />
        <Route path="/balance" element={<LatestBalancePage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account-register" element={<AccountRegister />} />



      </Routes>
    </Router>
  );
}
export default App;
