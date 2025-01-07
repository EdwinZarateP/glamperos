import React from 'react';
import { CiSearch } from "react-icons/ci";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import './estilos.css';

const MenuUsuariosInferior: React.FC = () => {
  const correoUsuario = Cookies.get("correoUsuario");

  return (
    <div className="MenuUsuariosInferior">
      {correoUsuario ? (
        <>
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
        </>
      ) : (
        <div className="MenuUsuariosInferior-icono">
          <Link to="/Registrarse" className="MenuUsuariosInferior-enlace">
            <FaRegUser className="MenuUsuariosInferior-iconoImagen" />
            <span className="MenuUsuariosInferior-texto">Registrate o inicia sesión</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuUsuariosInferior;
