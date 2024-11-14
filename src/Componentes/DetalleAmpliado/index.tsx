import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './estilos.css';

interface DetalleAmpliadoProps {
  descripcion_glamping: string;
  onClose: () => void;
}

const DetalleAmpliado: React.FC<DetalleAmpliadoProps> = ({ descripcion_glamping, onClose }) => {
  return (
    <div className="detalle-ampliado-fondo">
      <div className="detalle-ampliado-contenedor">
        {/* Contenedor superior con el título y el ícono de cerrar */}
        <div className="detalle-ampliado-header">
          <h2>Detalles de este lindo lugar</h2>
          <AiOutlineClose className="detalle-ampliado-cerrar" onClick={onClose} />
        </div>

        {/* Contenedor principal con la descripción */}
        <p className="detalle-ampliado-texto">{descripcion_glamping}</p>
      </div>
    </div>
  );
};

export default DetalleAmpliado;
