import React from "react";
import animal from '../../Imagenes/animal5.jpeg'
import { useNavigate } from "react-router-dom";
import "./estilos.css";

// Definir la propiedad 'nombreMarca' como string
interface HeaderIconoProps {
    descripcion: string;
}

const HeaderIcono: React.FC<HeaderIconoProps> = ({ descripcion }) => {

  const navigate = useNavigate();

  const irAInicio = () => {
    navigate("/"); // Navega a la ruta "/"
    window.location.reload(); // Recarga la página
  };   

  return (
    <div className="HeaderIcono-contenedor">
      <header className="HeaderIcono-Header">
        <div className="HeaderIcono-izquierda" onClick={irAInicio}>
          <img src={animal} alt="Logo" className="HeaderIcono-logo" />
          <span className="HeaderIcono-nombreMarca">{descripcion}</span>
        </div>
      </header>
    </div>
  );
};

export default HeaderIcono;
