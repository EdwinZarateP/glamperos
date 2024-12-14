import React, { useState, useEffect, useRef } from 'react';
import './estilos.css';

interface DescripcionGlampingTextoProps {
  descripcionGlamping: string;
}

const DescripcionGlampingTexto: React.FC<DescripcionGlampingTextoProps> = ({ descripcionGlamping }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textoRef = useRef<HTMLParagraphElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const paragraph = textoRef.current;

    if (paragraph) {
      console.log('scrollHeight:', paragraph.scrollHeight);
      console.log('clientHeight:', paragraph.clientHeight);

      if (paragraph.scrollHeight > paragraph.clientHeight) {
        console.log('Botón debe mostrarse');
        setShowButton(true);
      } else {
        console.log('No se necesita mostrar el botón');
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
      <p className="DescripcionGlampingTexto-parrafo" ref={textoRef}>
        {descripcionGlamping}
      </p>

      {/* Botón de Mostrar Más */}
      {showButton && (
        <p className="DescripcionGlampingTexto-mostrar-mas-texto" onClick={openModal}>
          Mostrar más &gt;
        </p>
      )}

      {/* Modal para la descripción completa */}
      {isModalOpen && (
        <div className="DescripcionGlampingTexto-modal">
          <div className="DescripcionGlampingTexto-modal-contenido">
            <h2 className="DescripcionGlampingTexto-titulo">Tenemos para ti</h2>
            <button className="DescripcionGlampingTexto-cerrar-boton" onClick={closeModal}>
              ×
            </button>
            <p>{descripcionGlamping}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescripcionGlampingTexto;
