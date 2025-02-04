import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Lottie from 'lottie-react';
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
}

const ReservasPropietario: React.FC = () => {
  const idPropietario = Cookies.get('idUsuario');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [glampingData, setGlampingData] = useState<GlampingData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [filtroEstado, setFiltroEstado] = useState<string>(''); // Estado para el filtro

  // Función para formatear la fecha en UTC-5 (Colombia)
  const formatearFechaColombia = (fechaUTC: string) => {
    if (!fechaUTC) return "Fecha no disponible"; // Manejo de error
  
    const fecha = new Date(fechaUTC);
    if (isNaN(fecha.getTime())) return "Fecha inválida"; // Validar si la fecha es válida
  
    // Ajustar manualmente restando 5 horas (UTC -5)
    fecha.setHours(fecha.getHours() - 5);
  
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(fecha);
  };    
  
  useEffect(() => {
    if (!idPropietario) {
      console.error('No se encontró el idPropietario en las cookies');
      setCargando(false);
      return;
    }

    const obtenerReservas = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/reservas/documentos/${idPropietario}`);
        const data = await response.json();
        if (response.ok) {
          // Ordena las reservas por fechaCreacion (de mayor a menor)
          const reservasOrdenadas = data.sort((a: Reserva, b: Reserva) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
          setReservas(reservasOrdenadas);
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
  }, [idPropietario]);

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

  // Filtra las reservas por el estado seleccionado
  const reservasFiltradas = filtroEstado ? reservas.filter(reserva => reserva.EstadoReserva === filtroEstado) : reservas;

  return (
    <div className="ReservasPropietario-container">
      {cargando ? (
        <div className="ReservasPropietario-cargando">
          <Lottie 
            animationData={animationData} 
            style={{ height: 200, width: '100%', margin: 'auto' }} 
          />
        </div>
      ) : reservas.length === 0 ? (
        <div className="ReservasPropietario-sinReservas">
          <img src={meme} alt="Imagen divertida" className="ReservasPropietario-imagen" />
          <p className="ReservasPropietario-mensaje">No tienes reservaciones aún, trabajamos en hacerte mas visible</p>
        </div>
      ) : (
        <>
          {/* Filtro de estado */}
          <div className="ReservasPropietario-filtro">
            <label htmlFor="estadoReserva">Filtrar por estado: </label>
            <select
              id="estadoReserva"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Lista de reservas filtradas */}
          <div className="ReservasPropietario-lista">
            {reservasFiltradas.map((reserva) => {
              const glamping = glampingData.find(g => g._id === reserva.idGlamping);
              if (!glamping) return null; 

              // Determina el color de la tarjeta según el estado
              const colorEstado = reserva.EstadoReserva === "Cancelada" ? "#e0e0e0" : reserva.EstadoReserva === "Finalizada" ? "rgba(47, 107, 62, 0.2)" : "white";

              return (
                <div key={reserva.id} className="ReservasPropietario-tarjeta" style={{ backgroundColor: colorEstado }}>
                  <h3 className="ReservasPropietario-titulo">{glamping.nombreGlamping}</h3>              
                  <p className="ReservasPropietario-detalle"><strong>Código Reserva:</strong> {reserva.codigoReserva}</p>                  
                  <p className="ReservasPropietario-detalle"><strong>La recibiste el:</strong> {formatearFechaColombia(reserva.fechaCreacion)}</p>
                  <p className="ReservasPropietario-detalle"><strong>Estado Reserva:</strong> {reserva.EstadoReserva}</p>
                  <p className="ReservasPropietario-detalle"><strong>Ciudad:</strong> {reserva.ciudad_departamento}</p>
                  <p className="ReservasPropietario-detalle"><strong>Check-In:</strong> {new Date(reserva.FechaIngreso).toLocaleDateString()}</p>
                  <p className="ReservasPropietario-detalle"><strong>Check-Out:</strong> {new Date(reserva.FechaSalida).toLocaleDateString()}</p>
                  <p className="ReservasPropietario-detalle">
                    <strong>Huéspedes: </strong> 
                    {reserva.adultos > 0 && `${Number(reserva.adultos)} ${Number(reserva.adultos) === 1 ? 'Adulto' : 'Adultos'}`}
                    {reserva.ninos > 0 && `, ${reserva.ninos} ${Number(reserva.ninos) === 1 ? 'Niño' : 'Niños'}`}
                    {reserva.bebes > 0 && `, ${reserva.bebes} ${Number(reserva.bebes) === 1 ? 'Bebé' : 'Bebés'}`}
                    {reserva.mascotas > 0 && ` y ${reserva.mascotas} Mascota${Number(reserva.mascotas) > 1 ? "s" : ""}`}
                  </p>
                  <p className="ReservasPropietario-detalle"><strong>Valor Reserva:</strong> ${reserva.ValorReserva.toLocaleString()}</p>              
                  <p className="ReservasPropietario-detalle"><strong>Comisión Glamperos:</strong> ${reserva.ComisionGlamperos.toLocaleString()}</p>
                  <p className="ReservasPropietario-detalle"><strong>Tu pago será: ${reserva.CostoGlamping.toLocaleString()}</strong></p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ReservasPropietario;
