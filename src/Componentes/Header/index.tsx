import React, { useState } from "react";
import logo from "../../Imagenes/icono.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import CalendarioDispositivos from "../CalendarioGeneral";
import "./estilos.css";

const Header: React.FC = () => {
  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);

  // Lista de fechas reservadas
  const fechasReservadas = [
    new Date(2024, 10, 20), // 20 de noviembre de 2024
    new Date(2024, 10, 28), // 28 de noviembre de 2024
    new Date(2024, 10, 29), // 29 de noviembre de 2024
  ];

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

      {/* Renderiza el componente CalendarioDispositivos */}
      {mostrarCalendario && (
        <CalendarioDispositivos
          cerrarCalendario={cerrarCalendario}
          FechasReservadas={fechasReservadas}
        />      
      )}
    </>
  );
};

export default Header;
