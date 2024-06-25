import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add.css';

const AddExam = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/exame', {
        nome,
      });
      if (response.status === 201 || response.status === 200) {
        alert('Exame adicionado com sucesso');
        setNome('');
      }
    } catch (error) {
      console.error('Erro ao adicionar exame', error);
      alert('Erro ao adicionar exame');
    }
  };

  return (
    <div className="add-container">
      <h2>Adicionar Exame</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Adicionar Exame</button>
      </form>
    </div>
  );
};

export default AddExam;
