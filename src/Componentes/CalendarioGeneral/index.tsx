import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";  // Importamos SweetAlert2
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

interface CalendarioGeneralProps {
  cerrarCalendario: () => void;
}

const CalendarioGeneral: React.FC<CalendarioGeneralProps> = ({
  cerrarCalendario,
}) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El almacenVariables no está disponible. Asegúrate de envolver el componente en un proveedor de almacenVariables."
    );
  }

  const { 
    fechaInicio, 
    setFechaInicio, 
    fechaFin, 
    setFechaFin, 
    setTotalDias, 
    setFechaInicioConfirmado, 
    setFechaFinConfirmado, 
    FechasSeparadas 
  } = almacenVariables;

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

      if (FechasSeparadas.length > 0) {
        const diasReservadosEnRango = [];
        for (let i = 0; i < dias; i++) {
          const dia = new Date(fechaInicio.getTime() + i * (1000 * 60 * 60 * 24));
          if (
            FechasSeparadas.some(
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
  }, [fechaInicio, fechaFin, FechasSeparadas, setTotalDias]);

  // Validación para evitar fecha de inicio posterior a fecha de fin
  const validarFechas = () => {
    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el rango de fechas',
        text: 'La fecha de inicio no puede ser posterior a la fecha de fin.',
      });
      return false;
    }
    return true;
  };

  const manejarClickFecha = (fecha: Date) => {
    if (esFechaReservada(fecha)) return;

    if (!fechaInicio || (fechaInicio && fechaFin)) {
      setFechaInicio(fecha);
      setFechaFin(null);
    } else if (fechaInicio && !fechaFin && fecha >= fechaInicio) {
      if (verificarRango(fechaInicio, fecha)) {
        setFechaFin(fecha);
      } else {
        // Usamos Swal para mostrar el mensaje
        Swal.fire({
          icon: 'error',
          title: 'Rango de fechas no disponible',
          text: 'El rango de fechas seleccionado incluye fechas reservadas. Por favor, elige otro rango.',
        });
      }
    } else {
      setFechaInicio(fecha);
      setFechaFin(null);
    }

    // Validamos las fechas después de hacer la selección
    if (!validarFechas()) {
      setFechaInicio(null);
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
    return FechasSeparadas.length > 0
      ? FechasSeparadas.some(
          (fechaReservada) => fecha.toDateString() === fechaReservada.toDateString()
        )
      : false;
  };

  const esFechaDeshabilitada = (fecha: Date): boolean => {
    if (fecha <= hoy) {
      return true;
    }

    return false;
  };

  const verificarRango = (inicio: Date, fin: Date): boolean => {
    const diferenciaTiempo = fin.getTime() - inicio.getTime();
    const totalDiasRango = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= totalDiasRango; i++) {
      const dia = new Date(inicio.getTime() + i * (1000 * 60 * 60 * 24));
      if (FechasSeparadas.some(
        (fechaReservada) => fechaReservada.toDateString() === dia.toDateString()
      )) {
        return false; // Hay una fecha reservada dentro del rango
      }
    }

    return true; // El rango está libre de fechas reservadas
  };

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
            onClick={() => {
              if (validarFechas()) {
                cerrarCalendario(); 
                setFechaInicioConfirmado(fechaInicio);
                setFechaFinConfirmado(fechaFin);       
              }
            }}            
            className="CalendarioGeneral-boton-siguiente"
            disabled={!fechaInicio || !fechaFin}
          >
            Confirmar fechas
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarioGeneral;
