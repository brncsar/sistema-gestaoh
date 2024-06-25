import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add.css'; // Importando o CSS compartilhado

const AddPatient = () => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [contato, setContato] = useState('');
  const [cliente, setCliente] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Dados do usuário
    const usuarioData = {
      nome,
      email,
      senha,
      tipo: 'paciente'
    };

    try {
      // Primeira requisição para criar o usuário
      const response = await axios.post('http://localhost:3000/usuario/create', usuarioData);
      const userId = response.data.userId;

      // Dados do paciente
      const pacienteData = {
        nome,
        genero,
        contato: parseInt(contato),
        cliente,
        idusuarioId: userId // Adiciona o ID do usuário recém-criado
      };

      // Segunda requisição para criar o paciente
      await axios.post('http://localhost:3000/paciente', pacienteData);
      alert('Paciente adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar paciente', error);
      alert('Erro ao adicionar paciente');
    }
  };

  return (
    <div className="add-container">
      <h2>Adicionar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Gênero</label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input
            type="number"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cliente">Cliente</label>
          <input
            type="checkbox"
            id="cliente"
            checked={cliente}
            onChange={(e) => setCliente(e.target.checked)}
          />
        </div>
        <button type="submit" className="submit-button">Adicionar Paciente</button>
      </form>
    </div>
  );
};

export default AddPatient;
