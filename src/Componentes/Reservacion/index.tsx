import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContextoApp } from "../../Contexto/index";
import Cookies from 'js-cookie';
import axios from "axios";
import Swal from "sweetalert2";
import Politicas from "../../Componentes/Politica/index";
import { crearReserva, Reserva } from "../../Funciones/CrearReserva";
import "./estilos.css";


const Reservacion: React.FC = () => {
  
  const idCliente = Cookies.get('idUsuario');
  const nombreUsuarioCookie = Cookies.get('nombreUsuario'); 
  const correoUsuarioCookie = Cookies.get('correoUsuario'); 
  const almacenVariables = useContext(ContextoApp);
    
    if (!almacenVariables) {
      throw new Error(
        "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
      );
    }
  
    const {verPolitica, setVerPolitica, Cantidad_Adultos, Cantidad_Ninos, Cantidad_Bebes, Cantidad_Mascotas } = almacenVariables;  
  const navigate = useNavigate(); 

  const [usuario, setUsuario] = useState({
      nombreDueño: '',
      whatsapp: '',
      correoPropietario: '',
    });

  const {
    glampingId,
    fechaInicioReservada,
    fechaFinReservada,
    precioConTarifa,
    TarifaGlamperos,
    totalDias,
  } = useParams<{
    glampingId: string;
    fechaInicioReservada: string;
    fechaFinReservada: string;
    precioConTarifa: string;
    TarifaGlamperos: string;
    totalDias: string;
  }>();

  const [glampingData, setGlampingData] = useState<{
    propietario_id: string;
    nombreGlamping: string;
    ciudad_departamento: string;
    imagen: string | null;
    ubicacion: {
      lat: number;
      lng: number;
    };
  } | null>(null);

  const [fechasReservadas, setFechasReservadas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [loadingFechas, setLoadingFechas] = useState<boolean>(false); // Estado de carga de fechas reservadas

  const fetchUsuario = async (propietarioId: string) => {
    try {
      const response = await fetch(`https://glamperosapi.onrender.com/usuarios/${propietarioId}`);
      const data = await response.json();
      setUsuario({
        nombreDueño: data.nombre || 'Usuario sin nombre',
        whatsapp: data.telefono || 'Usuario sin teléfono',
        correoPropietario: data.email || 'Usuario sin teléfono',
      });
    } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
    }
  };

  useEffect(() => {
    const fetchGlampingData = async () => {
      try {
        const response = await fetch(
          `https://glamperosapi.onrender.com/glampings/${glampingId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del glamping");
        }
        const data = await response.json();
        setGlampingData({
          propietario_id: data.propietario_id,
          nombreGlamping: data.nombreGlamping,
          ciudad_departamento: data.ciudad_departamento,
          imagen: data.imagenes?.[0] || null,
          ubicacion: data.ubicacion || null,
        });
      } catch (error) {
        console.error("Error al cargar los datos del glamping:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los datos del glamping. Inténtalo nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setIsLoading(false); // Finaliza la carga después de intentar obtener los datos
      }
    };

    fetchGlampingData();
  }, [glampingId]);

  // Ejecutar fetchUsuario cuando glampingData tenga un propietario_id
  useEffect(() => {    
    if (glampingData?.propietario_id) {
      fetchUsuario(glampingData.propietario_id);
    }
  }, [glampingData]);


  useEffect(() => {
    const fetchFechasReservadas = async () => {
      try {
        const response = await fetch(
          `https://glamperosapi.onrender.com/glampings/${glampingId}/fechasReservadas`
        );
        if (!response.ok) {
          throw new Error("Error al consultar las fechas reservadas");
        }
        const data = await response.json();
        setFechasReservadas(data || []);
      } catch (error) {
        console.error("Error al cargar las fechas reservadas:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las fechas reservadas. Inténtalo nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    fetchFechasReservadas();
  }, [glampingId]);

  const formatoPesos = (valor: number): string => {
    return `${valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    })}`;
  };

  const fechaInicio = fechaInicioReservada
    ? new Date(fechaInicioReservada + "T23:59:59Z")
    : null;
  const fechaFin = fechaFinReservada
    ? new Date(fechaFinReservada + "T23:59:59Z")
    : null;

  const precioConTarifaNum = Math.round(parseFloat(precioConTarifa || "0"));
  const TarifaGlamperosNum = Math.round(parseFloat(TarifaGlamperos || "0"));
  const totalDiasNum = parseInt(totalDias || "1");

  const enviarFechasAPI = async () => {
    try {
      if (!fechaInicio || !fechaFin) {
        throw new Error("Fechas inválidas");
      }

      setLoadingFechas(true);

      const fechasArray: string[] = [];
      let fechaActual = new Date(fechaInicio);

      while (fechaActual < fechaFin) { // Excluir fecha fin
        fechasArray.push(new Date(fechaActual).toISOString().split("T")[0]);
        fechaActual.setDate(fechaActual.getDate() + 1);
      }

      const fechasConflictivas = fechasArray.filter((fecha) =>
        fechasReservadas.includes(fecha)
      );

      if (fechasConflictivas.length > 0) {
        Swal.fire({
          title: "Fecha no disponible",
          text: `No se puede reservar las fechas del ${
            fechaInicio.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
          } al ${
            fechaFin.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
          } porque ya están reservadas.`,
          icon: "error",
          confirmButtonText: "Aceptar",
        });        
      } else {
        // Actualizar las fechas reservadas
        const updateResponse = await fetch(
          `https://glamperosapi.onrender.com/glampings/${glampingId}/fechasReservadas`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fechas: fechasArray }),
          }
        );
        if (!updateResponse.ok) {
          throw new Error("Error al actualizar las fechas reservadas");
        }

        Swal.fire({
          title: "¡Reservado!",
          text: `Las fechas del ${
            fechaInicio.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
          } al ${fechaFin.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })} 
           se han reservado correctamente, te enviamos un correo con la ubicación del glamping y el whatsApp de tu anfitrión`,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {        
          handleCrearReserva();
          enviarCorreoPropietario(usuario?.correoPropietario || "", usuario?.nombreDueño || "");
          enviarCorreoCliente(correoUsuarioCookie || "", nombreUsuarioCookie || "");
          enviarMensaje( usuario?.whatsapp);
          navigate("/"); 
        });
      }
    } catch (error) {
      console.error("Error al procesar las fechas:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar la reservación. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoadingFechas(false);
    }
  };

  //formatear fecha
  const formatoFecha = (fecha: Date | null): string => {
    if (!fecha) return "Fecha no definida";
    return fecha.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short", 
      year: "numeric",
    });
  };  
  
  const mensaje1: string = usuario?.nombreDueño.split(' ')[0]?? "Estimado(a)";
  const mensaje2: string = glampingData?.nombreGlamping ?? "Glamping desconocido";
  const mensaje3: string = fechaInicio ? formatoFecha(fechaInicio) : "Fecha fin no definida";
  const mensaje4: string = fechaFin ? formatoFecha(fechaFin) : "Fecha fin no definida";
  const WHATSAPP_API_TOKEN = import.meta.env.VITE_REACT_APP_WHATSAPP_API_TOKEN;

  const enviarMensaje = async (numero: string) => {
    const url = 'https://graph.facebook.com/v21.0/531912696676146/messages';
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: numero,
      type: "template",
      template: {
        name: "confirmacionreserva",
        language: {
          code: "es_CO"
        },
        components: [
          
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link: "https://storage.googleapis.com/glamperos-imagenes/Imagenes/animal1.jpeg"
                }
              }
            ]
          }, 
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

  //Aqui ejecutamos la api para guardar la reserva
  const handleCrearReserva = async () => {
      const nuevaReserva: Reserva = {
        idCliente: idCliente??"No tiene Id",
        idPropietario: glampingData?.propietario_id??"propietario_id No registrado",
        idGlamping: glampingId??"No tiene GlampingId",
        FechaIngreso: fechaInicio ? fechaInicio.toISOString() : '',
        FechaSalida: fechaFin ? fechaFin.toISOString() : '',
        Noches: totalDiasNum,
        ValorReserva: precioConTarifaNum,
        CostoGlamping: precioConTarifaNum-TarifaGlamperosNum,
        ComisionGlamperos: TarifaGlamperosNum,
        adultos: Cantidad_Adultos,
        Ninos: Cantidad_Ninos,
        bebes: Cantidad_Bebes,
        mascotas: Cantidad_Mascotas,
        EstadoReserva: "Pendiente",
      };
  
      try {
        await crearReserva(nuevaReserva);
      } catch (error) {
        console.error("Error al crear la reserva:", error);
      }
    };

    // envio de correo al dueño
    const enviarCorreoPropietario = async (correo: string, nombre: string, fromEmail: string = "reservaciones@glamperos.com") => {
      try {
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2F6B3E;">🎉 Tienes una Reserva</h2>
            <p>
              Hola ${nombre.split(' ')[0]},
            </p>
            <p>
              ¡Alguien reservó  ${glampingData?.nombreGlamping} con Glamperos! Aquí tienes los detalles de la reserva:              
            </p>
            <p>Check-In: ${fechaInicio?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</p>            
            <p>Check-Out: ${fechaFin?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</p>
            <p>Adultos: ${Cantidad_Adultos}</p>
            <p>Ninos: ${Cantidad_Ninos}</p>
            <p>Mascotas: ${Cantidad_Mascotas}</p>
            <p>El correo de tu huéspeded es ${correoUsuarioCookie} para que te comuniques con él</p>
            <p>
              Si necesitas ayuda o tienes preguntas, nuestro equipo estará siempre aquí para ti.
            </p>
            <p>
              ¡Juntos haremos que esta aventura sea inolvidable para nuestro huésped!
            </p>
            <p style="margin: 20px 0;">
              El equipo de <strong style="color: #2F6B3E;">Glamperos</strong>.
            </p>
            <hr style="border: 1px solid #e0e0e0;">
            <p style="font-size: 1em; color: #777;">
              Si tienes preguntas, no dudes en ponerte en contacto con nosotros a través de nuestro portal.
            </p>
          </div>
        `;
    
        await axios.post("https://glamperosapi.onrender.com/correos/send-email", {
          from_email: fromEmail, // Agregar el remitente dinámico
          email: correo,
          name: nombre,
          subject: `🗎 Reservaron  tu Glamping - ${glampingData?.nombreGlamping}`,
          html_content: htmlContent, // Enviar el contenido del correo
        });
    
        console.log(`Correo enviado con éxito: ${nombre}`);
      } catch (error) {
        console.error("Error al enviar el correo: ", error);
      }
    };
    

    // envio de correo al cliente
    const enviarCorreoCliente = async (correo: string, nombre: string, fromEmail: string = "reservas@glamperos.com") => {
      try {
        const lat = glampingData?.ubicacion?.lat;
        const lon = glampingData?.ubicacion?.lng;
        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2F6B3E;">Confirmación Reserva </h2>
            <p>
              Hola ${nombre.split(' ')[0]},
            </p>
            <p>
              ¡Gracias por reservar con Glamperos! 🎉 Aquí tienes los detalles de tu reserva:              
            </p>
            <p>Check-In: ${fechaInicio?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</p>            
            <p>Check-Out: ${fechaFin?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</p>
            <p>Adultos: ${Cantidad_Adultos}</p>
            <p>Ninos: ${Cantidad_Ninos}</p>
            <p>Mascotas: ${Cantidad_Mascotas}</p>
            <p>El contacto de WhatsApp de tu anfitrión es +57 ${usuario.whatsapp.slice(-10)}, escribele para estar en contacto</p>
            <p>
              La ubicación de tu glamping es la siguiente: 
              <a href="${googleMapsLink}" target="_blank" style="color: #2F6B3E;">Ver en Google Maps</a>
            </p>
            <p>
              Si necesitas ayuda o tienes preguntas, nuestro equipo estará siempre aquí para ti.
            </p>
            <p>
              ¡Juntos haremos que esta aventura sea inolvidable!
            </p>
            <p style="margin: 20px 0;">
              El equipo de <strong style="color: #2F6B3E;">Glamperos</strong>.
            </p>
            <hr style="border: 1px solid #e0e0e0;">
            <p style="font-size: 1em; color: #777;">
              Si tienes preguntas, no dudes en ponerte en contacto con nosotros a través de nuestro portal.
            </p>
          </div>
        `;
    
        await axios.post("https://glamperosapi.onrender.com/correos/send-email", {
          from_email: fromEmail, // Agregar el remitente dinámico
          email: correo,
          name: nombre,
          subject: `🧳 Reserva Glamping - ${glampingData?.nombreGlamping}`,
          html_content: htmlContent, // Enviar el contenido del correo
        });
    
        console.log(`Correo enviado con éxito: ${nombre}`);
      } catch (error) {
        console.error("Error al enviar el correo: ", error);
      }
    };

  return (
    <div className="reservacion-container">
      
      {isLoading ? (
        <div className="reservacion-loading-animation">
          <Lottie 
            animationData={animationData} 
            style={{ height: 200, width: '100%', margin: 'auto' }} 
          />
        </div>
      ) : (
        <>
          <h1 className="reservacion-titulo">{glampingData?.nombreGlamping}</h1>
          <h2 className="reservacion-subtitulo">{glampingData?.ciudad_departamento}</h2>
  
          {glampingData && (
            <div className="reservacion-glamping-info">
              {glampingData.imagen && (
                <div className="reservacion-glamping-photo-container">
                  <img
                    src={glampingData.imagen}
                    alt="Foto del glamping"
                    className="reservacion-glamping-photo"
                  />
                </div>
              )}
              <div className="reservacion-details">
                <p>
                  <strong>{formatoPesos(Math.round(precioConTarifaNum / totalDiasNum))} / noche</strong>
                </p>
                <p>
                  {fechaInicio?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })} - {" "}
                  {fechaFin?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p>
                  Precio por {totalDiasNum} {totalDiasNum === 1 ? "noche" : "noches"}:{" "}
                  {formatoPesos(precioConTarifaNum - TarifaGlamperosNum)}
                </p>
  
                <p>
                  Tarifa de Glamperos: {formatoPesos(TarifaGlamperosNum)}
                </p>
                <p className="reservacion-total">
                  <strong>Total: {formatoPesos(precioConTarifaNum)}</strong>
                </p>
              </div>
            </div>
          )}
  
          <div className="reservacion-payment-button-container">
            <button className="reservacion-payment-button" onClick={enviarFechasAPI}>
              Confirmar y pagar
            </button>
          </div>
  
          {/* Botón para mostrar políticas */}
          <div className="Reservacion-verPoliticas">
            <span  onClick={() => setVerPolitica(true)}>
              Ver Políticas de Cancelación
            </span>
          </div>
  
          {loadingFechas && (
            <div className="reservacion-loading-animation">
              <Lottie 
                animationData={animationData} 
                style={{ height: 200, width: '100%', margin: 'auto' }} 
              />
            </div>
          )}
        </>
      )}
  
      {/* Modal emergente de Políticas */}
      {verPolitica && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Politicas/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservacion;
