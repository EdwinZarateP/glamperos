// DescripcionGlamping.tsx
import React, { useEffect } from 'react';
import Calificacion from '../Calificacion/index';
import DetalleGlampingTexto from '../DetalleGlampingTexto';
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
      <DetalleGlampingTexto descripcionGlamping={descripcion_glamping} />
      </p>
    </div>
  );
};

export default DescripcionGlamping;