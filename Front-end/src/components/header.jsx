import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import './header.css'; // Importing the external CSS file
import Avatar from '@mui/material/Avatar';
const Header = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  let { isLoggedIn } = useAuth();

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className="header-container">
      <div className="header-content">
        {/* Logo or Brand Name */}
        <div className="brand-name">
          <Link to="/" className="brand-link">CodeQuest</Link>
        </div>

        {/* Burger Menu for Mobile */}
        <button className="burger-menu" onClick={toggleMobileNav}>
          ☰
        </button>

        {/* Navigation Links for Larger Screens */}
        <div className="desktop-nav">
          <div className="nav-item">
            <Link to="/Practice" className="nav-link">Practice</Link>
          </div>
          <div className="nav-item">
            <Link to="/map" className="nav-link">Map</Link>
          </div>
          <div className="nav-item">
            <Link to="/contact-us" className="nav-link">Contact Us</Link>
          </div>
          <div className="nav-item">
            <Link to="/about-us" className="nav-link">About Us</Link>
          </div>
        </div>

        {/* Login and Registration Buttons for Larger Screens */}
        {isLoggedIn ? <div className="auth-buttons">
          <div className="profile-button">
          <Link to="/user/dashboard" className="profile-link">
      <Avatar
        alt="User Profile"
        // src="https://icons8.com/icon/z-JBA_KtSkxG/test-account"
      
      />
    </Link>
          </div>
          <div className="login-button">
            <Link to="/logout" className="login-link">Logout</Link>
          </div>
        </div>
          : <div className="auth-buttons">
            <div className="login-button">
              <Link to="/login" className="login-link">Login</Link>
            </div>
            <div className="register-button">
              <Link to="/signup" className="register-link">Register</Link>
            </div>
          </div>}
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileNavVisible ? "show" : ""}`}>
        <Link to="/Practice" className="nav-link" onClick={toggleMobileNav}>Practice</Link>
        <Link to="/map" className="nav-link" onClick={toggleMobileNav}>Map</Link>
        <Link to="/contact-us" className="nav-link" onClick={toggleMobileNav}>Contact Us</Link>
        <Link to="/about-us" className="nav-link" onClick={toggleMobileNav}>About Us</Link>
        <Link to="/login" className="nav-link" onClick={toggleMobileNav}>Login</Link>
        <Link to="/register" className="nav-link" onClick={toggleMobileNav}>Register</Link>
      </div>
    </div>
  );
};

export default Header;
