import React, { useState } from "react";
import "./estilos.css";

interface CalendarioProps {
  nombreGlamping: string; // Propiedad recibida
}

const Calendario: React.FC<CalendarioProps> = ({ nombreGlamping }) => {
  const [mesActual, setMesActual] = useState<number>(new Date().getMonth());
  const [anioActual, setAnioActual] = useState<number>(new Date().getFullYear());
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Asegurar que la comparación sea solo por fecha

  const formatearFecha = (fecha: Date): string => {
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  };

  const manejarClickFecha = (fecha: Date) => {
    if (!fechaInicio || (fechaInicio && fechaFin)) {
      setFechaInicio(fecha);
      setFechaFin(null);
    } else if (fechaInicio && !fechaFin && fecha >= fechaInicio) {
      setFechaFin(fecha);
    } else {
      setFechaInicio(fecha);
      setFechaFin(null);
    }
  };

  const manejarBorrarFechas = () => {
    setFechaInicio(null);
    setFechaFin(null);
  };

  const esFechaSeleccionada = (fecha: Date): boolean => {
    if (fechaInicio && fechaFin) {
      return fecha >= fechaInicio && fecha <= fechaFin;
    }
    return fechaInicio?.toDateString() === fecha.toDateString();
  };

  const esFechaDeshabilitada = (fecha: Date): boolean => {
    return fecha <= hoy;
  };

  const diasEnMes = (anio: number, mes: number) =>
    new Date(anio, mes + 1, 0).getDate();

  const calcularDiasSeleccionados = (): number => {
    if (fechaInicio && fechaFin) {
      const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
      return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)) + 1; // Incluye ambos días
    }
    return 0;
  };

  const obtenerTitulo = (): string => {
    if (fechaInicio && fechaFin) {
      const dias = calcularDiasSeleccionados();
      return `${nombreGlamping} - ${dias} ${dias === 1 ? "día" : "días"}`;
    }
    return "Selecciona las fechas";
  };

  const obtenerSubtitulo = (): string => {
    if (!fechaInicio && !fechaFin) {
      return "Agrega las fechas de viaje";
    }
    if (fechaInicio && !fechaFin) {
      return "Ahora selecciona una fecha de salida";
    }
    if (fechaInicio && fechaFin) {
      return `${formatearFecha(fechaInicio)} - ${formatearFecha(fechaFin)}`;
    }
    return "";
  };

  const renderizarCalendario = (mes: number, anio: number) => {
    const dias = [];
    const totalDias = diasEnMes(anio, mes);
    const primerDiaDelMes = new Date(anio, mes, 1).getDay();

    // Agregar días vacíos al inicio para alinear
    for (let i = 0; i < primerDiaDelMes; i++) {
      dias.push(
        <div key={`vacio-${i}`} className="calendario-dia calendario-dia-vacio"></div>
      );
    }

    // Agregar días del mes
    for (let dia = 1; dia <= totalDias; dia++) {
      const fecha = new Date(anio, mes, dia);
      const deshabilitada = esFechaDeshabilitada(fecha);

      dias.push(
        <button
          key={dia}
          className={`calendario-dia ${
            esFechaSeleccionada(fecha) ? "calendario-dia-seleccionado" : ""
          } ${deshabilitada ? "calendario-dia-deshabilitado" : ""}`}
          onClick={() => !deshabilitada && manejarClickFecha(fecha)}
          disabled={deshabilitada}
        >
          {dia}
        </button>
      );
    }

    return dias;
  };

  const manejarMesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual((prevAnio) => prevAnio - 1);
    } else {
      setMesActual((prevMes) => prevMes - 1);
    }
  };

  const manejarMesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual((prevAnio) => prevAnio + 1);
    } else {
      setMesActual((prevMes) => prevMes + 1);
    }
  };

  const obtenerNombreMes = (mes: number) =>
    [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ][mes];

  const mesSiguiente = (mesActual + 1) % 12;
  const anioMesSiguiente = mesActual === 11 ? anioActual + 1 : anioActual;

  return (
    <div className="calendario">
      <h1>{obtenerTitulo()}</h1>
      <h2 className="calendario-subtitulo">{obtenerSubtitulo()}</h2>
      <div className="calendario-encabezado">
        <button onClick={manejarMesAnterior} className="calendario-navegacion">
          &lt;
        </button>
        <button onClick={manejarMesSiguiente} className="calendario-navegacion">
          &gt;
        </button>
      </div>
      <div className="calendario-columnas">
        <div className="calendario-columna">
          <h2>
            {obtenerNombreMes(mesActual)} {anioActual}
          </h2>
          <div className="calendario-grid">
            {renderizarCalendario(mesActual, anioActual)}
          </div>
        </div>
        <div className="calendario-columna">
          <h2>
            {obtenerNombreMes(mesSiguiente)} {anioMesSiguiente}
          </h2>
          <div className="calendario-grid">
            {renderizarCalendario(mesSiguiente, anioMesSiguiente)}
          </div>
        </div>
      </div>
      <div className="calendario-boton-borrar">
        <button onClick={manejarBorrarFechas} className="calendario-borrar">
          Borrar fechas
        </button>
      </div>
    </div>
  );
};

export default Calendario;
