import React, { useContext } from 'react';
import { ContextoApp } from "../../Contexto/index";
import "./precio.css";

const FiltroPrecios: React.FC = () => {
   const almacenVariables = useContext(ContextoApp);
  
      if (!almacenVariables) {
        throw new Error(
          "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
        );
      }
      const {
        precioFiltrado,
        setPrecioFiltrado
      } = almacenVariables;

  // Maneja los cambios en los rangos deslizantes
  const handlePrecioChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPrecioFiltrado = [...precioFiltrado];
    const newValue = Number(event.target.value);

    if (index === 0) {
      // Si es el valor mínimo, aseguramos que no sea mayor que el valor máximo
      if (newValue > newPrecioFiltrado[1]) {
        newPrecioFiltrado[1] = newValue;
      }
    } else {
      // Si es el valor máximo, aseguramos que no sea menor que el valor mínimo
      if (newValue < newPrecioFiltrado[0]) {
        newPrecioFiltrado[0] = newValue;
      }
    }

    newPrecioFiltrado[index] = newValue;
    setPrecioFiltrado(newPrecioFiltrado);
  };

  return (
    <div className="FiltroPrecios-Rango-precios">
      <label>Rango de Precio</label>
      <div className="FiltroPrecios-Input-Contenedor">
        {/* Rango inferior (valor mínimo) */}
        <input
          type="range"
          min="50000"
          max="2200000"
          step="20000"
          value={precioFiltrado[0]}
          onChange={(e) => handlePrecioChange(e, 0)}
          className="FiltroPrecios-Range"
        />
        {/* Rango superior (valor máximo) */}
        <input
          type="range"
          min="50000"
          max="2200000"
          step="20000"
          value={precioFiltrado[1]}
          onChange={(e) => handlePrecioChange(e, 1)}
          className="FiltroPrecios-Range"
        />
      </div>
      <div className="FiltroPrecios-Display">
        <span>{`Desde: $${precioFiltrado[0].toLocaleString()} - Hasta: $${precioFiltrado[1].toLocaleString()}`}</span>
      </div>
    </div>
  );
};

export default FiltroPrecios;
