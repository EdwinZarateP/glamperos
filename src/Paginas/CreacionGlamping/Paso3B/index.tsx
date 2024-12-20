import React, { useContext } from 'react';
import './estilos.css';
import { ContextoApp } from '../../../Contexto/index';

const Paso3B: React.FC = () => {
  const { precioEstandar, setPrecioEstandar, descuento, setDescuento } = useContext(ContextoApp)!;

  // Función para manejar la entrada de precios estándar
  const manejarPreciosEstandar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, ''); // Eliminar no numéricos
    const valorNumerico = Number(valor);
    if (valorNumerico <= 2000000) {
      setPrecioEstandar(valorNumerico); // Almacenar siempre como número
    }
  };

  // Función para manejar el blur de precios estándar
  const manejarBlurPrecio = () => {
    setPrecioEstandar((prev) => {
      if (prev === undefined || prev === null) return 0; 
      return Number(prev); 
    });
  };

  // Función para manejar la entrada de descuento
  const manejarDescuento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, ''); // Eliminar no numéricos
    const valorNumerico = Number(valor);
    if (valorNumerico <= 100) {
      setDescuento(valorNumerico); // Siempre como número
    }
  };

  // Función para manejar el blur de descuentos
  const manejarBlurDescuento = () => {
    setDescuento((prev) => {
      if (!prev) return 0; 
      const valorNumerico = Number(prev);
      return valorNumerico; 
    });
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
