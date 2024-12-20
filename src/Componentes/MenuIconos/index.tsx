import React, { useRef, useState } from 'react';
import { FaHouseFloodWater, FaUmbrellaBeach, FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { BsTreeFill } from "react-icons/bs";
import { PiMountainsBold } from "react-icons/pi";
import { GiDesert, GiTreehouse, GiHiking } from "react-icons/gi";
import { MdCabin, MdOutlinePets, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCaravan } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { useContext } from "react";
import { ContextoApp } from '../../Contexto/index';
import './estilos.css';

const MenuIconos: React.FC = () => {

    const almacenVariables = useContext(ContextoApp);

    if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
    }

    const { setMostrarFiltros } = almacenVariables;

    const [iconoSeleccionado, setIconoSeleccionado] = useState<number | null>(null);
    const iconos = [
        { titulo: "Playa", icono: <FaUmbrellaBeach /> },
        { titulo: "Tropical", icono: <FaTemperatureArrowUp /> },
        { titulo: "Clima frío", icono: <FaTemperatureArrowDown /> },
        { titulo: "Naturaleza", icono: <BsTreeFill /> },
        { titulo: "En la montaña", icono: <PiMountainsBold /> },
        { titulo: "Desierto", icono: <GiDesert /> },
        { titulo: "Pet Friendly", icono: <MdOutlinePets /> },
        { titulo: "Flotantes", icono: <FaHouseFloodWater /> },
        { titulo: "Cabañas", icono: <MdCabin /> },
        { titulo: "Casa del árbol", icono: <GiTreehouse /> },
        { titulo: "Caminata", icono: <GiHiking /> },
        { titulo: "Remolques", icono: <FaCaravan /> },
        { titulo: "Desierto", icono: <GiDesert /> },
        { titulo: "Pet Friendly", icono: <MdOutlinePets /> },
        { titulo: "Flotantes", icono: <FaHouseFloodWater /> },
        { titulo: "Cabañas", icono: <MdCabin /> },
        { titulo: "Casa del árbol", icono: <GiTreehouse /> },
        { titulo: "Caminata", icono: <GiHiking /> },
        { titulo: "Remolques", icono: <FaCaravan /> }
    ];

    const contenedorListaRef = useRef<HTMLDivElement | null>(null);

    const desplazarIzquierda = () => {
        if (contenedorListaRef.current) {
            contenedorListaRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const desplazarDerecha = () => {
        if (contenedorListaRef.current) {
            contenedorListaRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    const seleccionarIcono = (indice: number) => {
        setIconoSeleccionado(indice);
    };

    const manejarClickAbrirFiltros = () => {
      setMostrarFiltros(true); 
      document.body.style.overflow = "hidden";
    };


  return (
    <div className="MenuIconos-contenedor">
      <div className="MenuIconos-contenedor-menuConIcono">
        <div className="MenuIconos-contenedor-menu">
          <div className="MenuIconos-flecha-izquierda" onClick={desplazarIzquierda}>
            <MdOutlineKeyboardArrowLeft />
          </div>

          <div ref={contenedorListaRef} className="MenuIconos-lista-iconos">
            {iconos.map((elemento, indice) => (
              <div
                key={indice}
                className={`MenuIconos-icono-item ${
                  iconoSeleccionado === indice ? "MenuIconos-icono-seleccionado" : ""
                }`}
                onClick={() => seleccionarIcono(indice)}
              >
                <div className="MenuIconos-icono">{elemento.icono}</div>
                <span>{elemento.titulo}</span>
              </div>
            ))}
          </div>

          <div className="MenuIconos-flecha-derecha" onClick={desplazarDerecha}>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="MenuIconos-settings" onClick={manejarClickAbrirFiltros}>
          <VscSettings />
            <span>Filtros</span> 
        </div>
      </div>
    </div>

  );
};

export default MenuIconos;
