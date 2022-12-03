import './App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';

function App() {
  // const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
