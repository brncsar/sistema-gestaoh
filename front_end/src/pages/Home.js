import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import './Home.css' 


const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <h1>Welcome to the Home Page</h1>
          {/* Conteúdo principal da página */}
        </div>
      </div>
    </div>
  );
};

export default Home;
