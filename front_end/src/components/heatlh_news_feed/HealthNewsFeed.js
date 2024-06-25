import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthNewsFeed.css'; // Certifique-se de que este caminho está correto

const HealthNewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category: 'health',
          country: 'br',
          apiKey: '57965dd8a5844550a736095eadc2bc98' // Substitua pela sua chave da API
        }
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news', error);
    }
  };

  return (
    <div className="health-news-feed">
      <h2>Últimas Notícias sobre Saúde</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthNewsFeed;
