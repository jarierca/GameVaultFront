// src/pages/home/HomePage.js

import React from 'react';
import StatusBar from '../../components/auth/StatusBar';

function HomePage() {
  return (
    <div>
      <StatusBar />
      <h1>Welcome to Home Page</h1>
      <p>This is the home page after login.</p>
    </div>
  );
}

export default HomePage;

