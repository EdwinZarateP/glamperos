// Header.tsx
import React from 'react';
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import logo from '../../Imagenes/icono.png'; // Importa la imagen desde la carpeta

import './estilos.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-izquierda">
        <img src={logo} alt="Glamperos logo" className="logo" />
        <span className="nombre-marca">Glamperos</span>
      </div>

      <div className="barra-busqueda">
        <span className="opcion-busqueda">Busca un lindo lugar</span>
        <span className="divisor">|</span>
        <span className="opcion-busqueda opcion-invitados">¿Cuántos?</span>
        <button className="boton-busqueda">
          <AiOutlineSearch className="icono-busqueda" />
        </button>
      </div>

      <div className="header-derecha">
        <button className="boton-anfitrion">Publica tu Glamping</button>
        <div className="menu-usuario">
          <AiOutlineMenu className="icono icono-menu" />
          <div className="notificacion">
            <span className="inicial-usuario">E</span>
            <div className="badge-notificacion">1</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
