import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change this when JWT is integrated

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear stored JWT
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>University Marketplace</div>
      <ul className="nav-links">
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>

          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
