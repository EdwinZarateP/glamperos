import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsBalloonHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

interface TarjetaProps {
  glampingId:string;
  imagenes: string[];
  ciudad: string;
  precio: number;
  calificacion: number;
  favorito: boolean;
  onFavoritoChange: (nuevoEstado: boolean) => void;
  tarifaServicio?: number;
  nombreGlamping: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  onImagenCargada?: () => void;
}

const Tarjeta: React.FC<TarjetaProps> = ({
  glampingId,
  imagenes,
  ciudad,
  precio,
  calificacion,
  favorito,
  onFavoritoChange,
  tarifaServicio,
  nombreGlamping,
  
}) => {
  const [esFavorito, setEsFavorito] = useState(favorito);
  const [imagenActual, setImagenActual] = useState(0);
  let touchStartX = 0;
  let touchEndX = 0;

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Verifica el proveedor.");
  }

  const {
    totalDias,
  } = almacenVariables;

  if (!imagenes || imagenes.length === 0) {
    return <div>No hay imágenes para mostrar.</div>;
  }

  const calcularTarifaServicio = (precio: number): number => {
    if (precio > 0 && precio <= 299999) return 1.15;
    if (precio >= 300000 && precio <= 400000) return 1.12;
    if (precio >= 401000 && precio <= 500000) return 1.11;
    if (precio >= 501000 && precio <= 600000) return 1.1;
    if (precio >= 601000 && precio <= 800000) return 1.09;
    if (precio >= 801000 && precio <= 2000000) return 1.08;
    return 1;
  };

  const tarifa = tarifaServicio ?? calcularTarifaServicio(precio);

  const handleFavoritoChange = () => {
    const nuevoEstado = !esFavorito;
    setEsFavorito(nuevoEstado);
    onFavoritoChange(nuevoEstado);
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev < imagenes.length - 1 ? prev + 1 : prev));
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      siguienteImagen();
    } else if (touchEndX - touchStartX > 50) {
      anteriorImagen();
    }
  };

  // Lógica para limitar los puntos visibles a 5
  const maxPuntos = 5;
  const start = Math.max(0, imagenActual - Math.floor(maxPuntos / 2));
  const end = Math.min(imagenes.length, start + maxPuntos);
  const puntosVisibles = imagenes.slice(start, end);

  const precioConTarifa = precio * tarifa;

  const precioConFormato = (valor: number) =>
    valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });


  const renderPrecio = () => {
    if (totalDias === 0 || totalDias === 1) {
      return (
        <span className="tarjeta-precio">
          {precioConFormato(precioConTarifa * Math.max(totalDias, 1))} por noche
        </span>
      );
    }

    return (
      <>
        <span className="tarjeta-precio-base">
          {precioConFormato(precioConTarifa)} por noche
        </span>
        <span className="tarjeta-precio">
          {precioConFormato(precioConTarifa * totalDias)} por {totalDias} noches
        </span>
      </>
    );
  };

  return (
    <div className="tarjeta">
      <Link
        to={`/ExplorarGlamping/${glampingId}`}
        className="tarjeta-link"
      >
        <div
          className="tarjeta-imagen-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carrusel"
            style={{
              transform: `translateX(-${imagenActual * 100}%)`,
            }}
          >
            {imagenes.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Glamping ${nombreGlamping}`}
                className="tarjeta-imagen visible"
              />
            ))}
          </div>
          <div className="puntos">
            {puntosVisibles.map((_, index) => (
              <span
                key={start + index}
                className={`punto ${start + index === imagenActual ? "activo" : ""}`}
                onClick={() => setImagenActual(start + index)}
              />
            ))}
          </div>
        </div>
      </Link>
      <div
        className="tarjeta-favorito"
        onClick={(e) => {
          e.stopPropagation();
          handleFavoritoChange();
        }}
      >
        {esFavorito ? (
          <BsBalloonHeartFill className="corazon activo" />
        ) : (
          <AiTwotoneHeart className="corazon" />
        )}
      </div>

      <div
        className={`flecha izquierda ${imagenActual === 0 ? "oculta" : ""}`}
        onClick={anteriorImagen}
      >
        <MdOutlineKeyboardArrowLeft />
      </div>
      <div
        className={`flecha derecha ${
          imagenActual === imagenes.length - 1 ? "oculta" : ""
        }`}
        onClick={siguienteImagen}
      >
        <MdOutlineKeyboardArrowRight />
      </div>

      <div className="tarjeta-info">
        <div className="tarjeta-contenido">
          <span className="tarjeta-nombre">{nombreGlamping   }</span>
          <div className="tarjeta-calificacion">
            <FaStar className="estrella" />
            <span>{calificacion}</span>
          </div>
        </div>
        <p className="tarjeta-ciudad">{ciudad}</p>
        {renderPrecio()}
      </div>
    </div>
  );
};

export default Tarjeta;
