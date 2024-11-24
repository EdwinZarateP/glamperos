import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsBalloonHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

interface TarjetaProps {
  imagenes: string[];
  ciudad: string;
  precio: number;
  calificacion: number;
  favorito: boolean;
  onFavoritoChange: (nuevoEstado: boolean) => void;
  tarifaServicio?: number;
  nombreGlamping: string;
  onImagenCargada?: () => void;
}

const Tarjeta: React.FC<TarjetaProps> = ({
  imagenes,
  ciudad,
  precio,
  calificacion,
  favorito,
  onFavoritoChange,
  tarifaServicio,
  nombreGlamping,
  onImagenCargada,
}) => {
  const [esFavorito, setEsFavorito] = useState(favorito);
  const [imagenActual, setImagenActual] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [bloqueoNavegacion, setBloqueoNavegacion] = useState(false);
  const [imagenCargada, setImagenCargada] = useState(false);

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Verifica el proveedor.");
  }

  const {
    totalDias,
    setPrecioPorNoche,
    setCiudad_Elegida,
    setNombreGlamping,
    setImagenesSeleccionadas,
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
    if (imagenActual < imagenes.length - 1 && !bloqueoNavegacion) {
      setBloqueoNavegacion(true);
      setImagenActual((prev) => prev + 1);
      setTimeout(() => setBloqueoNavegacion(false), 500);
    }
  };

  const anteriorImagen = () => {
    if (imagenActual > 0 && !bloqueoNavegacion) {
      setBloqueoNavegacion(true);
      setImagenActual((prev) => prev - 1);
      setTimeout(() => setBloqueoNavegacion(false), 500);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      siguienteImagen();
    } else if (touchEndX - touchStartX > 50) {
      anteriorImagen();
    }
  };

  const esPantallaPequena = window.innerWidth <= 600;

  const maxPuntos = 5;
  const halfMaxPuntos = Math.floor(maxPuntos / 2);
  let start = Math.max(0, imagenActual - halfMaxPuntos);
  let end = start + maxPuntos;

  if (end > imagenes.length) {
    end = imagenes.length;
    start = Math.max(0, end - maxPuntos);
  }

  const puntosVisibles = imagenes.slice(start, end);

  const precioConTarifa = precio * tarifa;

  const precioConFormato = (valor: number) =>
    valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const handleClicTarjeta = () => {
    setPrecioPorNoche(precioConTarifa);
    setCiudad_Elegida(ciudad);
    setNombreGlamping(nombreGlamping);
    setImagenesSeleccionadas(imagenes);
  };

  const handleImagenCargada = () => {
    setImagenCargada(true);
    if (onImagenCargada) onImagenCargada();
  };

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
        to="/TarjetaExclusiva"
        className="tarjeta-link"
        onClick={handleClicTarjeta}
      >
        <div
          className="tarjeta-imagen-container"
          onTouchStart={esPantallaPequena ? handleTouchStart : undefined}
          onTouchEnd={esPantallaPequena ? handleTouchEnd : undefined}
        >
          {!imagenCargada && <div className="tarjeta-skeleton" />}
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
                className={`tarjeta-imagen ${imagenCargada ? "visible" : "oculta"}`}
                onLoad={handleImagenCargada}
              />
            ))}
          </div>

          <div className="puntos">
            {puntosVisibles.map((_, index) => (
              <span
                key={start + index}
                className={`punto ${start + index === imagenActual ? "activo" : ""}`}
              />
            ))}
          </div>
        </div>
      </Link>
      <button
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
      </button>

      {!esPantallaPequena && (
        <>
          <button
            className={`flecha izquierda ${imagenActual === 0 ? "oculta" : ""}`}
            onClick={anteriorImagen}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button
            className={`flecha derecha ${
              imagenActual === imagenes.length - 1 ? "oculta" : ""
            }`}
            onClick={siguienteImagen}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </>
      )}

      <div className="tarjeta-info">
        <div className="tarjeta-contenido">
          <span className="tarjeta-nombre">{nombreGlamping}</span>
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
