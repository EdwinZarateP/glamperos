import React, { useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import './estilos.css';

interface PokemonData {
  nombre: string;
  imagen: string;
}

interface TarjetaProps {
  imagenesPokemon: PokemonData[];
  ciudad: string;
  precio: number;
  calificacion: number;
  favorito: boolean;
  onFavoritoChange: (nuevoEstado: boolean) => void;
}

const Tarjeta: React.FC<TarjetaProps> = ({
  imagenesPokemon,
  ciudad,
  precio,
  calificacion,
  favorito,
  onFavoritoChange,
}) => {
  const [esFavorito, setEsFavorito] = useState(favorito);
  const [imagenActual, setImagenActual] = useState(0);

  if (!imagenesPokemon || imagenesPokemon.length === 0) {
    return <div>No hay imágenes para mostrar.</div>;
  }

  const handleFavoritoChange = () => {
    const nuevoEstado = !esFavorito;
    setEsFavorito(nuevoEstado);
    onFavoritoChange(nuevoEstado);
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenesPokemon.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + imagenesPokemon.length) % imagenesPokemon.length);
  };

  // Variables para capturar la posición inicial y final del toque
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      siguienteImagen(); // Deslizar hacia la izquierda
    } else if (touchEndX - touchStartX > 50) {
      anteriorImagen(); // Deslizar hacia la derecha
    }
  };

  const esPantallaPequena = window.innerWidth <= 600;

  // Calcula el rango de puntos visibles alrededor de la imagen actual
  const maxPuntos = 5;
  const halfMaxPuntos = Math.floor(maxPuntos / 2);
  
  let start = Math.max(0, imagenActual - halfMaxPuntos);
  let end = start + maxPuntos;
  
  if (end > imagenesPokemon.length) {
    end = imagenesPokemon.length;
    start = Math.max(0, end - maxPuntos);
  }

  const puntosVisibles = imagenesPokemon.slice(start, end);

  return (
    <div className="tarjeta">
      <div 
        className="tarjeta-imagen-container"
        onTouchStart={esPantallaPequena ? handleTouchStart : undefined}
        onTouchEnd={esPantallaPequena ? handleTouchEnd : undefined}
      >
        <div
          className="carrusel"
          style={{
            transform: `translateX(-${imagenActual * 100}%)`,
          }}
        >
          {imagenesPokemon.map((pokemon, index) => (
            <img key={index} src={pokemon.imagen} alt={pokemon.nombre} className="tarjeta-imagen" />
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

        {/* Puntos de navegación con límite de 5 puntos */}
        <div className="puntos">
          {puntosVisibles.map((_, index) => (
            <span key={start + index} className={`punto ${start + index === imagenActual ? 'activo' : ''}`} />
          ))}
        </div>
      </div>
      <div className="tarjeta-info">
        <div className="tarjeta-contenido">
          <span className="tarjeta-nombre">{imagenesPokemon[imagenActual]?.nombre}</span>
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
