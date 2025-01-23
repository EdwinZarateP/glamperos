import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import PanelBusqueda from "../PanelBusqueda";
import { ContextoApp } from "../../Contexto/index"; 
import { evaluarVariable } from '../../Funciones/ValidarVariable';
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import animal from '../../Imagenes/animal5.jpeg'
import { BsIncognito } from "react-icons/bs";
import Cookies from 'js-cookie';
import MenuUsuario from '../MenuUsuario/index'; // Ajusta la ruta si es necesario
import "./estilos.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { totalHuespedes, setIdUsuario, setSiono, setLatitud,setLongitud,
     setCiudad_departamento, setTipoGlamping, setAmenidadesGlobal, 
     setImagenesCargadas, setNombreGlamping, setDescripcionGlamping, 
     setPrecioEstandar, setCantidad_Huespedes, setDescuento, setAcepta_Mascotas,
     setMostrarFiltros,setMostrarMenuUsuarios, cantiadfiltrosAplicados, busqueda, setBusqueda, setFechasSeparadas } = almacenVariables; 

  const [mostrarPanelBusqueda, setMostrarPanelBusqueda] = useState<boolean>(false);
  const nombreUsuarioCookie = Cookies.get('nombreUsuario');
  const idUsuarioCookie = Cookies.get('idUsuario'); 

  const manejarClickBusqueda = () => {
    setMostrarPanelBusqueda(true); 
    setFechasSeparadas([]);
    document.body.style.overflow = "hidden";
  };

  const cerrarPanelBusqueda = () => {
    setMostrarPanelBusqueda(false); // Cerrar el PanelBusqueda
    document.body.style.overflow = "auto"; 

  };

  const manejarBusqueda = (destino: string, fechas: string) => {
    setBusqueda({ destino, fechas });
    cerrarPanelBusqueda(); 
  };

  const existeId = () => {
    const resultado = evaluarVariable(idUsuarioCookie);
    return resultado
  };

  const quitarSetters = () => {
    setSiono(true); // Cambia el estado a "sí o no"
    setLatitud(4.123456); // Restablece la latitud a un valor predeterminado
    setLongitud(-74.123456); // Restablece la longitud a un valor predeterminado
    setCiudad_departamento(""); // Limpia el campo de ciudad y departamento
    setTipoGlamping(""); // Restablece el tipo de glamping a vacío
    setAmenidadesGlobal([]); // Reinicia las amenidades a un arreglo vacío
    setImagenesCargadas([]); // Limpia las imágenes cargadas
    setNombreGlamping(""); // Limpia el nombre del glamping
    setDescripcionGlamping(""); // Limpia la descripción del glamping
    setPrecioEstandar(0); // Restablece el precio estándar a 0
    setCantidad_Huespedes(1); // Restablece el precio estándar a 0
    setDescuento(0);
    setAcepta_Mascotas(false);
  };

  const irAInicio = () => {
    navigate("/"); // Navega a la ruta "/"
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  };  

  return (
    <div className="contenedor-Header">
      <header className="Header">
        {/* Aquí agregamos el componente MenuUsuario */}
        <div className="Header-menuUsuarioLista">
          <MenuUsuario /> {/* Usamos el componente aquí */}
        </div>
        {/* Reemplazo de Link con un botón de navegación */}
        <div className="Header-izquierda" onClick={irAInicio}>
          <img src={animal} alt="Glamperos logo" className="Header-logo" />
          <span className="Header-nombreMarca">Glamperos</span>
        </div>

        <div
          className="Header-barraBusqueda"
          onClick={manejarClickBusqueda} 
        >
          <span className="Header-opcionBusqueda">
            {busqueda.destino
              ? busqueda.destino.substring(0, 20) +
                (busqueda.destino.length > 30 ? "..." : "")
              : "Busca un refugio encantador"}
          </span>
          <span className="Header-divisor">|</span>
          <span className="Header-opcionCuando">{busqueda.fechas || "¿Cuándo?"}</span>
          <span className="Header-divisor">|</span>
          <span className="Header-opcionBusqueda Header-opcionBusquedaInvitados">
            {totalHuespedes > 0
              ? `${totalHuespedes} huésped${totalHuespedes > 1 ? "es" : ""}`
              : "¿Cuántos?"}
          </span>
          <div className="Header-botonBusqueda">
            <FiSearch className="Header-icono" />
          </div>
        </div>

        <div className="Header-derecha">
        {existeId() ? (
          <div
            className="Header-botonAnfitrion"
            onClick={() => {
              quitarSetters();
              setIdUsuario(idUsuarioCookie??"")
              navigate("/CrearGlamping");
            }}
          >
            Publica tu Glamping
          </div>
        ) : (
          <div
            className="Header-botonAnfitrion"
            onClick={() => {
              quitarSetters();
              navigate("/Registrarse");
            }}
          >
            Publica tu Glamping
          </div>
        )}

        <div className="Header-menuUsuario" onClick={()=>setMostrarMenuUsuarios(true)}>
          <FiMenu
            className="Header-iconoMenu"  
          />
          
          {/* Círculo con la inicial o FaUserSecret */}
          <div className="Header-inicialUsuario">
            {nombreUsuarioCookie ? (
              nombreUsuarioCookie[0].toUpperCase() // Muestra la inicial en mayúscula
            ) : (
              <BsIncognito className="Header-inicialUsuario-incognito" />
            )}
          </div>
        </div>

        <div className="Header-iconoSettingsWrapper">
          <HiMiniAdjustmentsHorizontal
            onClick={() => setMostrarFiltros(true)}
          />
          {cantiadfiltrosAplicados > 0 && (
            <div className="Header-badge">{cantiadfiltrosAplicados}</div>
          )}
        </div>
      </div>

      </header>

      {mostrarPanelBusqueda && (
        <PanelBusqueda
          onBuscar={(destino, fechas) => manejarBusqueda(destino, fechas)}
          onCerrar={cerrarPanelBusqueda}
        />
      )}
    </div>
  );
};

export default Header;