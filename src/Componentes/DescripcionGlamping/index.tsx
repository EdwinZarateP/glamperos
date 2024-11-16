// DescripcionGlamping.tsx
import React, { useState, useEffect } from 'react';
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
    document.body.style.overflow = 'hidden'; // Desactiva el scroll del fondo
  };

  const handleCerrar = () => {
    setMostrarDetalle(false);
    document.body.style.overflow = 'auto'; // Reactiva el scroll del fondo
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Asegura el scroll cuando el componente se desmonta
    };
  }, []);

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
        Mostrar más &gt;
      </p>
      
      {mostrarDetalle && (
        <DetalleAmpliado descripcion_glamping={descripcion_glamping} onClose={handleCerrar} />
      )}
    </div>
  );
};

export default DescripcionGlamping;