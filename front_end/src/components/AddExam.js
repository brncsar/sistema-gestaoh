import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add.css'; // Importando o CSS compartilhado

const AddConsult = () => {
  const [causa, setCausaId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const examData = {
      causa,
      medicoId: parseInt(medicoId),
      data,
      hora_exame: hora,
    };

    try {
      await axios.post('http://localhost:3000/exame', examData);
      alert('Consulta adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar consulta', error);
      alert('Erro ao adicionar consulta');
    }
  };

  return (
    <div className="add-container">
      <h2>Adicionar Exame</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="causa">Tipo Exame</label>
          <input
            type="string"
            id="causa"
            value={causa}
            onChange={(e) => setCausaId(e.target.value)}
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
          <label htmlFor="hora">Hora</label>
          <input
            type="number"
            id="hora"
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
