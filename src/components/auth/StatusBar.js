import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchGames from '../search/SearchGames';
import Icon from '../icon/Icon';
import './StatusBar.css';

const StatusBar = () => {
  const { isAuthenticated, userName, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const toggleButtonRef = useRef(null); 
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    // Hide when u navigate??
    setShowMenu(false);
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) 
          && toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)) {

        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

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
        </ul>
      </div>

      <div className="statusbar-center">
        <SearchGames onGameSelect={(game) => {
            setSelectedGame(game);
          }} showSearchButton={true} />
      </div>

      <div className="statusbar-right">
        {isAuthenticated ? (
          <div className="statusbar-auth">
            <ul className="statusbar-links">
              <li><button onClick={() => handleNavigate('/my-collection')}>My Collection</button></li>
              <li>
                <span className="dropdown">
                  <button 
                    onClick={toggleMenu} 
                    className="button-accountDetail"
                    ref={toggleButtonRef}
                  >
                    <Icon iconName="AccountDetailIcon" />
                  </button>
                  {showMenu && (
                    <div className="dropdown-menu" ref={menuRef}>
                      <ul>
                        <li className="username">{userName}</li>
                        <li className="dropdown-divider"></li>
                        <li onClick={() => handleNavigate('/accountDetail')}>Account Details</li>
                        <li className="logout" onClick={handleLogout}>Sign Out</li>
                      </ul>
                    </div>
                  )}
                </span>
              </li>
            </ul>
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
