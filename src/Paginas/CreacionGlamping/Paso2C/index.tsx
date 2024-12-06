import React, { useState, useContext } from "react";
import { ContextoApp } from "../../../Contexto/index";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "./estilos.css";

const Paso2C: React.FC = () => {
  const { imagenesSeleccionadas, setImagenesSeleccionadas } = useContext(ContextoApp)!;

  const [imagenesValidas, setImagenesValidas] = useState<string[]>([]);
  const [imagenesInvalidas, setImagenesInvalidas] = useState<string[]>([]);
  const [imagenesPrincipales, setImagenesPrincipales] = useState<string[]>([]);

  const [draggingImage, setDraggingImage] = useState<string | null>(null); // Imagen que se está arrastrando
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null); // Índice de la imagen que se está arrastrando
  const [overDest, setOverDest] = useState<boolean>(false); // Si la imagen está sobre el área de destino

  const manejarImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imagenesArray: string[] = [];
    const imagenesInvalidaArray: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 10485760) {
        imagenesArray.push(URL.createObjectURL(file));
      } else {
        imagenesInvalidaArray.push(file.name);
      }
    }

    if (imagenesArray.length + imagenesSeleccionadas.length > 15) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Solo puedes subir un máximo de 15 fotos.",
        confirmButtonText: "Aceptar",
      });
    } else if (imagenesArray.length + imagenesSeleccionadas.length < 5) {
      Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        text: "Debes subir al menos 5 fotos.",
        confirmButtonText: "Aceptar",
      });
    } else {
      setImagenesSeleccionadas((prevState) => [...prevState, ...imagenesArray]);
      setImagenesValidas(imagenesArray);
      setImagenesInvalidas(imagenesInvalidaArray);
    }    
  };

  const eliminarImagen = (index: number) => {
    setImagenesSeleccionadas((prevState) => prevState.filter((_, i) => i !== index));
  };

  const iniciarArrastre = (imagen: string, index: number) => {
    setDraggingImage(imagen);
    // setDraggedIndex(index); // Guardar el índice de la imagen que se está arrastrando
    setDraggedIndex(4);
    console.log(index)
  };

  const soltarImagen = (index: number) => {
    
    if (imagenesPrincipales.length >= 5) {
      Swal.fire({
        icon: "info",
        title: "Todo melo, pero...",
        text: "Ya escogiste 5 imágenes. Si quieres reemplazar alguna, elimina una primero.",
        confirmButtonText: "Aceptar",
      });
      return; // No permite agregar más imágenes si ya hay 5
    }

    if (draggingImage && !imagenesPrincipales.includes(draggingImage)) {
      // Si ya hay 5 imágenes, reemplazar la imagen
      const updatedImages = [...imagenesPrincipales];
      updatedImages.splice(index, 0, draggingImage); // Colocar la imagen en el índice correcto
      setImagenesPrincipales(updatedImages);
      setImagenesSeleccionadas((prevState) => prevState.filter((imagen) => imagen !== draggingImage));
    }
  };

  const devolverImagen = (imagen: string) => {
    setImagenesPrincipales((prevState) => prevState.filter((img) => img !== imagen));
    setImagenesSeleccionadas((prevState) => [...prevState, imagen]);
  };

  const eliminarImagenDeDest = () => {
    if (imagenesPrincipales.length > 0) {
      const imagenEliminada = imagenesPrincipales[0];
      setImagenesPrincipales(imagenesPrincipales.slice(1)); // Eliminar la primera imagen (la principal)
      setImagenesSeleccionadas((prevState) => [imagenEliminada, ...prevState]); // Volver a agregarla a la izquierda
    }
  };

  const manejarOverDest = (over: boolean) => {
    setOverDest(over);
  };

  const moverImagen = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...imagenesPrincipales];
    const [movedImage] = updatedImages.splice(fromIndex, 1); // Eliminar imagen desde el índice de origen
    updatedImages.splice(toIndex, 0, movedImage); // Insertar imagen en el índice de destino
    setImagenesPrincipales(updatedImages);
  };

  return (
    <div className="Paso2C-contenedor">
      <h1 className="Paso2C-titulo">Agrega algunas fotos de tu glamping</h1>
      <p className="Paso2C-subtitulo">
        Para empezar necesitas al menos 5 fotos, pero luego podrás modificarlas en el futuro.
      </p>

      <div className="Paso2C-contenedor-principal">
        {/* Lado izquierdo */}
        <div className="Paso2C-fotos">
          <h2 className="Paso2C-subtitulo-fotos">Sube tus fotos (min 5 / máx 15)</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={manejarImagenes}
            className="Paso2C-input-imagen"
          />
          {imagenesValidas.length > 0 && (
            <div className="Paso2C-imagenes">
              {imagenesSeleccionadas.map((imagen, index) => (
                <div
                  key={index}
                  className={`Paso2C-imagen ${draggingImage === imagen ? "dragging" : ""}`}
                  draggable
                  onDragStart={() => iniciarArrastre(imagen, index)}
                >
                  <img src={imagen} alt={`Imagen ${index}`} className="Paso2C-imagen-preview" />
                  <button
                    onClick={() => eliminarImagen(index)}
                    className="Paso2C-boton-eliminar"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          )}
          {imagenesInvalidas.length > 0 && (
            <div className="Paso2C-error-imagen">
              <p>Las siguientes imágenes no se subieron porque exceden el tamaño de 10 MB:</p>
              <ul>
                {imagenesInvalidas.map((imagen, index) => (
                  <li key={index}>{imagen}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Lado derecho (destino del arrastre) */}
        <div
          className="Paso2C-derecha"
          onDragOver={(e) => {
            e.preventDefault();
            manejarOverDest(true);
          }}
          onDragLeave={() => manejarOverDest(false)}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedIndex !== null) {
              soltarImagen(draggedIndex); // Cambiar por el manejo correcto de imágenes
            }
          }}
        >
          <div
            className={`Paso2C-derecha-destino ${overDest ? "over" : ""}`}
          >
            {imagenesPrincipales.length > 0 ? (
              <>
                <img
                  src={imagenesPrincipales[0]}
                  alt="Imagen Principal"
                  className="Paso2C-imagen-preview"
                />
                <button
                  onClick={eliminarImagenDeDest}
                  className="Paso2C-boton-eliminar"
                >
                  <FaRegTrashAlt />
                </button>
              </>
            ) : (
              <p>1. Arrastra aquí tu imagen principal</p>
            )}
          </div>
          <div className="Paso2C-derecha-imagenes">
            {imagenesPrincipales.length <= 1 && (
              <p className="Paso2C-mensaje">2. Arrastra aquí 4 imágenes</p>
            )}
            {imagenesPrincipales.slice(1, 5).map((imagen, index) => (
              <div
                key={index}
                className="Paso2C-imagen-wrapper"
                draggable
                onDragStart={() => iniciarArrastre(imagen, index + 1)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const targetIndex = index + 1;
                  if (draggedIndex !== null && draggedIndex !== targetIndex) {
                    moverImagen(draggedIndex, targetIndex);
                  }
                }}
              >
                <img
                  src={imagen}
                  alt={`Imagen Principal ${index + 1}`}
                  className="Paso2C-imagen-preview"
                />
                <button
                  onClick={() => devolverImagen(imagen)}
                  className="Paso2C-boton-eliminar"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paso2C;
