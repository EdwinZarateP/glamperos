import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { AiTwotoneHeart } from "react-icons/ai";
import { BsBalloonHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './estilos.css';

const BotonGuardar: React.FC = () => {
  const navigate = useNavigate();
  const idUsuarioCookie = Cookies.get('idUsuario');
  const { glampingId } = useParams<{ glampingId: string }>();
  const [esFavorito, setEsFavorito] = useState(false);

  // Obtener favoritos desde la API
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (idUsuarioCookie) {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/favoritos/${idUsuarioCookie}`);
          const data = await response.json();
          setEsFavorito(data.includes(glampingId || ""));
        } catch (error) {
          console.error("Error al obtener los favoritos:", error);
        }
      }
    };
    fetchFavoritos();
  }, [idUsuarioCookie, glampingId]);

  const handleFavoritoChange = async () => {        
    if (!idUsuarioCookie) {
      navigate('/Registrarse');
      return;
    }

    try {
      const nuevoEstado = !esFavorito;
      setEsFavorito(nuevoEstado);

      if (nuevoEstado) {
        // Añadir a favoritos
        await axios.post('https://glamperosapi.onrender.com/favoritos/', {
          usuario_id: idUsuarioCookie,
          glamping_id: glampingId,
        });
      } else {
        // Eliminar de favoritos
        await axios.delete(`https://glamperosapi.onrender.com/favoritos/?usuario_id=${idUsuarioCookie}&glamping_id=${glampingId}`);
      }
    } catch (error) {
      console.error('Error al actualizar el favorito:', error);
      alert('Hubo un problema al actualizar el favorito. Intenta nuevamente.');
      setEsFavorito(!esFavorito);  // Revertir el estado si falla
    }
  };

  return (
    <button className="boton-guardar" onClick={handleFavoritoChange}>
      {esFavorito ? (
        <BsBalloonHeartFill className="icono-guardar-lleno" />
      ) : (
        <AiTwotoneHeart className="icono-guardar-vacio" />
      )}
      <span className={`texto-guardar ${esFavorito ? 'subrayado' : ''}`}>
        {esFavorito ? "Guardado" : "Guardar"}
      </span>
    </button>
  );
};

export default BotonGuardar;
