import React, { useState, useEffect, KeyboardEvent, useContext } from 'react';
import Cookies from 'js-cookie'; 
import { ContextoApp } from "../../Contexto/index";
import { useParams } from 'react-router-dom';
import './estilos.css';

interface Message {
  emisor: string;
  receptor: string;
  mensaje: string;
  timestamp: string;
}

const Conversaciones: React.FC = () => {
  const { idReceptor } = useParams<{ idReceptor: string }>();

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { idUsuarioReceptor, setIdUsuarioReceptor } = almacenVariables;

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<Message[]>([]);

  const idEmisor = Cookies.get('idUsuario');

  const idReceptorURL = idUsuarioReceptor || idReceptor;

  useEffect(() => {
    if (!idUsuarioReceptor && idReceptor && setIdUsuarioReceptor) {
      setIdUsuarioReceptor(idReceptor);
    }
  }, [idUsuarioReceptor, idReceptor, setIdUsuarioReceptor]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (idEmisor && idReceptorURL) {
      const obtenerMensajes = async () => {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/mensajes/obtener_mensajes/${idEmisor}/${idReceptorURL}`);
          const data = await response.json();

          if (data.mensajes) {
            const mensajesOrdenados = data.mensajes.sort((a: Message, b: Message) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            setMensajes(mensajesOrdenados);
          }
        } catch (error) {
          console.error('Error al obtener los mensajes:', error);
        }
      };

      // Llama a la función inicialmente
      obtenerMensajes();

      // Configura un intervalo para actualizar los mensajes cada 3 segundos
      intervalId = setInterval(obtenerMensajes, 3000);
    }

    // Limpia el intervalo al desmontar el componente
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [idEmisor, idReceptorURL]);

  const enviarMensaje = async () => {
    if (mensaje.trim() && idEmisor && idReceptorURL) {
      const nuevoMensaje = {
        emisor: idEmisor,
        receptor: idReceptorURL,
        mensaje: mensaje,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch('https://glamperosapi.onrender.com/mensajes/enviar_mensaje', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoMensaje),
        });

        setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
        setMensaje('');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  const manejarTeclaEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      enviarMensaje();
    }
  };

  return (
    <div className="ConversacionesContenedor">
      <div className="ConversacionesHistorial">
        {mensajes.map((msg, index) => (
          <div key={index} className={`ConversacionesMensaje ${msg.emisor === idEmisor ? 'ConversacionesEmisor' : 'ConversacionesReceptor'}`}>
            <span className="ConversacionesTexto">{msg.mensaje}</span>
            <span className="ConversacionesTimestamp">{new Date(msg.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="ConversacionesInputContenedor">
        <input
          type="text"
          className="ConversacionesInput"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={manejarTeclaEnter}
          placeholder="Escribe tu mensaje..."
        />
        <button className="ConversacionesBotonEnviar" onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default Conversaciones;
