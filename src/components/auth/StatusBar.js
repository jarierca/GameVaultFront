// src/components/auth/StatusBar.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchGames from '../util/search/SearchGames'
import './StatusBar.css';

const StatusBar = () => {
  const { isAuthenticated, userName, logout } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
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
            <div className="dropdown"
            onMouseEnter={() => setShowMenu(true)} 
            onMouseLeave={() => setShowMenu(false)}>
              <button 
                onClick={() => handleNavigate('/accountDetail')} 
                className="button-accountDetail">
                  <svg className="svg-accountDetail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#ffffff" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                  </svg>
                </button>                 
                {showMenu && (
                    <div className="dropdown-menu">
                      <ul>                        
                        <li>{userName}</li>
                        <li onClick={() => handleNavigate('/accountDetail')}>Account Details</li>
                        <li onClick={handleLogout}>Sign Out</li>
                      </ul>
                    </div>
                  )}                
            </div>
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

