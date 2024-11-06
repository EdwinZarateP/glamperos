import React from 'react';
import Calificacion from '../Calificacion/index';
import './estilos.css';

interface DescripcionGlampingProps {
  calificacionNumero: number;
  calificacionEvaluaciones: number;
  calificacionMasAlta: string;
}

const DescripcionGlamping: React.FC<DescripcionGlampingProps> = ({ calificacionNumero, calificacionEvaluaciones, calificacionMasAlta }) => {
  return (
    <div className="descripcion-glamping-contenedor">
      <Calificacion calificacionNumero={calificacionNumero}
        calificacionEvaluaciones={calificacionEvaluaciones}
        calificacionMasAlta={calificacionMasAlta}
      />
      <p className="descripcion-glamping-detalle">
        Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable.
      </p>
    </div>
  );
};

export default DescripcionGlamping;
