import React, { useContext, useState } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

const CalendarioDispositivos: React.FC<{ cerrarCalendario: () => void }> = ({ cerrarCalendario }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El almacenVariables no está disponible. Asegúrate de envolver el componente en un proveedor de almacenVariables.");
  }

  const { fechaInicio, setFechaInicio, fechaFin, setFechaFin } = almacenVariables;
  const [mesActual, setMesActual] = useState<number>(new Date().getMonth());
  const [anioActual, setAnioActual] = useState<number>(new Date().getFullYear());

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

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

  const esFechaDeshabilitada = (fecha: Date): boolean => fecha <= hoy;

  const renderizarEncabezadoDias = () => {
    const diasSemana = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
    return (
      <div className="CalendarioDispositivos-dias-semana">
        {diasSemana.map((dia, index) => (
          <div key={index} className="CalendarioDispositivos-dia-semana">
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
      dias.push(<div key={`vacio-${i}`} className="CalendarioDispositivos-dia-vacio"></div>);
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
      const fecha = new Date(anio, mes, dia);
      const deshabilitada = esFechaDeshabilitada(fecha);

      dias.push(
        <button
          key={dia}
          className={`CalendarioDispositivos-dia ${
            esFechaSeleccionada(fecha) ? "CalendarioDispositivos-dia-seleccionado" : ""
          } ${deshabilitada ? "CalendarioDispositivos-dia-deshabilitado" : ""}`}
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

  const manejarSiguiente = () => {
    // Realiza cualquier lógica necesaria antes de cerrar el calendario
    cerrarCalendario();
  };

  return (
    <>
      <div className="CalendarioDispositivos-fondo" onClick={cerrarCalendario}></div>
      <div className="CalendarioDispositivos">
        <div className="CalendarioDispositivos-encabezado">
          <button onClick={manejarMesAnterior} className="CalendarioDispositivos-navegacion">
            &lt;
          </button>
          <span className="CalendarioDispositivos-mes">
            {new Date(anioActual, mesActual).toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button onClick={manejarMesSiguiente} className="CalendarioDispositivos-navegacion">
            &gt;
          </button>
        </div>
        <div className="CalendarioDispositivos-cuerpo">
          {renderizarEncabezadoDias()}
          <div className="CalendarioDispositivos-grid">{renderizarCalendario(mesActual, anioActual)}</div>
        </div>
        {fechaInicio && fechaFin && (
          <div className="CalendarioDispositivos-botones">
            <button onClick={manejarBorrarFechas} className="CalendarioDispositivos-boton-borrar">
              Borrar fechas
            </button>
            <button onClick={manejarSiguiente} className="CalendarioDispositivos-boton-siguiente">
              Siguiente
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarioDispositivos;
