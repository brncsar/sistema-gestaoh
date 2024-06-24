import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/patientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/paciente');
      setPatients(response.data);
      setFilteredPatients(response.data); // Inicialmente mostrar todos os pacientes
    } catch (error) {
      console.error('Error fetching patients', error);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    filterPatients(searchValue);
  };

  const filterPatients = (searchValue) => {
    const filtered = patients.filter((patient) =>
      patient.nome.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterPatients(search);
  };
  return (
    <div className="patient-list">
      <h2>Lista de Pacientes</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Procure pelo nome"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">Buscar</button>
        <button className="add-button">Add Paciente</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Contacto</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.nome}</td>
              <td>{patient.contato}</td>
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

export default PatientList;