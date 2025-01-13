import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import Cookies from 'js-cookie';
import axios from 'axios';
import './estilos.css';

const MensajeriaInterna = () => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const mensajesRef = useRef<HTMLDivElement>(null); // Referencia al contenedor de mensajes

  const idUsuarioCookie = Cookies.get('idUsuario') || '';
  const { receptor_id } = useParams(); // Obtén receptor_id de la URL

  // Obtener los mensajes de la API
  const obtenerMensajes = async () => {
    try {
      const respuesta = await axios.get(`https://glamperosapi.onrender.com/mensajeria/${idUsuarioCookie}`);
      const mensajesConFormato = respuesta.data.map((msg: any) => ({
        ...msg,
        fecha_envio: new Date(msg.fecha_envio), // Convertir la fecha a formato Date
      }));

      // Ordenar los mensajes de forma cronológica (intercalando los de emisor y receptor)
      mensajesConFormato.sort((a: any, b: any) => a.fecha_envio - b.fecha_envio);

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
        receptor_id: receptor_id, // Usar receptor_id de la URL
        mensaje: mensaje,
        fecha_envio: new Date().toISOString(), // Guardar la fecha en formato UTC
      });

      // Agregar el nuevo mensaje a la lista y mantener el orden
      setMensajes((prevMensajes) => {
        const nuevosMensajes = [...prevMensajes, respuesta.data];
        nuevosMensajes.sort((a, b) => a.fecha_envio - b.fecha_envio); // Reordenar
        return nuevosMensajes;
      });

      setMensaje(''); // Limpiar el campo de mensaje
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
  };

  // Formatear la fecha
  const formatoFecha = (fecha: Date) => {
    return fecha.toLocaleString('es-CO', { hour12: false }); // Formato local en CO
  };

  // Detectar el evento Enter para enviar el mensaje
  const manejarEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      enviarMensaje();
    }
  };

  // Desplazar el contenedor hacia abajo cada vez que se actualicen los mensajes
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  // Obtener los mensajes cada 3 segundos para simular "tiempo real" (polling)
  useEffect(() => {
    obtenerMensajes();
    const intervalo = setInterval(obtenerMensajes, 3000); // Llamar cada 3 segundos
    return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar el componente
  }, [idUsuarioCookie]); // Aseguramos que este efecto solo se ejecute cuando idUsuarioCookie cambie

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
          onKeyDown={manejarEnter} // Detectar el Enter
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
