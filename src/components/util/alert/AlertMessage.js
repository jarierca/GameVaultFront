// src/components/util/alert/AlertMessage.js

import React from "react";
import './Alert.css';

const AlertMessage = ({ message, msgType, duration, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);
  const [remainingTime, setRemainingTime] = React.useState(duration);
  const intervalRef = React.useRef(null);

  const startProgress = () => {
    setRemainingTime(duration);
    setProgress(100);
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          setIsVisible(false);
          onClose();
          return 0;
        }
        const newProgress = (prev / duration) * 100;
        setProgress(newProgress);
        return prev - 100;
      });
    }, 100);
  };

  React.useEffect(() => {
    startProgress();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [duration, onClose]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    startProgress();
  };

  const getMessageType = () => {
    switch (msgType) {
      case 0: return "alert-info";
      case 1: return "alert-success";
      case -1: return "alert-danger";
      case -2: return "alert-warning";
      default: return "alert-info";
    }
  };

  const getMessageIcon = () => {
    switch (msgType) {
      case 0: return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="8" r="1" fill="currentColor"/>
        </svg>
      );
      case 1: return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm3.354-7.854a.5.5 0 0 0-.708-.708L7.5 8.293 6.354 7.146a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5z"/>
        </svg>
      );
      case -1: return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm3.354-7.354a.5.5 0 0 0-.708-.708L8 7.293 5.854 5.146a.5.5 0 1 0-.708.708L7.293 8 5.146 10.146a.5.5 0 1 0 .708.708L8 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L8.707 8l2.147-2.146z"/>
        </svg>
      );
      case -2: return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 22h20L12 2z" fill="transparent" stroke="black" strokeWidth="2"/>
          <circle cx="12" cy="18" r="1.5" fill="black"/>
          <path d="M12 9v6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
      default: return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="8" r="1" fill="currentColor"/>
        </svg>
      );
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`alert ${getMessageType()} position-absolute`} 
      role="alert" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="svg-icon-msg">{getMessageIcon()}</span>
        <span className="msg">{message}</span>
        <span className="close-icon" onClick={onClose} style={{ cursor: 'pointer', marginLeft: '10px' }}>&times;</span>
      </div>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default AlertMessage;

