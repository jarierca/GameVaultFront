// src/components/auth/VerifyOtpPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useAlert } from '../../../context/AlertContext';

function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showMessage } = useAlert(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login-otp`, {
        username: location.state.username,
        otp
      });

      const { token } = response.data;
      login(token, location.state.username);
      navigate('/home');

    } catch (error) {
      showMessage('Invalid OTP. Please try again.', -1, 5000);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter your OTP"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyOtpPage;

