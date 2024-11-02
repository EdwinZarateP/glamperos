import React, { useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"; // Importa los íconos de flechas
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

  return (
    <div className="tarjeta">
      <div className="tarjeta-imagen-container">
        <img src={imagenes[imagenActual]} alt={nombre} className="tarjeta-imagen" />
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

        {/* Flechas de navegación con íconos de react-icons */}
        <button className="flecha izquierda" onClick={anteriorImagen}>
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button className="flecha derecha" onClick={siguienteImagen}>
          <MdOutlineKeyboardArrowRight />
        </button>

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
