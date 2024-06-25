import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';

const EditConsult = ({ userId, onClose }) => {
  const [consult, setConsult] = useState({
    pacienteId: '',
    medicoId: '',
    data: '',
    hora_consulta: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Number.isNaN(userId) || userId == null) {
      console.error('userId is not a valid number');
      setIsLoading(false);
      return;
    }

    const fetchConsultData = async () => {
      try {
        console.log(`Fetching consult data for consultId: ${userId}`);
        const response = await axios.get(`http://localhost:3000/consulta/${userId}`);
        console.log('Consult data fetched:', response.data);
        setConsult(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da consulta', error);
        setIsLoading(false);
      }
    };

    fetchConsultData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConsult({ ...consult, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating consult data:', consult);
      await axios.put(`http://localhost:3000/consulta/${userId}`, consult);
      alert('Dados atualizados com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar dados da consulta', error);
      alert('Erro ao atualizar dados da consulta');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Editar Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pacienteId">ID do Paciente</label>
          <input
            type="text"
            id="pacienteId"
            name="pacienteId"
            value={consult.pacienteId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicoId">ID do Médico</label>
          <input
            type="text"
            id="medicoId"
            name="medicoId"
            value={consult.medicoId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="data"
            name="data"
            value={consult.data}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditConsult;
