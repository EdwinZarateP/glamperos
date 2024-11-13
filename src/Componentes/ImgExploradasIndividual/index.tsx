import React, { useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { IoShareSocialSharp } from "react-icons/io5";
import './estilos.css';

interface ImgExploradasIndividualProps {
  imagenes: string[];
}

const ImgExploradasIndividual: React.FC<ImgExploradasIndividualProps> = ({ imagenes }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false); // Estado para controlar el ícono de favorito
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

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito); // Alterna el estado de favorito
  };

  return (
    <div
      className="imgExp-carrusel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="imgExp-imagenes" 
        style={{ transform: `translateX(-${indiceActual * 100}%)` }}
      >
        {imagenes.map((imagen, index) => (
          <img key={index} src={imagen} alt={`Imagen ${index + 1}`} className="imgExp-img" />
        ))}
      </div>

      <div className="imgExp-controles">
        <button onClick={toggleFavorito} className="imgExp-corazon">
          {esFavorito ? <BsBalloonHeartFill /> : <AiTwotoneHeart />}
        </button>
        <IoShareSocialSharp className="imgExp-compartir" />
      </div>

      <div className="imgExp-contador">
        {indiceActual + 1} / {imagenes.length}
      </div>

      <div className="imgExp-puntos">
        {imagenes.map((_, index) => (
          <span
            key={index}
            className={`imgExp-punto ${index === indiceActual ? 'imgExp-activo' : ''}`}
            onClick={() => setIndiceActual(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImgExploradasIndividual;
