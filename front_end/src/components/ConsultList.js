import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/patientList.css'; // Reutilizando o mesmo CSS

const ConsultList = () => {
  const [consults, setConsults] = useState([]);
  const [filteredConsults, setFilteredConsults] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchConsults();
  }, []);

  const fetchConsults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/consulta');
      setConsults(response.data);
      setFilteredConsults(response.data); // Inicialmente mostrar todas as consultas
    } catch (error) {
      console.error('Error fetching consults', error);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    filterConsults(searchValue);
  };

  const filterConsults = (searchValue) => {
    const filtered = consults.filter((consult) =>
      consult.nome.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredConsults(filtered);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterConsults(search);
  };

  return (
    <div className="patient-list"> {/* Reutilizando a classe CSS */}
      <h2>Lista de Consultas</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Procure pelo nome"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">Buscar</button>
        <button className="add-button">Add Consulta</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsults.map((consult) => (
            <tr key={consult.id}>
              <td>{consult.id}</td>
              <td>{consult.nome}</td>
              <td>{consult.data}</td>
              <td>{consult.hora}</td>
              <td className="action-buttons">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultList;
