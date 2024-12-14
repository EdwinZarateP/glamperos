import React, { useState, useEffect } from 'react';
import { opcionesAmenidades } from '../../Componentes/Amenidades/index';
import './estilos.css';
import { GiCircleClaws } from "react-icons/gi";

interface Props {
  amenidades: string[];
}

const LoQueOfrece: React.FC<Props> = ({ amenidades }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Bloquear el scroll del fondo al abrir el modal
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className="LoQueOfrece-contenedor">
      <h2 className="LoQueOfrece-titulo">Lo que ofrece</h2>

      <div className="LoQueOfrece-lista-contenida">
        <div className="LoQueOfrece-lista">
          {amenidades.slice(0, 8).map((amenidad, index) => {
            const opcionEncontrada = opcionesAmenidades.find(
              opcion =>
                opcion.label.trim().toLowerCase() === amenidad.trim().toLowerCase()
            );

            return (
              <div key={index} className="LoQueOfrece-item">
                <span className="LoQueOfrece-icono">
                  {opcionEncontrada?.icono || <GiCircleClaws />}
                </span>
                <span className="LoQueOfrece-etiqueta">{amenidad}</span>
              </div>
            );
          })}
        </div>
      </div>

      {amenidades.length > 6 && (
        <p className="mostrar-mas-texto" onClick={openModal}>Mostrar más &gt;  </p>
      )}

      {isModalOpen && (
        <div className="LoQueOfrece-modal">
          <div className="LoQueOfrece-modal-contenido">
            <button className="LoQueOfrece-cerrar" onClick={closeModal}>×</button>
            <h1>Lo que este lugar te ofrece</h1>
            <div className="LoQueOfrece-lista">
              {amenidades.map((amenidad, index) => {
                const opcionEncontrada = opcionesAmenidades.find(
                  opcion =>
                    opcion.label.trim().toLowerCase() === amenidad.trim().toLowerCase()
                );

                return (
                  <div key={index} className="LoQueOfrece-item">
                    <span className="LoQueOfrece-icono">
                      {opcionEncontrada?.icono || <GiCircleClaws />}
                    </span>
                    <span className="LoQueOfrece-etiqueta">{amenidad}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoQueOfrece;
