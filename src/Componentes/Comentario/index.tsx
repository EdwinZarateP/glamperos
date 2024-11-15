import React, { useState } from 'react';
import './estilos.css';

interface ComentarioProps {
  nombre: string;
  calificacionNumero: number;
  comentario: string;
  fotoPerfil?: string; // La foto de perfil es opcional
}

const Comentario: React.FC<ComentarioProps> = ({
  nombre,
  calificacionNumero,
  comentario,
  fotoPerfil,
}) => {
  const [mostrarTodo, setMostrarTodo] = useState(false);

  const getEstrellas = () => {
    if (calificacionNumero > 4.5) return '★★★★★';
    if (calificacionNumero >= 4 && calificacionNumero <= 4.5) return '★★★★☆';
    if (calificacionNumero >= 3 && calificacionNumero < 4) return '★★★☆☆';
    if (calificacionNumero >= 2 && calificacionNumero < 3) return '★★☆☆☆';
    if (calificacionNumero >= 1 && calificacionNumero < 2) return '★☆☆☆☆';
    return '☆☆☆☆☆';
  };

  const getPrimeraLetra = () => nombre.charAt(0).toUpperCase();

  return (
    <div className="comentario-contenedor">
      <div className="comentario-header">
        {fotoPerfil ? (
          <img src={fotoPerfil} alt={`${nombre} perfil`} className="comentario-imagen" />
        ) : (
          <div className="comentario-placeholder">{getPrimeraLetra()}</div>
        )}
        <div className="comentario-info">
          <h3 className="comentario-nombre">{nombre}</h3>
        </div>
      </div>
      <div className="comentario-detalles">
        <span className="comentario-calificacion">{getEstrellas()}</span>
      </div>
      <p className={`comentario-texto ${mostrarTodo ? 'expandido' : ''}`}>{comentario}</p>
      {comentario.split(' ').length > 20 && (
        <p
          className="comentario-mostrar"
          onClick={() => setMostrarTodo((prev) => !prev)}
        >
          {mostrarTodo ? 'Mostrar menos' : 'Mostrar más'}
        </p>
      )}
    </div>
  );
};

export default Comentario;
