import React, { useState } from 'react';
import '../styles/Register.css';

const Register = () => {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    senha: '',
    nome: '',
    especialidade: '',
    crm: '',
    genero: '',
    cliente: false,
    contato: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userType) {
      setError('Por favor, selecione um tipo de usuário.');
      return;
    }

    const url = 'http://localhost:3000/usuario/create';
    const payload = userType === 'medico' ? {
      usuario: formData.usuario,
      email: formData.email,
      senha: formData.senha,
      tipo: 'medico',
      data_criacao: new Date().toISOString(),
      nome: formData.nome,
      especialidade: formData.especialidade,
      crm: formData.crm,
    } : {
      usuario: formData.usuario,
      email: formData.email,
      senha: formData.senha,
      tipo: 'paciente',
      data_criacao: new Date().toISOString(),
      nome: formData.nome,
      genero: formData.genero,
      cliente: formData.cliente,
      contato: formData.contato,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccess('Registro bem-sucedido!');
          setFormData({
            usuario: '',
            email: '',
            senha: '',
            nome: '',
            especialidade: '',
            crm: '',
            genero: '',
            cliente: false,
            contato: '',
          });
        } else {
          setError(data.message || 'Erro ao registrar.');
        }
      })
      .catch((error) => {
        setError('Erro ao registrar: ' + error.message);
      });
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuário</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="userType"
              value="medico"
              checked={userType === 'medico'}
              onChange={handleUserTypeChange}
            />
            Médico
          </label>
          <label>
            <input
              type="checkbox"
              name="userType"
              value="paciente"
              checked={userType === 'paciente'}
              onChange={handleUserTypeChange}
            />
            Paciente
          </label>
        </div>
        <div className="form-group">
          <label>Usuário</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        {userType === 'medico' && (
          <>
            <div className="form-group">
              <label>Especialidade</label>
              <input
                type="text"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                required={userType === 'medico'}
              />
            </div>
            <div className="form-group">
              <label>CRM</label>
              <input
                type="text"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                required={userType === 'medico'}
              />
            </div>
          </>
        )}
        {userType === 'paciente' && (
          <>
            <div className="form-group">
              <label>Gênero</label>
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required={userType === 'paciente'}
              />
            </div>
            <div className="form-group">
              <label>Cliente</label>
              <input
                type="checkbox"
                name="cliente"
                checked={formData.cliente}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contato</label>
              <input
                type="text"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                required={userType === 'paciente'}
              />
            </div>
          </>
        )}
        <button type="submit" className="register-button">
          Registrar
        </button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default Register;
