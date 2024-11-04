import React from 'react';
import logo from '../../Imagenes/icono.png';
import { FiMenu, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import './estilos.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-izquierda">
        <img src={logo} alt="Glamperos logo" className="logo" />
        <span className="nombre-marca">Glamperos</span>
      </div>

      <div className="barra-busqueda">
        <span className="opcion-busqueda">Busca un refugio encantador</span>
        <span className="divisor">|</span>
        <span className="opcion-busqueda opcion-invitados">¿Cuántos?</span>
        <button className="boton-busqueda">
          <FiSearch className="icono-busqueda" />
        </button>
      </div>

      <div className="header-derecha">
        <button className="boton-anfitrion">Publica tu Glamping</button>
        <div className="menu-usuario">
          {/* Icono de menú para pantallas grandes */}
          <FiMenu className="icono icono-menu" />

          {/* Icono de configuración para pantallas pequeñas */}
          <div className="icono-settings-wrapper">
            <VscSettings className="icono icono-settings" />
          </div>

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
