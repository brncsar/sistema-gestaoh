import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import '../App.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        usuario,
        senha,
      });
      const { access_token, userId } = response.data;
      console.log('Login response:', response.data); // Log para verificar a resposta
      localStorage.setItem('token', access_token);
      localStorage.setItem('userId', userId); // Armazena o ID do usuário
      console.log('User ID saved to localStorage:', userId); // Log para verificar
      navigate('/Home');
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div className='container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Usuario</label>
            <input type='text' value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          <div>
            <label>Senha</label>
            <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type='submit' className='login-button'>Login</button>
        </form>
        <div className='register-link'>
          <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
