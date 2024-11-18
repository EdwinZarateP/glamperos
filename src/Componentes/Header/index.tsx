import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Imagenes/icono.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import PanelBusqueda from "../PanelBusqueda"; // Importar el nuevo componente
import "./estilos.css";

const Header: React.FC = () => {
  const [mostrarPanelBusqueda, setMostrarPanelBusqueda] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState({
    destino: "",
    fechas: "",
    huespedes: 0,
  });

  const manejarClickBusqueda = () => {
    setMostrarPanelBusqueda(true);
  };

  const cerrarPanelBusqueda = () => {
    setMostrarPanelBusqueda(false);
  };

  const manejarBusqueda = (destino: string, fechas: string, huespedes: number) => {
    setBusqueda({ destino, fechas, huespedes });
    setMostrarPanelBusqueda(false);
  };

  return (
    <>
      <header className="Header">
        <Link to="/" className="Header-izquierda">
          <img src={logo} alt="Glamperos logo" className="Header-logo" />
          <span className="Header-nombreMarca">Glamperos</span>
        </Link>

        <div
          className="Header-barraBusqueda"
          onClick={manejarClickBusqueda} // Muestra el PanelBusqueda
        >
          <span className="Header-opcionBusqueda">
            {busqueda.destino || "Busca un refugio encantador"}
          </span>
          <span className="Header-divisor">|</span>
          <span className="Header-opcionCuando">{busqueda.fechas || "¿Cuándo?"}</span>
          <span className="Header-divisor">|</span>
          <span className="Header-opcionBusqueda Header-opcionBusquedaInvitados">
            {busqueda.huespedes > 0
              ? `${busqueda.huespedes} huésped${busqueda.huespedes > 1 ? "es" : ""}`
              : "¿Cuántos?"}
          </span>
          <button className="Header-botonBusqueda">
            <FiSearch className="Header-icono" />
          </button>
        </div>

        <div className="Header-derecha">
          <button className="Header-botonAnfitrion">Publica tu Glamping</button>
          <div className="Header-menuUsuario">
            <FiMenu className="Header-iconoMenu" />
            <div className="Header-iconoSettingsWrapper">
              <VscSettings className="Header-iconoSettings" />
            </div>
          </div>
        </div>
      </header>

      {mostrarPanelBusqueda && (
        <PanelBusqueda
          onBuscar={manejarBusqueda} // Maneja la búsqueda
          onCerrar={cerrarPanelBusqueda} // Cierra el panel
        />
      )}
    </>
  );
};

export default Header;
