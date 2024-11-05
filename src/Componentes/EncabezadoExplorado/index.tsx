import React from 'react';
import NombreGlamping from '../NombreGlamping';
import BotonCompartir from '../BotonCompartir/index';
import BotonGuardar from '../BotonGuardar/index';
import './estilos.css';

interface EncabezadoExploradoProps {
  nombreGlamping: string;
}

const EncabezadoExplorado: React.FC<EncabezadoExploradoProps> = ({ nombreGlamping }) => {
  return (
    <div className="encabezado-explorado">
      <NombreGlamping nombreGlamping={nombreGlamping} />
      <div className="botones">
        <BotonCompartir />
        <BotonGuardar />
      </div>
    </div>
  );
};

export default EncabezadoExplorado;
