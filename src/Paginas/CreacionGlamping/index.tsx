import React from "react";
// import CrearGlamping from '../../Componentes/CrearGlamping/index';
import Paso1A from './Paso1A/index';
import "./estilos.css";

const CreacionGlamping: React.FC = () => {
  return (
    <div className="creacionGlamping-contenedor">
      {/* <CrearGlamping /> */}
      <Paso1A />
    </div>
  );
};

export default CreacionGlamping;
