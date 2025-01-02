import React, { useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./estilos.css";

interface Evaluacion {
  usuario_id: string;
  nombre_usuario: string;
  glamping_id: string;
  calificacion: number;
  comentario: string;
}

const CalificarGlamping: React.FC = () => {
  const { glampingId } = useParams<{ glampingId: string }>();
  const idUsuarioCookie = Cookies.get("idUsuario");
  const nombreUsuarioCookie = Cookies.get("nombreUsuario");
  const navigate = useNavigate();
  const [calificacion, setCalificacion] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idUsuarioCookie || !nombreUsuarioCookie || !glampingId) {
      setMensaje("Faltan datos para enviar la evaluación.");
      return;
    }

    const evaluacion: Evaluacion = {
      usuario_id: idUsuarioCookie,
      nombre_usuario: nombreUsuarioCookie,
      glamping_id: glampingId,
      calificacion,
      comentario,
    };

    try {
      // Enviar evaluación
      const response = await fetch("https://glamperosapi.onrender.com/evaluaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evaluacion),
      });

      if (!response.ok) {
        setMensaje("Error al enviar la evaluación. Por favor, inténtalo de nuevo.");
        return;
      }

      // Obtener promedio
      const promedioResponse = await fetch(
        `https://glamperosapi.onrender.com/evaluaciones/glamping/${glampingId}/promedio`
      );

      if (!promedioResponse.ok) {
        setMensaje("Error al obtener la calificación promedio.");
        return;
      }

      const promedioData = await promedioResponse.json();
      const calificacionPromedio = parseFloat(promedioData.calificacion_promedio.toFixed(2));

      // Validar rango de calificación
      if (calificacionPromedio < 0 || calificacionPromedio > 5) {
        setMensaje("La calificación promedio calculada está fuera del rango permitido (0-5).");
        return;
      }

      // Actualizar calificación del glamping
      const formData = new FormData();
      formData.append("calificacion", calificacionPromedio.toString());

      const actualizarResponse = await fetch(
        `https://glamperosapi.onrender.com/glampings/${glampingId}/calificacion`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (actualizarResponse.ok) {
        setMensaje("¡Evaluación enviada exitosamente!");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await actualizarResponse.json();
        setMensaje(errorData.detail || "Error al actualizar la calificación del glamping.");
      }
    } catch (error) {
      setMensaje("Ocurrió un error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="CalificarGlamping-contenedor">
      <h2 className="CalificarGlamping-titulo">Calificar Glamping</h2>
      <form className="CalificarGlamping-formulario" onSubmit={handleSubmit}>
        <div className="CalificarGlamping-campo">
          <label htmlFor="calificacion" className="CalificarGlamping-etiqueta">
            Calificación:
          </label>
          <div className="CalificarGlamping-estrellas">
            {[1, 2, 3, 4, 5].map((valor) => (
              <FaStar
                key={valor}
                className={`estrella ${valor <= calificacion ? "activo" : ""}`}
                onClick={() => setCalificacion(valor)}
                onMouseEnter={() => setCalificacion(valor)}
                onMouseLeave={() => setCalificacion(valor)}
              />
            ))}
          </div>
        </div>

        <div className="CalificarGlamping-campo">
          <label htmlFor="comentario" className="CalificarGlamping-etiqueta">
            Comentario (máximo 1000 caracteres):
          </label>
          <textarea
            id="comentario"
            className="CalificarGlamping-textarea"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            maxLength={1000}
            required
          />
        </div>

        <button type="submit" className="CalificarGlamping-boton">
          Enviar Evaluación
        </button>
      </form>
      {mensaje && <p className="CalificarGlamping-mensaje">{mensaje}</p>}
    </div>
  );
};

export default CalificarGlamping;
