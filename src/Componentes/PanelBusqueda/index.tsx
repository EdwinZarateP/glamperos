import React, { useState, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import CalendarioGeneral from "../CalendarioGeneral";
import Visitantes from "../Visitantes"; // Importa el componente Visitantes
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

interface PanelBusquedaProps {
  onBuscar: (destino: string, fechas: string, huespedes: number) => void;
  onCerrar: () => void;
}

const PanelBusqueda: React.FC<PanelBusquedaProps> = ({ onBuscar, onCerrar }) => {
  const [destino, setDestino] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarVisitantes, setMostrarVisitantes] = useState(false); // Estado para mostrar Visitantes

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const {
    fechaInicio,
    fechaFin,
    setFechaInicio,
    setFechaFin,
    Cantidad_Adultos,
    Cantidad_Niños,
  } = almacenVariables;

  const manejarBuscar = () => {
    const fechas = fechaInicio && fechaFin
      ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}`
      : '';
    const totalHuespedes = Cantidad_Adultos + Cantidad_Niños;
    onBuscar(destino, fechas, totalHuespedes);
    onCerrar();
  };

  const cerrarCalendario = () => {
    setMostrarCalendario(false);
  };

  const cerrarVisitantes = () => {
    setMostrarVisitantes(false);
  };

  const formatFecha = (fecha: Date): string => {
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short', // Cambiado a "short" para mostrar el nombre del mes abreviado
      year: 'numeric',
    });
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
              placeholder="Explora destinos"
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
                ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}`
                : "Selecciona fechas"}
            </span>
          </div>

          {/* Campo de huéspedes */}
          <div
            className="PanelBusqueda-huespedes"
            onClick={() => setMostrarVisitantes(true)} // Mostrar Visitantes al hacer clic
          >
            <span className="PanelBusqueda-huespedes-titulo">Huéspedes</span>
            <span className="PanelBusqueda-huespedes-valor">
              {Cantidad_Adultos + Cantidad_Niños > 0
                ? `${Cantidad_Adultos + Cantidad_Niños} huésped${
                    Cantidad_Adultos + Cantidad_Niños > 1 ? 'es' : ''
                  }`
                : 'Agrega huéspedes'}
            </span>
          </div>
        </div>

        <div className="PanelBusqueda-botones">
          {/* Botón para limpiar */}
          <button
            className="PanelBusqueda-limpiar"
            onClick={() => {
              setDestino('');
              setFechaInicio(null);
              setFechaFin(null);
              // No es necesario reiniciar Cantidad_Adultos ni Cantidad_Niños aquí porque el componente Visitantes maneja esos valores.
            }}
          >
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

      {/* Mostrar el componente Visitantes condicionalmente */}
      {mostrarVisitantes && (
        <div className="Visitantes-overlay">
          <div className="Visitantes-modal">
            <Visitantes />
            <button className="Visitantes-cerrar" onClick={cerrarVisitantes}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PanelBusqueda;
