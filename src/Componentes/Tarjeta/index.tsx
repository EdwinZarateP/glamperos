import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsBalloonHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { ContextoApp } from "../../Contexto/index";
import { calcularTarifaServicio } from "../../Funciones/calcularTarifaServicio";
import viernesysabadosyfestivos from "../../Componentes/BaseFinesSemana/fds.json";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./estilos.css";

interface TarjetaProps {
  glampingId:string;
  imagenes: string[];
  ciudad: string;
  precio: number;
  calificacion: number;
  favorito: boolean;
  onFavoritoChange: (nuevoEstado: boolean) => void;
  descuento?: number;
  tipoGlamping: string;
  nombreGlamping: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  Acepta_Mascotas:boolean;
  fechasReservadas: string[];
  Cantidad_Huespedes: number;
  precioEstandarAdicional: number;
  Cantidad_Huespedes_Adicional: number;
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
  descuento,
  nombreGlamping,
  Acepta_Mascotas, 
  Cantidad_Huespedes,
  precioEstandarAdicional,
  Cantidad_Huespedes_Adicional
  
}) => {
  const [esFavorito, setEsFavorito] = useState(favorito);
  const [imagenActual, setImagenActual] = useState(0);
  let touchStartX = 0;
  let touchEndX = 0;
  
  const navigate = useNavigate();
  const idUsuarioCookie = Cookies.get('idUsuario'); 

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Verifica el proveedor.");
  }

  const {
    totalDias,
    fechaInicio,
    fechaFin,
    fechaInicioConfirmado,
    fechaFinConfirmado,
    Cantidad_Adultos,
    Cantidad_Ninos,
    Cantidad_Bebes,
    Cantidad_Mascotas
  } = almacenVariables;
  
  if (!imagenes || imagenes.length === 0) {
    return <div>No hay imágenes para mostrar.</div>;
  }

  const hoy = new Date();
  const fechaInicioPorDefecto = new Date();
  fechaInicioPorDefecto.setDate(hoy.getDate() + 1); // Día de mañana
  const fechaFinPorDefecto = new Date();
  fechaFinPorDefecto.setDate(hoy.getDate() + 2); // Pasado mañana

  const fechaInicioUrl = fechaInicio
  ? fechaInicio.toISOString().split('T')[0]
  : fechaInicioPorDefecto.toISOString().split('T')[0];

  const fechaFinUrl = fechaFin
  ? fechaFin.toISOString().split('T')[0]
  : fechaFinPorDefecto.toISOString().split('T')[0];

  const totalDiasUrl = totalDias
  ? totalDias
  : 1

  const totalAdultosUrl = Cantidad_Adultos
  ? Cantidad_Adultos
  : 1

  const totalNinosUrl = Cantidad_Ninos
  ? Cantidad_Ninos
  : 0

  const totalBebesUrl = Cantidad_Bebes
  ? Cantidad_Bebes
  : 0

  const totaMascotasUrl = Cantidad_Mascotas
  ? Cantidad_Mascotas
  : 0
  
  const precioConTarifa = calcularTarifaServicio(precio, viernesysabadosyfestivos, descuento, fechaInicioConfirmado ?? fechaInicioPorDefecto, fechaFinConfirmado ?? fechaFinPorDefecto);
  const precioFinalNoche=precioConTarifa/totalDias
  
  const handleFavoritoChange = async () => {
    
    if (!idUsuarioCookie) {
      navigate('/Registrarse');
      return;
    }
  
    try {
      const nuevoEstado = !esFavorito;
      setEsFavorito(nuevoEstado);
      onFavoritoChange(nuevoEstado);
  
      if (nuevoEstado) {
        // Añadir a favoritos
        await axios.post('https://glamperosapi.onrender.com/favoritos/', {
          usuario_id: idUsuarioCookie,
          glamping_id: glampingId,
        });
      } else {
        // Eliminar de favoritos
        await axios.delete(`https://glamperosapi.onrender.com/favoritos/?usuario_id=${idUsuarioCookie}&glamping_id=${glampingId}`);        
      }
    } catch (error) {
      console.error('Error al actualizar el favorito:', error);
      alert('Hubo un problema al actualizar el favorito. Intenta nuevamente.');
      // Revertir el estado si falla la solicitud
      setEsFavorito(!esFavorito);
      onFavoritoChange(!esFavorito);
    }
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
        <div className="tarjeta-precio">
        <span>{precioConFormato(precioFinalNoche)} noche para {Cantidad_Huespedes}</span>
        <br />
        {Cantidad_Huespedes_Adicional > 0 && (
          <span>{precioConFormato(precioEstandarAdicional)} por persona adicional</span>
        )}
      </div>              
      );
    }

    return (
      <>
        <span className="tarjeta-precio-base">
          {precioConFormato(precioFinalNoche)} por noche
        </span>
        <div className="tarjeta-precio-variosDias">
          {precioConFormato(precioConTarifa)} por {totalDias} noches <br />
          {Cantidad_Huespedes_Adicional > 0 && (
          <span>{precioConFormato(precioEstandarAdicional)} por persona adicional</span>
          )}
        </div>
      </>
    );
  };


// Nuevo manejador de redirección
const esPantallaPequena = window.innerWidth <= 600;
const urlDestino = `/ExplorarGlamping/${glampingId}/${fechaInicioUrl}/${fechaFinUrl}/${totalDiasUrl}/${totalAdultosUrl}/${totalNinosUrl}/${totalBebesUrl}/${totaMascotasUrl}`;

return (
  <div className="tarjeta">
    {esPantallaPequena ? (
      // Uso de <Link> si la pantalla es menor o igual a 600px
      <Link to={urlDestino} className="tarjeta-link">
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

          {/* Icono de mascota */}
          {Acepta_Mascotas && (
            <MdOutlinePets className="tarjeta-icono-mascota" />
          )}

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
    ) : (
      // Uso de <a> si la pantalla es mayor a 600px
      <a href={urlDestino} className="tarjeta-link" target="_blank" rel="noopener noreferrer">
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

          {/* Icono de mascota */}
          {Acepta_Mascotas && (
            <MdOutlinePets className="tarjeta-icono-mascota" />
          )}

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
      </a>
    )}

    {/* Icono de favorito */}
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

    {/* Botones de navegación en el carrusel */}
    <div
      className={`flecha izquierda ${imagenActual === 0 ? "oculta" : ""}`}
      onClick={anteriorImagen}
    >
      <MdOutlineKeyboardArrowLeft />
    </div>
    <div
      className={`flecha derecha ${imagenActual === imagenes.length - 1 ? "oculta" : ""}`}
      onClick={siguienteImagen}
    >
      <MdOutlineKeyboardArrowRight />
    </div>

    {/* Información del glamping */}
    <div className="tarjeta-info">
      <div className="tarjeta-contenido">
        <span className="tarjeta-nombre">
          {nombreGlamping.toLowerCase().replace(/\b\w/, (c) => c.toUpperCase())}
        </span>
        <div className="tarjeta-calificacion">
          <FaStar className="tarjeta-estrella" />
          <span>{calificacion.toFixed(1)}</span>
        </div>
      </div>
      <p className="tarjeta-ciudad">{ciudad}</p>
      {renderPrecio()}
    </div>
  </div>
);
}

export default Tarjeta;
