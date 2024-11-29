import React, { useState } from 'react';
import { GiCampingTent, GiHabitatDome, GiTreehouse, GiHut } from 'react-icons/gi';
import { MdOutlineCabin } from "react-icons/md";
import { FaCaravan } from "react-icons/fa";
import './estilos.css';

const Paso1B: React.FC = () => {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const opciones = [
    { id: 'Tienda', label: 'Tienda', icono: <GiCampingTent /> }, // Usamos el ícono importado
    { id: 'Domo', label: 'Domo', icono: <GiHabitatDome /> }, // Usamos el ícono importado
    { id: 'Casa_arbol', label: 'Casa del árbol', icono: <GiTreehouse /> },
    { id: 'Remolque', label: 'Remolque', icono: <FaCaravan /> },
    { id: 'Cabana', label: 'Cabaña', icono: <MdOutlineCabin /> },
    { id: 'Choza', label: 'Choza', icono: <GiHut /> }

  ];

  return (
    <div className="Paso1B-contenedor">
      <h1 className="Paso1B-titulo">¿Cuál de estas opciones describe mejor tu Glamping?</h1>
      <div className="Paso1B-grid">
        {opciones.map((opcion) => (
          <div
            key={opcion.id}
            className={`Paso1B-opcion ${
              seleccionado === opcion.id ? 'Paso1B-seleccionado' : ''
            }`}
            onClick={() => setSeleccionado(opcion.id)}
          >
            <span className="Paso1B-icono">{opcion.icono}</span>
            <span className="Paso1B-label">{opcion.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paso1B;
