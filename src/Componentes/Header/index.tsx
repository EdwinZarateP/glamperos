import React, { useState } from "react";
import logo from "../../Imagenes/icono.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import CalendarioDispositivos from "../CalendarioDispositivos";
import "./estilos.css";

const Header: React.FC = () => {
  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);

  const manejarClickBusqueda = () => {
    setMostrarCalendario(true);
  };

  const cerrarCalendario = () => {
    setMostrarCalendario(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-izquierda">
          <img src={logo} alt="Glamperos logo" className="logo" />
          <span className="nombre-marca">Glamperos</span>
        </div>

        <div
          className="barra-busqueda"
          onClick={manejarClickBusqueda} // Activa el calendario
        >
          <span className="opcion-busqueda">Busca un refugio encantador</span>
          <span className="divisor">|</span>
          <span className="opcion-cuando">¿Cuándo?</span>
          <span className="divisor">|</span>
          <span className="opcion-busqueda opcion-invitados">¿Cuántos?</span>
          <button className="boton-busqueda">
            <FiSearch className="icono-busqueda" />
          </button>
        </div>

        <div className="header-derecha">
          <button className="boton-anfitrion">Publica tu Glamping</button>
          <div className="menu-usuario">
            <FiMenu className="icono-menu" />
            <div className="icono-settings-wrapper">
              <VscSettings className="icono-settings" />
            </div>
          </div>
        </div>
      </header>

      {/* Renderiza CalendarioDispositivos si mostrarCalendario es true */}
      {mostrarCalendario && (
        <CalendarioDispositivos cerrarCalendario={cerrarCalendario} />
      )}
    </>
  );
};

export default Header;
