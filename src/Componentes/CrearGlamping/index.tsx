import React, { useState } from "react";
import axios from "axios";
import "./estilos.css"; // Cambia el nombre del archivo si necesitas

const CrearGlamping: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState({ lat: "", lng: "" });
  const [precioNoche, setPrecioNoche] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [videoYoutube, setVideoYoutube] = useState("");

  const handleImagenesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagenes(event.target.files);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación para asegurar que el precio no sea 0
    if (precioNoche <= 0) {
      alert("El precio por noche debe ser mayor que 0.");
      return;
    }

    const formData = new FormData();
    if (imagenes) {
      Array.from(imagenes).forEach((imagen) => {
        formData.append("imagenes", imagen);
      });
    }

    // Formatear la ubicación como cadena JSON
    const ubicacionJSON = {
      lat: parseFloat(ubicacion.lat),
      lng: parseFloat(ubicacion.lng),
    };

    formData.append("nombre", nombre);
    formData.append("ubicacion", JSON.stringify(ubicacionJSON)); // Enviar como JSON string
    formData.append("precio_noche", precioNoche.toString());
    formData.append("descripcion", descripcion);
    formData.append("caracteristicas", caracteristicas); // Enviar como lista separada por comas
    if (videoYoutube) {
      formData.append("video_youtube", videoYoutube);
    }

    console.log("Datos enviados:", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.post(
        "https://glamperosapi.onrender.com/glampings/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Glamping creado con éxito: " + JSON.stringify(response.data));
    } catch (error: any) {
      console.error("Error al crear el glamping:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        alert("Error del servidor: " + error.response.data.detail);
      } else {
        alert("Error de red. Verifica tu conexión o revisa los logs.");
      }
    }
  };

  return (
    <div className="crearGlamping-contenedor">
      <h1 className="crearGlamping-titulo">Crear Nuevo Glamping</h1>
      <form className="crearGlamping-formulario" onSubmit={handleSubmit}>
        <div className="crearGlamping-campo">
          <label htmlFor="nombre" className="crearGlamping-label">
            Nombre del Glamping:
          </label>
          <input
            type="text"
            id="nombre"
            className="crearGlamping-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="crearGlamping-campo">
          <label htmlFor="latitud" className="crearGlamping-label">
            Latitud:
          </label>
          <input
            type="number"
            id="latitud"
            className="crearGlamping-input"
            value={ubicacion.lat}
            onChange={(e) =>
              setUbicacion({ ...ubicacion, lat: e.target.value })
            }
            required
          />
          <label htmlFor="longitud" className="crearGlamping-label">
            Longitud:
          </label>
          <input
            type="number"
            id="longitud"
            className="crearGlamping-input"
            value={ubicacion.lng}
            onChange={(e) =>
              setUbicacion({ ...ubicacion, lng: e.target.value })
            }
            required
          />
        </div>

        <div className="crearGlamping-campo">
          <label htmlFor="precio" className="crearGlamping-label">
            Precio por Noche (COP):
          </label>
          <input
            type="number"
            id="precio"
            className="crearGlamping-input"
            value={precioNoche}
            onChange={(e) => setPrecioNoche(Number(e.target.value))}
            required
          />
        </div>

        <div className="crearGlamping-campo">
          <label htmlFor="descripcion" className="crearGlamping-label">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            className="crearGlamping-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="crearGlamping-campo">
          <label htmlFor="caracteristicas" className="crearGlamping-label">
            Características (separadas por comas):
          </label>
          <input
            type="text"
            id="caracteristicas"
            className="crearGlamping-input"
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
            required
          />
        </div>

        <div className="crearGlamping-campo">
          <label htmlFor="imagenes" className="crearGlamping-label">
            Imágenes:
          </label>
          <input
            type="file"
            id="imagenes"
            className="crearGlamping-input"
            multiple
            accept="image/*"
            onChange={handleImagenesChange}
            required
          />
        </div>

        <div className="crearGlamping-campo">
          <label htmlFor="videoYoutube" className="crearGlamping-label">
            Video de YouTube (opcional):
          </label>
          <input
            type="url"
            id="videoYoutube"
            className="crearGlamping-input"
            value={videoYoutube}
            onChange={(e) => setVideoYoutube(e.target.value)}
          />
        </div>

        <button type="submit" className="crearGlamping-boton">
          Crear Glamping
        </button>
      </form>
    </div>
  );
};

export default CrearGlamping;
