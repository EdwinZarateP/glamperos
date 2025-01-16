import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from "../../Imagenes/AnimationPuntos.json"; // Asegúrate de que la ruta sea correcta
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

// Define el tipo para la conversación
interface Conversacion {
  _id: string;
  contacto: string;
  ultima_fecha: string;  // Asegúrate de incluir el campo 'ultima_fecha'
}

// Define la respuesta de la API
interface RespuestaConversaciones {
  conversaciones: Conversacion[];
}

// Define el tipo de usuario con su nombre y foto
interface Usuario {
  nombre: string;
  foto: string;
}

const ListadoConversacionesMoviles: React.FC = () => {
  const [conversaciones, setConversaciones] = useState<(Conversacion & Usuario)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { setIdUsuarioReceptor, setNombreUsuarioChat, setFotoUsuarioChat} = almacenVariables;

  const idEmisor = Cookies.get("idUsuario");

  useEffect(() => {
    if (!idEmisor) {
      setError("No se encontró el ID del usuario en las cookies.");
      setCargando(false);
      return;
    }

    const obtenerConversaciones = async () => {
      try {
        const respuesta = await fetch(`https://glamperosapi.onrender.com/mensajes/conversaciones/${idEmisor}`);
        if (!respuesta.ok) {
          throw new Error("No tienes conversaciones");
        }
        const data: RespuestaConversaciones = await respuesta.json();

        // Obtener detalles adicionales de los usuarios
        const conversacionesConDetalles = await Promise.all(
          data.conversaciones.map(async (conversacion) => {
            try {
              const usuarioRespuesta = await fetch(
                `https://glamperosapi.onrender.com/usuarios/${conversacion.contacto}`
              );
              if (!usuarioRespuesta.ok) {
                throw new Error("Error al obtener los detalles del usuario");
              }
              const usuario: Usuario = await usuarioRespuesta.json();
              return { ...conversacion, ...usuario };
            } catch (e) {
              console.error(`Error al obtener detalles del usuario ${conversacion.contacto}`, e);
              return { ...conversacion, nombre: "Usuario desconocido", foto: "" };
            }
          })
        );

        // Ordenar las conversaciones por fecha descendente (última fecha)
        const conversacionesOrdenadas = conversacionesConDetalles.sort((a, b) => {
          const fechaA = new Date(a.ultima_fecha).getTime();
          const fechaB = new Date(b.ultima_fecha).getTime();
          return fechaB - fechaA;  // Orden descendente
        });

        setConversaciones(conversacionesOrdenadas);

        // Si hay conversaciones, establecer el receptor como el primero de la lista
        if (conversacionesOrdenadas.length > 0) {
          const ultimaConversacion = conversacionesOrdenadas[0];
          setIdUsuarioReceptor(ultimaConversacion.contacto);
          setNombreUsuarioChat(ultimaConversacion.nombre);
          setFotoUsuarioChat(ultimaConversacion.foto);
        }

      } catch (e: any) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerConversaciones();
  }, [idEmisor, setIdUsuarioReceptor, setNombreUsuarioChat, setFotoUsuarioChat]);
  
  const navigate = useNavigate();

  const manejarClick = (conversacion: Conversacion & Usuario) => {
    setIdUsuarioReceptor(conversacion.contacto);
    setNombreUsuarioChat(conversacion.nombre);
    setFotoUsuarioChat(conversacion.foto);
    navigate(`/MensajesIndividuales/${conversacion.contacto}`);
    console.log("Edw")
  };

  // Función para obtener la primera letra del nombre
  const obtenerIniciales = (nombre: string) => {
    return nombre ? nombre.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="ListadoConversacionesMoviles-contenedor">
      <h2 className="ListadoConversacionesMoviles-titulo">Conversaciones</h2>
      {cargando ? (
        <Lottie
          animationData={animationData}
          style={{ height: 200, width: 200, margin: "auto" }}
        />
      ) : error ? (
        <p className="ListadoConversacionesMoviles-error">{error}</p>
      ) : conversaciones.length === 0 ? (
        <p className="ListadoConversacionesMoviles-mensaje">
          No hay conversaciones disponibles.
        </p>
      ) : (
        <ul className="ListadoConversacionesMoviles-lista">
          {conversaciones.map((conversacion, index) => (
            <li
              key={index}
              className="ListadoConversacionesMoviles-item"
              onClick={() => manejarClick(conversacion)}
            >
              {conversacion.foto ? (
                <img
                  src={conversacion.foto || "https://via.placeholder.com/50"}
                  alt={conversacion.nombre}
                  className="ListadoConversacionesMoviles-imagen"
                />
              ) : (
                <div className="ListadoConversacionesMoviles-iniciales">
                  {obtenerIniciales(conversacion.nombre)}
                </div>
              )}
              <span className="ListadoConversacionesMoviles-nombre">{conversacion.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoConversacionesMoviles;
