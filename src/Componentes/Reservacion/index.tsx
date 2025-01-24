import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContextoApp } from "../../Contexto/index";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import Politicas from "../../Componentes/Politica/index";
import { crearReserva, Reserva } from "../../Funciones/CrearReserva";
import "./estilos.css";


const Reservacion: React.FC = () => {
  
  const idCliente = Cookies.get('idUsuario');
  const almacenVariables = useContext(ContextoApp);
    
    if (!almacenVariables) {
      throw new Error(
        "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
      );
    }
  
    const {verPolitica, setVerPolitica } = almacenVariables;
  
  const navigate = useNavigate(); 

  const [usuario, setUsuario] = useState({
      nombreDueño: '',
      whatsapp: '',
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
            fechaInicio.toISOString().split("T")[0]
          } al ${fechaFin.toISOString().split("T")[0]} porque ya están reservadas.`,
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
            fechaInicio.toISOString().split("T")[0]
          } al ${fechaFin.toISOString().split("T")[0]} se han reservado correctamente.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {        
          handleCrearReserva();
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
        ValorReserva: precioConTarifaNum,
        huespedes: 2,
        mascotas: 1,
        EstadoReserva: "Pendiente",
      };
  
      try {
        await crearReserva(nuevaReserva);
      } catch (error) {
        console.error("Error al crear la reserva:", error);
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
                  Desde el {fechaInicio?.toLocaleDateString()} al{" "}
                  {fechaFin?.toLocaleDateString()}
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
