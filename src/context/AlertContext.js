// src/context/AlertContext.js

import React, { createContext, useContext, useState, useRef } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const idCounter = useRef(0);

  const showMessage = (message, type = 0, duration = 5000) => {
    const id = Date.now() + idCounter.current++;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id, text: message, type, duration }
    ]);
  };

  const hideMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <AlertContext.Provider value={{ messages, showMessage, hideMessage }}>
      {children}
    </AlertContext.Provider>
  );
};

