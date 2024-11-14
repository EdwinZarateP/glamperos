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
  const maxVisible = window.innerWidth < 600 ? 6 : 4; 
  const caracteristicasVisibles = mostrarTodo ? caracteristicas : caracteristicas.slice(0, maxVisible);

  const toggleMostrarTodo = () => setMostrarTodo(!mostrarTodo);

  return (
    <div className="lo-que-ofrece">
      <h2 className="titulo">{titulo}</h2>
      <div className="lista-caracteristicas">
        {caracteristicasVisibles.map((caracteristica, index) => (
          <div key={index} className="item-caracteristica">
            <img src={caracteristica.icono} alt="" className="icono" />
            <span className="descripcion">{caracteristica.descripcion}</span>
          </div>
        ))}
      </div>
      {caracteristicas.length > maxVisible && (
        <button className="boton-mostrar" onClick={toggleMostrarTodo}>
          {mostrarTodo ? 'Mostrar menos' : `Mostrar los ${caracteristicas.length - maxVisible} servicios`}
        </button>
      )}
    </div>
  );
};

export default LoQueOfrece;
