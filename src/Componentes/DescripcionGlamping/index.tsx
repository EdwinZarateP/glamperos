import React, { useState } from 'react';
import Calificacion from '../Calificacion/index';
import DetalleAmpliado from '../DetalleAmpliado';
import './estilos.css';

interface DescripcionGlampingProps {
  calificacionNumero: number;
  calificacionEvaluaciones: number;
  calificacionMasAlta: string;
  descripcion_glamping: string;
}

const DescripcionGlamping: React.FC<DescripcionGlampingProps> = ({
  calificacionNumero,
  calificacionEvaluaciones,
  calificacionMasAlta,
  descripcion_glamping
}) => {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const handleMostrarMas = () => {
    setMostrarDetalle(true);
  };

  const handleCerrar = () => {
    setMostrarDetalle(false);
  };

  return (
    <div className="descripcion-glamping-contenedor">
      <Calificacion 
        calificacionNumero={calificacionNumero}
        calificacionEvaluaciones={calificacionEvaluaciones}
        calificacionMasAlta={calificacionMasAlta}
      />
      <p className="descripcion-glamping-detalle">
        {descripcion_glamping}
      </p>
      <p className="mostrar-mas-texto" onClick={handleMostrarMas}>
        Mostrar más ►
      </p>
      
      {mostrarDetalle && (
        <DetalleAmpliado descripcion_glamping={descripcion_glamping} onClose={handleCerrar} />
      )}
    </div>
  );
};

export default DescripcionGlamping;
