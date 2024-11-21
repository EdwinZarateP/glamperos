import React, { useState } from "react";
import axios from "axios";
import "./estilos.css";

const CrearGlamping: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState({ lat: "", lng: "" });
  const [precioNoche, setPrecioNoche] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  const handleImagenesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagenes(event.target.files);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (imagenes) {
      Array.from(imagenes).forEach((imagen) => {
        formData.append("imagenes", imagen);
      });
    }

    formData.append("nombre", nombre);
    formData.append("ubicacion", JSON.stringify(ubicacion));
    formData.append("precio_noche", precioNoche.toString());
    formData.append("descripcion", descripcion);
    formData.append(
      "caracteristicas",
      JSON.stringify(caracteristicas.split(","))
    );

    try {
      const response = await axios.post(
        "https://glamperosapi.onrender.com/glampings",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Glamping creado con éxito: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      alert("Error al crear el glamping");
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
            type="text"
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
            type="text"
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
