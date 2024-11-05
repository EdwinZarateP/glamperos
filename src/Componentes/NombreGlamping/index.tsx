import React from 'react';
import './estilos.css';

interface TituloGlampingProps {
  nombreGlamping: string;
}

const TituloGlamping: React.FC<TituloGlampingProps> = ({ nombreGlamping }) => {
  return <h1 className="titulo-glamping">{nombreGlamping}</h1>;
};

export default TituloGlamping;
