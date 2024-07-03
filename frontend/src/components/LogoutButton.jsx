// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Logout successful');
        navigate('/login'); // Redirect to login page after logout
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
