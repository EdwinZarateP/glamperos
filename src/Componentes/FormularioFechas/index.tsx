import React, { useContext, useEffect, useState } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";
import { GiCampingTent } from "react-icons/gi"; // Importa el ícono
import CalendarioGeneral from "../CalendarioGeneral"; // Importa el componente CalendarioGeneral

interface FormularioFechasProps {
  precioPorNoche: number;
  tarifaServicio?: number; // Hacer que la propiedad sea opcional
  huespedes: number;
}

const FormularioFechas: React.FC<FormularioFechasProps> = ({
  precioPorNoche,
  huespedes,
}) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const {
    fechaInicio,
    fechaFin,
    totalDias,
    setTotalSinImpuestos,
  } = almacenVariables;

  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);

  const fechasReservadas = [
    new Date(2024, 10, 20),
    new Date(2024, 10, 28),
    new Date(2024, 10, 29),
  ]; // Ejemplo de fechas reservadas

  const manejarAbrirCalendario = () => {
    setMostrarCalendario(true);
  };

  const cerrarCalendario = () => {
    setMostrarCalendario(false);
  };

  const formatearFecha = (fecha: Date | null): string => {
    if (!fecha) return "-";
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  };

  const totalSinImpuestos = precioPorNoche * totalDias;

  // Actualiza el valor en el contexto cuando se recalcula
  useEffect(() => {
    setTotalSinImpuestos(totalSinImpuestos);
  }, [totalSinImpuestos, setTotalSinImpuestos]);

  return (
    <div className="FormularioFechas-contenedor">
      <div className="FormularioFechas-precio">
        <span className="FormularioFechas-precioNoche">
          ${precioPorNoche.toLocaleString()} COP
        </span>{" "}
        <span>/ noche</span>
      </div>

      <div
        className="FormularioFechas-fechas"
        onClick={manejarAbrirCalendario} // Abre el calendario al hacer clic
      >
        <div className="FormularioFechas-fecha">
          <span className="FormularioFechas-fechaTitulo">LLEGADA</span>
          <span>{formatearFecha(fechaInicio)}</span>
        </div>
        <div className="FormularioFechas-fecha">
          <span className="FormularioFechas-fechaTitulo">SALIDA</span>
          <span>{formatearFecha(fechaFin)}</span>
        </div>
      </div>

      <div className="FormularioFechas-huespedes">
        <span>Huéspedes</span>
        <span>
          {huespedes} huésped{huespedes > 1 ? "es" : ""}
        </span>
      </div>

      <button className="FormularioFechas-botonReserva">
        <GiCampingTent className="FormularioFechas-botonReserva-icono" />
        Reserva
      </button>
      <p className="FormularioFechas-info">No se hará ningún cargo por ahora</p>

      <div className="FormularioFechas-detalleCosto">
        <div className="FormularioFechas-item">
          <span>
            ${precioPorNoche.toLocaleString()} COP x {totalDias} noche
            {totalDias > 1 ? "s" : ""}
          </span>
          <span>${(precioPorNoche * totalDias).toLocaleString()} COP</span>
        </div>
      </div>

      <div className="FormularioFechas-total">
        <span>Total</span>
        <span>${totalSinImpuestos.toLocaleString()} COP</span>
      </div>

      {/* Renderiza el CalendarioGeneral cuando se activa */}
      {mostrarCalendario && (
        <CalendarioGeneral
          cerrarCalendario={cerrarCalendario}
          FechasReservadas={fechasReservadas}
        />
      )}
    </div>
  );
};

export default FormularioFechas;
