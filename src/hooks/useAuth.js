// src/hooks/useAuth

import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(!!token);
      setUserName(localStorage.getItem('userName') || '');

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
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);

    localStorage.removeItem('userName');
    setUserName('');

    window.location.reload();
  };

  return { isAuthenticated, userName, login, logout };
};

export default useAuth;

