// src/App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import StatusBar from './components/auth/StatusBar';
import Logout from './components/auth/Logout';

// Pages
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import HomePage from './pages/home/HomePage';
import PlatformPage from './pages/platform/PlatformPage';
import VideogamePage from './pages/videogame/VideogamePage';
import VideogameDetail from './pages/videogame/VideogameDetailPage';

// Hooks
import useAuth from './hooks/useAuth';

function App() {
  const isAuthenticated = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  return (
    <div>
      <header>
        <StatusBar />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={isAuthenticated.isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated.isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />} />
          <Route path="/home" element={<HomePage />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/platforms" element={<PlatformPage />}/>
          <Route path="/videogames/platform/:platformId" element={<VideogamePage />} />
          <Route path="/videogames/:id" element={<VideogameDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

