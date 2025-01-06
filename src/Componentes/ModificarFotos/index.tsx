import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./estilos.css";

const MAX_IMAGENES = 20;

const ModificarFotos: React.FC = () => {
  const { glampingId } = useParams<{ glampingId: string }>();
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imagenesArchivo, setImagenesArchivo] = useState<File[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/glampings/${glampingId}`);
        if (!response.ok) throw new Error("Error al obtener las imágenes del glamping");

        const data = await response.json();
        setImagenes(data.imagenes || []);
      } catch (error) {
        Swal.fire("Error", "No se pudieron cargar las imágenes del glamping.", "error");
        console.error(error);
      }
    };

    fetchImagenes();
  }, [glampingId]);

  const reorganizarImagenesEnAPI = async (nuevoOrdenImagenes: string[]) => {
    try {
      const response = await fetch(
        `https://glamperosapi.onrender.com/glampings/${glampingId}/reorganizar_imagenes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoOrdenImagenes),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error de la API:", errorResponse);
        throw new Error(errorResponse.detail ? JSON.stringify(errorResponse.detail) : "Error al reorganizar las imágenes");
      }

      const data = await response.json();
      setImagenes(data.imagenes || []);
      // Swal.fire("Éxito", "El orden de las imágenes fue actualizado.", "success");
    } catch (error: any) {
      Swal.fire("Error", error.message || "Error al reorganizar las imágenes.", "error");
      console.error("Error detallado:", error.message || error);
    }
  };

  const manejarArrastre = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const targetIndex = parseInt(e.dataTransfer.getData("index"), 10);

    if (isNaN(targetIndex) || targetIndex === index || targetIndex >= imagenes.length) return;

    const nuevoOrden = [...imagenes];
    [nuevoOrden[index], nuevoOrden[targetIndex]] = [nuevoOrden[targetIndex], nuevoOrden[index]];

    setImagenes(nuevoOrden);
    reorganizarImagenesEnAPI(nuevoOrden);
  };

  const eliminarImagen = async (imagenUrl: string) => {
    try {
      const response = await fetch(
        `https://glamperosapi.onrender.com/glampings/${glampingId}/imagenes?imagen_url=${encodeURIComponent(imagenUrl)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.detail || "Error al eliminar la imagen");
      }

      setImagenes(imagenes.filter((img) => img !== imagenUrl));
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo eliminar la imagen.", "error");
    }
  };



  const cargarImagenes = async () => {
    if (imagenesArchivo.length === 0) return;

    // Validación para asegurarse de que no se sobrepasen las 20 imágenes
    if (imagenes.length + imagenesArchivo.length > MAX_IMAGENES) {
      Swal.fire("Error", `No puedes añadir más de ${MAX_IMAGENES} imágenes.`, "error");
      return;
    }

    // Validación para los tipos de archivo y tamaño
    const imagenesValidas: File[] = [];
    for (let archivo of imagenesArchivo) {
      if (!archivo.type.startsWith("image/")) {
        Swal.fire("Error", "Solo se permiten imágenes (JPEG, PNG, GIF)", "error");
        continue;
      }

      if (archivo.size > 10 * 1024 * 1024) {
        Swal.fire("Sabemos que eres full HD", "Pero algunas imágenes no se subieron porque superan el tamaño máximo de 10MB", "info");
        continue;
      }

      imagenesValidas.push(archivo);
    }

    if (imagenesValidas.length === 0) return;

    // Subir las imágenes válidas
    const formData = new FormData();
    imagenesValidas.forEach((archivo) => formData.append("imagenes", archivo));
    setCargando(true);
    try {
      const response = await fetch(
        `https://glamperosapi.onrender.com/glampings/${glampingId}/imagenes`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.detail || "Error al cargar las imágenes");
      }

      const data = await response.json();
      setImagenes(data.imagenes || []);
      setImagenesArchivo([]); // Limpiar los archivos seleccionados
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudieron cargar las imágenes.", "error");
    }finally {
      setCargando(false);}
  };


  return (
    <div className="ModificarFotos-contenedor">
      {imagenes.length === 0 ? (
        <p>No hay imágenes para mostrar.</p>
      ) : (
        <div className="ModificarFotos-lista">
          {imagenes.map((url, index) => (
            <div
              key={index}
              className="ModificarFotos-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("index", index.toString())}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => manejarArrastre(e, index)}
            >
              <div className="ModificarFotos-imagen-contenedor">
                <img src={url} alt={`Imagen ${index}`} className="ModificarFotos-imagen" />
                <button
                  className="ModificarFotos-boton-eliminar"
                  onClick={() => eliminarImagen(url)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p>{`Imágenes actuales: ${imagenes.length} / ${MAX_IMAGENES}`}</p>
      <div className="ModificarFotos-agregar">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImagenesArchivo(Array.from(e.target.files || []))}
        />
        <button onClick={cargarImagenes} disabled={cargando} className="ModificarFotos-botonCargar">
          {cargando ? "Cargando..." : "Cargar Imágenes"}
        </button>
        {cargando && <p>Estamos cargando tus imágenes...</p>}
      </div>
    </div>
  );
};

export default ModificarFotos;
