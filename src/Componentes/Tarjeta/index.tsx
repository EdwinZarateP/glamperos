import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'; // Para el estado no favorito
import './estilos.css';

interface TarjetaProps {
  imagen: string;
  nombre: string;
  ciudad: string;
  precio: number;
  calificacion: number;
  favorito: boolean;
  onFavoritoChange: (nuevoEstado: boolean) => void;
}

const Tarjeta: React.FC<TarjetaProps> = ({
  imagen,
  nombre,
  ciudad,
  precio,
  calificacion,
  favorito,
  onFavoritoChange,
}) => {
  const [estrellaClickada, setEstrellaClickada] = useState(false);

  const handleFavoritoChange = () => {
    onFavoritoChange(!favorito);
  };

  const handleEstrellaClick = () => {
    setEstrellaClickada(true);
    setTimeout(() => {
      setEstrellaClickada(false);
    }, 300); // Duración del efecto
  };

  return (
    <div className="tarjeta">
      <div className="tarjeta-imagen-container">
        <img src={imagen} alt={nombre} className="tarjeta-imagen" />
        <button
          className="tarjeta-favorito"
          onClick={handleFavoritoChange}
        >
          <FontAwesomeIcon icon={favorito ? faHeartSolid : faHeartRegular} className={`corazon ${favorito ? 'activo' : ''}`} />
        </button>
      </div>
      <div className="tarjeta-info">
        <div className="tarjeta-contenido">
          <h2 className="tarjeta-nombre">{nombre}</h2>
          <div className={`tarjeta-calificacion ${estrellaClickada ? 'efecto' : ''}`} onClick={handleEstrellaClick}>
            <span className="estrella">⭐</span>
            <span>{calificacion}</span>
          </div>
        </div>
        <p className="tarjeta-ciudad">{ciudad}</p>
        <p className="tarjeta-precio">${precio.toFixed(2)} por noche</p>
      </div>
    </div>
  );
};

export default Tarjeta;
