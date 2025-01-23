import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./estilos.css";

const Reservacion: React.FC = () => {
  const navigate = useNavigate(); // Hook para redirigir
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
    nombreGlamping: string;
    ciudad_departamento: string;
    imagen: string | null;
  } | null>(null);

  const [fechasReservadas, setFechasReservadas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar la carga
  const [loadingFechas, setLoadingFechas] = useState<boolean>(false); // Estado de carga de fechas reservadas

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
          enviarMensaje("573125443396");
          navigate("/"); // Redirigir a la página principal
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

  const mensaje1: string = glampingData?.nombreGlamping ?? "Glamping desconocido";
  const mensaje2: string = fechaInicio? fechaInicio.toISOString().split("T")[0] : "Fecha inicio no definida";  
  const mensaje3: string = fechaFin? fechaFin.toISOString().split("T")[0] : "Fecha fin no definida";

  const enviarMensaje = async (numero: string) => {
    const url = 'https://graph.facebook.com/v21.0/531912696676146/messages';
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: numero,
      type: "template",
      template: {
        name: "confirmacion",
        language: {
          code: "es"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: mensaje1 },
              { type: "text", text: mensaje2 },
              { type: "text", text: mensaje3 }
            ]
          }
        ]
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
     
    } else {
      alert('Error al enviar el mensaje');
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
                    Precio por {totalDiasNum} {totalDiasNum === 1 ? "noche" : "noches"}: {" "}
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
    </div>
  );
};

export default Reservacion;
