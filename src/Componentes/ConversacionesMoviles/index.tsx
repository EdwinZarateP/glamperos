import React, { useState, useEffect, useRef, KeyboardEvent, useContext } from 'react';
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

const ConversacionesMoviles: React.FC = () => {
  const { idReceptor } = useParams<{ idReceptor: string }>();

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { idUsuarioReceptor, setIdUsuarioReceptor, nombreUsuarioChat, fotoUsuarioChat } = almacenVariables;

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<Message[]>([]);

  const idEmisor = Cookies.get('idUsuario');
  const idReceptorURL = idUsuarioReceptor || idReceptor;

  const historialRef = useRef<HTMLDivElement>(null); // Referencia para el historial de mensajes.
  const scrollTriggeredByUser = useRef(false); // Control para determinar si el scroll debe ejecutarse.

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

      obtenerMensajes();

      intervalId = setInterval(obtenerMensajes, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [idEmisor, idReceptorURL]);

  useEffect(() => {
    // Ejecutar el scroll solo si fue provocado por el usuario al enviar un mensaje.
    if (scrollTriggeredByUser.current && historialRef.current) {
      historialRef.current.scrollTop = historialRef.current.scrollHeight;
      scrollTriggeredByUser.current = false; // Reiniciar el control.
    }
  }, [mensajes]);

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
        scrollTriggeredByUser.current = true; // Activar el control para ejecutar el scroll.
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

  const obtenerIniciales = (nombre: string) => {
    return nombre ? nombre.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="ConversacionesMovilesContenedor">
      <div className="ConversacionesMovilesHeader">
        {fotoUsuarioChat ? (
          <img 
            src={fotoUsuarioChat || "https://via.placeholder.com/50"} 
            alt={nombreUsuarioChat} 
            className="ConversacionesMovilesFoto" 
          />
        ) : (
          <div className="ConversacionesMovilesIniciales">
            {obtenerIniciales(nombreUsuarioChat)}
          </div>
        )}
        <div className="ConversacionesMovilesNombre">{nombreUsuarioChat || "Nombre desconocido"}</div>
      </div>

      <div className="ConversacionesMovilesHistorial" ref={historialRef}>
        {mensajes.map((msg, index) => (
          <div key={index} className={`ConversacionesMovilesMensaje ${msg.emisor === idEmisor ? 'ConversacionesMovilesEmisor' : 'ConversacionesMovilesReceptor'}`}>
            <span className="ConversacionesMovilesTexto">{msg.mensaje}</span>
            <span className="ConversacionesMovilesTimestamp">{new Date(msg.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="ConversacionesMovilesInputContenedor">
        <input
          type="text"
          className="ConversacionesMovilesInput"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={manejarTeclaEnter}
          placeholder="Escribe tu mensaje..."
        />
        <button className="ConversacionesMovilesBotonEnviar" onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default ConversacionesMoviles;
