import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Imagenes/icono.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import PanelBusqueda from "../PanelBusqueda";
import { ContextoApp } from "../../Contexto/index"; 
import { evaluarVariable } from '../../Funciones/ValidarVariable';
import "./estilos.css";

const Header: React.FC = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { totalHuespedes, idUsuario, setSiono} = almacenVariables; // Extraer totalHuespedes del contexto

  const [mostrarPanelBusqueda, setMostrarPanelBusqueda] = useState<boolean>(false); // Estado para mostrar el PanelBusqueda
  const [busqueda, setBusqueda] = useState({
    destino: "",
    fechas: "",
  });

  const manejarClickBusqueda = () => {
    setMostrarPanelBusqueda(true); // Mostrar el PanelBusqueda
    document.body.style.overflow = "hidden";
  };

  const cerrarPanelBusqueda = () => {
    setMostrarPanelBusqueda(false); // Cerrar el PanelBusqueda
    document.body.style.overflow = "auto"; 

  };

  const manejarBusqueda = (destino: string, fechas: string) => {
    setBusqueda({ destino, fechas }); // Actualiza la búsqueda
    cerrarPanelBusqueda(); 
  };

  const existeId = () => {
    const resultado = evaluarVariable(idUsuario);
    setSiono(true)
    return resultado
  };

  return (
    <div className="contenedor-Header">
      <header className="Header">
        <Link to="/" className="Header-izquierda">
          <img src={logo} alt="Glamperos logo" className="Header-logo" />
          <span className="Header-nombreMarca">Glamperos</span>
        </Link>

        <div
          className="Header-barraBusqueda"
          onClick={manejarClickBusqueda} 
        >
          <span className="Header-opcionBusqueda">
            {busqueda.destino
              ? busqueda.destino.substring(0, 20) +
                (busqueda.destino.length > 30 ? "..." : "")
              : "Busca un refugio encantador"}
          </span>
          <span className="Header-divisor">|</span>
          <span className="Header-opcionCuando">{busqueda.fechas || "¿Cuándo?"}</span>
          <span className="Header-divisor">|</span>
          <span className="Header-opcionBusqueda Header-opcionBusquedaInvitados">
            {totalHuespedes > 0
              ? `${totalHuespedes} huésped${totalHuespedes > 1 ? "es" : ""}`
              : "¿Cuántos?"}
          </span>
          <div className="Header-botonBusqueda">
            <FiSearch className="Header-icono" />
          </div>
        </div>

        <div className="Header-derecha">
          {/* Condicional para mostrar el enlace correspondiente */}
          {existeId() ? (
            <Link to="/CrearGlamping" className="Header-botonAnfitrion">
              Publica tu Glamping 
            </Link>
          ) : (
            <Link to="/Registrarse" className="Header-botonAnfitrion">
              Publica tu Glamping
            </Link>
          )}

          <Link to="/Registrarse" className="Header-menuUsuario" >
            <FiMenu className="Header-iconoMenu" onClick={() => setSiono(false)} />
            <div className="Header-iconoSettingsWrapper">
              <VscSettings className="Header-iconoSettings" />
            </div>
          </Link>
        </div>
      </header>

      {/* Renderiza el PanelBusqueda si mostrarPanelBusqueda es true */}
      {mostrarPanelBusqueda && (
        <PanelBusqueda
          onBuscar={(destino, fechas) => manejarBusqueda(destino, fechas)} // Callback para manejar la búsqueda
          onCerrar={cerrarPanelBusqueda} // Callback para cerrar el panel
        />
      )}
    </div>
  );
};

export default Header;
