import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Patients List</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.nome}</td>
              <td>{patient.contato}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
