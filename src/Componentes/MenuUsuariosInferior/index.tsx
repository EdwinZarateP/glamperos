import React from 'react';
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './estilos.css';

const MenuUsuariosInferior: React.FC = () => {
  return (
    <div className="MenuUsuariosInferior">
      <div className="MenuUsuariosInferior-icono">
        <Link to="/" className="MenuUsuariosInferior-enlace">
          <CiSearch className="MenuUsuariosInferior-iconoImagen" />
          <span className="MenuUsuariosInferior-texto">Buscar</span>
        </Link>
      </div>
      <div className="MenuUsuariosInferior-icono">
        <Link to="/ListaDeseos" className="MenuUsuariosInferior-enlace">
          <FaRegHeart className="MenuUsuariosInferior-iconoImagen" />
          <span className="MenuUsuariosInferior-texto">Favoritos</span>
        </Link>
      </div>
      <div className="MenuUsuariosInferior-icono">
        <Link to="/" className="MenuUsuariosInferior-enlace">
          <TiMessage className="MenuUsuariosInferior-iconoImagen" />
          <span className="MenuUsuariosInferior-texto">Mensajes</span>
        </Link>
      </div>
      <div className="MenuUsuariosInferior-icono">
        <Link to="/GestionarCuenta" className="MenuUsuariosInferior-enlace">
          <FaRegUser className="MenuUsuariosInferior-iconoImagen" />
          <span className="MenuUsuariosInferior-texto">Perfil</span>
        </Link>
      </div>
    </div>
  );
}

export default MenuUsuariosInferior;
