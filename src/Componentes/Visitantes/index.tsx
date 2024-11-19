import React, { useContext } from "react";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

const Visitantes: React.FC = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const {
    Cantidad_Adultos,
    setCantidad_Adultos,
    Cantidad_Niños,
    setCantidad_Niños,
    Cantidad_Bebes,
    setCantidad_Bebes,
    Cantidad_Mascotas,
    setCantidad_Mascotas,
  } = almacenVariables;

  // Límite individual y combinado
  const limites = {
    adultos: 15,
    niños: 15,
    bebes: 5,
    mascotas: 5,
    totalPersonas: 10, // Límite combinado de adultos y niños
  };

  // Incrementar con límite
  const incrementar = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    valor: number,
    limite: number,
    totalActualPersonas?: number
  ) => {
    if (valor < limite && (!totalActualPersonas || totalActualPersonas < limites.totalPersonas)) {
      setter((prev) => prev + 1);
    }
  };

  // Decrementar (sin valores negativos)
  const decrementar = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    valor: number
  ) => {
    if (valor > 0) {
      setter((prev) => prev - 1);
    }
  };

  // Total combinado de adultos y niños
  const totalPersonas = Cantidad_Adultos + Cantidad_Niños;

  return (
    <div className="Visitantes-contenedor">
      {/* Sección Adultos */}
      <div className="Visitantes-seccion">
        <div className="Visitantes-titulo">
          <span>Adultos</span>
          <small>Edad: 13 años o más</small>
        </div>
        <div className="Visitantes-controles">
          <button
            className="Visitantes-boton"
            onClick={() => decrementar(setCantidad_Adultos, Cantidad_Adultos)}
          >
            −
          </button>
          <span>{Cantidad_Adultos}</span>
          <button
            className="Visitantes-boton"
            onClick={() =>
              incrementar(setCantidad_Adultos, Cantidad_Adultos, limites.adultos, totalPersonas)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Sección Niños */}
      <div className="Visitantes-seccion">
        <div className="Visitantes-titulo">
          <span>Niños</span>
          <small>Edades 2 – 12</small>
        </div>
        <div className="Visitantes-controles">
          <button
            className="Visitantes-boton"
            onClick={() => decrementar(setCantidad_Niños, Cantidad_Niños)}
          >
            −
          </button>
          <span>{Cantidad_Niños}</span>
          <button
            className="Visitantes-boton"
            onClick={() =>
              incrementar(setCantidad_Niños, Cantidad_Niños, limites.niños, totalPersonas)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Sección Bebés */}
      <div className="Visitantes-seccion">
        <div className="Visitantes-titulo">
          <span>Bebés</span>
          <small>Menos de 2 años</small>
        </div>
        <div className="Visitantes-controles">
          <button
            className="Visitantes-boton"
            onClick={() => decrementar(setCantidad_Bebes, Cantidad_Bebes)}
          >
            −
          </button>
          <span>{Cantidad_Bebes}</span>
          <button
            className="Visitantes-boton"
            onClick={() =>
              incrementar(setCantidad_Bebes, Cantidad_Bebes, limites.bebes)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Sección Mascotas */}
      <div className="Visitantes-seccion">
        <div className="Visitantes-titulo">
          <span>Mascotas</span>
          <small>¿Traes a un animal de servicio?</small>
        </div>
        <div className="Visitantes-controles">
          <button
            className="Visitantes-boton"
            onClick={() => decrementar(setCantidad_Mascotas, Cantidad_Mascotas)}
          >
            −
          </button>
          <span>{Cantidad_Mascotas}</span>
          <button
            className="Visitantes-boton"
            onClick={() =>
              incrementar(setCantidad_Mascotas, Cantidad_Mascotas, limites.mascotas)
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Visitantes;
