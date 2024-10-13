// src/components/auth/OtpDisabledValidator.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useAlert } from '../../../context/AlertContext';

const OtpDisabledValidator = () => {
  const { state } = useLocation();
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const { login } = useAuth();
  const { showMessage } = useAlert(); 
  const navigate = useNavigate();
  const location = useLocation();
  const {currentPassword} = location.state || {}; 

  const validateOtp = async () => {
    try {
      debugger;
      console.log('Current Password:', currentPassword);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/disabled-otp/`, {        
        password: currentPassword ,
        otp: otpInput
      });

      if (response.status === 200) {
        setOtpError('');      
        setOtpSuccess('OTP is valid! Logging in...');
        navigate('/accountDetail')
        
      }
    } catch (error) {
      showMessage('Invalid OTP. Please try again.', -1, 5000);
      setOtpError('Invalid OTP. Please try again.');
      setOtpSuccess('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>OTP Login</h1>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Enter OTP" 
              value={otpInput} 
              onChange={(e) => setOtpInput(e.target.value)} 
            />
          </div>
          <button className="btn-otp" onClick={validateOtp}>Validate OTP</button>
          {otpError && <p className="error-message">{otpError}</p>}
          {otpSuccess && <p className="success-message">{otpSuccess}</p>}
      </div>
    </div>
  );
};

export default OtpDisabledValidator;

