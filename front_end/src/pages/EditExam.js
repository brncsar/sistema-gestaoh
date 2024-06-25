import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';

const EditExam = ({ userId, onClose }) => {
  const [exam, setExam] = useState({
    pacienteId: '',
    medicoId: '',
    data: '',
    hora_exame: '',
    endereco: '',
    causa: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Number.isNaN(userId) || userId == null) {
      console.error('userId is not a valid number');
      setIsLoading(false);
      return;
    }

    const fetchExamData = async () => {
      try {
        console.log(`Fetching exam data for examId: ${userId}`);
        const response = await axios.get(`http://localhost:3000/exame/${userId}`);
        console.log('Exam data fetched:', response.data);
        setExam(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do exame', error);
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExam({ ...exam, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating exam data:', exam);
      await axios.put(`http://localhost:3000/exame/${userId}`, exam);
      alert('Dados atualizados com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar dados do exame', error);
      alert('Erro ao atualizar dados do exame');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Editar Exame</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pacienteId">ID do Paciente</label>
          <input
            type="text"
            id="pacienteId"
            name="pacienteId"
            value={exam.pacienteId}
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
            value={exam.medicoId}
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
            value={exam.data}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora_exame">Hora</label>
          <input
            type="text"
            id="hora_exame"
            name="hora_exame"
            value={exam.hora_exame}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={exam.endereco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="causa">Causa</label>
          <input
            type="text"
            id="causa"
            name="causa"
            value={exam.causa}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditExam;
