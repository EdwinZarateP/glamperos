import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

    fetchUsuario();
  }, [propietario_id]);

  const manejarMensaje = async () => {
    const idEmisor = Cookies.get('idUsuario');

    if (mensaje.trim() && idEmisor && propietario_id) {
      const nuevoMensaje = {
        emisor: idEmisor,
        receptor: propietario_id,
        mensaje: mensaje,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch('https://glamperosapi.onrender.com/mensajes/enviar_mensaje', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoMensaje),
        });

        navigate(`/Mensajes/${propietario_id}`);
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
