// src/context/AuthContext

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useAlert } from './AlertContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState(true);
  const { showMessage } = useAlert(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          showMessage('Session has expired.', -1, 3000);

          logout();
        } else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsAuthenticated(true);
          setUserName(decodedToken.upn);
          setPlayerId(decodedToken.sub);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        showMessage('Invalid session.', -1, 3000);

        logout();
      }
    } else {
      setIsAuthenticated(false);
      setUserName('');
      setPlayerId('');
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setUserName(decodedToken.upn);
    setPlayerId(decodedToken.sub);
    setLoading(false);

    showMessage('Successfully logged in.', 1, 3000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserName('');
    setPlayerId('');
    setLoading(false);

    showMessage('Successfully logout.', 0, 3000);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userName, playerId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

