import React, { useState } from 'react';
import './estilos.css';

type Caracteristica = {
  icono: string;
  descripcion: string;
};

type LoQueOfreceProps = {
  titulo: string;
  caracteristicas: Caracteristica[];
};

const LoQueOfrece: React.FC<LoQueOfreceProps> = ({ titulo, caracteristicas }) => {
  const [mostrarTodo, setMostrarTodo] = useState(false);

  // Determina el número máximo de elementos visibles en función del tamaño de pantalla.
  const maxVisible = window.innerWidth < 600 ? 4 : 6; 
  const caracteristicasVisibles = mostrarTodo ? caracteristicas : caracteristicas.slice(0, maxVisible);

  const toggleMostrarTodo = () => setMostrarTodo(!mostrarTodo);

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
        <button className="loQueOfrece-boton" onClick={toggleMostrarTodo}>
          {mostrarTodo ? 'Mostrar menos' : `Mostrar los ${caracteristicas.length - maxVisible} servicios`}
        </button>
      )}
    </div>
  );
};

export default LoQueOfrece;
