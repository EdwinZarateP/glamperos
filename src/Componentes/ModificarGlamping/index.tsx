import React, { useState, useEffect } from 'react';
import './estilos.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ModificarGlamping: React.FC = () => {
  const { glampingId } = useParams<{ glampingId: string }>();
  const [nombreGlamping, setNombreGlamping] = useState('');
  const [tipoGlamping, setTipoGlamping] = useState('');
  const [Cantidad_Huespedes, setCantidad_Huespedes] = useState<number>(0);
  const [Cantidad_Huespedes_Adicional, setCantidad_Huespedes_Adicional] = useState<number>(0);
  const [Acepta_Mascotas, setAcepta_Mascotas] = useState<boolean>(false);
  const [precioEstandar, setPrecioEstandar] = useState<number>(0);
  const [precioEstandarAdicional, setPrecioEstandarAdicional] = useState<number>(0);  
  const [descuento, setDescuento] = useState<number>(0);
  const [descripcionGlamping, setDescripcionGlamping] = useState('');
  const [video_youtube, setVideo_youtube] = useState('');
  const [amenidadesGlobal, setAmenidadesGlobal] = useState<string[]>([]);

  const opcionesAmenidades = [
    'Wifi', 'Zona de trabajo', 'Desayuno', 'Jacuzzi', 'Tina', 'Piscina',
    'Maya catamaran', 'Parrilla', 'Cocina', 'Zona fogata', 'Chimenea',
    'Mini bar', 'Tv', 'Proyector', 'Juegos de mesa', 'Lavadora', 'Clima Calido',
    'Aire acondicionado', 'Clima Frio', 'Calefaccion', 'Ducha', 'Detector de humo',
    'Extintor', 'Botiquin', 'Playa', 'Naturaleza', 'Rio', 'Cascada', 'En la montaña',
    'Desierto', 'Caminata', 'Parqueadero'
  ];

  useEffect(() => {
    if (glampingId) {
      axios
      .get(`https://glamperosapi.onrender.com/glampings/${glampingId}`)
      .then((response) => {
        const data = response.data || {};
        setNombreGlamping(data.nombreGlamping || '');
        setTipoGlamping(data.tipoGlamping || '');
        setCantidad_Huespedes(data.Cantidad_Huespedes ?? 0);
        setCantidad_Huespedes_Adicional(data.Cantidad_Huespedes_Adicional ?? 0);
        setAcepta_Mascotas(data.Acepta_Mascotas || false);
        setPrecioEstandar(data.precioEstandar ?? 0);
        setPrecioEstandarAdicional(data.precioEstandarAdicional ?? 0);
        setDescuento(data.descuento ?? 0);
        setDescripcionGlamping(data.descripcionGlamping || '');
        setVideo_youtube(data.video_youtube || '');
        setAmenidadesGlobal(data.amenidadesGlobal || []);
      })
    .catch((error) => {
    console.error('Error al obtener los datos del glamping:', error);
  });

    }
  }, [glampingId]);

  const toggleAmenidad = (amenidad: string) => {
    setAmenidadesGlobal((prevState) => {
      if (prevState.includes(amenidad)) {
        return prevState.filter((item) => item !== amenidad);
      } else {
        return [...prevState, amenidad];
      }
    });
  };

  const actualizarGlamping = async () => {
    // Validaciones
    if (nombreGlamping.length > 40) {
      alert('El nombre del Glamping no puede exceder los 40 caracteres');
      return;
    }

    if (precioEstandar > 2000000) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El precio estándar no puede ser superior a 2,000,000',
      });
      return;
    }

    if (precioEstandar < 60000) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El precio estándar no puede ser menor a $60.000',
      });
      return;
    }

    if (precioEstandar < precioEstandarAdicional) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El precio estándar por noche no puede ser menor al precio de un huesped adicional',
      });
      return;
    }

    if (descuento > 70) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El descuento no puede ser superior a 70%',
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombreGlamping", nombreGlamping);
    formData.append("tipoGlamping", tipoGlamping);
    formData.append("Cantidad_Huespedes", (Cantidad_Huespedes !== undefined && Cantidad_Huespedes !== null ? Cantidad_Huespedes : 0).toString());
    formData.append("Cantidad_Huespedes_Adicional", (Cantidad_Huespedes_Adicional !== undefined && Cantidad_Huespedes_Adicional !== null ? Cantidad_Huespedes_Adicional : 0).toString());
    formData.append("Acepta_Mascotas", Acepta_Mascotas ? "true" : "false");    
    formData.append("precioEstandar", (precioEstandar ?? 0).toString());
    formData.append("precioEstandarAdicional", (precioEstandarAdicional ?? 0).toString());
    formData.append("descuento", (descuento ?? 0).toString());
    formData.append("descripcionGlamping", descripcionGlamping);
    formData.append("video_youtube", video_youtube || 'sin video');
    formData.append("amenidadesGlobal", amenidadesGlobal.join(","));

    try {
      const response = await fetch(`https://glamperosapi.onrender.com/glampings/Datos/${glampingId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el glamping');
      }

    Swal.fire({
          title: "Información actualizada",
          text: "Información actualizada con los datos suministrados.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          // Forzar desplazamiento al inicio antes de recargar
          window.scrollTo({
            top: 0,
            behavior: "auto", // Asegura el desplazamiento inmediato
          });
           // Recargar la página
      window.location.reload();
    }); 

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="ModificarGlamping-contenedor">
      <div className="ModificarGlamping-formulario">
        <div className="ModificarGlamping-formulario-contenedor1">
          <label className="ModificarGlamping-label" htmlFor="nombreGlamping">
            Nombre del Glamping:
          </label>
          <input
            id="nombreGlamping"
            className="ModificarGlamping-input"
            type="text"
            value={nombreGlamping}
            onChange={(e) => setNombreGlamping(e.target.value.slice(0, 40))}
          />
          
          <label className="ModificarGlamping-label" htmlFor="precioEstandar">
            Precio noche estandar:
          </label>
          <input
            id="precioEstandar"
            className="ModificarGlamping-input"
            type="number"
            value={precioEstandar}
            onChange={(e) => setPrecioEstandar(Number(e.target.value))}
          />

          <label className="ModificarGlamping-label" htmlFor="precioEstandarAdicional">
            Precio noche huésped adicional:
          </label>
          <input
            id="precioEstandarAdicional"
            className="ModificarGlamping-input"
            type="number"
            value={precioEstandarAdicional}
            onChange={(e) => setPrecioEstandarAdicional(Number(e.target.value))}
          />

           <label className="ModificarGlamping-label" htmlFor="descuento">
            Descuento entre semana:
          </label>
          <input
            id="descuento"
            className="ModificarGlamping-input"
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(Number(e.target.value))}
          />

          <label className="ModificarGlamping-label" htmlFor="Cantidad_Huespedes">
            Cantidad Huespedes estandar por noche:
          </label>
          <input
            id="Cantidad_Huespedes"
            className="ModificarGlamping-input"
            type="number"
            value={Cantidad_Huespedes}
            onChange={(e) => setCantidad_Huespedes(Number(e.target.value))}
          />

          <label className="ModificarGlamping-label" htmlFor="Cantidad_Huespedes_Adicional">
            Huespedes adicionales por noche:
          </label>
          <input
            id="Cantidad_Huespedes_Adicional"
            className="ModificarGlamping-input"
            type="number"
            value={Cantidad_Huespedes_Adicional}
            onChange={(e) => setCantidad_Huespedes_Adicional(Number(e.target.value))}
          />         

          <label className="ModificarGlamping-label" htmlFor="tipoGlamping">
            Tipo de Glamping:
          </label>
          <select
            id="tipoGlamping"
            className="ModificarGlamping-input"
            value={tipoGlamping}
            onChange={(e) => setTipoGlamping(e.target.value)}
          >
            <option value="Tienda">Tienda</option>
            <option value="Cabaña">Cabaña</option>
            <option value="Domo">Domo</option>
            <option value="Casa del arbol">Casa del árbol</option>
            <option value="Remolque">Remolque</option>
            <option value="Choza">Choza</option>
          </select>

          <label className="ModificarGlamping-label" htmlFor="Acepta_Mascotas">
            ¿Acepta Mascotas?:
          </label>
          <select
            id="Acepta_Mascotas"
            className="ModificarGlamping-input"
            value={Acepta_Mascotas ? 'true' : 'false'}
            onChange={(e) => {
              const newValue = e.target.value === 'true';
              setAcepta_Mascotas(newValue);
            }}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>

          <label className="ModificarGlamping-label" htmlFor="video_youtube">
            Video de Youtube:
          </label>
          <input
            id="video_youtube"
            className="ModificarGlamping-input"
            type="text"
            value={video_youtube}
            onChange={(e) => setVideo_youtube(e.target.value)}
          />
          </div>  
          
          <label className="ModificarGlamping-label" htmlFor="descripcionGlamping">
            Descripción del Glamping:
          </label>
          <textarea
            id="descripcionGlamping"
            className="ModificarGlamping-input-desc"
            value={descripcionGlamping}
            onChange={(e) => setDescripcionGlamping(e.target.value)}
          />  

          <label className="ModificarGlamping-label" htmlFor="amenidadesGlobal">
            Amenidades:
          </label>
          <div className="amenidades-container">
            {opcionesAmenidades.map((amenidad) => (
              <button
                key={amenidad}
                className={`amenidad-button ${amenidadesGlobal.includes(amenidad) ? 'selected' : ''}`}
                onClick={() => toggleAmenidad(amenidad)}
              >
                {amenidad}
              </button>
            ))}
          </div>
        </div>

      <button className="ModificarGlamping-boton" onClick={actualizarGlamping}>
        Actualizar
      </button>
    </div>
  );
};

export default ModificarGlamping;
