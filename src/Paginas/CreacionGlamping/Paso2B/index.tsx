import React, { useState, useContext } from 'react';
import { GiWashingMachine, GiFireplace, GiSmokeBomb, GiThermometerHot  } from 'react-icons/gi';
import { IoWifi } from "react-icons/io5";
import { TbDeviceTv } from "react-icons/tb";
import { FaRegSnowflake, FaLaptopHouse, FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdOutdoorGrill, MdPool, MdOutlineBathtub  } from "react-icons/md";
import { IoIosBonfire } from "react-icons/io";
import { FaFireExtinguisher, FaKitMedical, FaKitchenSet, FaHotTubPerson } from "react-icons/fa6";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHotTub } from '@fortawesome/free-solid-svg-icons';
import { ContextoApp } from '../../../Contexto/index'; 
import './estilos.css';

const Paso2B: React.FC = () => {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);  // Estado para almacenar múltiples seleccionados
  const { setSeleccionadosGlobal } = useContext(ContextoApp)!;  // Acceder a la función de contexto

  const opciones = [
    { id: 'Wifi', label: 'Wifi', icono: <IoWifi /> },
    { id: 'Jacuzzi', label: 'Jacuzzi', icono: <FaHotTubPerson /> },
    { id: 'Tv', label: 'Tv', icono: <TbDeviceTv /> },
    { id: 'Cocina', label: 'Cocina', icono: <FaKitchenSet /> },
    { id: 'Lavadora', label: 'Lavadora', icono: <GiWashingMachine /> },
    { id: 'Aire_acondicionado', label: 'Aire acondicionado', icono: <FaRegSnowflake /> },
    { id: 'Zona_trabajo', label: 'Zona de trabajo', icono: <FaLaptopHouse /> },
    { id: 'Parqueadero', label: 'Parqueadero', icono: <AiTwotoneCar /> },
    { id: 'Parrilla', label: 'Parrilla', icono: <MdOutdoorGrill /> },
    { id: 'Zona_fogata', label: 'Zona fogata', icono: <IoIosBonfire /> },
    { id: 'Chimenea', label: 'Chimenea', icono: <GiFireplace /> },
    { id: 'Ducha', label: 'Ducha', icono: <FaShower /> },
    { id: 'Detector_humo', label: 'Detector de humo', icono: <GiSmokeBomb /> },
    { id: 'Extintor', label: 'Extintor', icono: <FaFireExtinguisher /> },
    { id: 'Botiquin', label: 'Botiquin', icono: <FaKitMedical /> },
    { id: 'Piscina', label: 'Piscina', icono: <MdPool /> },
    { id: 'Tina', label: 'Tina', icono: <MdOutlineBathtub /> },
    { id: 'Calefaccion', label: 'Calefacción', icono: <GiThermometerHot /> },

  ];

  const manejarSeleccion = (id: string) => {
    setSeleccionados(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);  // Si ya está seleccionado, lo deselecciona
      } else {
        return [...prev, id];  // Si no está seleccionado, lo añade
      }
    });
  };

  // Actualizar el contexto global
  React.useEffect(() => {
    setSeleccionadosGlobal(seleccionados);
  }, [seleccionados, setSeleccionadosGlobal]);

  return (
    <div className="Paso2B-contenedor">
      <h1 className="Paso2B-titulo">Cuéntale a tus huéspedes todo lo que tu Glamping tiene para ofrecer</h1>
      <div className="Paso2B-grid">
        {opciones.map((opcion) => (
          <div
            key={opcion.id}
            className={`Paso2B-opcion ${seleccionados.includes(opcion.id) ? 'Paso2B-seleccionado' : ''}`}
            onClick={() => manejarSeleccion(opcion.id)}  // Llama a la función de manejo de selección
          >
            <span className="Paso2B-icono">{opcion.icono}</span>
            <span className="Paso2B-label">{opcion.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paso2B;
