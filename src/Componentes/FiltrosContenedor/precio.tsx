import React, { useContext } from 'react';
import { ContextoApp } from "../../Contexto/index";
import "./precio.css";

const FiltroPrecios: React.FC = () => {
  const almacenVariables = useContext(ContextoApp);
  
  if (!almacenVariables) {
    throw new Error("El contexto no está disponible.");
  }

  const { precioFiltrado, setPrecioFiltrado } = almacenVariables;
  const [min, max] = [60000, 2200000];
  const porcentajeMin = ((precioFiltrado[0] - min) / (max - min)) * 100;
  const porcentajeMax = ((precioFiltrado[1] - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    const newValues = [...precioFiltrado];
    
    if (index === 0) {
      newValues[0] = Math.min(value, newValues[1]);
    } else {
      newValues[1] = Math.max(value, newValues[0]);
    }
    
    setPrecioFiltrado(newValues);
  };

  return (
    <div className="precio-filtro">
      <div className="precio-header">
        <h3>Rango de precios</h3>
        <div className="precio-valores">
          ${precioFiltrado[0].toLocaleString()} — ${precioFiltrado[1].toLocaleString()}
        </div>
      </div>
      
      <div className="slider-container">
        <div className="slider-track" 
             style={{ background: `linear-gradient(to right, #ddd ${porcentajeMin}%, #4a90e2 ${porcentajeMin}%, #4a90e2 ${porcentajeMax}%, #ddd ${porcentajeMax}%)` }}>
          <input
            type="range"
            min={min}
            max={max}
            value={precioFiltrado[0]}
            onChange={(e) => handleChange(e, 0)}
            className="slider-thumb left"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={precioFiltrado[1]}
            onChange={(e) => handleChange(e, 1)}
            className="slider-thumb right"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltroPrecios;