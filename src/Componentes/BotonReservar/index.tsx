import React, { useContext, useEffect, useState } from 'react';
import { ContextoApp } from '../../Contexto/index';
import { GiCampingTent } from 'react-icons/gi';
import CalendarioGeneral from "../CalendarioGeneral";
import { useParams } from "react-router-dom";
import { calcularTarifaServicio } from "../../Funciones/calcularTarifaServicio";
import viernesysabadosyfestivos from "../../Componentes/BaseFinesSemana/fds.json";
import './estilos.css';

// Cambié Promise<number> por number
interface ReservarBotonProps {
  precioPorNoche: number; 
  descuento: number;
}

const ReservarBoton: React.FC<ReservarBotonProps> = ({ precioPorNoche, descuento }) => {
  const almacenVariables = useContext(ContextoApp);
  
  if (!almacenVariables) {
    throw new Error('ReservarBoton debe ser usado dentro de un proveedor de ContextoApp');
  }

  const {
    fechaInicio,
    fechaFin,
    totalDias,
    setMostrarCalendario,
    mostrarCalendario,
    fechaInicioConfirmado,
    fechaFinConfirmado
  } = almacenVariables;

   const {fechaInicioUrl, fechaFinUrl, totalDiasUrl } = useParams<{glampingId: string, fechaInicioUrl: string; fechaFinUrl: string; totalDiasUrl:string }>();
   
  // Prioridad: primero usar el contexto si existe, de lo contrario usar la URL.
  const fechaInicioRender = fechaInicio
  ? fechaInicio
  : fechaInicioUrl
  ? new Date(fechaInicioUrl)
  : null; // Si no hay fechas en el contexto, se toma de la URL

  const fechaFinRender = fechaFin
  ? fechaFin
  : fechaFinUrl
  ? new Date(fechaFinUrl)
  : null; // Si no hay fechas en el contexto, se toma de la URL

    
  let totalDiasRender = totalDias 
  ? totalDias
  : totalDiasUrl
  ? parseInt(totalDiasUrl, 10)
  : 1;

  //fechas por defecto
  const hoy = new Date();
  const fechaInicioPorDefecto = new Date();
  fechaInicioPorDefecto.setDate(hoy.getDate() + 1); // Día de mañana
  const fechaFinPorDefecto = new Date();
  fechaFinPorDefecto.setDate(hoy.getDate() + 2); // Pasado mañana

  const precioConTarifa = calcularTarifaServicio(precioPorNoche, viernesysabadosyfestivos, descuento, fechaInicioConfirmado ?? fechaInicioPorDefecto, fechaFinConfirmado ?? fechaFinPorDefecto);

   const [precioBase, setPrecioBase] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const nuevoPrecio = precioConTarifa ;
    setPrecioBase(Math.round(nuevoPrecio));
    setIsLoading(false);
  }, [precioConTarifa, totalDiasRender]);

  const precioFormateado = precioBase.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatearFecha = (fecha: Date | null): string => {
    if (!fecha) return "-";
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  };

  const manejarReserva = () => {
    const mensaje = totalDiasRender > 0
      ? `Estás reservando por ${precioFormateado}.
        - Noches: ${totalDiasRender}
        - Desde: ${formatearFecha(fechaInicio)}
        - Hasta: ${formatearFecha(fechaFin)}`
      : `Estás reservando por ${precioFormateado} por noche.`;
    alert(mensaje);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="reservar-contenedor">
        <div
          className="reservar-total"
          onClick={() =>{ 
            setMostrarCalendario(true);
          }} 
        >
          <div className="reservar-precio">{precioFormateado}</div>
          {totalDiasRender > 0 ? (
            <div className="reservar-detalles">
              <span className="reservar-detalles-noche">
                {totalDiasRender} {totalDiasRender === 1 ? "noche" : "noches"}
              </span>
              <span className="reservar-fechas">
                {formatearFecha(fechaInicioRender)} – {formatearFecha(fechaFinRender)}
              </span>
            </div>
          ) : (
            <div className="reservar-detalles">
              <span className="reservar-fechas">por noche</span>
            </div>
          )}
        </div>
        <div className="reservar-boton-contenedor">
          <button
            className="reservar-boton"
            onClick={manejarReserva}
            aria-label={`Reservar por ${precioFormateado}`}
          >
            <GiCampingTent className="reservar-boton-icono" /> Reservar
          </button>
        </div>
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral
          cerrarCalendario={() => setMostrarCalendario(false)}
        />
      )}
    </>
  );
};

export default ReservarBoton;
