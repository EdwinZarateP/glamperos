import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

const ListadoConversaciones: React.FC = () => {
  const idEmisor = Cookies.get("idUsuario");
  const [conversaciones, setConversaciones] = useState<any[]>([]);

  // Acceder al contexto para actualizar el idUsuarioReceptor
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { setIdUsuarioReceptor } = almacenVariables;

  useEffect(() => {
    if (idEmisor) {
      obtenerConversaciones(idEmisor);
    }
  }, [idEmisor]);

  // Función para obtener las conversaciones y los datos de los receptores
  const obtenerConversaciones = async (emisor: string) => {
    try {
      const response = await axios.get(
        `https://glamperosapi.onrender.com/mensajes/conversaciones/${emisor}`
      );

      const conversacionesConDatos = await Promise.all(
        response.data.conversaciones.map(async (conversacion: any) => {
          const receptorId = conversacion.receptor;
          const datosReceptor = await obtenerDatosReceptor(receptorId);
          return { ...conversacion, ...datosReceptor };
        })
      );

      setConversaciones(conversacionesConDatos);
    } catch (error) {
      console.error("Error al obtener conversaciones:", error);
    }
  };

  // Función para obtener los datos del receptor por su ID
  const obtenerDatosReceptor = async (receptorId: string): Promise<{ nombre: string; foto: string | null }> => {
    try {
      const response = await axios.get(
        `https://glamperosapi.onrender.com/usuarios/${receptorId}`
      );
      const { nombre, foto } = response.data;
      return { nombre, foto: foto || null };
    } catch (error) {
      console.error(`Error al obtener los datos del receptor con ID ${receptorId}:`, error);
      return { nombre: "Usuario desconocido", foto: null };
    }
  };

  // Función para manejar la selección de un receptor
  const seleccionarReceptor = (receptor: string) => {
    setIdUsuarioReceptor(receptor);
  };

  return (
    <div className="ListadoConversacionesContenedor">
      <h2 className="ListadoConversacionesTitulo">Tus conversaciones</h2>
      {conversaciones.length > 0 ? (
        <ul className="ListadoConversacionesLista">
          {conversaciones.map((conversacion, index) => (
            <li
              key={index}
              className="ListadoConversacionesItem"
              onClick={() => seleccionarReceptor(conversacion.receptor)}
            >
              <div className="ListadoConversacionesAvatar">
                {conversacion.foto ? (
                  <img
                    src={conversacion.foto}
                    alt={`Avatar de ${conversacion.nombre}`}
                    className="AvatarImagen"
                  />
                ) : (
                  <div className="AvatarTexto">
                    {conversacion.nombre.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span>{conversacion.nombre}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="ListadoConversacionesMensaje">
          No tienes conversaciones.
        </p>
      )}
    </div>
  );
};

export default ListadoConversaciones;
