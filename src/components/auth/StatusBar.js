// src/components/auth/StatusBar.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchGames from '../util/search/SearchGames'
import './StatusBar.css';

const StatusBar = () => {
  const { isAuthenticated, userName, logout } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className="statusbar">
      <div className="statusbar-left">
        <div className="statusbar-logo" onClick={() => handleNavigate('/home')}>
          GameVault
        </div>
        <ul className="statusbar-links">
          <li><button onClick={() => handleNavigate('/platforms')}>Platforms</button></li>
          <li><button onClick={() => handleNavigate('/developers')}>Developers</button></li>
          <li><button onClick={() => handleNavigate('/publishers')}>Publishers</button></li>
          <li><button onClick={() => handleNavigate('/genres')}>Genres</button></li>
          <li><button onClick={() => handleNavigate('/my-collection')}>My Collection</button></li>
        </ul>
      </div>

      <div className="statusbar-center">
          <SearchGames onGameSelect={(game) => {
            setSelectedGame(game);
          }} showSearchButton={true}/>
      </div>

      <div className="statusbar-right">
        {isAuthenticated ? (
          <div className="statusbar-auth">
            <span className="user-name">Welcome, {userName}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="statusbar-auth">
            <button onClick={() => handleNavigate('/login')} className="login-button">Login</button>
            <button onClick={() => handleNavigate('/register')} className="register-button">Register</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StatusBar;

