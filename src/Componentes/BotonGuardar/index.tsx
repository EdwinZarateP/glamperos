import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { AiTwotoneHeart } from "react-icons/ai";
import { BsBalloonHeartFill } from "react-icons/bs";
import './estilos.css';

const BotonGuardar: React.FC = () => {
  const idUsuarioCookie = Cookies.get('idUsuario'); 
  const { glampingId } = useParams<{ glampingId: string }>();
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const esFavorito = (glampingId: string, favoritos: string[] = []): boolean => {
    return Array.isArray(favoritos) && favoritos.includes(glampingId);
  };

  // Obtener favoritos desde la API
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (idUsuarioCookie) {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/favoritos/${idUsuarioCookie}`);
          const data = await response.json();
          setFavoritos(data);
        } catch (error) {
          console.error("Error al obtener los favoritos:", error);
        }
      }
    };
    fetchFavoritos();
  }, [idUsuarioCookie]);

  return (
    <button className="boton-guardar">
      {glampingId && esFavorito(glampingId, favoritos) ? (
        <BsBalloonHeartFill className="icono-guardar-lleno" />
      ) : (
        <AiTwotoneHeart className="icono-guardar-vacio" />
      )}
      <span className="texto-guardar">Guardar</span>
    </button>
  );
};

export default BotonGuardar;
