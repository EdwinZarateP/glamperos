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

  // Función para obtener las conversaciones
  const obtenerConversaciones = async (emisor: string) => {
    try {
      const response = await axios.get(
        `https://glamperosapi.onrender.com/mensajes/conversaciones/${emisor}`
      );
      setConversaciones(response.data.conversaciones);
    } catch (error) {
      console.error("Error al obtener conversaciones:", error);
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
              Conversación con {conversacion.receptor}
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
