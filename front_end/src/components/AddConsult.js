import React, { useState } from 'react';
import axios from 'axios';

const AddConsult = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/consulta', {
        nome,
      });
      if (response.status === 201 || response.status === 200) {
        alert('Consulta adicionado com sucesso');
        setNome('');
      }
    } catch (error) {
      console.error('Erro ao adicionar Consulta', error);
      alert('Erro ao adicionar Consulta');
    }
  };

  return (
    <div>
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
        <button type="submit">Adicionar Consulta</button>
      </form>
    </div>
  );
};

export default AddConsult;
