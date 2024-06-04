import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css' 
import '../App.css'


function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        usuario: usuario,
        senha: senha,
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
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
      </div>
    </div>
  )
  
  // return (
  //   <div>
  //     <h2>Login</h2>
  //     <form onSubmit={handleLogin}>
  //       <div>
  //         <label>Usuario</label>
  //         <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
  //       </div>
  //       <div>
  //         <label>Senha</label>
  //         <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
  //       </div>
  //       <button type="submit" className="login-button">Login</button>
  //     </form>
  //   </div>
  // );
}

export default Login;
