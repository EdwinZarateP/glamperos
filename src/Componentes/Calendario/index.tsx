import React, { useContext, useState, useEffect } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

interface CalendarioProps {
  nombreGlamping: string;
}

const Calendario: React.FC<CalendarioProps> = ({ nombreGlamping }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El almacenVariables no está disponible. Asegúrate de envolver el componente en un proveedor de almacenVariables.");
  }

  const { fechaInicio, setFechaInicio, fechaFin, setFechaFin, totalDias, setTotalDias } = almacenVariables;

  const [mesActual, setMesActual] = useState<number>(new Date().getMonth());
  const [anioActual, setAnioActual] = useState<number>(new Date().getFullYear());

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
      const dias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
      setTotalDias(dias);
    } else {
      setTotalDias(0);
    }
  }, [fechaInicio, fechaFin, setTotalDias]);

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
    setTotalDias(0);
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

  const renderizarEncabezadoDias = () => {
    const diasSemana = ["Do","Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
    return (
      <div className="calendario-dias-semana">
        {diasSemana.map((dia, index) => (
          <div key={index} className="calendario-dia-semana">
            {dia}
          </div>
        ))}
      </div>
    );
  };  

  const renderizarCalendario = (mes: number, anio: number) => {
    const dias = [];
    const totalDiasMes = new Date(anio, mes + 1, 0).getDate();
    const primerDiaDelMes = new Date(anio, mes, 1).getDay();

    for (let i = 0; i < primerDiaDelMes; i++) {
      dias.push(
        <div key={`vacio-${i}`} className="calendario-dia calendario-dia-vacio"></div>
      );
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
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

  return (
    <div className="calendario">
      <h1>{nombreGlamping}</h1>
      <h2 className="calendario-subtitulo">
        {fechaInicio && fechaFin
          ? `${formatearFecha(fechaInicio)} - ${formatearFecha(fechaFin)} (${totalDias} noche${totalDias === 1 ? "" : "s"})`
          : "Selecciona tus fechas"}
      </h2>
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
          <h2>{`${obtenerNombreMes(mesActual)} ${anioActual}`}</h2>
          {renderizarEncabezadoDias()}
          <div className="calendario-grid">
            {renderizarCalendario(mesActual, anioActual)}
          </div>
        </div>
        <div className="calendario-columna">
          <h2>{`${obtenerNombreMes((mesActual + 1) % 12)} ${
            mesActual === 11 ? anioActual + 1 : anioActual
          }`}</h2>
          {renderizarEncabezadoDias()}
          <div className="calendario-grid">
            {renderizarCalendario((mesActual + 1) % 12, mesActual === 11 ? anioActual + 1 : anioActual)}
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
