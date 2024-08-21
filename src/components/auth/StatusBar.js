// src/components/auth/LoggedBar

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './StatusBar.css';

const StatusBar = () => {
  const { isAuthenticated, userName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="statusbar">
      {isAuthenticated ? (
        <div className="statusbar-content">
          <span className="user-name">Welcome, {userName}!</span>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      ) : (
        <div className="statusbar-content">
          <button onClick={handleLoginRedirect} className="login-button">Login</button>
          <button onClick={handleRegisterRedirect} className="register-button">Register</button>
        </div>
      )}
    </div>
  );
};

export default StatusBar;

