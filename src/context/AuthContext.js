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
  const [logoutTimer, setLogoutTimer] = useState(null); 

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

          const expirationTime = decodedToken.exp * 1000;
          const remainingTime = expirationTime - Date.now();

          const timer = setTimeout(() => {
            showMessage('Session has expired.', -1, 3000);
            logout();
          }, remainingTime);

          setLogoutTimer(timer);
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

    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, []);

  const login = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setUserName(decodedToken.upn);
    setPlayerId(decodedToken.sub);

    const expirationTime = decodedToken.exp * 1000;
    const remainingTime = expirationTime - Date.now();

    const refreshTime = remainingTime - (60 * 1000);
    const refreshTimer = setTimeout(() => {
      refreshAccessToken();
    }, refreshTime);

    const timer = setTimeout(() => {
      showMessage('Session has expired.', -1, 3000);
      logout();
    }, remainingTime);

    setLogoutTimer(timer);

    showMessage('Successfully logged in.', 1, 3000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserName('');
    setPlayerId('');
    setLoading(false);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    showMessage('Successfully logout.', 0, 3000);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post('/auth/refresh', null, {
        headers: {
            'Refresh-Token': refreshToken,
        },
      });

      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const decodedToken = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const remainingTime = expirationTime - Date.now();

        const refreshTime = remainingTime - (60 * 1000);
        const refreshTimer = setTimeout(() => {
          refreshAccessToken();
        }, refreshTime);

        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }

        setLogoutTimer(refreshTimer);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userName, playerId, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

