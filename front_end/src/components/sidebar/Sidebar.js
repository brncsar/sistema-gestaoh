import React, { useState } from 'react';
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
            <span className="icon">🔵</span> Perfil
          </a>
          <ul className={`submenu ${openMenu === 'perfil' ? 'open' : ''}`}>
            <li><a href="/profile/edit-photo">Alterar foto</a></li>
            <li><a href="/profile/edit-data">Alterar dados</a></li>
          </ul>
        </li>
        <li>
          <a href="#!" onClick={() => toggleMenu('pacientes')}>
            <span className="icon">🔵</span> Pacientes
          </a>
          <ul className={`submenu ${openMenu === 'pacientes' ? 'open' : ''}`}>
            <li><a href="/patients/consult">Consultar pacientes</a></li>
            <li><a href="/patients/add">Adicionar paciente</a></li>
          </ul>
        </li>
        <li>
          <a href="#!" onClick={() => toggleMenu('consultas')}>
            <span className="icon">🔵</span> Consultas
          </a>
          <ul className={`submenu ${openMenu === 'consultas' ? 'open' : ''}`}>
            <li><a href="/appointments/add">Adicionar consulta</a></li>
            <li><a href="/appointments/view">Ver consultas</a></li>
          </ul>
        </li>
        <li>
          <a href="#!" onClick={() => toggleMenu('exames')}>
            <span className="icon">🔵</span> Exames
          </a>
          <ul className={`submenu ${openMenu === 'exames' ? 'open' : ''}`}>
            <li><a href="/exams/add">Adicionar exame</a></li>
            <li><a href="/exams/view">Ver exames</a></li>
          </ul>
        </li>
        <li><a href="/calendar"><span className="icon">🔵</span> Calendário</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
