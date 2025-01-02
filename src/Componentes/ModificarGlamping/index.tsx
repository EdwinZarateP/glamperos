import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Glamping {
  id: string;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  precio: number;
}

const ModificarGlamping: React.FC = () => {
  const { glampingId } = useParams<{ glampingId: string }>();
  const [glampingData, setGlampingData] = useState<Glamping | null>(null);
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (glampingId) {
      axios
        .get(`https://glamperosapi.onrender.com/glampings/${glampingId}`)
        .then(response => {
          const data = response.data;
          console.log('Datos del glamping:', data);  // Verifica los datos que recibes
          setGlampingData(data);
          setNombre(data.nombre);
          setUbicacion(data.ubicacion);
          setDescripcion(data.descripcion);
          setPrecio(data.precio);
          setCargando(false);
        })
        .catch(error => {
          console.error('Error al cargar los datos del glamping:', error);
          setCargando(false);
        });
    }
  }, [glampingId]);

  const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>, campo: string) => {
    switch (campo) {
      case 'nombre':
        setNombre(evento.target.value);
        break;
      case 'ubicacion':
        setUbicacion(evento.target.value);
        break;
      case 'descripcion':
        setDescripcion(evento.target.value);
        break;
      case 'precio':
        setPrecio(parseFloat(evento.target.value));
        break;
      default:
        break;
    }
  };

  const manejarEnvio = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (glampingData) {
      const datosModificados = { nombre, ubicacion, descripcion, precio };

      axios
        .put(`https://glamperosapi.onrender.com/glampings/${glampingData.id}`, datosModificados)
        .then(() => {
          alert('Datos modificados exitosamente');
        })
        .catch(error => {
          console.error('Error al actualizar el glamping:', error);
        });
    }
  };

  return (
    <div className="ModificarGlamping">
      <h1>Modificar Glamping</h1>
      {cargando ? (
        <div className="ModificarGlamping-cargando">
          <p>Cargando datos del glamping...</p>
        </div>
      ) : (
        glampingData && (
          <form onSubmit={manejarEnvio} className="ModificarGlamping-formulario">
            <label className="ModificarGlamping-label">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => manejarCambio(e, 'nombre')}
              className="ModificarGlamping-input"
            />

            <label className="ModificarGlamping-label">Ubicación:</label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => manejarCambio(e, 'ubicacion')}
              className="ModificarGlamping-input"
            />

            <label className="ModificarGlamping-label">Descripción:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => manejarCambio(e, 'descripcion')}
              className="ModificarGlamping-input"
            />

            <label className="ModificarGlamping-label">Precio:</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => manejarCambio(e, 'precio')}
              className="ModificarGlamping-input"
            />

            <button type="submit" className="ModificarGlamping-boton">
              Guardar Cambios
            </button>
          </form>
        )
      )}
    </div>
  );
};

export default ModificarGlamping;
