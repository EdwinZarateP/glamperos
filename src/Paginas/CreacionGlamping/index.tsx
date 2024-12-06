import { ContextoApp } from '../../Contexto/index';
import React, { useState, useContext } from "react";
import Paso1A from "./Paso1A/index";
import Paso1B from "./Paso1B/index";
import Paso1C from "./Paso1C/index";
import Paso1D from "./Paso1D/index";
import Paso2A from "./Paso2A/index";
import Paso2B from "./Paso2B/index";
import Paso2C from "./Paso2C/index";
import Paso2D from "./Paso2D/index";
import Paso2E from "./Paso2E/index";
import Paso2F from "./Paso2F/index";
import Paso3A from "./Paso3A/index";
import Paso3B from "./Paso3B/index";
import Swal from "sweetalert2";
import "./estilos.css";

const CreacionGlamping: React.FC = () => {
  const [pasoActual, setPasoActual] = useState<number>(0); // Estado para controlar el paso actual

  // Acceder al contexto
  const { latitud, tipoGlamping, seleccionadosGlobal } = useContext(ContextoApp)!;

  // Lista de componentes (puedes agregar más pasos aquí)
  const pasos = [
    <Paso1A key="Paso1A" />,
    <Paso1B key="Paso1B" />,
    <Paso1C key="Paso1C" />,
    <Paso1D key="Paso1D" />,
    <Paso2A key="Paso2A" />,
    <Paso2B key="Paso2B" />,
    <Paso2C key="Paso2C" />,
    <Paso2D key="Paso2D" />,
    <Paso2E key="Paso2E" />,
    <Paso2F key="Paso2F" />,
    <Paso3A key="Paso3A" />,
    <Paso3B key="Paso3B" />
  ];

  // Función para manejar el avance entre pasos
  const avanzarPaso = () => {
    // Validación: Si estamos intentando avanzar de paso 2 a paso 3, verificar el contexto
    if (pasoActual === 1 && !tipoGlamping) {
      Swal.fire({
        icon: "warning",
        title: "Tomala suave",
        text: "Escoge un tipo de glamping antes de continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Lógica personalizada: Verificar en el paso 2 si las coordenadas están vacías
    if (pasoActual === 2 && (!latitud || latitud === 4.123456)) {
      Swal.fire({
        icon: "warning",
        title: "Ubicación requerida",
        text: "Por favor selecciona una ubicación para continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1);
      console.log(seleccionadosGlobal)
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
