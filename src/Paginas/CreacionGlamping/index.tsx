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
  const [pasoActual, setPasoActual] = useState<number>(0);

  const { latitud, tipoGlamping, imagenesSeleccionadas, nombreGlamping, descripcionGlamping } = useContext(ContextoApp)!;

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

  const avanzarPaso = () => {
    // Validar pasoActual === 6 y si no se seleccionaron imágenes
    if (pasoActual === 6 && (!imagenesSeleccionadas || imagenesSeleccionadas.length === 0)) {
      Swal.fire({
        icon: "warning",
        title: "¡Todo entra por los ojos! 🫣",
        text: "No puedes avanzar sin seleccionar imágenes.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Validación para el paso 1 y verificar si eligio tipo glamping
    if (pasoActual === 1 && !tipoGlamping) {
      Swal.fire({
        icon: "warning",
        title: "Tomala suave 🛖",
        text: "Escoge un tipo de glamping antes de continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Validación para el paso 2 y verificar si las coordenadas están vacías
    if (pasoActual === 2 && (!latitud || latitud === 4.123456)) {
      Swal.fire({
        icon: "warning",
        title: "¡No quieres huéspedes perdidos! 😵‍💫",
        text: "Por favor selecciona una ubicación para continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Validación para el paso 8 y verificar si puso nombre
    if (pasoActual === 8 && !nombreGlamping) {
      Swal.fire({
        icon: "warning",
        title: "Sin nombre ¿Quién eres en la vida?",
        text: "Escribe el nombre de tu glamping antes de continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    
    // Validación para el paso 9 y verificar si puso descripcion
    if (pasoActual === 9 && !descripcionGlamping) {
      Swal.fire({
        icon: "warning",
        title: "Todos tenemos cualidades",
        text: "Escribe uan descripción de tu glamping antes de continuar.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1);
      console.log(nombreGlamping);
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const progreso = ((pasoActual + 1) / pasos.length) * 100;

  return (
    <div className="creacionGlamping-contenedor">
      <div className="creacionGlamping-paso">{pasos[pasoActual]}</div>

      <div className="creacionGlamping-progreso">
        <div className="creacionGlamping-progreso-barra" style={{ width: `${progreso}%` }}></div>
      </div>

      <div className="creacionGlamping-controles">
        <button
          className="creacionGlamping-boton-atras"
          onClick={retrocederPaso}
          disabled={pasoActual === 0}
        >
          Atrás
        </button>
        <button
          className="creacionGlamping-boton-siguiente"
          onClick={avanzarPaso}
          disabled={pasoActual === pasos.length - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CreacionGlamping;
