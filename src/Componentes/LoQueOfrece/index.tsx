// LoQueOfrece.tsx
import React, { useState, useEffect } from 'react';
import './estilos.css';
import LoqueOfreceAmpliado from '../LoqueOfreceAmpliado/index';

type Caracteristica = {
  icono: string;
  descripcion: string;
};

type LoQueOfreceProps = {
  titulo: string;
  caracteristicas: Caracteristica[];
};

const LoQueOfrece: React.FC<LoQueOfreceProps> = ({ titulo, caracteristicas }) => {
  const [mostrarAmpliado, setMostrarAmpliado] = useState(false);

  const abrirAmpliado = () => {
    setMostrarAmpliado(true);
    document.body.style.overflow = 'hidden'; // Desactiva el scroll del fondo
  };

  const cerrarAmpliado = () => {
    setMostrarAmpliado(false);
    document.body.style.overflow = 'auto'; // Reactiva el scroll del fondo
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Asegura el scroll cuando el componente se desmonta
    };
  }, []);

  // Determina el número máximo de elementos visibles en función del tamaño de pantalla.
  const maxVisible = window.innerWidth < 600 ? 4 : 6; 
  const caracteristicasVisibles = caracteristicas.slice(0, maxVisible);

  return (
    <div className="loQueOfrece-contenedor">
      <h2 className="loQueOfrece-titulo">{titulo}</h2>
      <div className="loQueOfrece-lista">
        {caracteristicasVisibles.map((caracteristica, index) => (
          <div key={index} className="loQueOfrece-item">
            <img src={caracteristica.icono} alt="" className="loQueOfrece-icono" />
            <span className="loQueOfrece-descripcion">{caracteristica.descripcion}</span>
          </div>
        ))}
      </div>
      {caracteristicas.length > maxVisible && (
        <button className="loQueOfrece-boton" onClick={abrirAmpliado}>
          {`Mostrar las ${caracteristicas.length } amenidades`}
        </button>
      )}
      {mostrarAmpliado && (
        <LoqueOfreceAmpliado
          titulo={titulo}
          caracteristicas={caracteristicas}
          cerrar={cerrarAmpliado}
        />
      )}
    </div>
  );
};

export default LoQueOfrece;
