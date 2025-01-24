import React, { useContext } from "react";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

const Politicas: React.FC = () => {
  const almacenVariables = useContext(ContextoApp);
  
  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { verPolitica, setVerPolitica } = almacenVariables;

  // Función para cerrar las políticas
  const cerrarPoliticas = () => {
    setVerPolitica(false);
  };

  if (!verPolitica) {
    return null; // No renderiza nada si `verPolitica` es false
  }

  return (
    <div className="Politicas-contenedor">
      <div className="Politicas-modal">
        <h2 className="Politicas-titulo">Políticas de Cancelación</h2>
        <p className="Politicas-descripcion">
          1. <b>Reembolso 100%:</b> si cancelas hasta 5 días antes del check-in.
        </p>
        <p className="Politicas-descripcion">
          2. <b>Reembolso del 50%:</b> si cancelas entre 2 y 4 días antes del check-in.
        </p>
        <p className="Politicas-descripcion">
          3. <b>Sin reembolso:</b> si cancelas con menos de 1 día de antelación.
        </p>
   
        <button className="Politicas-botonCerrar" onClick={cerrarPoliticas}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Politicas;
