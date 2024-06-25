import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../pages/UserProfile'; // Certifique-se de ajustar o caminho conforme necessário
import '../styles/patientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [editingPatientId, setEditingPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/paciente');
      setPatients(response.data);
      setFilteredPatients(response.data);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/paciente/${id}`);
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
    } catch (error) {
      console.error('Error deleting patient', error);
    }
  };

  const handleEdit = (id) => {
    setEditingPatientId(id);
  };

  const handleCloseEdit = () => {
    setEditingPatientId(null);
    fetchPatients();
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
        <button type="button" className="add-button">Add Paciente</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Contato</th>
            <th>Cliente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.nome}</td>
                <td>{patient.genero}</td>
                <td>{patient.contato}</td>
                <td>{patient.cliente ? 'Sim' : 'Não'}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(patient.id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(patient.id)}>Deletar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum paciente encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
      {editingPatientId && (
        <UserProfile
          userId={editingPatientId}
          onClose={handleCloseEdit}
          entity="paciente"
          fields={[
            { name: 'nome', label: 'Nome', type: 'text', required: true },
            { name: 'genero', label: 'Gênero', type: 'text', required: true },
            { name: 'contato', label: 'Contato', type: 'text', required: true },
            { name: 'cliente', label: 'Cliente', type: 'checkbox', required: false },
          ]}
        />
      )}
    </div>
  );
};

export default PatientList;
