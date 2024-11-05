import React from 'react';
import { FiHeart } from 'react-icons/fi';
import './estilos.css';

const BotonGuardar: React.FC = () => {
  return (
    <button className="boton-guardar">
      <FiHeart className="icono-guardar" />
      <span className="texto-guardar">Guardar</span>
    </button>
  );
};

export default BotonGuardar;
