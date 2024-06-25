import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add.css'; // Importando o CSS compartilhado

const AddConsult = () => {
  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const consultData = {
      pacienteId: parseInt(pacienteId),
      medicoId: parseInt(medicoId),
      data,
      hora_consulta: hora,
    };

    try {
      await axios.post('http://localhost:3000/consulta', consultData);
      alert('Consulta adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar consulta', error);
      alert('Erro ao adicionar consulta');
    }
  };

  return (
    <div className="add-container">
      <h2>Adicionar Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pacienteId">ID do Paciente</label>
          <input
            type="number"
            id="pacienteId"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicoId">ID do Médico</label>
          <input
            type="number"
            id="medicoId"
            value={medicoId}
            onChange={(e) => setMedicoId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora_consulta">Hora</label>
          <input
            type="number"
            id="hora_consulta"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Adicionar Consulta</button>
      </form>
    </div>
  );
};

export default AddConsult;
