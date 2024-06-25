import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './styles/global.css';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import ConsultList from  './components/ConsultList';
import AddConsult from './components/AddConsult';
import ExamList from './components/ExamList';
import AddExam from './components/AddExam';
import Register from './pages/Register'
import UserProfile from './pages/UserProfile';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/patients/consult" element={<PatientList />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/appointments/view" element={<ConsultList />} />
        <Route path="/appointments/add" element={<AddConsult />} />
        <Route path="/exams/view" element={<ExamList />} />
        <Route path="/exams/add" element={<AddExam />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/edit-data" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
