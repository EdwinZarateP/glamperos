import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import { EliminarFechas } from "../../Funciones/EliminarFechas";
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

interface Glamping {
  _id: string;
  nombreGlamping: string;
  ciudad_departamento: string;
  diasCancelacion: number;
}

const GestionReserva: React.FC = () => {
  const { codigoReserva } = useParams<{ codigoReserva: string }>();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [glamping, setGlamping] = useState<Glamping | null>(null);
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);
  const [motivoCancelacion, setMotivoCancelacion] = useState<string>('');
  const [mostrarFormularioCancelacion, setMostrarFormularioCancelacion] = useState<boolean>(false);

  const motivosCancelacion = [
    "Cambio de planes",
    "Problemas de salud",
    "Problemas económicos",
    "Problemas de transporte",
    "Emergencia familiar",
    "Otro motivo"
  ];

  const calcularPeriodoCancelacion = () => {
    if (!reserva || !glamping) return false;
    
    const fechaLimite = new Date(reserva.FechaIngreso);
    fechaLimite.setDate(fechaLimite.getDate() - glamping.diasCancelacion);
    const hoy = new Date();
    
    fechaLimite.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    return hoy <= fechaLimite && reserva.EstadoReserva !== 'Cancelada';
  };

  const calcularFechaLimiteCancelacion = (): string => {
    if (!reserva || !glamping) return '';
    const fechaIngreso = new Date(reserva.FechaIngreso);
    const fechaLimite = new Date(fechaIngreso);
    fechaLimite.setDate(fechaIngreso.getDate() - glamping.diasCancelacion);
    return fechaLimite.toLocaleDateString('es-CO');
  };

  const manejarCancelacion = async () => {
    if (!reserva) return;

    if (!motivoCancelacion) {
      Swal.fire({
        title: 'Motivo requerido',
        text: 'Debes seleccionar un motivo de cancelación',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    try {
      const respuesta = await fetch(`https://glamperosapi.onrender.com/reservas/${reserva.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EstadoReserva: 'Cancelada',
          ComentariosCancelacion: motivoCancelacion
        })
      });

      if (respuesta.ok) {
        await eliminarFechasReservadas(reserva.idGlamping, reserva.FechaIngreso, reserva.FechaSalida);

        // 📲 Enviar mensaje de WhatsApp después de la cancelación
        if (glamping) {
          await enviarMensajeCancelacion("573125443396");
        }

        Swal.fire({
          title: '¡Cancelación exitosa!',
          text: 'Tu reserva ha sido cancelada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        });
      } else {
        throw new Error('Error al actualizar la reserva');
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al procesar la cancelación',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      if (!codigoReserva) {
        setError('No se proporcionó un código de reserva');
        return;
      }

      setCargando(true);
      setError('');

      try {
        const respuestaReserva = await fetch(
          `https://glamperosapi.onrender.com/reservas/codigo/${codigoReserva}`
        );
        
        if (!respuestaReserva.ok) {
          throw new Error(respuestaReserva.status === 404 
            ? 'No se encontró una reserva con ese código' 
            : 'Error al obtener la reserva');
        }

        const datosReserva = await respuestaReserva.json();
        setReserva(datosReserva.reserva);

        const respuestaGlamping = await fetch(
          `https://glamperosapi.onrender.com/glampings/${datosReserva.reserva.idGlamping}`
        );

        if (!respuestaGlamping.ok) {
          throw new Error('Error al obtener detalles del alojamiento');
        }

        const datosGlamping = await respuestaGlamping.json();
        setGlamping({
          _id: datosGlamping._id,
          nombreGlamping: datosGlamping.nombreGlamping,
          ciudad_departamento: datosGlamping.ciudad_departamento,
          diasCancelacion: datosGlamping.diasCancelacion
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [codigoReserva]);

  const eliminarFechasReservadas = async (glampingId: string, fechaInicio: string, fechaFin: string) => {
    const fechasAEliminar: string[] = [];
    let fechaActual = new Date(fechaInicio);
    let fechaFinDate = new Date(fechaFin);
  
    // Normalizar fechas a medianoche para evitar problemas de comparación
    fechaActual.setHours(0, 0, 0, 0);
    fechaFinDate.setHours(0, 0, 0, 0);
  
    // Iterar mientras fechaActual sea menor que fechaFin (sin incluir fechaFin)
    while (fechaActual < fechaFinDate) { 
      const fechaStr = fechaActual.toISOString().split("T")[0];
  
      if (!fechasAEliminar.includes(fechaStr)) {
        fechasAEliminar.push(fechaStr);
      }
  
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  
    // **Eliminar las fechas de la API**
    if (fechasAEliminar.length > 0) {
      const resultado = await EliminarFechas(glampingId, fechasAEliminar);
      if (resultado) {
        console.log("✅ Fechas eliminadas exitosamente:", fechasAEliminar);
      } else {
        console.error("❌ No se pudieron eliminar las fechas.");
      }
    }
  };


  const mensaje1: string = "Edwin"
  const mensaje2: string = "La caricia"
  const mensaje3: string = "01/02/2025"
  const mensaje4: string = "04/02/2025"
  const WHATSAPP_API_TOKEN = import.meta.env.VITE_REACT_APP_WHATSAPP_API_TOKEN;

  const enviarMensajeCancelacion = async (numero: string) => {
    const url = 'https://graph.facebook.com/v21.0/531912696676146/messages';
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: numero,
      type: "template",
      template: {
        name: "cancelacion_reserva_glamping",
        language: {
          code: "es_CO"
        },
        components: [
           
          {
            type: "body",
            parameters: [
              { type: "text", text: mensaje1 },
              { type: "text", text: mensaje2 },
              { type: "text", text: mensaje3 },
              { type: "text", text: mensaje4 }
            ]
          }                  
        ]
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
     
    } else {
      const errorData = await response.json();
      console.error("Error al enviar mensaje:", errorData);
      alert(`Error al enviar el mensaje: ${errorData.error.message}`);
    }
  };
  

  return (
    <div className="GestionReserva-contenedor">
      <h1 className="GestionReserva-titulo">Detalles de Reserva</h1>

      {cargando ? (
        <div className="GestionReserva-carga">
          <Lottie 
            animationData={animationData} 
            style={{ height: 200, width: '100%', margin: 'auto' }} 
          />
          <p className="GestionReserva-cargando">Cargando información...</p>
        </div>
      ) : (
        <>
          {error && <p className="GestionReserva-error">⚠️ {error}</p>}

          {reserva && (
            <div className="GestionReserva-detalle">
              <div className="GestionReserva-seccion">
                <h2 className="GestionReserva-subtitulo">Información del Glamping</h2>
                {glamping ? (
                  <>
                    <p><strong>Nombre:</strong> {glamping.nombreGlamping}</p>
                    <p><strong>Ubicación:</strong> {glamping.ciudad_departamento}</p>
                    <p><strong>Política de cancelación:</strong> {glamping.diasCancelacion} días antes del check-in</p>
                    <p><strong>Último día para cancelar:</strong> {calcularFechaLimiteCancelacion()}</p>
                  </>
                ) : (
                  <p>Información del alojamiento no disponible</p>
                )}
              </div>

              <div className="GestionReserva-seccion">
                <h2 className="GestionReserva-subtitulo">Detalles de la Reserva</h2>
                <p><strong>Código:</strong> {reserva.codigoReserva}</p>
                <p><strong>Estado:</strong><span style={{ color: reserva.EstadoReserva === "Cancelada" ? "red" : "black" }}>{reserva.EstadoReserva}</span></p>

                <p><strong>Check-in:</strong> {new Date(reserva.FechaIngreso).toLocaleDateString('es-CO')}</p>
                <p><strong>Check-out:</strong> {new Date(reserva.FechaSalida).toLocaleDateString('es-CO')}</p>
                <p><strong>Noches:</strong> {reserva.Noches}</p>
                <p><strong>Valor total:</strong> ${reserva.ValorReserva.toLocaleString('es-CO')}</p>
              </div>

              <div className="GestionReserva-seccion">
                <h2 className="GestionReserva-subtitulo">Huéspedes</h2>
                <p><strong>Adultos:</strong> {reserva.adultos}</p>
                <p><strong>Niños:</strong> {reserva.ninos}</p>
                <p><strong>Bebés:</strong> {reserva.bebes}</p>
                <p><strong>Mascotas:</strong> {reserva.mascotas}</p>
              </div>

              {calcularPeriodoCancelacion() && (
                <>
                  {!mostrarFormularioCancelacion && (
                    <span 
                      className="GestionReserva-enlace-cancelar"
                      onClick={() => setMostrarFormularioCancelacion(true)}
                    >
                      Cancelar reserva
                    </span>
                  )}

                  {mostrarFormularioCancelacion && (
                    <div className="GestionReserva-seccion GestionReserva-cancelacion">
                      <div className="GestionReserva-cancelacion-header">
                        <h2 className="GestionReserva-subtitulo">Cancelar Reserva</h2>
                        <button 
                          className="GestionReserva-cancelacion-cerrar"
                          onClick={() => setMostrarFormularioCancelacion(false)}
                        >
                          ✖
                        </button>
                      </div>

                      <div className="GestionReserva-formulario">
                        <select
                          value={motivoCancelacion}
                          onChange={(e) => setMotivoCancelacion(e.target.value)}
                          className="GestionReserva-select"
                        >
                          <option value="">Selecciona un motivo</option>
                          {motivosCancelacion.map((motivo, index) => (
                            <option key={index} value={motivo}>
                              {motivo}
                            </option>
                          ))}
                        </select>

                        <button 
                          onClick={manejarCancelacion}
                          className="GestionReserva-boton-cancelar"
                        >
                          Confirmar Cancelación
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {reserva.ComentariosCancelacion && reserva.ComentariosCancelacion !== "Sin comentario" && (
                <div className="GestionReserva-seccion">
                  <h2 className="GestionReserva-subtitulo">Comentarios de Cancelación</h2>
                  <p>{reserva.ComentariosCancelacion}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GestionReserva;