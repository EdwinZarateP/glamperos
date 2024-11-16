// LoqueOfreceAmpliado.tsx
import React from 'react';
import './estilos.css';

type Caracteristica = {
  icono: string;
  descripcion: string;
};

type LoqueOfreceAmpliadoProps = {
  titulo: string;
  caracteristicas: Caracteristica[];
  cerrar: () => void; // Función para cerrar el componente
};

const LoqueOfreceAmpliado: React.FC<LoqueOfreceAmpliadoProps> = ({ titulo, caracteristicas, cerrar }) => {
  return (
    <div className="LoqueOfreceAmpliado-fondo">
      <div className="LoqueOfreceAmpliado-contenedor">
        <button className="LoqueOfreceAmpliado-cerrar" onClick={cerrar}>
          &#10005;
        </button>
        <h2 className="LoqueOfreceAmpliado-titulo">{titulo}</h2>
        <ul className="LoqueOfreceAmpliado-lista">
          {caracteristicas.map((caracteristica, index) => (
            <li key={index} className="LoqueOfreceAmpliado-item">
              <img src={caracteristica.icono} alt="icono" className="LoqueOfreceAmpliado-icono" />
              <span className="LoqueOfreceAmpliado-descripcion">{caracteristica.descripcion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoqueOfreceAmpliado;
