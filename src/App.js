// src/App.js

import React, { useState, useEffect } from 'react';

// Routes
import AppRoutes from './routes/AppRoutes';

// Components
import StatusBar from './components/auth/StatusBar';
import ScrollToTopButton from './components/scrollToTopButton/ScrollToTopButton';
import Alert from './components/alert/Alert';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('dark-mode');
    return storedTheme === 'true';
  });

  
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('dark-mode', newMode);
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <span className={isDarkMode ? 'app dark-mode' : 'app'}>
      <header>
        <StatusBar toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
        <Alert />
      </header>
      <main>
        <AppRoutes />
        <ScrollToTopButton />
      </main>
    </span>
  );
}

export default App;

