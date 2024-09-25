import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
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

