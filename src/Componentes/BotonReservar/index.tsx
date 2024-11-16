import React, { useContext } from 'react';
import { ContextoApp } from '../../Contexto/index';
import { GiCampingTent } from 'react-icons/gi'; // Importa el ícono
import './estilos.css';

interface ReservarBotonProps {
  totalSinImpuestos: number;
}

const ReservarBoton: React.FC<ReservarBotonProps> = ({ totalSinImpuestos }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error('ReservarBoton debe ser usado dentro de un proveedor de ContextoApp');
  }

  const { fechaInicio, fechaFin, totalDias, precioPorNoche } = almacenVariables;

  // Determinar el precio a mostrar
  const precioBase = totalDias > 0 ? totalSinImpuestos : precioPorNoche || 0;

  // Redondear el precio
  const precioRedondeado = Math.round(precioBase);

  // Formatear como dinero en COP con separadores de miles
  const precioFormateado = precioRedondeado.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Formatear las fechas
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

  return (
    <div className="reservar-contenedor">
      <div className="reservar-total">
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
          aria-label={`Reservar por ${precioFormateado}`} /* Mejora de accesibilidad */
        >
          <GiCampingTent className="reservar-boton-icono" /> Reservar
        </button>
      </div>
    </div>
  );
};

export default ReservarBoton;
