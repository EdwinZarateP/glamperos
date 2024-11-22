import React from "react";
import CrearGlamping from '../../Componentes/CrearGlamping/index';
import Pruebas from '../../Componentes/Pruebas/index';
import "./estilos.css";

const CreacionGlamping: React.FC = () => {
  return (
    <div className="creacionGlamping-contenedor">
      <h1 className="creacionGlamping-titulo">Gestión de Glampings</h1>
      <CrearGlamping />
      <Pruebas />
    </div>
  );
};

export default CreacionGlamping;
