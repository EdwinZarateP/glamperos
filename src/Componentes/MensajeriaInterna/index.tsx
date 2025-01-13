import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './estilos.css';

const MensajeriaInterna = () => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const mensajesRef = useRef<HTMLDivElement>(null);

  const idUsuarioCookie = Cookies.get('idUsuario') || '';
  const { receptor_id } = useParams();

  // Obtener los mensajes de la API
  const obtenerMensajes = async () => {
    try {
      const respuesta = await axios.get(`https://glamperosapi.onrender.com/mensajeria/${idUsuarioCookie}`);
      const mensajesConFormato = respuesta.data
        .map((msg: any) => ({
          ...msg,
          fecha_envio: new Date(msg.fecha_envio),
        }))
        .filter(
          (msg: any) =>
            (msg.emisor_id === idUsuarioCookie && msg.receptor_id === receptor_id) ||
            (msg.emisor_id === receptor_id && msg.receptor_id === idUsuarioCookie)
        )
        .sort((a: any, b: any) => a.fecha_envio - b.fecha_envio); // Orden cronológico

      setMensajes(mensajesConFormato);
    } catch (error) {
      console.error("Error al obtener los mensajes", error);
    } finally {
      setLoading(false);
    }
  };

  // Enviar un mensaje
  const enviarMensaje = async () => {
    if (mensaje.trim() === '') return;

    try {
      const respuesta = await axios.post('https://glamperosapi.onrender.com/mensajeria/', {
        emisor_id: idUsuarioCookie,
        receptor_id: receptor_id,
        mensaje: mensaje,
        fecha_envio: new Date().toISOString(),
      });

      setMensajes((prevMensajes) => {
        const nuevosMensajes = [...prevMensajes, respuesta.data];
        nuevosMensajes.sort((a, b) => a.fecha_envio - b.fecha_envio);
        return nuevosMensajes;
      });

      setMensaje('');
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
  };

  const formatoFecha = (fecha: Date) => fecha.toLocaleString('es-CO', { hour12: false });

  const manejarEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      enviarMensaje();
    }
  };

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  useEffect(() => {
    obtenerMensajes();
    const intervalo = setInterval(obtenerMensajes, 3000);
    return () => clearInterval(intervalo);
  }, [idUsuarioCookie, receptor_id]);

  return (
    <div className="MensajeriaInternaContenedor">
      <div className="MensajeriaInternaMensajes" ref={mensajesRef}>
        {loading ? (
          <p>Cargando mensajes...</p>
        ) : (
          mensajes.map((msg, index) => (
            <div
              key={index}
              className={`MensajeriaInternaMensaje ${
                msg.emisor_id === idUsuarioCookie ? 'MensajeriaInternaMensajeEnviado' : 'MensajeriaInternaMensajeRecibido'
              }`}
            >
              <p>{msg.mensaje}</p>
              <span className="MensajeriaInternaFecha">{formatoFecha(msg.fecha_envio)}</span>
            </div>
          ))
        )}
      </div>

      <div className="MensajeriaInternaInputContenedor">
        <input
          type="text"
          className="MensajeriaInternaInput"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={manejarEnter}
          placeholder="Escribe tu mensaje..."
        />
        <button className="MensajeriaInternaBoton" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default MensajeriaInterna;
