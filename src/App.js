// src/App.js

import React from 'react';

// Routes
import AppRoutes from './routes/AppRoutes';

// Components
import StatusBar from './components/auth/StatusBar';
import ScrollToTopButton from './components/scrollToTopButton/ScrollToTopButton';
import Alert from './components/alert/Alert';

function App() {

  return (
    <>
      <header>
        <StatusBar />
        <Alert />
      </header>
      <main>
        <AppRoutes />
        <ScrollToTopButton />
      </main>
    </>
  );
}

export default App;

