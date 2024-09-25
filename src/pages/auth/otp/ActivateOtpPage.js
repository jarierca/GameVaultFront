// src/pages/auth/ActivateOtpPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpQrCode from '../../../components/auth/otp/OtpQrCode';
import OtpValidator from '../../../components/auth/otp/OtpValidator';

function ActivateOtpPage() {
  const [playerId, setPlayerId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayerId = 5;//localStorage.getItem('playerId');
    setPlayerId(storedPlayerId);
  }, []);

  return (
    <div>
      <h1>Activate OTP</h1>
      <div>
        <p>Scan the QR code below to activate OTP:</p>
        {playerId && <OtpQrCode playerId={playerId} />}
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default ActivateOtpPage;

