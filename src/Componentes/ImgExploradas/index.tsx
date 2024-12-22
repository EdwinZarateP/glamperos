import React from 'react';
import { FiGrid } from 'react-icons/fi'; 
import { useParams, useNavigate } from 'react-router-dom';
import './estilos.css';

interface ImgExploradasProps {
  imagenes: string[];
}

const ImgExploradas: React.FC<ImgExploradasProps> = ({ imagenes }) => {
  const imagenesMostrar = imagenes.slice(0, 5);
  const { glampingId } = useParams<{ glampingId: string }>();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (glampingId) {
      navigate(`/ColeccionImagenes/${glampingId}`);
    }
  };

  return (
    <div className="ImgExploradas-contenedor">
      <div className="ImgExploradas-principal" onClick={handleNavigate}>
        <img src={imagenesMostrar[0]} alt="Imagen principal" />
      </div>
      <div className="ImgExploradas-secundarias">
        {imagenesMostrar.slice(1).map((imagen, index) => (
          <img 
            key={index} 
            src={imagen} 
            alt={`Imagen secundaria ${index + 1}`} 
            className="ImgExploradas-imagenSecundaria"
            onClick={handleNavigate}
          />
        ))}
      </div>
      <button className="ImgExploradas-botonMostrar" onClick={handleNavigate}>
        <FiGrid className="ImgExploradas-icono" /> Mostrar todas las fotos
      </button>
    </div>
  );
};

export default ImgExploradas;
