// src/App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Logout from './components/auth/Logout';

// Pages
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import HomePage from './pages/home/HomePage';

// Hooks
import useAuth from './hooks/useAuth';

function App() {
  const isAuthenticated = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  return (
    <div>
      <Routes>
        <Route path="/login" element={isAuthenticated.isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated.isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;

