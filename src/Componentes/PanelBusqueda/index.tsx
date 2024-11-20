import React, { useState, useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import CalendarioGeneral from "../CalendarioGeneral";
import Visitantes from "../Visitantes";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

interface PanelBusquedaProps {
  onBuscar: (destino: string, fechas: string, huespedes: number) => void;
  onCerrar: () => void;
}

const PanelBusqueda: React.FC<PanelBusquedaProps> = ({ onBuscar, onCerrar }) => {
  const [destino, setDestino] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarVisitantes, setMostrarVisitantes] = useState(false);

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
    setCantidad_Adultos,
    setCantidad_Niños,
    setCantidad_Bebes,
    setCantidad_Mascotas,
    setTotalDias,
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
      month: 'short',
      year: 'numeric',
    });
  };

  // Efecto para deshabilitar el scroll cuando el PanelBusqueda está abierto
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      <div className="PanelBusqueda-fondo" onClick={onCerrar}></div>

      <div className="PanelBusqueda-contenedor">
        <h2 className="PanelBusqueda-titulo">¿A dónde quieres viajar?</h2>

        <div className="PanelBusqueda-barra">
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

          <div className="PanelBusqueda-fechas" onClick={() => setMostrarCalendario(true)}>
            <span className="PanelBusqueda-fechas-titulo">Fechas</span>
            <span className="PanelBusqueda-fechas-valor">
              {fechaInicio && fechaFin
                ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}`
                : "Selecciona fechas"}
            </span>
          </div>

          <div className="PanelBusqueda-huespedes" onClick={() => setMostrarVisitantes(true)}>
            <span className="PanelBusqueda-huespedes-titulo">Huéspedes</span>
            <span className="PanelBusqueda-huespedes-valor">
              {Cantidad_Adultos + Cantidad_Niños > 0
                ? `${Cantidad_Adultos + Cantidad_Niños} huésped${Cantidad_Adultos + Cantidad_Niños > 1 ? 'es' : ''}`
                : 'Agrega huéspedes'}
            </span>
          </div>
        </div>

        <div className="PanelBusqueda-botones">
          <button
            className="PanelBusqueda-limpiar"
            onClick={() => {
              setDestino('');
              setFechaInicio(null);
              setFechaFin(null);
              setCantidad_Adultos(0);
              setCantidad_Niños(0);
              setCantidad_Bebes(0);
              setCantidad_Mascotas(0);
              setTotalDias(0);
            }}
          >
            Limpiar todo
          </button>

          <button className="PanelBusqueda-buscar" onClick={manejarBuscar}>
            <FiSearch className="PanelBusqueda-buscar-icono" /> Busca
          </button>
        </div>
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral cerrarCalendario={cerrarCalendario} FechasReservadas={[]} />
      )}

      {mostrarVisitantes && (
        <>
          <div className="Visitantes-fondo" onClick={cerrarVisitantes}></div>
          <div className="Visitantes-modal">
            <Visitantes />
            <button className="Visitantes-cerrar" onClick={cerrarVisitantes}>
              Ellos son los elegidos
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PanelBusqueda;
