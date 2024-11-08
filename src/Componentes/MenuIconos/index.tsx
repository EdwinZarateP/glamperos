import React, { useRef, useState } from 'react';
import { FaHouseFloodWater, FaUmbrellaBeach, FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { BsTreeFill } from "react-icons/bs";
import { PiMountainsBold } from "react-icons/pi";
import { GiDesert, GiTreehouse, GiHiking } from "react-icons/gi";
import { MdCabin, MdOutlinePets, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCaravan } from "react-icons/fa";
import './estilos.css';

const MenuIconos: React.FC = () => {
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

    return (
        <div className="contenedor-menu">
            <div className="flecha-izquierda" onClick={desplazarIzquierda}>
                <MdOutlineKeyboardArrowLeft />
            </div>

            <div ref={contenedorListaRef} className="lista-iconos">
                {iconos.map((elemento, indice) => (
                    <div
                        key={indice}
                        className={`icono-item ${iconoSeleccionado === indice ? 'icono-seleccionado' : ''}`}
                        onClick={() => seleccionarIcono(indice)}
                    >
                        <div className="icono">{elemento.icono}</div>
                        <span>{elemento.titulo}</span>
                    </div>
                ))}
            </div>

            <div className="flecha-derecha" onClick={desplazarDerecha}>
                <MdOutlineKeyboardArrowRight />
            </div>
        </div>
    );
};

export default MenuIconos;
