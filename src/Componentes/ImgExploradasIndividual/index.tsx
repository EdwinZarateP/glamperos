import React, { useState, useEffect } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { IoShareSocialSharp } from 'react-icons/io5';
import { FaWhatsapp, FaClipboard } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './estilos.css';

interface ImgExploradasIndividualProps {
  imagenes: string[];
}

const ImgExploradasIndividual: React.FC<ImgExploradasIndividualProps> = ({ imagenes }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  let touchStartX = 0;
  let touchEndX = 0;

  const { glampingId } = useParams<{ glampingId: string }>();
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const idUsuarioCookie = Cookies.get('idUsuario');

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

  const handleNavigate = () => {
    if (glampingId) {
      navigate(`/ColeccionImagenes/${glampingId}`);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      siguienteImagen();
    } else if (touchEndX - touchStartX > 50) {
      anteriorImagen();
    }
  };

  const siguienteImagen = () => {
    setIndiceActual((prevIndex) => (prevIndex < imagenes.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const anteriorImagen = () => {
    setIndiceActual((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const toggleFavorito = async () => {
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

  // Función para copiar el enlace al portapapeles
  const copiarEnlace = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setShowNotification("Enlace copiado al portapapeles");
        setTimeout(() => setShowNotification(null), 3000);
      })
      .catch((error) => {
        setShowNotification(`Error al copiar el enlace: ${error}`);
        setTimeout(() => setShowNotification(null), 3000);
      });
    setShowModal(false);
  };

  // Función para compartir el enlace por WhatsApp Web
  const compartirWhatsApp = () => {
    const mensaje = `¡Mira este glamping! ${currentUrl}`;
    const urlWhatsApp = `https://web.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
    setShowModal(false);
  };

  // Lógica para limitar el número de puntos visibles a 5
  const maxPuntos = 5; // Número máximo de puntos visibles
  const start = Math.max(0, indiceActual - Math.floor(maxPuntos / 2));
  const end = Math.min(imagenes.length, start + maxPuntos);
  const puntosVisibles = imagenes.slice(start, end);

  return (
    <div
      className="img-exploradas-individual-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="imgExp-carrusel">
        <div className="imgExp-imagenes" style={{ transform: `translateX(-${indiceActual * 100}%)` }}>
          {imagenes.map((imagen, index) => (
            <img
              key={index}
              src={imagen}
              alt={`Imagen ${index + 1}`}
              className="imgExp-img"
              onClick={handleNavigate}
            />
          ))}
        </div>
      </div>

      <div className="imgExp-controles">
        <div onClick={toggleFavorito} className="imgExp-corazon">
          {esFavorito ? <BsBalloonHeartFill /> : <AiTwotoneHeart />}
        </div>
        <IoShareSocialSharp className="imgExp-compartir" onClick={() => setShowModal(true)} />
      </div>

      {/* Emergente de compartir */}
      {showModal && (
        <div className="boton-compartir-modal">
          <div className="boton-compartir-modal-content">
            <h3>Elige una opción para compartir este lugar mágico 😍</h3>
            <button className="boton-compartir-modal-button" onClick={copiarEnlace}>
              <FaClipboard className="icono-copiar" /> Copiar enlace
            </button>
            <button className="boton-compartir-modal-button" onClick={compartirWhatsApp}>
              <FaWhatsapp className="icono-whatsapp" /> Enviar por WhatsApp
            </button>
            <button className="boton-compartir-modal-close" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Notificación de éxito o error */}
      {showNotification && (
        <div className="notificacion">
          {showNotification}
        </div>
      )}

      {/* Contador en la esquina inferior derecha */}
      <div className="imgExp-contador">
        {indiceActual + 1} / {imagenes.length}
      </div>

      {/* Puntos de navegación en la parte inferior central */}
      <div className="imgExp-puntos">
        {puntosVisibles.map((_, index) => (
          <span
            key={start + index}
            className={`imgExp-punto ${start + index === indiceActual ? 'imgExp-activo' : ''}`}
            onClick={() => setIndiceActual(start + index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImgExploradasIndividual;
