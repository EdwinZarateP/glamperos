import React from 'react';
import './estilos.css';
import videoPaso1A from '../../../Videos/Paso1AVideo.mp4';

const Paso4A: React.FC = () => {
  return (
    <div className="Paso4A-contenedor">
      <div className="Paso4A-contenido">
        <div className="Paso4A-texto">
          <h2 className="Paso4A-titulo-secundario">Paso Final</h2>
          <h1 className="Paso4A-titulo-principal">Terminar y publicar</h1>
          <p className="Paso4A-descripcion">
            Recibiras un correo confirmando que tu glamping quedó creado
          </p>
        </div>
        <div className="Paso4A-video-contenedor">
          <video
            className="Paso4A-video"
            autoPlay
            muted
            loop
            src={videoPaso1A}
          >
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Paso4A;
