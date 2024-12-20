import React, { useContext } from "react";
import { ContextoApp } from "../../../Contexto/index";  // Asumo que es el contexto donde están las variables

import "./estilos.css"; // Asegúrate de que los estilos sean los que buscas

const Paso1D: React.FC = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const {
    Cantidad_Huespedes,
    setCantidad_Huespedes,
    Acepta_Mascotas,
    setAcepta_Mascotas,
  } = almacenVariables;

  return (
    <div className="paso1d-contenedor">
      <h1>Agrega algunos datos básicos de tu glamping</h1>

      <div className="paso1d-seccion">
        <div className="paso1d-titulo">
          <h2>Huéspedes</h2>
          <p>¿Cuántos huéspedes máximo puedes alojar?</p>
        </div>
        <div className="paso1d-controles">
          <button
            className="paso1d-boton"
            onClick={() => setCantidad_Huespedes(Cantidad_Huespedes - 1)}
            disabled={Cantidad_Huespedes <= 1}
          >
            −
          </button>
          <span className="paso1d-contador">{Cantidad_Huespedes}</span>
          <button
            className="paso1d-boton"
            onClick={() => setCantidad_Huespedes(Cantidad_Huespedes + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="paso1d-seccion">
        <div className="paso1d-titulo">
          <h2>¿Acepta Mascotas?</h2>
          <p>Indica si las mascotas son bienvenidas en tu glamping</p>
        </div>
        <div className="paso1d-controles">
          <button
            className={`paso1d-boton-toggle ${Acepta_Mascotas ? "activo" : ""}`}
            onClick={() => setAcepta_Mascotas(true)}
            disabled={Acepta_Mascotas}
          >
            Sí
          </button>
          <button
            className={`paso1d-boton-toggle ${!Acepta_Mascotas ? "activo" : ""}`}
            onClick={() => setAcepta_Mascotas(false)}
            disabled={!Acepta_Mascotas}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paso1D;
