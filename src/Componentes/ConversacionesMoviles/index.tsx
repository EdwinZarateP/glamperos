import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../Imagenes/AnimationPuntos.json';
import './estilos.css';

interface Message {
  emisor: string;
  receptor: string;
  mensaje: string;
  timestamp: string;
}

const ConversacionesMoviles: React.FC = () => {
  const { idReceptor } = useParams<{ idReceptor: string }>();
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<Message[]>([]);
  const [nombreUsuarioChat, setNombreUsuarioChat] = useState<string>('');
  const [fotoUsuarioChat, setFotoUsuarioChat] = useState<string>('');
  const [cargando, setCargando] = useState(true);
  const idEmisor = Cookies.get('idUsuario');
  const historialRef = useRef<HTMLDivElement>(null); // Referencia para el historial de mensajes.
  const [inicializado, setInicializado] = useState(false); // Controla el desplazamiento inicial.

  // Obtener datos del usuario receptor desde la API
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (idReceptor) {
          const response = await fetch(`https://glamperosapi.onrender.com/usuarios/${idReceptor}`);
          const data = await response.json();
          setNombreUsuarioChat(data.nombre || 'Nombre desconocido');
          setFotoUsuarioChat(data.foto || '');
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario receptor:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuario();
  }, [idReceptor]);

  // Obtener los mensajes entre emisor y receptor
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const obtenerMensajes = async () => {
      if (idEmisor && idReceptor) {
        try {
          const response = await fetch(
            `https://glamperosapi.onrender.com/mensajes/obtener_mensajes/${idEmisor}/${idReceptor}`
          );
          const data = await response.json();

          if (data.mensajes) {
            const mensajesOrdenados = data.mensajes.sort(
              (a: Message, b: Message) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
            setMensajes(mensajesOrdenados);

            // Desplazar hacia abajo solo la primera vez
            if (!inicializado && historialRef.current) {
              historialRef.current.scrollTop = historialRef.current.scrollHeight;
              setInicializado(true);
            }
          }
        } catch (error) {
          console.error('Error al obtener los mensajes:', error);
        }
      }
    };

    obtenerMensajes();
    intervalId = setInterval(obtenerMensajes, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [idEmisor, idReceptor, inicializado]);

  const enviarMensaje = async () => {
    if (mensaje.trim() && idEmisor && idReceptor) {
      const nuevoMensaje: Message = {
        emisor: idEmisor,
        receptor: idReceptor,
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

  const obtenerIniciales = (nombre: string) => {
    return nombre ? nombre.charAt(0).toUpperCase() : '';
  };

  if (cargando) {
    return (
      <div className="CargandoContenedor">
        <Lottie
          animationData={animationData}
          style={{ height: 200, width: 200, margin: 'auto' }}
        />
      </div>
    );
  }

  return (
    <div className="ConversacionesMovilesContenedor">
      <div className="ConversacionesMovilesHeader">
        {fotoUsuarioChat ? (
          <img
            src={fotoUsuarioChat || 'https://via.placeholder.com/50'}
            alt={nombreUsuarioChat}
            className="ConversacionesMovilesFoto"
          />
        ) : (
          <div className="ConversacionesMovilesIniciales">
            {obtenerIniciales(nombreUsuarioChat)}
          </div>
        )}
        <div className="ConversacionesMovilesNombre">{nombreUsuarioChat}</div>
      </div>

      <div className="ConversacionesMovilesHistorial" ref={historialRef}>
        {mensajes.map((msg, index) => (
          <div
            key={index}
            className={`ConversacionesMovilesMensaje ${
              msg.emisor === idEmisor ? 'ConversacionesMovilesEmisor' : 'ConversacionesMovilesReceptor'
            }`}
          >
            <span className="ConversacionesMovilesTexto">{msg.mensaje}</span>
            <span className="ConversacionesMovilesTimestamp">
              {new Date(msg.timestamp).toLocaleString()}
            </span>
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
        <button className="ConversacionesMovilesBotonEnviar" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ConversacionesMoviles;
