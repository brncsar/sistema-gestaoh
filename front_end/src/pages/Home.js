import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';


import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<h1>Bem vindo a pagina principal</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
