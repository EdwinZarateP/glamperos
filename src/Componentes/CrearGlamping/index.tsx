import React, { useState } from "react";
import axios from "axios";
import "./estilos.css";

const CrearGlamping: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState({ lat: "", lng: "" });
  const [precioNoche, setPrecioNoche] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ciudadDepartamento, setCiudadDepartamento] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [videoYoutube, setVideoYoutube] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [propietarioId, setPropietarioId] = useState(""); // Nuevo campo para propietario_id

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las imágenes no estén vacías
    if (imagenes.length === 0) {
      setMensaje("Por favor, selecciona al menos una imagen.");
      return;
    }

    // Validar que propietario_id no esté vacío
    if (!propietarioId) {
      setMensaje("Por favor, proporciona un ID de propietario.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append(
      "ubicacion",
      JSON.stringify({ lat: parseFloat(ubicacion.lat), lng: parseFloat(ubicacion.lng) })
    );
    formData.append("precio_noche", precioNoche);
    formData.append("descripcion", descripcion);
    formData.append("ciudad_departamento", ciudadDepartamento);
    imagenes.forEach((imagen) => formData.append("imagenes", imagen)); // Adjunta las imágenes
    formData.append("video_youtube", videoYoutube);
    formData.append("caracteristicas", caracteristicas);
    formData.append("propietario_id", propietarioId); // Agrega el ID del propietario

    try {
      setSubiendo(true); // Indicar que el proceso está en curso
      const response = await axios.post("https://glamperosapi.onrender.com/glampings/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMensaje("¡Glamping creado exitosamente!");
      console.log(response.data);
    } catch (error) {
      setMensaje("Hubo un error al crear el glamping. Intenta nuevamente.");
      console.error(error);
    } finally {
      setSubiendo(false); // Indicar que el proceso terminó
    }
  };

  // Manejar selección de imágenes
  const handleImagenesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const archivosSeleccionados = Array.from(e.target.files);

      // Validar tipo de archivo
      const formatosValidos = ["image/jpeg", "image/png", "image/webp"];
      const archivosValidos = archivosSeleccionados.filter((archivo) =>
        formatosValidos.includes(archivo.type)
      );

      if (archivosValidos.length !== archivosSeleccionados.length) {
        setMensaje("Algunas imágenes tienen formatos no válidos. Solo se permiten JPEG, PNG y WebP.");
        return;
      }

      setImagenes(archivosValidos);
    }
  };

  return (
    <div className="CrearGlamping-contenedor">
      <h1 className="CrearGlamping-titulo">Crear Glamping</h1>
      {mensaje && <p className="CrearGlamping-mensaje">{mensaje}</p>}
      <form className="CrearGlamping-formulario" onSubmit={handleSubmit}>
        <div className="CrearGlamping-campo">
          <label htmlFor="nombre">Nombre del Glamping:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="lat">Latitud:</label>
          <input
            type="number"
            id="lat"
            value={ubicacion.lat}
            onChange={(e) => setUbicacion({ ...ubicacion, lat: e.target.value })}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="lng">Longitud:</label>
          <input
            type="number"
            id="lng"
            value={ubicacion.lng}
            onChange={(e) => setUbicacion({ ...ubicacion, lng: e.target.value })}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="precio">Precio por Noche:</label>
          <input
            type="number"
            id="precio"
            value={precioNoche}
            onChange={(e) => setPrecioNoche(e.target.value)}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="ciudadDepartamento">Ciudad y Departamento:</label>
          <input
            type="text"
            id="ciudadDepartamento"
            value={ciudadDepartamento}
            onChange={(e) => setCiudadDepartamento(e.target.value)}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="imagenes">Imágenes:</label>
          <input
            type="file"
            id="imagenes"
            accept="image/*" // Solo permite imágenes
            multiple
            onChange={handleImagenesChange}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="videoYoutube">Video de YouTube:</label>
          <input
            type="url"
            id="videoYoutube"
            value={videoYoutube}
            onChange={(e) => setVideoYoutube(e.target.value)}
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="caracteristicas">Características (separadas por comas):</label>
          <input
            type="text"
            id="caracteristicas"
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
            required
          />
        </div>
        <div className="CrearGlamping-campo">
          <label htmlFor="propietarioId">ID del Propietario:</label>
          <input
            type="text"
            id="propietarioId"
            value={propietarioId}
            onChange={(e) => setPropietarioId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="CrearGlamping-boton" disabled={subiendo}>
          {subiendo ? "Subiendo..." : "Guardar Glamping"}
        </button>
      </form>
    </div>
  );
};

export default CrearGlamping;
