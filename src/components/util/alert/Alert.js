// src/components/util/alert/Alert.js

import React from "react";
import { useAlert } from '../../../context/AlertContext';
import AlertMessage from './AlertMessage';
import './Alert.css';

const Alert = () => {
  const { messages, hideMessage } = useAlert();

  return (
    <div className="alert-container">
      {messages.slice().reverse().map((msg) => (
        <AlertMessage
          key={msg.id}
          message={msg.text}
          msgType={msg.type}
          duration={msg.duration}
          onClose={() => hideMessage(msg.id)}
        />
      ))}
    </div>
  );
};


/*
TEST FOR ALL TYPE OF MSG

showMessage('Error, incorrect credentials. Try again.', -1, 5000);
showMessage('Success! Your data has been saved.', 1, 4000);
showMessage('Info: This is an informational message.', 0, 3000);
showMessage('Warning: Please check your input!', -2, 6000);
showMessage('Error: Unable to connect to server.', -1, 7000);
showMessage('Success: Your profile has been updated.', 1, 3500);
showMessage('Info: This feature will be available soon.', 0, 8000);
showMessage('Warning: Low disk space!', -2, 4500);
showMessage('Error: File not found. Please check the path.', -1, 5000);
showMessage('Success: You have logged out successfully.', 1, 3000);

*/

export default Alert;
