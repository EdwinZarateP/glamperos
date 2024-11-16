import React from 'react';
import Comentario from '../Comentario/index';
import './estilos.css';

interface ComentarioData {
  nombre: string;
  calificacionNumero: number;
  comentario: string;
  fotoPerfil?: string;
}

interface ComentariosProps {
  comentarios: ComentarioData[];
}

const Comentarios: React.FC<ComentariosProps> = ({ comentarios }) => {
  return (
    <div className="Comentarios-contenedor">
      <h2 className="Comentarios-titulo">Opiniones</h2>
      <div className="Comentarios-carrusel">
        {comentarios.map((comentario, index) => (
          <Comentario key={index} {...comentario} />
        ))}
      </div>
    </div>
  );
};

export default Comentarios;
