import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';

const UserProfile = ({ userId, onClose }) => {
  const [user, setUser] = useState({ nome: '', genero: '', contato: '', cliente: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Number.isNaN(userId) || userId == null) {
      console.error('userId is not a valid number');
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log(`Fetching user data for userId: ${userId}`);
        const response = await axios.get(`http://localhost:3000/paciente/${userId}`);
        console.log('User data fetched:', response.data);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating user data:', user);
      await axios.put(`http://localhost:3000/paciente/${userId}`, user);
      alert('Dados atualizados com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário', error);
      alert('Erro ao atualizar dados do usuário');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={user.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Gênero</label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={user.genero}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input
            type="text"
            id="contato"
            name="contato"
            value={user.contato}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cliente">Cliente</label>
          <input
            type="checkbox"
            id="cliente"
            name="cliente"
            checked={user.cliente}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default UserProfile;
