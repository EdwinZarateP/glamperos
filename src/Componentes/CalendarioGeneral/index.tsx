import React, { useContext, useState, useEffect } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

interface CalendarioGeneralProps {
  cerrarCalendario: () => void;
  FechasReservadas: Date[];
}

const CalendarioGeneral: React.FC<CalendarioGeneralProps> = ({
  cerrarCalendario,
  FechasReservadas,
}) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El almacenVariables no está disponible. Asegúrate de envolver el componente en un proveedor de almacenVariables."
    );
  }

  const { fechaInicio, setFechaInicio, fechaFin, setFechaFin } = almacenVariables;

  const [mesesVisibles, setMesesVisibles] = useState<{ mes: number; anio: number }[]>([]);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const meses = [];
    for (let i = 0; i < 18; i++) {
      const nuevoMes = new Date(hoy.getFullYear(), hoy.getMonth() + i, 1);
      meses.push({ mes: nuevoMes.getMonth(), anio: nuevoMes.getFullYear() });
    }
    setMesesVisibles(meses);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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

  const esFechaReservada = (fecha: Date): boolean => {
    return FechasReservadas.some(
      (fechaReservada) => fecha.toDateString() === fechaReservada.toDateString()
    );
  };

  const esFechaDeshabilitada = (fecha: Date): boolean => fecha < hoy;

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

      dias.push(
        <button
          key={dia}
          className={`CalendarioGeneral-dia ${
            esFechaSeleccionada(fecha) ? "CalendarioGeneral-dia-seleccionado" : ""
          } ${reservada ? "CalendarioGeneral-dia-reservada" : ""} ${
            deshabilitada ? "CalendarioGeneral-dia-deshabilitado" : ""
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
          <button onClick={cerrarCalendario} className="CalendarioGeneral-boton-siguiente">
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarioGeneral;
