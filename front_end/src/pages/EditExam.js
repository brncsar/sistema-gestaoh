import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '..//styles/UserProfile.css'

const EditExam = ({ userId, onClose, entity, fields }) => {
  const [exam, setExam] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Number.isNaN(userId) || userId == null) {
      console.error('userId is not a valid number');
      setIsLoading(false);
      return;
    }

    const fetchExamData = async () => {
      try {
        console.log(`Fetching exam data for userId: ${userId}`);
        const response = await axios.get(`http://localhost:3000/${entity}/${userId}`);
        console.log('Exam data fetched:', response.data);
        setExam(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do exame', error);
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [userId, entity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExam({ ...exam, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating exam data:', exam);
      await axios.put(`http://localhost:3000/${entity}/${userId}`, exam);
      alert('Dados atualizados com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar dados do exame', error);
      alert('Erro ao atualizar dados do exame');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Editar {entity}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={exam[field.name] || ''}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditExam;
