import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaStethoscope, FaNotesMedical, FaCalendarAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="#!" onClick={() => toggleMenu('perfil')}>
            <span className="icon"><FaUserAlt /></span> Perfil
          </a>
          <ul className={`submenu ${openMenu === 'perfil' ? 'open' : ''}`}>
            <li><Link to="/profile/edit-photo">Alterar foto</Link></li>
            <li><Link to="/profile/edit-data">Alterar dados</Link></li>
          </ul>
        </li>
        <li>
          <a href="#!" onClick={() => toggleMenu('pacientes')}>
          <span className="icon"><FaStethoscope /></span> Pacientes
          </a>
          <ul className={`submenu ${openMenu === 'pacientes' ? 'open' : ''}`}>
            <li><Link to="/patients/consult">Consultar pacientes</Link></li>
            <li><Link to="/patients/add">Adicionar paciente</Link></li>
          </ul>
        </li>
        <li>
          <a href="#!" onClick={() => toggleMenu('consultas')}>
          <span className="icon"><FaNotesMedical /></span> Consultas
          </a>
          <ul className={`submenu ${openMenu === 'consultas' ? 'open' : ''}`}>
            <li><Link to="/appointments/add">Adicionar consulta</Link></li>
            <li><Link to="/appointments/view">Ver consultas</Link></li>
          </ul>
        </li>
        <li>
          <a href="#!" onClick={() => toggleMenu('exames')}>
          <span className="icon"><FaNotesMedical /></span> Exames
          </a>
          <ul className={`submenu ${openMenu === 'exames' ? 'open' : ''}`}>
            <li><Link to="/exams/add">Adicionar exame</Link></li>
            <li><Link to="/exams/view">Ver exames</Link></li>
          </ul>
        </li>
        <li><Link to="/calendar"><span className="icon"><FaCalendarAlt /></span>Calendário</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
