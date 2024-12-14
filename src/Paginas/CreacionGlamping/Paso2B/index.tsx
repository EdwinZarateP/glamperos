import React, { useState, useContext, useEffect } from 'react';
import { ContextoApp } from '../../../Contexto/index';
import './estilos.css';
import { opcionesAmenidades } from '../../../Componentes/Amenidades/index';

const Paso2B: React.FC = () => {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const { amenidadesGlobal, setAmenidadesGlobal } = useContext(ContextoApp)!;

  const manejarSeleccion = (id: string) => {
    setSeleccionados(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    setAmenidadesGlobal(seleccionados);
  }, [seleccionados, setAmenidadesGlobal]);

  useEffect(() => {
    setSeleccionados(amenidadesGlobal || []);
  }, []);

  return (
    <div className="Paso2B-contenedor">
      <h1 className="Paso2B-titulo">Cuéntale a tus huéspedes todo lo que tu Glamping tiene para ofrecer</h1>
      <div className="Paso2B-grid">
        {opcionesAmenidades.map((opcion) => (
          <div
            key={opcion.id}
            className={`Paso2B-opcion ${seleccionados.includes(opcion.id) ? 'Paso2B-seleccionado' : ''}`}
            onClick={() => manejarSeleccion(opcion.id)}
          >
            <span className="Paso2B-icono">{opcion.icono}</span>
            <span className="Paso2B-label">{opcion.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paso2B;
