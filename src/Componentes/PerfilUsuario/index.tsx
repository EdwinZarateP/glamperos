import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './estilos.css';

interface PerfilUsuarioProps {
  propietario_id: string;
}

const PerfilUsuario: React.FC<PerfilUsuarioProps> = ({ propietario_id }) => {
  const [usuario, setUsuario] = useState({
    foto: '',
    nombre: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [nombreGlamping, setNombreGlamping] = useState('');
  const navigate = useNavigate();
  const { glampingId } = useParams<{ glampingId: string }>();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/usuarios/${propietario_id}`);
        const data = await response.json();
        setUsuario({
          foto: data.foto || '',
          nombre: data.nombre || 'Usuario sin nombre',
        });
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
      }
    };

    const fetchGlamping = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/glampings/${glampingId}`);
        const data = await response.json();
        setNombreGlamping(data.nombreGlamping); // Asumimos que el campo es nombreGlamping
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
