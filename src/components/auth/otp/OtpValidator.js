// src/components/auth/OtpValidator.js

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const OtpValidator = () => {
  const { state } = useLocation();
  const { playerId } = state || {};
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login-otp`, {
        playerId: playerId,
        otp: otpInput
      });

      if (response.status === 200) {
        setOtpError('');
        setOtpSuccess('OTP is valid! Logging in...');

        const { token } = response.data;

        login(token);
        
        console.log(`Logged in with OTP. Token: ${token}`);
        navigate('/home');
      }
    } catch (error) {
      setOtpError('Invalid OTP. Please try again.');
      setOtpSuccess('');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter OTP" 
        value={otpInput} 
        onChange={(e) => setOtpInput(e.target.value)} 
      />
      <button onClick={validateOtp}>Validate OTP</button>
      {otpError && <p className="error-message">{otpError}</p>}
      {otpSuccess && <p className="success-message">{otpSuccess}</p>}
    </div>
  );
};

export default OtpValidator;

