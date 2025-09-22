import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Sell from './pages/Sell/Sell';
import Roommates from './pages/Roommates/Roommates';
import Posts from './pages/Posts/Posts';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';


// You can rename this from "Home" to something like "LandingPage"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

 return (
  <div style={{ padding: '2rem' }}>
    <div className="title">
      <h1>Welcome to University Marketplace</h1>
    </div>

    <div className="card-container">
      <div className="card-single" onClick={() => navigate('/sell')}>
        <h3>Sell Used Items</h3>
        <p>Post your used books, gadgets, or furniture for sale.</p>
      </div>

      <div className="card-single" onClick={() => navigate('/roommates')}>
        <h3>Looking for Roommates</h3>
        <p>Find roommates near your university with similar interests.</p>
      </div>

      <div className="card-single" onClick={() => navigate('/posts')}>
        <h3>See Posted Items & Rooms</h3>
        <p>Explore listings shared by other students in your campus.</p>
      </div>
    </div>
  </div>
);
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
