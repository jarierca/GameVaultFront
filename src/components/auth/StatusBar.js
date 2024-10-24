import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchGames from '../search/SearchGames';
import Icon from '../icon/Icon';
import './StatusBar.css';

const StatusBar = ({ toggleTheme, isDarkMode }) => {
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
        <div className="statusbar-logo">
          <Link to="/home">GameVault</Link>
        </div>
        <ul className="statusbar-links">
          <li><Link to="/platforms" className="btn-link">Platforms</Link></li>
          <li><Link to="/developers" className="btn-link">Developers</Link></li>
          <li><Link to="/publishers" className="btn-link">Publishers</Link></li>
          <li><Link to="/genres" className="btn-link">Genres</Link></li>
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
              <li><Link to="/my-collection" className="btn-link">My Collection</Link></li>
              <li>
                <span className="dropdown">
                  <span 
                    onClick={toggleMenu} 
                    className="btn-link"
                    ref={toggleButtonRef}
                  >
                    <Icon iconName="AccountDetailIcon" />
                  </span>
                  {showMenu && (
                    <div className="dropdown-menu" ref={menuRef}>
                      <ul>
                        <li className="username">{userName}</li>
                        <li className="dropdown-divider"></li>
                        <li><Link to="/accountDetail">Account Details</Link></li>
                        <li className="logout" onClick={handleLogout}>Sign Out</li>
                      </ul>
                    </div>
                  )}
                </span>
              </li>
              <li>
                <span onClick={toggleTheme} className="btn-link toggle-theme-button">
                  <Icon iconName={isDarkMode ? "SunIcon" : "MoonIcon"} />
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="statusbar-auth">
            <a onClick={toggleTheme} className="toggle-theme-button">
              <Icon iconName={isDarkMode ? "SunIcon" : "MoonIcon"} />
            </a>
            <Link to="/login" className="btn-link login-button">Login</Link>
            <Link to="/register" className="btn-link register-button">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StatusBar;
