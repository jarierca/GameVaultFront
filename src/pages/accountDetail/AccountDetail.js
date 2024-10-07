// src/components/accountDetail/AccountDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountDetail.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AccountDetail = () => {
  const [error, setError] = useState(null); 
  const { userName, logout, playerId } = useAuth();
  const navigate = useNavigate();

  const [confirmationWord, setConfirmationWord] = useState('');
  const requiredWord = 'CONFIRM';

  const [formData, setFormData] = useState({
    currentPassword:'',
    email: '',
    password: '',
    confirmPassword: '',
    activateOTP: ''  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }; 

  const handleActivateOTP = () => {
    navigate('/activate-otp');
  }; 

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/players/${playerId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const playerData = response.data;
          setFormData({
            ...formData,
            email: playerData.email,
            activateOTP: playerData.otpEnabled,
          });
        } else {
          console.error('Error obtaining player details');
        }
      } catch (error) {
        console.error('Error in the application:', error);
        setError('Error obtaining player details');
      }
    };

    fetchPlayerData();
  }, [playerId]);


  const handleSubmit = async (event) => {
    event.preventDefault();        

    const { currentPassword, email, password, confirmPassword } = formData;    
  
    const updatedPlayer = {
      currentPassword, 
      player: { 
        email,
        password,
        playerId
      }
    };

    if (currentPassword == null || currentPassword == '' ) {
      alert("It is mandatory to fill in the current password");
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {      
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/players/${playerId}`, updatedPlayer,  {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        
      if (response.status === 200) {
        alert("Details correctly updated");
      } else {
        
        alert("Error updating details");
      }
    } catch (error) {
      console.error("Error in the application:", error);
      alert("Error in the application:");
    }
  };

  const handleConfirmationWordChange = (e) => {
    setConfirmationWord(e.target.value);
  };
  

  const handleDelete = async () => {   
    const { currentPassword, email, password, confirmPassword } = formData;    

    const updatedPlayer = {
      currentPassword, 
      player: { 
        email,
        password,
        playerId
      }
    };

    if (confirmationWord !== requiredWord) {
      alert(`You must type the word "${requiredWord}" to confirm.`);
      return;
    }

    try {       
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/players/${playerId}`,updatedPlayer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 204) {         
        logout();
        navigate('/login');
      } else {
        alert("Error deleting account");
      }
    } catch (error) {
      console.error("Error in the deletion request:", error);
      alert("Error deleting account");
    }
  };

  return (
    
  <div className="accountDetail-container">
    <span className="user-name">Welcome, {userName}!</span>            

    <form className="form" onSubmit={handleSubmit}>

      <div>
        <h3>Current Password</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required/>
              <p>Please type your current password in order to make changes to your account.</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Change Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}/>
          </div>       
        </div>
      </div>  

      <div>
        <h3>Change Password</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                
              />
            </div>
          </div>  
      </div> 
      <button type="submit" className="submit-button">Save Changes</button>
    </form>

    {formData.activateOTP ? (
        <button onClick={handleLogout} className="logout-button">Disable OTP</button>
      ) : (
        <button onClick={handleActivateOTP} className="activateOTP-button">Activate OTP</button>        
      )}
      
    <div>
      <h3>Delete Account</h3>
      <span>There is no going back from this action. After you submit your request, you will be logged out and your account deleted.</span>    
      <div className="form-group">
        <label htmlFor="confirmationWord">Type "{requiredWord}" to confirm</label>
        <input
          type="text"
          id="confirmationWord"
          name="confirmationWord"
          value={confirmationWord}
          onChange={handleConfirmationWordChange}
        />
      </div>
      <button onClick={handleDelete} className="delete-button">Delete Account</button>
    </div> 

    {error && <p className="error-message">{error}</p>}
    
  </div> 
  );
};

export default AccountDetail;

