import React, { useState, useEffect, useContext } from 'react';
import { ContextoApp } from "../../Contexto/index";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import meme from '../../Imagenes/meme.jpg';
import animationData from "../../Imagenes/AnimationPuntos.json";
import EvaluarGlamping from "../../Componentes/EvaluarGlamping/index";
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

interface EvaluacionResponse {
  tiene_calificacion: boolean;
}

const ReservasCliente: React.FC = () => {
  const idCliente = Cookies.get('idUsuario');
  const nombreUsuario = Cookies.get('nombreUsuario');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [glampingData, setGlampingData] = useState<GlampingData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [cargandoEvaluaciones, setCargandoEvaluaciones] = useState<boolean>(true);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [evaluaciones, setEvaluaciones] = useState<{ [codigoReserva: string]: boolean }>({});
  
  const almacenVariables = useContext(ContextoApp);
  
  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }
  const { activarCalificacion, setActivarCalificacion } = almacenVariables;

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
          verificarEvaluaciones(data);
        } else {
          console.error('No se pudieron obtener las reservas');
          setCargando(false);
        }
      } catch (error) {
        console.error('Error al obtener reservas:', error);
        setCargando(false);
      }
    };
  
    obtenerReservas();
  }, [idCliente]);
  
  const verificarEvaluaciones = async (reservas: Reserva[]) => {
    const evaluacionesTemp: { [codigoReserva: string]: boolean } = {};
  
    for (const reserva of reservas) {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/evaluaciones/codigoReserva/${reserva.codigoReserva}/tieneCalificacion`);
        const data: EvaluacionResponse = await response.json();
        evaluacionesTemp[reserva.codigoReserva] = data.tiene_calificacion;
      } catch (error) {
        console.error('Error al verificar evaluación:', error);
        evaluacionesTemp[reserva.codigoReserva] = false;
      }
    }
  
    setEvaluaciones(evaluacionesTemp);
    setCargandoEvaluaciones(false); // Marcar que terminó la carga de evaluaciones
  };

  // 🚀 Cuando ambas consultas han terminado, ocultamos el Lottie
  useEffect(() => {
  if (!cargandoEvaluaciones) {
    setCargando(false);
    }
  }, [cargandoEvaluaciones]);

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

  const mostrarBotonCalificar = (reserva: Reserva) => {
    const hoy = new Date();
    const fechaSalida = new Date(reserva.FechaSalida);
  
    // Permitir calificar desde un día antes de la FechaSalida
    const fechaInicioCalificacion = new Date(fechaSalida);
    fechaInicioCalificacion.setDate(fechaInicioCalificacion.getDate() - 1);
  
    // Permitir calificar hasta 15 días después de la FechaSalida
    const fechaLimiteCalificacion = new Date(fechaSalida);
    fechaLimiteCalificacion.setDate(fechaLimiteCalificacion.getDate() + 15);
  
    // No mostrar si la reserva está cancelada
    if (reserva.EstadoReserva === 'Cancelada') return false;
  
    // No mostrar si ya tiene una calificación
    if (evaluaciones[reserva.codigoReserva]) return false;
  
    // Mostrar solo si estamos dentro del rango de tiempo permitido
    return hoy >= fechaInicioCalificacion && hoy <= fechaLimiteCalificacion;
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
                
                {mostrarBotonCalificar(reserva) && (
                  <button 
                    className="ReservasCliente-boton-calificar"
                    onClick={() => {
                      setSelectedReserva(reserva);
                      setActivarCalificacion(true);
                    }}
                  >
                    Calificar Estancia
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {activarCalificacion && selectedReserva && (
        <EvaluarGlamping
          usuario_id={selectedReserva.idCliente}
          codigoReserva={selectedReserva.codigoReserva}
          nombre_usuario={nombreUsuario || ''}
          glamping_id={selectedReserva.idGlamping}
        />
      )}
    </div>
  );
};

export default ReservasCliente;