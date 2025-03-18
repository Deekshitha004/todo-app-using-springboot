import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../components/AuthContext";
import './Header.css';
import logo from '../assets/logo.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // ✅ Corrected usage

  console.log(authContext?.number); // Use optional chaining to prevent errors
  const  isAuthenticated = authContext?.isAuthenticated;

  const handleLogout = () => {
    try {
      navigate('/logout'); 
      authContext.logout();// Example logout navigation
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="header">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li>
            {isAuthenticated && <NavLink to="/contact" className="nav-link">Contact</NavLink>}</li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
          <li><NavLink to="/logout" className="logout-button" onClick={handleLogout}>Logout</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
