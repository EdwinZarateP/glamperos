import React from "react";
import CrearGlamping from '../../Componentes/CrearGlamping/index';
import "./estilos.css";

const CreacionGlamping: React.FC = () => {
  return (
    <div className="creacionGlamping-contenedor">
      <h1 className="creacionGlamping-titulo">Gestión de Glampings</h1>
      <CrearGlamping />
    </div>
  );
};

export default CreacionGlamping;
