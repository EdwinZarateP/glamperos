import React, { useContext, useState, useEffect } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

interface CalendarioGeneralProps {
  cerrarCalendario: () => void;
  FechasReservadas?: Date[]; // Ahora es opcional
}

const CalendarioGeneral: React.FC<CalendarioGeneralProps> = ({
  cerrarCalendario,
  FechasReservadas = [], // Valor por defecto: array vacío
}) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El almacenVariables no está disponible. Asegúrate de envolver el componente en un proveedor de almacenVariables."
    );
  }

  const { fechaInicio, setFechaInicio, fechaFin, setFechaFin, setTotalDias } = almacenVariables;

  const [mesesVisibles, setMesesVisibles] = useState<{ mes: number; anio: number }[]>([]);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  useEffect(() => {
    const meses = [];
    for (let i = 0; i < 18; i++) {
      const nuevoMes = new Date(hoy.getFullYear(), hoy.getMonth() + i, 1);
      meses.push({ mes: nuevoMes.getMonth(), anio: nuevoMes.getFullYear() });
    }
    setMesesVisibles(meses);
  }, []);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      let diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
      let dias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

      if (FechasReservadas.length > 0) {
        const diasReservadosEnRango = [];
        for (let i = 0; i < dias; i++) {
          const dia = new Date(fechaInicio.getTime() + i * (1000 * 60 * 60 * 24));
          if (
            FechasReservadas.some(
              (fechaReservada) => fechaReservada.toDateString() === dia.toDateString()
            )
          ) {
            diasReservadosEnRango.push(dia);
          }
        }
        dias -= diasReservadosEnRango.length;
      }

      setTotalDias(dias);
    } else {
      setTotalDias(1);
    }
  }, [fechaInicio, fechaFin, FechasReservadas, setTotalDias]);

  const manejarClickFecha = (fecha: Date) => {
    if (esFechaReservada(fecha)) return;

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
    setTotalDias(1);
  };

  const esFechaSeleccionada = (fecha: Date): boolean => {
    if (fechaInicio && fechaFin) {
      return fecha >= fechaInicio && fecha <= fechaFin;
    }
    return fechaInicio?.toDateString() === fecha.toDateString();
  };

  const esFechaReservada = (fecha: Date): boolean => {
    return FechasReservadas.length > 0
      ? FechasReservadas.some(
          (fechaReservada) => fecha.toDateString() === fechaReservada.toDateString()
        )
      : false;
  };

  const esFechaDeshabilitada = (fecha: Date): boolean => fecha <= hoy;

  const renderizarEncabezadoDias = () => {
    const diasSemana = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
    return (
      <div className="CalendarioGeneral-dias-semana">
        {diasSemana.map((dia, index) => (
          <div key={index} className="CalendarioGeneral-dia-semana">
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
      dias.push(<div key={`vacio-${i}`} className="CalendarioGeneral-dia-vacio"></div>);
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
      const fecha = new Date(anio, mes, dia);
      const deshabilitada = esFechaDeshabilitada(fecha);
      const reservada = esFechaReservada(fecha);
      const seleccionado = esFechaSeleccionada(fecha);

      dias.push(
        <button
          key={dia}
          className={`CalendarioGeneral-dia ${
            deshabilitada ? "CalendarioGeneral-dia-deshabilitado" : ""
          } ${reservada ? "CalendarioGeneral-dia-reservada" : ""} ${
            seleccionado ? "CalendarioGeneral-dia-seleccionado" : ""
          } ${
            seleccionado && fechaInicio && fechaFin && fecha > fechaInicio && fecha < fechaFin
              ? "CalendarioGeneral-dia-rango"
              : ""
          }`}
          onClick={() => !deshabilitada && !reservada && manejarClickFecha(fecha)}
          disabled={deshabilitada || reservada}
        >
          {dia}
        </button>
      );
    }

    return dias;
  };

  return (
    <>
      <div className="CalendarioGeneral-fondo" onClick={cerrarCalendario}></div>
      <div className="CalendarioGeneral">
        <button className="CalendarioGeneral-cerrar" onClick={cerrarCalendario}>
          ✖
        </button>
        <h2 className="CalendarioGeneral-titulo">Elige la fecha de tu viaje</h2>
        <div className="CalendarioGeneral-meses">
          {mesesVisibles.map(({ mes, anio }, index) => (
            <div key={index} className="CalendarioGeneral-mes">
              <h2>
                {new Date(anio, mes).toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              {renderizarEncabezadoDias()}
              <div className="CalendarioGeneral-grid">{renderizarCalendario(mes, anio)}</div>
            </div>
          ))}
        </div>
        <div className="CalendarioGeneral-botones">
          <button onClick={manejarBorrarFechas} className="CalendarioGeneral-boton-borrar">
            Borrar fechas
          </button>
          <button
            onClick={cerrarCalendario}
            className="CalendarioGeneral-boton-siguiente"
            disabled={!fechaFin} // Deshabilitado si no se ha seleccionado una fecha de fin
          >
            Quiero estas Fechas
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarioGeneral;
