import './App.css';
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigationbar from './components/navbar/navbar'; 
import HomePage from './pages/homepage/HomePage';
import Tickets from './pages/tickets/Tickets';
import AddMatch from './pages/addMatch/AddMatch';
import AddStadium from './pages/addStadium/AddStadium';
import LoginPage from './pages/loginpage/LogInPage';
import SignUpPage from './pages/signuppage/SignUpPage';
import ManageUsersPage from './pages/manageuserspage/ManageUsersPage';
import EditAccountPage from './pages/editaccountpage/EditAccountPage';
import MatchPage from './pages/matchpage/MatchPage';

function App() {
  return (
    <Router>
    <div className="App">
      <Navigationbar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/edit_account" element={<EditAccountPage />} />
            <Route path="/match/:id" element={<MatchPage />} />
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/manage_users" element={<ManageUsersPage />} />
            <Route path="/addMatch" element={<AddMatch />} />
            <Route path='/addStadium' element={<AddStadium />} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
