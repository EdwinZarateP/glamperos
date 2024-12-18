import React, { useState, useEffect, useRef } from 'react';
import './estilos.css';

interface DescripcionGlampingTextoProps {
  descripcionGlamping: string;
}

const DescripcionGlampingTexto: React.FC<DescripcionGlampingTextoProps> = ({ descripcionGlamping }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textoRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const paragraph = textoRef.current;

    if (paragraph) {
      if (paragraph.scrollHeight > paragraph.clientHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  }, [descripcionGlamping]);

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
    <div className="DescripcionGlampingTexto-contenedor">
      {/* Texto limitado a 3 líneas */}
      <div className="DescripcionGlampingTexto-parrafo" ref={textoRef}>
        {descripcionGlamping}
      </div>

      {/* Botón de Mostrar Más */}
      {showButton && (
        <span
          className="DescripcionGlampingTexto-mostrar-mas-texto"
          onClick={openModal}
        >
          Mostrar más &gt;
        </span>
      )}

      {/* Modal para la descripción completa */}
      {isModalOpen && (
        <div className="DescripcionGlampingTexto-modal">
          <div className="DescripcionGlampingTexto-modal-contenido">
            <h2 className="DescripcionGlampingTexto-titulo">Tenemos para ti</h2>
            <button
              className="DescripcionGlampingTexto-cerrar-boton"
              onClick={closeModal}
            >
              ×
            </button>
            <div>{descripcionGlamping}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescripcionGlampingTexto;
