import React, { useContext, useEffect } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";
import { GiCampingTent } from "react-icons/gi";
import CalendarioGeneral from "../CalendarioGeneral";
import Visitantes from "../Visitantes";

interface FormularioFechasProps {
  precioPorNoche: number;
}

const FormularioFechas: React.FC<FormularioFechasProps> = ({ precioPorNoche }) => {
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
    totalHuespedes,
    setTotalSinImpuestos,
    mostrarCalendario,
    setMostrarCalendario,
    mostrarVisitantes,
    setMostrarVisitantes,
  } = almacenVariables;

  const FechasReservadas = [
    new Date(2024, 10, 20),
    new Date(2024, 10, 28),
    new Date(2024, 10, 29),
  ];

  const formatearFecha = (fecha: Date | null): string => {
    if (!fecha) return "-";
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  };

  const totalSinImpuestos = precioPorNoche * (totalDias === 0 ? 1 : totalDias);

  useEffect(() => {
    setTotalSinImpuestos(totalSinImpuestos);
  }, [totalSinImpuestos, setTotalSinImpuestos]);

  useEffect(() => {
    if (mostrarVisitantes) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [mostrarVisitantes]);

  return (
    <>
      <div className="FormularioFechas-contenedor">
        <div className="FormularioFechas-precio">
          <span className="FormularioFechas-precioNoche">
            ${precioPorNoche.toLocaleString()} COP
          </span>
          <span>/ noche</span>
        </div>

        <div
          className="FormularioFechas-fechas"
          onClick={() => setMostrarCalendario(true)}
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

        <div
          className="FormularioFechas-huespedes"
          onClick={() => setMostrarVisitantes(true)}
        >
          <span>Huéspedes</span>
          <span>
            {totalHuespedes} huésped{totalHuespedes > 1 ? "es" : ""}
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
              ${precioPorNoche.toLocaleString()} COP x{" "}
              {totalDias === 0 ? 1 : totalDias} noche
              {totalDias > 1 ? "s" : ""}
            </span>
            <span>
              ${(precioPorNoche * (totalDias === 0 ? 1 : totalDias)).toLocaleString()} COP
            </span>
          </div>
        </div>

        <div className="FormularioFechas-total">
          <span>Total</span>
          <span>${totalSinImpuestos.toLocaleString()} COP</span>
        </div>
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral
          cerrarCalendario={() => setMostrarCalendario(false)}
          FechasReservadas={FechasReservadas}
        />
      )}

      {mostrarVisitantes && (
        <Visitantes onCerrar={() => setMostrarVisitantes(false)} />
      )}
    </>
  );
};

export default FormularioFechas;
