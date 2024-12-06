import React, { useContext, useState } from 'react';
import './estilos.css';
import { ContextoApp } from '../../../Contexto/index';

const Paso2F: React.FC = () => {
  const { setDescripcionGlamping } = useContext(ContextoApp)!;

  // Local state para el campo de texto, con validación
  const [inputDescripcion, setInputDescripcion] = useState('');

  const manejarCambio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valor = e.target.value.slice(0, 500); // Limitar a 500 caracteres
    setInputDescripcion(valor);
    setDescripcionGlamping(valor);
  };

  return (
    <div className="Paso2F-contenedor">
      <div className="Paso2F-contenido">
        <div className="Paso2F-texto">
          <h1 className="Paso2F-titulo-principal">Describe tu Glamping</h1>
          <p className="Paso2F-descripcion">
            Comparte lo que hace tu Glamping especial, ejemplo "Conoce un lugar mágico donde naturaleza
            se encuentra con el confort, somos una cabaña única para vivir experiencias exclusivas bajo
            las estrellas y servicios personalizados para ti"
          </p>
        </div>
        <div className="Paso2F-input-contenedor">
          <textarea
            className="Paso2F-input"
            placeholder="Escribe la descripción de tu glamping"
            value={inputDescripcion}
            onChange={manejarCambio}
          />
          {/* Mostrar la cantidad de caracteres ingresados */}
          <p className="Paso2F-caracteres">
            {inputDescripcion.length}/500
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paso2F;
