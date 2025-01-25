import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import './estilos.css';

interface Usuario {
  email: string;
  telefono: string;
  foto: string | null;
  nombre: string;
}

const EditarPerfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [fotoActualizada, setFotoActualizada] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [telefono, setTelefono] = useState<string>('');
  const [editandoTelefono, setEditandoTelefono] = useState<boolean>(false);
  const [cargandoFoto, setCargandoFoto] = useState(false);
  const [cargandoTelefono, setCargandoTelefono] = useState(false);

  const emailUsuario = Cookies.get('correoUsuario');

  useEffect(() => {
    if (emailUsuario) {
      axios
        .get(`https://glamperosapi.onrender.com/usuarios/?email=${emailUsuario}`)
        .then((response) => {
          setUsuario(response.data);
          setTelefono(response.data.telefono);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, [emailUsuario]);

  const manejarFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const archivo = event.target.files[0];
      setFotoActualizada(archivo);
      setFotoPreview(URL.createObjectURL(archivo));
    }
  };

  const manejarTelefono = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    // Permitir solo números
    if (/^\d*$/.test(valor)) {
      setTelefono(valor);
    }
  };
  

  const actualizarTelefono = async () => {
    if (telefono.length !== 10) {
      alert('El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }
  
    const telefonoConPrefijo = telefono.startsWith('57') ? telefono : `57${telefono}`;
  
    if (usuario) {
      setCargandoTelefono(true);
      try {
        await axios.put(
          `https://glamperosapi.onrender.com/usuarios/${emailUsuario}/telefono`,
          { telefono: telefonoConPrefijo }
        );
        setEditandoTelefono(false);
        setUsuario((prevUsuario) =>
          prevUsuario ? { ...prevUsuario, telefono: telefonoConPrefijo } : null
        );
      } catch (error) {
        console.error('Error al actualizar el teléfono:', error);
      } finally {
        setCargandoTelefono(false);
      }
    }
  };  

  const actualizarFoto = async () => {
    if (usuario && fotoActualizada) {
      const formData = new FormData();
      formData.append('foto', fotoActualizada);

      setCargandoFoto(true);
      try {
        await axios.put(
          `https://glamperosapi.onrender.com/usuarios/${usuario.email}/foto`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const response = await axios.get(`https://glamperosapi.onrender.com/usuarios/?email=${usuario.email}`);
        setUsuario(response.data);
        setFotoActualizada(null);
        setFotoPreview(null);
      } catch (error) {
        console.error('Error al actualizar la foto:', error);
      } finally {
        setCargandoFoto(false);
      }
    }
  };

  // Mostrar Lottie de carga mientras se obtiene el usuario
  if (!usuario) {
    return (
      <div className="editar-perfil-cargando">
        <Lottie 
          animationData={animationData} 
          style={{ height: 200, width: '100%', margin: 'auto' }} 
        />
      </div>
    );
  }

  return (
    <div className="editar-perfil-container">
      <h2 className="editar-perfil-titulo">Editar Perfil</h2>

      <div className="editar-perfil-imagen">
        {cargandoFoto ? (
          <div className="editar-perfil-cargando">
            <Lottie
              animationData={animationData}
              style={{ height: 200, width: '50%', margin: 'auto' }}
            />
          </div>
        ) : (
          <div className="editar-perfil-imagen-contenedor">
            {usuario.foto || fotoPreview ? (
              <img
              src={fotoPreview ?? usuario.foto ?? undefined}
              alt="Foto de perfil"
              className="editar-perfil-imagen-foto"
            />
            
            ) : (
              <div className="editar-perfil-inicial">
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => document.getElementById('fotoInput')?.click()}
              className="editar-perfil-boton-editar"
            >
              ✏️
            </button>
          </div>
        )}
        <input
          type="file"
          id="fotoInput"
          accept="image/*"
          onChange={manejarFoto}
          style={{ display: 'none' }}
        />
        {fotoActualizada && (
          <button onClick={actualizarFoto} className="editar-perfil-boton-guardar">
            Guardar Foto
          </button>
        )}
      </div>

      <div className="editar-perfil-info">
        <div className="editar-perfil-info-item">
          <p>{usuario.nombre}</p>
        </div>
        <div className="editar-perfil-info-item">
          <p>{usuario.email}</p>
        </div>
        <div className="editar-perfil-info-item">
          <div className="editar-perfil-telefono-contenedor">
          WhatsApp Col +57
            {editandoTelefono ? (
              <input
              type="tel"
              id="telefono"
              value={telefono.slice(-10)}
              onChange={manejarTelefono}
              maxLength={10} // Limitar a 10 caracteres desde el front-end
            />            
            ) : (
              <p>{telefono.slice(-10)}</p>
            )}
            <button
              onClick={() => setEditandoTelefono(!editandoTelefono)}
              className="editar-perfil-boton-editar-tel"
            >
              ✏️
            </button>
          </div>
        </div>
        {cargandoTelefono ? (
          <div>Actualizando teléfono...</div>
        ) : (
          editandoTelefono && (
            <button onClick={actualizarTelefono} className="editar-perfil-boton-guardar">
              Guardar Teléfono
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EditarPerfil;
