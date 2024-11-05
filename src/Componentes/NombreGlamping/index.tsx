import React from 'react';
import './estilos.css';

interface NombreGlampingProps {
  nombreGlamping: string;
}

const NombreGlamping: React.FC<NombreGlampingProps> = ({ nombreGlamping }) => {
  return <h1 className="titulo-glamping">{nombreGlamping}</h1>;
};

export default NombreGlamping;
