import React, { useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import './estilos.css';

interface ImgExploradasIndividualProps {
  imagenes: string[];
}

const ImgExploradasIndividual: React.FC<ImgExploradasIndividualProps> = ({ imagenes }) => {
  const [indiceActual, setIndiceActual] = useState(0);
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
      // Deslizar hacia la izquierda
      siguienteImagen();
    } else if (touchEndX - touchStartX > 50) {
      // Deslizar hacia la derecha
      anteriorImagen();
    }
  };

  const siguienteImagen = () => {
    setIndiceActual((prevIndex) => (prevIndex < imagenes.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const anteriorImagen = () => {
    setIndiceActual((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
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
        <AiTwotoneHeart className="imgExp-corazon" />
        <FiShare2 className="imgExp-compartir" />
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
