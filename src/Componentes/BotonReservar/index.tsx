import React, { useContext, useEffect, useState } from 'react';
import { ContextoApp } from '../../Contexto/index';
import { GiCampingTent } from 'react-icons/gi';
import CalendarioGeneral from "../CalendarioGeneral";
import './estilos.css';

// Cambié Promise<number> por number
interface ReservarBotonProps {
  totalSinImpuestos: number; 
}

const ReservarBoton: React.FC<ReservarBotonProps> = ({ totalSinImpuestos }) => {
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
  } = almacenVariables;

  const FechasReservadas = [
    new Date(2024, 10, 20),
    new Date(2024, 10, 28),
    new Date(2024, 10, 29),
  ];

  const [precioBase, setPrecioBase] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const nuevoPrecio = totalSinImpuestos ;
    setPrecioBase(Math.round(nuevoPrecio));
    setIsLoading(false);
  }, [totalSinImpuestos, totalDias]);

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
    const mensaje = totalDias > 0
      ? `Estás reservando por ${precioFormateado}.
        - Noches: ${totalDias}
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
          onClick={() => setMostrarCalendario(true)} 
        >
          <div className="reservar-precio">{precioFormateado}</div>
          {totalDias > 0 ? (
            <div className="reservar-detalles">
              <span className="reservar-detalles-noche">
                {totalDias} {totalDias === 1 ? "noche" : "noches"}
              </span>
              <span className="reservar-fechas">
                {formatearFecha(fechaInicio)} – {formatearFecha(fechaFin)}
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
          FechasReservadas={FechasReservadas}
        />
      )}
    </>
  );
};

export default ReservarBoton;
