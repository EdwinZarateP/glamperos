import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import meme from '../../Imagenes/meme.jpg';
import animationData from "../../Imagenes/AnimationPuntos.json";
import './estilos.css';

interface Reserva {
  id: string;
  idCliente: string;
  idPropietario: string;
  idGlamping: string;
  ciudad_departamento: string;
  FechaIngreso: string;
  FechaSalida: string;
  Noches: number;
  ValorReserva: number;
  CostoGlamping: number;
  ComisionGlamperos: number;
  adultos: number;
  ninos: number;
  bebes: number;
  mascotas: number;
  EstadoReserva: string;
  fechaCreacion: string;
  codigoReserva: string;
  ComentariosCancelacion: string;
}

interface GlampingData {
  _id: string;
  imagenes: string[];
  nombreGlamping: string;
  Acepta_Mascotas: boolean;
  diasCancelacion: number;
}

const ReservasCliente: React.FC = () => {
  const idCliente = Cookies.get('idUsuario');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [glampingData, setGlampingData] = useState<GlampingData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!idCliente) {
      console.error('No se encontró el idCliente en las cookies');
      setCargando(false);
      return;
    }

    const obtenerReservas = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/reservas/documentos_cliente/${idCliente}`);
        const data = await response.json();
        if (response.ok) {
          setReservas(data);
        } else {
          console.error('No se pudieron obtener las reservas');
        }
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, [idCliente]);

  useEffect(() => {
    if (reservas.length > 0) {
      const obtenerGlamping = async (glampingId: string) => {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/glampings/${glampingId}`);
          const data = await response.json();
          if (response.ok) {
            setGlampingData(prevData => [...prevData, data]);
          } else {
            console.error('No se pudo obtener la información del glamping');
          }
        } catch (error) {
          console.error('Error al obtener datos del glamping:', error);
        }
      };

      reservas.forEach(reserva => {
        if (!glampingData.find(g => g._id === reserva.idGlamping)) {
          obtenerGlamping(reserva.idGlamping);
        }
      });
    }
  }, [reservas]);

  const cambiarImagen = (reservaId: string, direccion: 'siguiente' | 'anterior') => {
    setCurrentImageIndexes(prev => {
      const reserva = reservas.find(r => r.id === reservaId);
      if (!reserva) return prev;
      
      const glamping = glampingData.find(g => g._id === reserva.idGlamping);
      if (!glamping) return prev;

      const currentIndex = prev[reservaId] || 0;
      const lastIndex = glamping.imagenes.length - 1;

      let newIndex = currentIndex;
      if (direccion === 'siguiente') {
        newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
      }

      return { ...prev, [reservaId]: newIndex };
    });
  };

  const calcularFechaCancelacion = (fechaIngreso: string, diasCancelacion: number) => {
    if (diasCancelacion <= 0) return 'No aplica';
    
    const fecha = new Date(fechaIngreso);
    fecha.setDate(fecha.getDate() - diasCancelacion);
    
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="ReservasCliente-container">
      {cargando ? (
        <div className="ReservasCliente-cargando">
          <Lottie 
            animationData={animationData} 
            style={{ height: 200, width: '100%', margin: 'auto' }} 
          />
        </div>
      ) : reservas.length === 0 ? (
        <div className="ReservasCliente-sinReservas">
          <img src={meme} alt="Imagen divertida" className="ReservasCliente-imagen" />
          <p className="ReservasCliente-mensaje">No tienes reservas ¿Qué esperas para ir a ese lugar soñado?</p>
        </div>
      ) : (
        <div className="ReservasCliente-lista">
          {reservas.map((reserva) => {
            const glamping = glampingData.find(g => g._id === reserva.idGlamping);
            if (!glamping) return null;

            const imagenIndex = currentImageIndexes[reserva.id] ?? 0;

            return (
              <div key={reserva.id} className="ReservasCliente-tarjeta">
                <h3 className="ReservasCliente-titulo">{glamping.nombreGlamping}</h3>              
                <p className="ReservasCliente-detalle" onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}><strong>Código Reserva:</strong> {reserva.codigoReserva}</p>
                <p className="ReservasCliente-detalle" onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}><strong>Estado Reserva:</strong> {reserva.EstadoReserva}</p>                
                <p className="ReservasCliente-detalle" onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}><strong>Ciudad:</strong> {reserva.ciudad_departamento}</p>
                <p className="ReservasCliente-detalle" onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}><strong>Fechas:</strong> {new Date(reserva.FechaIngreso).toLocaleDateString()} - {new Date(reserva.FechaSalida).toLocaleDateString()}</p>
                <p className="ReservasCliente-detalle" onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}><strong>Plazo para cancelar:</strong> {calcularFechaCancelacion(reserva.FechaIngreso, glamping.diasCancelacion || 0)}</p>  
                <p className="ReservasCliente-detalle" onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}><strong>Valor Total:</strong> ${reserva.ValorReserva.toLocaleString()}</p>

                {glamping.imagenes.length > 0 && (
                  <>
                    <div className="ReservasCliente-carrusel">
                      <img
                        className="ReservasCliente-carrusel-imagen"
                        src={glamping.imagenes[imagenIndex]}
                        onClick={() => navigate(`/GestionarReserva/${reserva.codigoReserva}`)}
                        alt={`Imagen del glamping ${glamping.nombreGlamping}`}                        
                      />
                      <div className="ReservasCliente-carrusel-botones-izq">
                        <button 
                          className="ReservasCliente-boton-carrusel-izq" 
                          onClick={() => cambiarImagen(reserva.id, 'anterior')}
                        >
                          <MdOutlineKeyboardArrowLeft/>
                        </button>
                      </div>

                      <div className="ReservasCliente-carrusel-botones-der">
                        <button 
                          className="ReservasCliente-boton-carrusel-der" 
                          onClick={() => cambiarImagen(reserva.id, 'siguiente')}
                        >
                          <MdOutlineKeyboardArrowRight/>
                          
                        </button>
                      </div>
                    </div>
                    {glamping.Acepta_Mascotas && (
                      <MdOutlinePets className="ReservasCliente-icono-mascotas" />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservasCliente;