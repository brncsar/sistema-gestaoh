import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add.css'

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
    <div className="add">
      <h2>Adicionar Usuário</h2>
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

        <button type="submit" className="add-button">Adicionar Usuário</button>
      </form>
    </div>
  );
};

export default AddPatient;
