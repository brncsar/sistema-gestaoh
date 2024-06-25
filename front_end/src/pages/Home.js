import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import HealthNewsFeed from '../components/heatlh_news_feed/HealthNewsFeed';


import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div class="overlay"></div>
      <Sidebar />
      <div className="main-content">
        <Header />
        <HealthNewsFeed />
        <div className="content">
          <Routes>
            <Route path="/" element={""} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
