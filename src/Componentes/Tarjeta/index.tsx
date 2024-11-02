import React, { useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import './estilos.css';

interface TarjetaProps {
  imagenes: string[];
  nombre: string;
  ciudad: string;
  precio: number;
  calificacion: number;
  favorito: boolean;
  onFavoritoChange: (nuevoEstado: boolean) => void;
}

const Tarjeta: React.FC<TarjetaProps> = ({
  imagenes,
  nombre,
  ciudad,
  precio,
  calificacion,
  favorito,
  onFavoritoChange,
}) => {
  const [esFavorito, setEsFavorito] = useState(favorito);
  const [imagenActual, setImagenActual] = useState(0);

  // Variables para capturar la posición inicial y final del touch
  let touchStartX = 0;
  let touchEndX = 0;

  const handleFavoritoChange = () => {
    const nuevoEstado = !esFavorito;
    setEsFavorito(nuevoEstado);
    onFavoritoChange(nuevoEstado);
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  // Maneja el inicio del touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  // Maneja el final del touch y calcula la dirección del swipe
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  // Determina la dirección del swipe
  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      siguienteImagen(); // Deslizar hacia la izquierda
    } else if (touchEndX - touchStartX > 50) {
      anteriorImagen(); // Deslizar hacia la derecha
    }
  };

  // Verifica si la pantalla es pequeña
  const esPantallaPequena = window.innerWidth <= 600;

  return (
    <div className="tarjeta">
      <div 
        className="tarjeta-imagen-container"
        onTouchStart={esPantallaPequena ? handleTouchStart : undefined} // Detecta el inicio del touch solo en pantallas pequeñas
        onTouchEnd={esPantallaPequena ? handleTouchEnd : undefined} // Detecta el final del touch solo en pantallas pequeñas
      >
        <div
          className="carrusel"
          style={{
            transform: `translateX(-${imagenActual * 100}%)`,
          }}
        >
          {imagenes.map((imagen, index) => (
            <img key={index} src={imagen} alt={nombre} className="tarjeta-imagen" />
          ))}
        </div>
        <button
          className="tarjeta-favorito"
          onClick={handleFavoritoChange}
        >
          {esFavorito ? (
            <BsBalloonHeartFill className="corazon activo" />
          ) : (
            <AiTwotoneHeart className="corazon" />
          )}
        </button>

        {/* Flechas de navegación solo visibles en pantallas grandes */}
        {!esPantallaPequena && (
          <>
            <button className="flecha izquierda" onClick={anteriorImagen}>
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button className="flecha derecha" onClick={siguienteImagen}>
              <MdOutlineKeyboardArrowRight />
            </button>
          </>
        )}

        {/* Puntos de navegación */}
        <div className="puntos">
          {imagenes.map((_, index) => (
            <span key={index} className={`punto ${index === imagenActual ? 'activo' : ''}`} />
          ))}
        </div>
      </div>
      <div className="tarjeta-info">
        <div className="tarjeta-contenido">
          <span className="tarjeta-nombre">{nombre}</span>
          <div className="tarjeta-calificacion">
            <FaStar className="estrella" />
            <span>{calificacion}</span>
          </div>
        </div>
        <p className="tarjeta-ciudad">{ciudad}</p>
        <span className="tarjeta-precio">${precio.toFixed(2)} por noche</span>
      </div>
    </div>
  );
};

export default Tarjeta;
