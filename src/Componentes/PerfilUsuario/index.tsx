import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2"; 
import Cookies from 'js-cookie';
import './estilos.css';

interface PerfilUsuarioProps {
  propietario_id: string;
}

const PerfilUsuario: React.FC<PerfilUsuarioProps> = ({ propietario_id }) => {
  const [usuario, setUsuario] = useState({
    foto: '',
    nombre: '',
    whatsapp: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [nombreGlamping, setNombreGlamping] = useState('');
  const navigate = useNavigate();
  const { glampingId } = useParams<{ glampingId: string }>();

  const mensaje1: string = usuario.nombre;     
  const mensaje2: string = mensaje;         
  const mensaje3: string = '25 de enero de 2025'; 
  const WHATSAPP_API_TOKEN = import.meta.env.VITE_REACT_APP_WHATSAPP_API_TOKEN;

  const enviarMensaje = async (numero: string) => {
    const url = 'https://graph.facebook.com/v21.0/531912696676146/messages';
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: numero,
      type: "template",
      template: {
        name: "confirmacion",
        language: {
          code: "es"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: mensaje1 },
              { type: "text", text: mensaje2 },
              { type: "text", text: mensaje3 }
            ]
          }
        ]
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
     
    } else {
      alert('Error al enviar el mensaje');
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/usuarios/${propietario_id}`);
        const data = await response.json();
        setUsuario({
          foto: data.foto || '',
          nombre: data.nombre || 'Usuario sin nombre',
          whatsapp: data.telefono || 'Usuario sin telefono',
        });
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
      }
    };

    const fetchGlamping = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/glampings/${glampingId}`);
        const data = await response.json();
        setNombreGlamping(data.nombreGlamping);
      } catch (error) {
        console.error('Error al obtener el glamping:', error);
      }
    };

    if (glampingId) {
      fetchGlamping();
    }

    fetchUsuario();
  }, [propietario_id, glampingId]);

  const manejarMensaje = async () => {
    const idEmisor = Cookies.get('idUsuario');

    // Si no existe idEmisor, redirige al usuario a la página de registro
    if (!idEmisor) {
      navigate("/Registrarse");
      return;
    }

    // Validar si el emisor es el mismo que el propietario_id
    if (idEmisor === propietario_id) {
       Swal.fire({
              icon: 'error',
              title: 'Mensaje de dueño a dueño',
              text: 'No puedes enviarte un mensaje a ti mismo',
            });
      return;
    }

    if (mensaje.trim() && idEmisor && propietario_id) {
      const nuevoMensaje = {
        emisor: idEmisor,
        receptor: propietario_id,
        mensaje: `Me interesa ${nombreGlamping}, ${mensaje}`,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch('https://glamperosapi.onrender.com/mensajes/enviar_mensaje', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoMensaje),
        });

        // Navegación condicional según el tamaño de la pantalla
        if (window.innerWidth < 900) {
          navigate(`/MensajesIndividuales/${propietario_id}`);
        } else {
          navigate(`/Mensajes/${propietario_id}`);
        }

        setMensaje('');
        // Si el usuario tiene WhatsApp, enviar el mensaje también por WhatsApp
        if (usuario.whatsapp !== 'Usuario sin telefono') {
          enviarMensaje(usuario.whatsapp);
        }
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    } else {
      console.log('El mensaje o el emisor no están definidos correctamente');
    }
  };

  const inicial = usuario.nombre.charAt(0).toUpperCase();

  return (
    <div className="PerfilUsuarioContenedor">
      <div className="PerfilUsuarioFoto">
        {usuario.foto ? (
          <img src={usuario.foto} alt={usuario.nombre} />
        ) : (
          <div className="PerfilUsuarioSinFoto">{inicial}</div>
        )}
      </div>
      <div className="PerfilUsuarioNombre">{usuario.nombre}</div>
      <textarea
        className="PerfilUsuarioMensajeInput"
        placeholder="Escribe tu mensaje..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <button className="PerfilUsuarioBoton" onClick={manejarMensaje}>
        Enviar Mensaje
      </button>
    </div>
  );
};

export default PerfilUsuario;
