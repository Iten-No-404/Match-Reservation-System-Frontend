import './App.css';
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigationbar from './components/navbar/navbar'; 
import HomePage from './pages/homepage/HomePage';
import Tickets from './pages/tickets/Tickets';
import AddMatch from './pages/addMatch/AddMatch';
import AddStadium from './pages/addStadium/AddStadium';

function App() {
  // const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
    <div className="App">
      <Navigationbar admin={false} role={''}/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/addMatch" element={<AddMatch />} />
            <Route path='/addStadium' element={<AddStadium />} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
