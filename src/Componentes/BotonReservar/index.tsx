import React, { useContext, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import { GiCampingTent } from "react-icons/gi";
import CalendarioGeneral from "../CalendarioGeneral";
import { useParams, Link } from "react-router-dom";
import viernesysabadosyfestivos from "../../Componentes/BaseFinesSemana/fds.json";
import { calcularTarifaServicio } from "../../Funciones/calcularTarifaServicio";
import { ExtraerTarifaGlamperos } from "../../Funciones/ExtraerTarifaGlamperos";
import "./estilos.css";

interface BotonReservaProps {
  precioPorNoche: number;
  descuento: number;
}

const ReservarBoton: React.FC<BotonReservaProps> = ({ precioPorNoche, descuento }) => {
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
    mostrarCalendario,
    setMostrarCalendario,
  } = almacenVariables;

  let { glampingId, fechaInicioUrl, fechaFinUrl, totalDiasUrl } = useParams<{
    glampingId: string;
    fechaInicioUrl: string;
    fechaFinUrl: string;
    totalDiasUrl: string;
  }>();

  const actualizarUrl = (fechaInicioParam: Date, fechaFinParam: Date, totalDias: number) => {
    const fechaInicioStr = fechaInicioParam.toISOString().split("T")[0];
    const fechaFinStr = fechaFinParam.toISOString().split("T")[0];
    const totalDiasStr = totalDias.toString();
    const nuevaUrl = `/ExplorarGlamping/${glampingId}/${fechaInicioStr}/${fechaFinStr}/${totalDiasStr}`;
    window.history.replaceState(null, "", nuevaUrl);
  };

  useEffect(() => {
    if (fechaInicio && fechaFin && totalDias) {
      actualizarUrl(fechaInicio, fechaFin, totalDias);
    }
  }, [fechaInicio, fechaFin, totalDias]);

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

  let totalDiasRender = 1;
  if (fechaInicioRender && fechaFinRender) {
    const diferenciaMillis = fechaFinRender.getTime() - fechaInicioRender.getTime();
    totalDiasRender = Math.ceil(diferenciaMillis / (24 * 60 * 60 * 1000));
  } else if (totalDiasUrl) {
    totalDiasRender = parseInt(totalDiasUrl, 10);
  }

  const hoy = new Date();
  const fechaInicioPorDefecto = new Date();
  fechaInicioPorDefecto.setDate(hoy.getDate() + 1);
  const fechaFinPorDefecto = new Date();
  fechaFinPorDefecto.setDate(hoy.getDate() + 2);

  const fechaInicioReservada = fechaInicio
    ? fechaInicio.toISOString().split("T")[0]
    : fechaInicioUrl
    ? new Date(fechaInicioUrl).toISOString().split("T")[0]
    : fechaInicioPorDefecto.toISOString().split("T")[0];

    let fechaFinReservada = fechaFin
    ? fechaFin.toISOString().split('T')[0]
    : fechaFinUrl
    ? new Date(fechaFinUrl).toISOString().split('T')[0]
    : fechaFinPorDefecto.toISOString().split('T')[0];
  
    // Comprobar si la fechaInicioReservada es mayor que la fechaFinReservada
    if (new Date(fechaInicioReservada) > new Date(fechaFinReservada)) {
      const nuevaFechaFin = new Date(fechaInicioReservada);
      nuevaFechaFin.setDate(nuevaFechaFin.getDate() + 1); // Añadir un día a la fecha de inicio
      fechaFinReservada = nuevaFechaFin.toISOString().split('T')[0]; // Actualizar fechaFinReservada
    }
  

    const precioConTarifa = Math.round(calcularTarifaServicio(
      precioPorNoche,
      viernesysabadosyfestivos,
      descuento,
      fechaInicioReservada,
      fechaFinReservada
    ));
    
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

  const TarifaGlamperos = Math.round(
    precioConTarifa - precioConTarifa * (1 / (1 + porcentajeGlamperos))
  );

  useEffect(() => {
    if (!fechaInicio && fechaInicioUrl) setFechaInicio(new Date(fechaInicioUrl));
    if (!fechaFin && fechaFinUrl) setFechaFin(new Date(fechaFinUrl));
  }, [fechaInicioUrl, fechaFinUrl, setFechaInicio, setFechaFin]);

  return (
    <div className="ReservarBoton-container">

      <div className="ReservarBoton-total">
        <span>${precioConTarifa.toLocaleString()} COP</span>
        <div
        className="ReservarBoton-fechas"
        onClick={() => {
          setFechaInicio(fechaInicioRender);
          setFechaFin(fechaFinRender);
          setTotalDias(totalDiasRender);
          setMostrarCalendario(true);
        }}
      >
        <div className="ReservarBoton-fecha">
           <span className="ReservarBoton-fecha-dias">
              {totalDiasRender === 1 ? totalDiasRender : totalDiasRender} noche
              {totalDiasRender > 1 ? "s" : ""}
            </span>
          <span>{formatearFecha(fechaInicioRender)} - {formatearFecha(fechaFinRender)}</span>
        </div>
      </div>
      
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral cerrarCalendario={() => setMostrarCalendario(false)} />
      )}
            <Link
        to={`/Reservar/${glampingId}/${fechaInicioReservada}/${fechaFinReservada}/${precioConTarifa}/${TarifaGlamperos}/${totalDiasRender}`}
        className="ReservarBoton-boton"
      >
        <GiCampingTent className="ReservarBoton-boton-icono" />
        Reservar
      </Link>
    </div>
  );
};

export default ReservarBoton;
