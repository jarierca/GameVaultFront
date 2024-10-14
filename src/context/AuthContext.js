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
  const [refreshTimer, setRefreshTimer] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          showMessage('Session has expired.', -1, 3000);
          handleLogout(refreshToken);

        } else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsAuthenticated(true);
          setUserName(decodedToken.upn);
          setPlayerId(decodedToken.sub);
          scheduleLogout(decodedToken.exp);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        showMessage('Invalid session.', -1, 3000);
        handleLogout(refreshToken);
      }
    } else if (refreshToken) {
      refreshAccessToken();
    } else {
      setIsAuthenticated(false);
      setUserName('');
      setPlayerId('');
    }
    setLoading(false);

    return () => {
      clearTimers();
    };
  }, []);

  const handleLogout = (refreshToken) => {
    if (refreshToken) {
      const decodedRefreshToken = jwtDecode(refreshToken);
      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken.exp < currentTime) {
        logout();
      } else {
        console.log("Refresh token is still valid, not logging out.");
      }
    } else {
      logout();
    }
  };

  const scheduleLogout = (exp) => {
    const expirationTime = exp * 1000;
    const remainingTime = expirationTime - Date.now();
    
    if (remainingTime > 0) {
      clearTimeout(logoutTimer);
      const timer = setTimeout(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const decodedRefreshToken = jwtDecode(refreshToken);
          const currentTime = Date.now() / 1000;

          if (decodedRefreshToken.exp < currentTime) {
            showMessage('Session has expired.', -1, 3000);
            handleLogout(refreshToken);
          } else {
            console.log("Refresh token is still valid, not logging out.");
          }
        } else {
          showMessage('Session has expired.', -1, 3000);
          handleLogout(refreshToken);
        }
      }, remainingTime);
    
      setLogoutTimer(timer);
      scheduleRefresh(remainingTime);
    } else {
      handleLogout(localStorage.getItem('refreshToken'));
    }
  };


  const scheduleRefresh = (remainingTime) => {
    clearTimeout(refreshTimer);
    const refreshTime = Math.max(remainingTime - (60 * 1000), 0);
    if (refreshTime > 0) {
      const newRefreshTimer = setTimeout(refreshAccessToken, refreshTime);
      setRefreshTimer(newRefreshTimer);
    }
  };

  const clearTimers = () => {
    clearTimeout(logoutTimer);
    clearTimeout(refreshTimer);
  };

  const login = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setUserName(decodedToken.upn);
    setPlayerId(decodedToken.sub);
    scheduleLogout(decodedToken.exp);

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
    clearTimers();

    showMessage('Successfully logout.', 0, 3000);
  };


//TODO Al hacer logout a mano a veces sigue apareciendo mensajes de logout, no funciona bien el autorefresh este
// Poner opcion en el login si el usuario quiere guardar su sesion para que se guarde el refresh token durante 60 dias o si no el refresh token a los 2 dias de va
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    console.log("Refreshing access token...");
    console.log(refreshToken);
    console.log("Current access token...");
    console.log(localStorage.getItem('token'));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
          token: refreshToken
      });

      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem('token', token);
        console.log("New access token...");
        console.log(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const decodedToken = jwtDecode(token);
        scheduleLogout(decodedToken.exp);
        
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      showMessage('Error refreshing session.', -1, 3000);
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

