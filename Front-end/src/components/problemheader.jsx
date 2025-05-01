import React from "react";
import { Link } from "react-router-dom";
import './header.css';
import { useAuth } from "../contexts/AuthContext";

const HeaderProblem = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="header-container">
      <div className="header-content">
        {/* Logo or Brand Name - Left side */}
        <div className="brand-name">
          <Link to="/" className="brand-link">CodeQuest</Link>
        </div>
        
        {/* Empty space in between */}
        <div className="spacer"></div>
        
        {/* Login/Logout Section - Right side */}
        {user ? (
          <div className="auth-buttons">
            <div className="login-button">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <div className="login-button">
              <Link to="/login" className="login-link">Login</Link>
            </div>
            <div className="register-button">
              <Link to="/signup" className="register-link">Register</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderProblem