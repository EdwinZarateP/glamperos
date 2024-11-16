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

  const { fechaInicio, fechaFin, totalDias } = almacenVariables;

  // Redondear el total a pagar
  const totalRedondeado = Math.round(totalSinImpuestos);

  // Formatear como dinero en COP con separadores de miles
  const totalFormateado = totalRedondeado.toLocaleString('es-CO', {
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
    alert(`El total a pagar sin impuestos es: ${totalFormateado}`);
  };

  return (
    <div className="reservar-contenedor">
      <div className="reservar-total">
        <div className="reservar-precio">{totalFormateado}</div>
        <div className="reservar-detalles">
          <span className="reservar-detalles-noche">
            {totalDias} {totalDias === 1 ? "noche" : "noches"}
          </span>
          <span className="reservar-fechas">
            {formatearFecha(fechaInicio)} – {formatearFecha(fechaFin)}
          </span>
        </div>
      </div>
      <div className="reservar-boton-contenedor">
        <button 
          className="reservar-boton"
          onClick={manejarReserva}
        >
          <GiCampingTent className="reservar-boton-icono" /> Reservar ahora
        </button>
      </div>
    </div>
  );
};

export default ReservarBoton;
