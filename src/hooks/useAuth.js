// src/hooks/useAuth

import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName') || '');

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
      setIsAuthenticated(false);
      setUserName('');
    }
  }, []);

  const login = (token, name) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    localStorage.setItem('userName', name);
    setUserName(name);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    localStorage.removeItem('userName');
    setUserName('');

    delete axios.defaults.headers.common['Authorization'];

    window.location.reload();
  };

  return { isAuthenticated, userName, login, logout };
};

export default useAuth;

