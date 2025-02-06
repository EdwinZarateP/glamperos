import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextoApp } from "../../Contexto/index";
import { CalificarGlamping } from "../../Funciones/CalificarGlamping";
import { CalificacionPromedio } from "../../Funciones/CalificacionPromedio";
import "./estilos.css";

interface EvaluarGlampingProps {
  usuario_id: string;
  codigoReserva: string;
  nombre_usuario: string;
  glamping_id: string;
}

const EvaluarGlamping: React.FC<EvaluarGlampingProps> = ({
  usuario_id,
  codigoReserva,
  nombre_usuario,
  glamping_id,
}) => {
  const [calificacion, setCalificacion] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const navigate = useNavigate();

  const almacenVariables = useContext(ContextoApp);
  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }
  const { activarCalificacion, setActivarCalificacion } = almacenVariables;

  // Enviar la evaluación a la API
  const manejarEnvio = async () => {
    if (calificacion === 0 || comentario.trim() === "") {
      alert("Por favor, selecciona una calificación y deja un comentario.");
      return;
    }

    try {
      // Enviar la calificación a la API
      await axios.post("https://glamperosapi.onrender.com/evaluaciones", {
        usuario_id,
        codigoReserva,
        nombre_usuario,
        glamping_id,
        calificacion,
        comentario,
      });

      console.log("✅ Evaluación enviada con éxito.");

      // Obtener la calificación promedio actualizada
      const calificacionData = await CalificacionPromedio(glamping_id);

      if (calificacionData) {
        const nuevaCalificacionPromedio = calificacionData.calificacion_promedio;
        
        // Actualizar la calificación promedio en la base de datos
        const exito = await CalificarGlamping(glamping_id, nuevaCalificacionPromedio);
        
        if (exito) {
          console.log("✅ Calificación promedio actualizada con éxito.");
        } else {
          console.warn("⚠️ Hubo un problema al actualizar la calificación promedio.");
        }
      } else {
        console.warn("⚠️ No se pudo obtener la calificación promedio.");
      }

      // Cerrar el modal de calificación y recargar la página
      setActivarCalificacion(false);
      navigate("/ReservasClientes");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error al enviar la evaluación:", error);
      alert("Hubo un error al enviar tu evaluación. Inténtalo de nuevo.");
    }
  };

  return (
    activarCalificacion && (
      <div className="evaluarGlamping-fondo" onClick={() => setActivarCalificacion(false)}>
        <div className="evaluarGlamping-contenedor" onClick={(e) => e.stopPropagation()}>
          <h2 className="evaluarGlamping-titulo">Califica tu experiencia</h2>

          {/* Calificación con estrellas */}
          <div className="evaluarGlamping-estrellas">
            {[1, 2, 3, 4, 5].map((numero) => (
              <span
                key={numero}
                className={`evaluarGlamping-estrella ${numero <= calificacion ? "evaluarGlamping-activa" : ""}`}
                onClick={() => setCalificacion(numero)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comentario */}
          <textarea
            className="evaluarGlamping-comentario"
            placeholder="Escribe tu comentario..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />

          {/* Botones */}
          <div className="evaluarGlamping-botones">
            <button className="evaluarGlamping-boton evaluarGlamping-enviar" onClick={manejarEnvio}>
              Calificar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EvaluarGlamping;
