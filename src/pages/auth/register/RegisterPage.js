// src/pages/auth/register/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../context/AlertContext';
import './../AuthPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { showMessage } = useAlert(); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      showMessage('Passwords do not match.', -1, 3000);
      setSuccess('');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        email,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Registration successful!.');
      setError('');
      showMessage('Registration successful!', 1, 5000);
      navigate('/home');

    } catch (error) {
      showMessage('Registration failed. Please try again.', -1, 5000);
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="label">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="label">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password" className="label">Confirm Password:</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="role" className="label">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

