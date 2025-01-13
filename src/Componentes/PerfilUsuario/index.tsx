import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './estilos.css';

interface PerfilUsuarioProps {
  propietario_id: string;
}

const PerfilUsuario: React.FC<PerfilUsuarioProps> = ({ propietario_id }) => {
  const [usuario, setUsuario] = useState({
    foto: '',
    nombre: '',
  });
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

  const manejarMensaje = () => {
    navigate(`/Mensajes/${propietario_id}`);
  };

  return (
    <div className="PerfilUsuarioContenedor">
      <div className="PerfilUsuarioFoto">
        {usuario.foto ? (
          <img src={usuario.foto} alt={usuario.nombre} />
        ) : (
          <div className="PerfilUsuarioSinFoto">Sin Foto</div>
        )}
      </div>
      <div className="PerfilUsuarioNombre">{usuario.nombre}</div>
      <button className="PerfilUsuarioBoton" onClick={manejarMensaje}>
        Mensajea al dueño
      </button>
    </div>
  );
};

export default PerfilUsuario;
