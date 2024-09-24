// src/hooks/useAuth.js

//TODO REMOVE IN THE FUTURE
// WE MUST TO CHECK IF IT'S IMPORTANT

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log('Token has expired');
          logout();
        } else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsAuthenticated(true);
          setUserName(decodedToken.upn);
          setPlayerId(decodedToken.sub);
        }
      } catch (error) {
        console.error('Invalid token:', error);
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
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserName('');
    setPlayerId('');
    setLoading(false);
    navigate('/login');
  };

  return { isAuthenticated, loading, userName, playerId, login, logout };
};

export default useAuth;


