// src/components/auth/OtpQrCode.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

const OtpQrCode = ({ playerId }) => {
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [issuer, setIssuer] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const otpResponse = await axios.post(`${process.env.REACT_APP_API_URL}/mfa/enable-otp?playerId=${playerId}`);
        setQrCodeUri(otpResponse.data);
      } catch (err) {
        setError('Failed to generate OTP. Please try again.'); 
      }
    };

    if (playerId) {
      fetchOtp();
    }
  }, [playerId]);

  useEffect(() => {
    if (qrCodeUri) {
      const decodedUri = decodeURIComponent(qrCodeUri);
      const uriParts = decodedUri.split('?');
      const nameWithIssuer = uriParts[0];

      const lastColonIndex = nameWithIssuer.lastIndexOf(':');
      const name = nameWithIssuer.substring(lastColonIndex + 1);

      setName(name);

      const params = new URLSearchParams(uriParts[1]);
      setSecret(params.get('secret'));
      setIssuer(params.get('issuer'));
    }
  }, [qrCodeUri]);


  const validateOtp = async () => {
    try {
      const otpResponse = await axios.post(`${process.env.REACT_APP_API_URL}/mfa/verify-otp?playerId=${playerId}&otp=${otpInput}`);
      if (otpResponse.status === 200) {
        setOtpError('');
        alert('OTP is valid!');
      }
    } catch (error) {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {qrCodeUri && (
        <div>
          <p>Scan this QR code:</p>
          <QRCodeSVG value={qrCodeUri} />
          <div>
            <p>Or type this code in your OTP app</p>
            <p>Name: {name}</p>
            <p>Secret: {secret}</p>
            <p>Issuer: {issuer}</p>
          </div>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={otpInput} 
            onChange={(e) => setOtpInput(e.target.value)} 
          />
          <button onClick={validateOtp}>Validate OTP</button>
          {otpError && <p className="error-message">{otpError}</p>}
        </div>
      )}
    </div>
  );
};

export default OtpQrCode;

