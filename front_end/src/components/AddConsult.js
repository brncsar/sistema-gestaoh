import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add.css'; // Reutilizando o CSS existente

const AddConsult = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/consulta', {
        nome,
        data,
        hora,
      });
      if (response.status === 201 || response.status === 200) {
        alert('Consulta adicionada com sucesso');
        setNome('');
        setData('');
        setHora('');
      }
    } catch (error) {
      console.error('Erro ao adicionar consulta', error);
      alert('Erro ao adicionar consulta');
    }
  };

  return (
    <div className="add">
      <h2>Adicionar Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Data</label>
          <input 
            type="date" 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Hora</label>
          <input 
            type="time" 
            value={hora} 
            onChange={(e) => setHora(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="add-button">Adicionar Consulta</button>
      </form>
    </div>
  );
};

export default AddConsult;
