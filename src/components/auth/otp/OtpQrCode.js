// src/components/auth/OtpQrCode.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { useAlert } from '../../../context/AlertContext';

const OtpQrCode = ({ playerId }) => {
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [issuer, setIssuer] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const { showMessage } = useAlert(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const otpResponse = await axios.post(`${process.env.REACT_APP_API_URL}/mfa/enable-otp`);
        setQrCodeUri(otpResponse.data);
      } catch (err) {
        showMessage('Failed to generate OTP. Please try again.', -1, 5000);
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
      const otpResponse = await axios.post(`${process.env.REACT_APP_API_URL}/mfa/verify-otp/${otpInput}`);

      if (otpResponse.status === 200) {
        setOtpError('');
        showMessage('OTP is valid!', 1, 5000);
        navigate('/accountDetail');
      }
    } catch (error) {
      showMessage('Invalid OTP. Please try again.', -1, 5000);
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
          <div className="container"> 
            <input 
              type="text" 
              placeholder="Enter OTP" 
              value={otpInput} 
              onChange={(e) => setOtpInput(e.target.value)} 
            />
            <button onClick={validateOtp}>Validate OTP</button>
          </div>
          {otpError && <p className="error-message">{otpError}</p>}
        </div>
      )}
    </div>
  );
};

export default OtpQrCode;

