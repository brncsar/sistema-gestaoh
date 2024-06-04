import React from 'react';
import './Header.css';

const Header = () => {
  const handleLogout = () => {
    // Lógica de logout
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="header">
      <div className="user-info">
        <img src="path-to-user-photo.jpg" alt="User" className="user-photo" />
        <span className="user-name">Nome do Usuário</span>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Header;
