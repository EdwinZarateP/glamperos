import { ContextoApp } from '../../Contexto/index';
import { useContext, useState } from "react";
import "./estilos.css";
// Tipos para los eventos de los formularios
import React from 'react';

const FiltrosContenedor = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { setFiltros, setMostrarFiltros } = almacenVariables;

  // Establecemos estado local para los filtros
  const [precioFiltrado, setPrecioFiltrado] = useState<number[]>([50000]);
  const [tipoGlampingFiltrado, setTipoGlampingFiltrado] = useState<string>("");
  const [amenidadesGlobalFiltrado, setAmenidadesGlobalFiltrado] = useState<string[]>([]);

  // Funciones de manejo
  const handlePrecioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoPrecio = Number(event.target.value);
    setPrecioFiltrado([nuevoPrecio]);
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      precioFiltrado: [nuevoPrecio],
    }));
  };

  const handleTipoGlampingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoGlampingFiltrado(event.target.value);
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      tipoGlampingFiltrado: event.target.value,
    }));
  };

  const handleAmenidadesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setAmenidadesGlobalFiltrado((prevAmenidades) =>
      checked
        ? [...prevAmenidades, value]
        : prevAmenidades.filter((amenidad) => amenidad !== value)
    );
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      amenidadesGlobalFiltrado: amenidadesGlobalFiltrado,
    }));
  };

  return (
    <div className="filtros-overlay">
      <div className="FiltrosContenedor-contenedor">
        <button
          className="boton-cerrar"
          onClick={() => setMostrarFiltros(false)}
        >
          ×
        </button>
        {/* Filtros */}
        <div>
          <label>Rango de Precio</label>
          <input
            type="range"
            min="50000"
            max="1000000"
            step="50000"
            value={precioFiltrado[0]}
            onChange={handlePrecioChange}
          />
          <span>{precioFiltrado[0]}</span>
        </div>
        <div>
          <label>Tipo de Glamping</label>
          <select value={tipoGlampingFiltrado} onChange={handleTipoGlampingChange}>
            <option value="">Seleccionar tipo</option>
            <option value="choza">Choza</option>
            <option value="Tienda">Tienda</option>
            <option value="Domo">Domo</option>
            <option value="Casa_arbol">Casa Árbol</option>
            <option value="Remolque">Remolque</option>
            <option value="Cabaña">Cabaña</option>
          </select>
        </div>
        <div>
          <label>Amenidades</label>
          <div>
            <input type="checkbox" value="Wifi" onChange={handleAmenidadesChange} />
            <label>Wifi</label>
          </div>
          <div>
            <input type="checkbox" value="Lavadora" onChange={handleAmenidadesChange} />
            <label>Lavadora</label>
          </div>
          <div>
            <input type="checkbox" value="Jacuzzi" onChange={handleAmenidadesChange} />
            <label>Jacuzzi</label>
          </div>
          <div>
            <input type="checkbox" value="Tv" onChange={handleAmenidadesChange} />
            <label>Tv</label>
          </div>
        </div>
        <div>
          <button onClick={() => setFiltros({})}>Limpiar filtros</button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosContenedor;
