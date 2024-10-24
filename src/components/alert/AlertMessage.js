// src/components/util/alert/AlertMessage.js

import React from "react";
import Icon from '../icon/Icon';
import './Alert.css';

const AlertMessage = ({ message, msgType, duration, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);
  const intervalRef = React.useRef(null);

  const startProgress = () => {
    setProgress(100);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          setIsVisible(false);
          handleClose();
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  React.useEffect(() => {
    startProgress();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [duration]);

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
        <Icon iconName="InfoCircleIcon" />
      );
      case 1: return (
        <Icon iconName="SuccessCircleIcon" />
      );
      case -1: return (
        <Icon iconName="DangerCircleIcon" />
      );
      case -2: return (
        <Icon iconName="WarningCircleIcon" />
      );
      default: return (
        <Icon iconName="InfoCircleIcon" />
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

