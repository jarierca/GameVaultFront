// src/components/accountDetail/AccountDetail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountDetail.css';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AccountDetail = () => {
  const [accountDetail, setAccountDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { isAuthenticated, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword:'',
    email: '',
    activateOTP:'',
    password: '',
    confirmPassword: '',  });


/*
  useEffect(() => {
    const fetchAccountDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/players`);
        setAccountDetail(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
        setError('Error fetching account details.'); 
      }
      setLoading(false);
    };

    fetchAccountDetail();
  }, []);

  if (loading) {
    return <div className="accountDetail-container"><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className="accountDetail-container"><h1>{error}</h1></div>; 
  }*/


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleNavigate = (path) => {
      navigate(path);
    };

    const handleLogout = () => {
      logout();
      navigate('/login');
    };


    /*envio formulario*/ 

    const handleSubmit = async (event) => {
      event.preventDefault(); 
    
      const { currentPassword, email, activateOTP, password, confirmPassword } = formData;
    

      if (currentPassword == null || currentPassword == '' ) {
        alert("Es obligatorio rellenar la password actual");
        return;
      }
      
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
    
      const updatedPlayer = {
        currentPassword,
        email,
        activateOTP,
        password,
        confirmPassword
      };
    
      const username = {userName}; 

      try {
        debugger;
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/players/${username}`, updatedPlayer, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          alert("Detalles actualizados correctamente");
        } else {
          
          alert("Error al actualizar los detalles");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud");
      }
    };





  return (
    
    <div className="accountDetail-container">
        <span className="user-name">Welcome, {userName}!</span>     
        
        <nav className="menu">
          <ul className="menu-list">            
            <li className="menu-item"><button onClick={() => handleNavigate('/account')}>My Account</button></li>
            <li className="menu-item"><button onClick={() => handleNavigate('/changeStatus')}>Changes Status</button></li>
            <li className="menu-item"><button onClick={() => handleNavigate('/collections')}>Manage Collections</button></li>
            <li className="menu-item"><button onClick={() => handleNavigate('/details')}>Details</button></li>          
          </ul>
      </nav>
   

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
              onChange={handleChange}
              
            />
          </div>
        
    
          <div className="form-group">
            <label htmlFor="gamerTag">Activate OTP</label>
            <input
              type="activateOTP"
              id="activateOTP"
              name="activateOTP"
              value={formData.activateOTP}
              onChange={handleChange}
              
            />
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


      <div>
        <h3>Delete Account</h3>
        <span>There is not going back from this action. After you submit your request you will be logged out and your account deleted.</span>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deleteAccount">Password</label>
              <input
                type="deleteAccount"
                id="deleteAccount"
                name="deleteAccount"
                value={formData.deleteAccount}
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group">
            <button type="submit" className="delete-button">Delete Account</button>
            </div>
          </div>  
      </div> 




    </form>

    <button onClick={handleLogout} className="logout-button">Logout</button>

     
    </div> 
  );
};

export default AccountDetail;

