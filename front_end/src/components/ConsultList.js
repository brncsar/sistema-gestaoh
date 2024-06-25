import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditConsult from '../pages/EditConsult';
import '../styles/patientList.css';

const ConsultList = () => {
  const [consults, setConsults] = useState([]);
  const [filteredConsults, setFilteredConsults] = useState([]);
  const [search, setSearch] = useState('');
  const [editingConsultId, setEditingConsultId] = useState(null);

  useEffect(() => {
    fetchConsults();
  }, []);

  const fetchConsults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/consulta');
      setConsults(response.data);
      setFilteredConsults(response.data);
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
      consult.paciente.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredConsults(filtered);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterConsults(search);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/consulta/${id}`);
      const updatedConsults = consults.filter((consult) => consult.id !== id);
      setConsults(updatedConsults);
      setFilteredConsults(updatedConsults);
    } catch (error) {
      console.error('Error deleting consult', error);
    }
  };

  const handleEdit = (id) => {
    setEditingConsultId(id);
  };

  const handleCloseEdit = () => {
    setEditingConsultId(null);
    fetchConsults();
  };

  return (
    <div className="consult-list">
      <h2>Lista de Consultas</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Procure pelo nome do paciente"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">Buscar</button>
        <button type="button" className="add-button">Add Consulta</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Paciente</th>
            <th>Nome do Médico</th>
            <th>Data da Consulta</th>
            <th>Hora da Consulta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsults.length > 0 ? (
            filteredConsults.map((consult) => (
              <tr key={consult.id}>
                <td>{consult.id}</td>
                <td>{consult.paciente}</td>
                <td>{consult.medico}</td>
                <td>{consult.data}</td>
                <td>{consult.hora}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(consult.id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(consult.id)}>Deletar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhuma consulta encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
      {editingConsultId && (
        <EditConsult
          userId={editingConsultId}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default ConsultList;
