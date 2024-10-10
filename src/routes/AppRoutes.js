// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context
import { useAuth } from '../context/AuthContext';

// Components
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Logout from '../components/auth/Logout';
import OtpValidator from '../components/auth/otp/OtpValidator';
import NotFoundPage from '../components/routes/NotFoundPage'; 

// Pages
import LoginPage from '../pages/auth/login/LoginPage';
import RegisterPage from '../pages/auth/register/RegisterPage';
import ActivateOtpPage from '../pages/auth/otp/ActivateOtpPage';
import HomePage from '../pages/home/HomePage';
import PlatformPage from '../pages/platform/PlatformPage';
import DeveloperPage from '../pages/developer/DeveloperPage';
import PublisherPage from '../pages/publisher/PublisherPage';
import GenrePage from '../pages/genre/GenrePage';
import VideogamePage from '../pages/videogame/VideogamePage';
import VideogameDetail from '../pages/videogame/VideogameDetailPage';
import SearchResultsVideogamePage from '../pages/videogame/SearchResultsVideogamePage';
import MyCollection from '../pages/collection/MyCollection';
import AccountDetail from '../pages/accountDetail/AccountDetail';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />} />
      <Route path="/activate-otp" element={<ActivateOtpPage />} />
      <Route path="/login-otp" element={<OtpValidator />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      
      <Route path="/videogames/:id" element={<VideogameDetail />} />
      <Route path="/videogames/platform/:platformId" element={<VideogamePage />} />
      <Route path="/videogames/developer/:developerId" element={<VideogamePage />} />
      <Route path="/videogames/publisher/:publisherId" element={<VideogamePage />} />
      <Route path="/videogames/genre/:genreId" element={<VideogamePage />} />
      <Route path="/videogames/search/:querySearch" element={<SearchResultsVideogamePage />} />
      
      <Route path="/platforms" element={<PlatformPage />} />
      <Route path="/developers" element={<DeveloperPage />} />
      <Route path="/publishers" element={<PublisherPage />} />
      <Route path="/genres" element={<GenrePage />} />
      

      {/* COLLECTIONS*/}
      <Route path="/my-collection/:collectionName/:gameInfo" element={<ProtectedRoute element={<MyCollection />} />} />
      <Route path="/my-collection/:collectionName" element={<ProtectedRoute element={<MyCollection />} />} />
      <Route path="/my-collection" element={<ProtectedRoute element={<MyCollection />} />} />

      <Route path="/accountDetail" element={<ProtectedRoute element={<AccountDetail />} />} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

