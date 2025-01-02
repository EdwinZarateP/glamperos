import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comentario from '../Comentario/index';
import dameTiempo from '../../Imagenes/dameTiempo.png'
import './estilos.css';

interface ComentarioData {
  nombre: string;
  calificacionNumero: number;
  comentario: string;
  fotoPerfil?: string;
}

interface ComentariosProps {
  glampingId: string;  // Recibimos el glampingId como prop para obtener los comentarios correspondientes
}

const Comentarios: React.FC<ComentariosProps> = ({ glampingId }) => {
  const [comentarios, setComentarios] = useState<ComentarioData[]>([]);
  
  useEffect(() => {
    // Función para obtener los comentarios de la API
    const obtenerComentarios = async () => {
      try {
        const response = await axios.get(`https://glamperosapi.onrender.com/evaluaciones/glamping/${glampingId}`);
        if (response.data && response.data.length > 0) {
          // Mapear los datos de la API a la estructura que necesitamos
          const comentariosMapeados = response.data.map((comentario: any) => ({
            nombre: comentario.nombre_usuario,
            calificacionNumero: comentario.calificacion,
            comentario: comentario.comentario,
            fotoPerfil: comentario.fotoPerfil || '', // Si no existe fotoPerfil, usamos una cadena vacía
          }));
          setComentarios(comentariosMapeados);  // Establece los comentarios obtenidos
        } else {
          setComentarios([]);  // Si no hay comentarios, establece un arreglo vacío
        }
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
        setComentarios([]);  // En caso de error, también se establece un arreglo vacío
      }
    };

    obtenerComentarios();  // Llama a la función cuando el componente se monta o cuando glampingId cambia
  }, [glampingId]);

  return (
    <div className="Comentarios-contenedor">
      <h2 className="Comentarios-titulo">Opiniones</h2>
      <div className={comentarios.length > 0 ? "Comentarios-carrusel-con" : "Comentarios-carrusel-sin"}>
        {comentarios.length > 0 ? (
          comentarios.map((comentario, index) => (
            <Comentario key={index} {...comentario} />
          ))
        ) : (
          <div className="comentarios-vacios">
            <img src={dameTiempo} alt="Meme divertido" className="meme-dameTiempo" />
            <p>Sin reseñas (por ahora)</p>          
          </div>
        )}
</div>

    </div>
  );
};

export default Comentarios;
