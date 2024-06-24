import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [userName, setUserName] = useState('Nome do Usuário');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      console.log('User ID retrieved from localStorage:', userId); // Log para verificar
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/usuario/${userId}`);
          console.log('User data fetched:', response.data); // Log para verificar
          if (response.data && response.data.nome) {
            setUserName(response.data.nome);
          } else {
            console.error('Nome não encontrado na resposta');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      } else {
        console.error('User ID not found in localStorage');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="header">
      <div className="user-info">
        <img src="/teste.jpg" alt="Usuário" className="user-photo" />
        <span className="user-name">{userName}</span>
      </div>
      <button onClick={handleLogout} className="logout-button">Desconectar-se</button>
    </div>
  );
};

export default Header;
