import React, { useState } from "react";
import Paso1A from "./Paso1A/index";
import Paso1B from "./Paso1B/index";
import Paso1C from "./Paso1C/index";
import Paso1D from "./Paso1D/index";
import "./estilos.css";

const CreacionGlamping: React.FC = () => {
  const [pasoActual, setPasoActual] = useState<number>(0); // Estado para controlar el paso actual

  // Lista de componentes (puedes agregar más pasos aquí)
  const pasos = [
    <Paso1A key="Paso1A" />,
    <Paso1B key="Paso1B" />,
    <Paso1C key="Paso1C" />,
    <Paso1D key="Paso1D" />,
    // Agrega más pasos aquí si es necesario
  ];

  // Función para manejar el avance entre pasos
  const avanzarPaso = () => {
    if (pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1);
    }
  };

  // Función para manejar el retroceso entre pasos
  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  // Calcular porcentaje de progreso
  const progreso = ((pasoActual + 1) / pasos.length) * 100;

  return (
    <div className="creacionGlamping-contenedor">
      {/* Renderizar el componente del paso actual */}
      <div className="creacionGlamping-paso">{pasos[pasoActual]}</div>

      {/* Barra de progreso */}
      <div className="creacionGlamping-progreso">
        <div
          className="creacionGlamping-progreso-barra"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      {/* Controles de navegación */}
      <div className="creacionGlamping-controles">
        <button
          className="creacionGlamping-boton-atras"
          onClick={retrocederPaso}
          disabled={pasoActual === 0} // Desactivar botón si está en el primer paso
        >
          Atrás
        </button>
        <button
          className="creacionGlamping-boton-siguiente"
          onClick={avanzarPaso}
          disabled={pasoActual === pasos.length - 1} // Desactivar botón si está en el último paso
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CreacionGlamping;
