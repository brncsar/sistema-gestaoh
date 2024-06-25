import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditExam from '../pages/EditExam'; // Certifique-se de criar este componente
import '../styles/patientList.css'

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [search, setSearch] = useState('');
  const [editingExamId, setEditingExamId] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:3000/exame');
      setExams(response.data);
      setFilteredExams(response.data);
    } catch (error) {
      console.error('Error fetching exams', error);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    filterExams(searchValue);
  };

  const filterExams = (searchValue) => {
    const filtered = exams.filter((exam) =>
      exam.paciente.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredExams(filtered);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterExams(search);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/exame/${id}`);
      const updatedExams = exams.filter((exam) => exam.id !== id);
      setExams(updatedExams);
      setFilteredExams(updatedExams);
    } catch (error) {
      console.error('Error deleting exam', error);
    }
  };

  const handleEdit = (id) => {
    setEditingExamId(id);
  };

  const handleCloseEdit = () => {
    setEditingExamId(null);
    fetchExams();
  };

  return (
    <div className="list-container">
      <h2>Lista de Exames</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Procure pelo nome do paciente"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">Buscar</button>
        <button type="button" className="add-button">Add Exame</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Paciente</th>
            <th>Nome do Médico</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.paciente.nome}</td>
                <td>{exam.medico.nome}</td>
                <td>{exam.data}</td>
                <td>{exam.hora_exame}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(exam.id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(exam.id)}>Deletar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum exame encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
      {editingExamId && (
        <EditExam
          userId={editingExamId}
          onClose={handleCloseEdit}
          entity="exame"
          fields={[
            { name: 'paciente.nome', label: 'Nome do Paciente', type: 'text', required: true },
            { name: 'medico.nome', label: 'Nome do Médico', type: 'text', required: true },
            { name: 'data', label: 'Data', type: 'date', required: true },
            { name: 'hora_exame', label: 'Hora', type: 'time', required: true },
          ]}
        />
      )}
    </div>
  );
};

export default ExamList;
