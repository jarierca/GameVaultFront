// src/pages/auth/ActivateOtpPage.js

import React, { useState } from 'react';
import OtpQrCode from '../../../components/auth/otp/OtpQrCode';
import { useAuth } from '../../../context/AuthContext';

function ActivateOtpPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { playerId } = useAuth();

  return (
    <div className="container">
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

