import React, { useContext, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import { GiCampingTent } from "react-icons/gi";
import CalendarioGeneral from "../CalendarioGeneral";
import { useParams, Link } from "react-router-dom";
import Visitantes from "../Visitantes";
import viernesysabadosyfestivos from "../../Componentes/BaseFinesSemana/fds.json";
import { calcularTarifaServicio } from "../../Funciones/calcularTarifaServicio";
import { ExtraerTarifaGlamperos } from "../../Funciones/ExtraerTarifaGlamperos";
import "./estilos.css";

interface FormularioFechasProps {
  precioPorNoche: number;
  descuento: number;
}

const FormularioFechas: React.FC<FormularioFechasProps> = ({ precioPorNoche, descuento }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const {
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    totalDias,
    setTotalDias,
    totalHuespedes,
    mostrarCalendario,
    setMostrarCalendario,
    mostrarVisitantes,
    setMostrarVisitantes,
    fechaInicioConfirmado,
    fechaFinConfirmado,
    // setFechasSeparadas
  } = almacenVariables;

  let { glampingId, fechaInicioUrl, fechaFinUrl, totalDiasUrl } = useParams<{ glampingId: string; fechaInicioUrl: string; fechaFinUrl: string; totalDiasUrl: string }>();

  // Función para actualizar la URL completa
  const actualizarUrl = (fechaInicioParam: Date, fechaFinParam: Date, totalDias: number) => {
    const fechaInicioStr = fechaInicioParam.toISOString().split("T")[0];
    const fechaFinStr = fechaFinParam.toISOString().split("T")[0];
    const totalDiasStr = totalDias.toString();
    const nuevaUrl = `/ExplorarGlamping/${glampingId}/${fechaInicioStr}/${fechaFinStr}/${totalDiasStr}`;
    window.history.replaceState(null, '', nuevaUrl);
  };

  useEffect(() => {
    if (fechaInicio && fechaFin && totalDias) {
      actualizarUrl(fechaInicio, fechaFin, totalDias);
    }
  }, [fechaInicio, fechaFin, totalDias]);

  // Prioridad: primero usar el contexto si existe, de lo contrario usar la URL.
  const fechaInicioRender = fechaInicio
    ? fechaInicio
    : fechaInicioUrl
    ? new Date(fechaInicioUrl)
    : null;

  const fechaFinRender = fechaFin
    ? fechaFin
    : fechaFinUrl
    ? new Date(fechaFinUrl)
    : null;

  let totalDiasRender = totalDias
    ? totalDias
    : totalDiasUrl
    ? parseInt(totalDiasUrl, 10)
    : 1;

  // Fechas por defecto
  const hoy = new Date();
  const fechaInicioPorDefecto = new Date();
  fechaInicioPorDefecto.setDate(hoy.getDate() + 1); // Día de mañana
  const fechaFinPorDefecto = new Date();
  fechaFinPorDefecto.setDate(hoy.getDate() + 2); // Pasado mañana


  const fechaInicioReservada = fechaInicio
  ? fechaInicio.toISOString().split('T')[0]
  : fechaInicioUrl
  ? new Date(fechaInicioUrl).toISOString().split('T')[0]
  : fechaInicioPorDefecto.toISOString().split('T')[0];

  const fechaFinReservada = fechaFin
  ? fechaFin.toISOString().split('T')[0]
  : fechaFinUrl
  ? new Date(fechaFinUrl).toISOString().split('T')[0]
  : fechaFinPorDefecto.toISOString().split('T')[0];


  const precioConTarifa = calcularTarifaServicio(precioPorNoche, viernesysabadosyfestivos, descuento, fechaInicioConfirmado ?? fechaInicioPorDefecto, fechaFinConfirmado ?? fechaFinPorDefecto);
  const porcentajeGlamperos = ExtraerTarifaGlamperos(precioPorNoche);


  const formatearFecha = (fecha: Date | null): string => {
    if (!fecha) return "-";
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  };

  const TarifaGlamperos = Math.round(precioConTarifa - precioConTarifa * (1 / (1 + porcentajeGlamperos)));


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
            ${(Math.round(precioConTarifa / totalDias)).toLocaleString()} COP
          </span>
          <span>/ noche</span>
        </div>

        <div
          className="FormularioFechas-fechas"
          onClick={() => {
            setFechaInicio(fechaInicioRender);
            setFechaFin(fechaFinRender);
            setTotalDias(totalDiasRender);
            setMostrarCalendario(true);
          }}
        >
          <div className="FormularioFechas-fecha">
            <span className="FormularioFechas-fechaTitulo">LLEGADA</span>
            <span>{formatearFecha(fechaInicioRender)}</span>
          </div>
          <div className="FormularioFechas-fecha">
            <span className="FormularioFechas-fechaTitulo">SALIDA</span>
            <span>{formatearFecha(fechaFinRender)}</span>
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

        {/* Usar Link para redirigir */}
        <Link        
          to={`/Reservar/${glampingId}/${fechaInicioReservada}/${fechaFinReservada}/${precioConTarifa}/${TarifaGlamperos}/${totalDias}`}
          className="FormularioFechas-botonReserva"
        >
          <GiCampingTent className="FormularioFechas-botonReserva-icono" />
          Reservar
        </Link>

        <p className="FormularioFechas-info">No se hará ningún cargo por ahora</p>

        <div className="FormularioFechas-detalleCosto">
          <div className="FormularioFechas-item">
            <span>
              ${(Math.round((precioConTarifa / totalDias) * (1 / (1 + porcentajeGlamperos)))).toLocaleString()} COP x{" "}
              {totalDiasRender === 1 ? totalDiasRender : totalDiasRender} noche
              {totalDiasRender > 1 ? "s" : ""}
            </span>
            <span>
              ${Math.round(precioConTarifa * (1 / (1 + porcentajeGlamperos))).toLocaleString()} COP
            </span>
          </div>
          <div className="FormularioFechas-item">
            <span>Tarifa por servicio Glamperos</span>
            <span>
              ${TarifaGlamperos.toLocaleString()} COP
            </span>
          </div>
        </div>

        <div className="FormularioFechas-total">
          <span>Total</span>
          <span>${precioConTarifa.toLocaleString()} COP</span>
        </div>
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral
          cerrarCalendario={() => setMostrarCalendario(false)}
        />
      )}

      {mostrarVisitantes && (
        <Visitantes onCerrar={() => setMostrarVisitantes(false)} />
      )}
    </>
  );
};

export default FormularioFechas;
