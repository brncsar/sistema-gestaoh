import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/paciente', {
        nome,
      });
      if (response.status === 201 || response.status === 200) {
        alert('Paciente adicionado com sucesso');
        setNome('');
      }
    } catch (error) {
      console.error('Erro ao adicionar paciente', error);
      alert('Erro ao adicionar paciente');
    }
  };

  return (
    <div>
      <h2>Adicionar Paciente</h2>
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
        <button type="submit">Adicionar Paciente</button>
      </form>
    </div>
  );
};

export default AddPatient;
