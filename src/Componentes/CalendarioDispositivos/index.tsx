import React, { useContext, useState, useEffect } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

interface CalendarioDispositivosProps {
  cerrarCalendario: () => void;
  FechasReservadas: Date[];
}

const CalendarioDispositivos: React.FC<CalendarioDispositivosProps> = ({
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
      const reservada = esFechaReservada(fecha);

      dias.push(
        <button
          key={dia}
          className={`CalendarioDispositivos-dia ${
            esFechaSeleccionada(fecha) ? "CalendarioDispositivos-dia-seleccionado" : ""
          } ${reservada ? "CalendarioDispositivos-dia-reservada" : ""} ${
            deshabilitada ? "CalendarioDispositivos-dia-deshabilitado" : ""
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
      <div className="CalendarioDispositivos-fondo" onClick={cerrarCalendario}></div>
      <div className="CalendarioDispositivos">
        <button className="CalendarioDispositivos-cerrar" onClick={cerrarCalendario}>
          ✖
        </button>
        <div className="CalendarioDispositivos-meses">
          {mesesVisibles.map(({ mes, anio }, index) => (
            <div key={index} className="CalendarioDispositivos-mes">
              <h2>
                {new Date(anio, mes).toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              {renderizarEncabezadoDias()}
              <div className="CalendarioDispositivos-grid">{renderizarCalendario(mes, anio)}</div>
            </div>
          ))}
        </div>
        <div className="CalendarioDispositivos-botones">
          <button onClick={manejarBorrarFechas} className="CalendarioDispositivos-boton-borrar">
            Borrar fechas
          </button>
          <button onClick={cerrarCalendario} className="CalendarioDispositivos-boton-siguiente">
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarioDispositivos;
