import React, { useState, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import CalendarioGeneral from "../CalendarioGeneral";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

interface PanelBusquedaProps {
  onBuscar: (destino: string, fechas: string, huespedes: number) => void;
  onCerrar: () => void;
}

const PanelBusqueda: React.FC<PanelBusquedaProps> = ({ onBuscar, onCerrar }) => {
  const [destino, setDestino] = useState('');
  const [huespedes, setHuespedes] = useState(0);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { fechaInicio, fechaFin, setFechaInicio, setFechaFin } = almacenVariables;

  const manejarBuscar = () => {
    const fechas = fechaInicio && fechaFin
      ? `${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`
      : '';
    onBuscar(destino, fechas, huespedes);
    onCerrar();
  };

  const cerrarCalendario = () => {
    setMostrarCalendario(false);
  };

  return (
    <>
      {/* Fondo opaco */}
      <div className="PanelBusqueda-fondo" onClick={onCerrar}></div>

      {/* Contenedor principal */}
      <div className="PanelBusqueda-contenedor">
        <h2 className="PanelBusqueda-titulo">¿A dónde quieres viajar?</h2>

        <div className="PanelBusqueda-barra">
          {/* Campo de destino */}
          <div className="PanelBusqueda-destino">
            <FiSearch className="PanelBusqueda-icono" />
            <input
              type="text"
              placeholder="Buscar destinos"
              className="PanelBusqueda-input"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>

          {/* Campo de fechas */}
          <div
            className="PanelBusqueda-fechas"
            onClick={() => setMostrarCalendario(true)} // Mostrar calendario
          >
            <span className="PanelBusqueda-fechas-titulo">Fechas</span>
            <span className="PanelBusqueda-fechas-valor">
              {fechaInicio && fechaFin
                ? `${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`
                : "Selecciona fechas"}
            </span>
          </div>

          {/* Campo de huéspedes */}
          <div
            className="PanelBusqueda-huespedes"
            onClick={() => setHuespedes((prev) => prev + 1)} // Incrementa huéspedes como ejemplo
          >
            <span className="PanelBusqueda-huespedes-titulo">Huéspedes</span>
            <span className="PanelBusqueda-huespedes-valor">
              {huespedes > 0 ? `${huespedes} huésped${huespedes > 1 ? 'es' : ''}` : 'Agrega huéspedes'}
            </span>
          </div>
        </div>

        <div className="PanelBusqueda-botones">
          {/* Botón para limpiar */}
          <button className="PanelBusqueda-limpiar" onClick={() => {
            setDestino('');
            setFechaInicio(null);
            setFechaFin(null);
            setHuespedes(0);
          }}>
            Limpiar todo
          </button>

          {/* Botón para buscar */}
          <button className="PanelBusqueda-buscar" onClick={manejarBuscar}>
            <FiSearch className="PanelBusqueda-buscar-icono" /> Busca
          </button>
        </div>
      </div>

      {/* Mostrar el calendario condicionalmente */}
      {mostrarCalendario && (
        <CalendarioGeneral
          cerrarCalendario={cerrarCalendario}
          FechasReservadas={[
            new Date(2024, 10, 20),
            new Date(2024, 10, 28),
            new Date(2024, 10, 29),
          ]}
        />
      )}
    </>
  );
};

export default PanelBusqueda;
