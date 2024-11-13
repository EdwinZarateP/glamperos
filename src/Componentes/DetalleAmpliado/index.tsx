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
        <AiOutlineClose className="detalle-ampliado-cerrar" onClick={onClose} />
        <h2>Detalles de este lindo lugar </h2>
        <p className="detalle-ampliado-texto">{descripcion_glamping}</p>
      </div>
    </div>
  );
};

export default DetalleAmpliado;
