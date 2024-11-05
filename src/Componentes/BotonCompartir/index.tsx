import React from 'react';
import { FiShare } from 'react-icons/fi';
import './estilos.css';

const BotonCompartir: React.FC = () => {
  return (
    <button className="boton-compartir">
      <FiShare className="icono-compartir" />
      <span className="texto-compartir">Compartir</span>
    </button>
  );
};

export default BotonCompartir;
