import React from 'react';
import { FiGrid } from 'react-icons/fi'; 
import './estilos.css';

interface ImgExploradasProps {
  imagenes: string[];
}

const ImgExploradas: React.FC<ImgExploradasProps> = ({ imagenes }) => {
  const imagenesMostrar = imagenes.slice(0, 5);

  return (
    <div className="contenedor-imagenes-exploradas">
      <div className="imagenes-principal">
        <img src={imagenesMostrar[0]} alt="Principal" />
      </div>
      <div className="imagenes-secundarias">
        {imagenesMostrar.slice(1).map((imagen, index) => (
          <img key={index} src={imagen} alt={`Secundaria ${index + 1}`} />
        ))}
      </div>
      <button className="mostrar-fotos-boton">
      <FiGrid className="icono" /> Mostrar todas las fotos
      </button>
    </div>
  );
};

export default ImgExploradas;
