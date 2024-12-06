import React, { useContext } from 'react';
import './estilos.css';
import { ContextoApp } from '../../../Contexto/index';

const Paso3B: React.FC = () => {
  const { precioEstandar, setPrecioEstandar, descuento, setDescuento } = useContext(ContextoApp)!;

  const manejarPreciosEstandar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
    const valorNumerico = Number(valor);
    if (valorNumerico <= 5000000) {
      setPrecioEstandar(valor); 
    }
  };

  const manejarBlurPrecio = () => {
    setPrecioEstandar((prev) => {
      if (!prev) return '';
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(
        Number(prev)
      );
    });
  };

  const manejarDescuento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, ''); // Permitir solo números
    const valorNumerico = Number(valor);
    if (valorNumerico <= 100) {
      setDescuento(valor); 
    }
  };

  const manejarBlurDescuento = () => {
    setDescuento((prev) => `${prev.replace(/\D/g, '')}%`); // Agregar "%" al perder el foco
  };

  return (
    <div className="Paso3B-contenedor">
      <h1 className="Paso3B-titulo">Establece tu precio</h1>
      <p className="Paso3B-descripcion">
        Configura el precio que deseas cobrar por noche en tu glamping.
        La plataforma hará los descuentos automáticos para días entre semana si así lo deseas.
        De lo contrario debes dejar en 0 el descuento.
      </p>

      <div className="Paso3B-contenido">
        <div className="Paso3B-opcion">
          <label htmlFor="precio-estandar" className="Paso3B-etiqueta">
            Precio Estandar
          </label>
          <input
            id="precio-estandar"
            type="text"
            className="Paso3B-input"
            value={precioEstandar}
            onChange={manejarPreciosEstandar}
            onBlur={manejarBlurPrecio}
            placeholder="Ej: 350.000"
          />
        </div>

        <div className="Paso3B-opcion">
          <label htmlFor="descuento" className="Paso3B-etiqueta">
            % de descuento para días entre semana no festivos
          </label>
          <input
            id="descuento"
            type="text"
            className="Paso3B-input"
            value={descuento}
            onChange={manejarDescuento}
            onBlur={manejarBlurDescuento}
            placeholder="Ej: 10%"
          />
        </div>
      </div>
    </div>
  );
};

export default Paso3B;
