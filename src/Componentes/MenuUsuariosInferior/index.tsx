import React from 'react';
import { CiSearch } from "react-icons/ci";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import {  useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import './estilos.css';

const MenuUsuariosInferior: React.FC = () => {
  const correoUsuario = Cookies.get("correoUsuario");
  const navigate = useNavigate();  

  const redirigir = (ruta: string) => {
    if (!correoUsuario) {
      // Si no existe el correo, redirige a la página de registrarse
      navigate("/Registrarse");
    } else {
      // Si existe el correo, redirige a la ruta correspondiente
      navigate(ruta);
    }
  };

  return (
    <div className="MenuUsuariosInferior">
      <div className="MenuUsuariosInferior-icono" onClick={() => redirigir("/")}>
        <CiSearch className="MenuUsuariosInferior-iconoImagen" />
        <span className="MenuUsuariosInferior-texto">Buscar</span>
      </div>
      <div className="MenuUsuariosInferior-icono" onClick={() => redirigir("/ListaDeseos")}>
        <FaRegHeart className="MenuUsuariosInferior-iconoImagen" />
        <span className="MenuUsuariosInferior-texto">Favoritos</span>
      </div>
      <div className="MenuUsuariosInferior-icono" onClick={() => redirigir("/Mensajes/${idEmisor}")}>
        <TiMessage className="MenuUsuariosInferior-iconoImagen" />
        <span className="MenuUsuariosInferior-texto">Mensajes</span>
      </div>
      <div className="MenuUsuariosInferior-icono" onClick={() => redirigir("/GestionarCuenta")}>
        <FaRegUser className="MenuUsuariosInferior-iconoImagen" />
        <span className="MenuUsuariosInferior-texto">Perfil</span>
      </div>
    </div>
  );
};

export default MenuUsuariosInferior;
