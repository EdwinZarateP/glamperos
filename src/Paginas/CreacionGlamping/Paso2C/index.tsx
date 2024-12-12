import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import { ContextoApp } from "../../../Contexto/index";
import "./estilos.css";

// Componente Principal
const Paso2C: React.FC = () => {
  const contexto = useContext(ContextoApp);

  if (!contexto) return null;

  const { imagenesCargadas, setImagenesCargadas } = contexto;

  /** Funcionalidad para subir imágenes */
  const manejarSubida = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = event.target.files;
    if (!archivos) return;

    const imagenesArray: File[] = [];
    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];

      // Validación para asegurarse de que sea un tipo de imagen válido
      if (!archivo.type.startsWith("image/")) {
        Swal.fire("Error", "Solo se permiten imágenes (JPEG, PNG, GIF)", "error");
        continue;
      }

      if (archivo.size > 10 * 1024 * 1024) {
        Swal.fire("Error", "Una o más imágenes superan el tamaño máximo de 10MB", "error");
        continue;
      }

      imagenesArray.push(archivo);
    }

    if (imagenesCargadas.length + imagenesArray.length > 10) {
      Swal.fire("Error", `Tienes cupo para 10 imágenes en total.`, "error");
      return;
    }

    setImagenesCargadas((prev) => [...prev, ...imagenesArray]);
  };

  /** Funcionalidad para eliminar una imagen */
  const eliminarImagen = (index: number) => {
    setImagenesCargadas((prev) => prev.filter((_, i) => i !== index));
  };

  /** Optimización para arrastrar imágenes con mejor velocidad */
  const manejarArrastrar = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const targetIndex = parseInt(e.dataTransfer.getData("index"), 10);

    if (isNaN(targetIndex) || targetIndex === index || targetIndex >= imagenesCargadas.length) return;

    const updatedImages = [...imagenesCargadas];
    // Intercambio directo usando índice para actualizar el estado
    [updatedImages[index], updatedImages[targetIndex]] = [updatedImages[targetIndex], updatedImages[index]];
    setImagenesCargadas(updatedImages);
  };

  const primerasCincoImagenes = imagenesCargadas.slice(0, 5);

  const calcularCupoRestante = () => 10 - imagenesCargadas.length;

  const mostrarBotonSubir = calcularCupoRestante() > 0;

  return (
    <div className="Paso2C-contenedor">
      {/* Sección de imágenes a la izquierda */}
      <div className="Paso2C-seccionPrincipal">
        <input
          type="file"
          multiple
          onChange={manejarSubida}
          className="input-imagenes"
          id="inputImagenes"
          style={{ display: "none" }}
        />

        {imagenesCargadas.map((imagen, index) => (
          <div
            key={index}
            className="Paso2C-imagenContenedor"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("index", index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => manejarArrastrar(e, index)}
          >
            <img src={URL.createObjectURL(imagen)} alt={`Imagen ${index}`} className="Paso2C-imagen" />
            <button
              className="Paso2C-boton-eliminar"
              onClick={() => eliminarImagen(index)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}

        {mostrarBotonSubir && (
          <label className="Paso2C-botonAgregar" htmlFor="inputImagenes">
            Subir Imágenes (Tienes espacio para {calcularCupoRestante()} imágenes)
          </label>
        )}
      </div>

      {/* Sección derecha con las primeras 5 imágenes */}
      <div className="Paso2C-seccionDerecha-contenedor">
        <h4>Así se verán en tu portada</h4>
        <div className="Paso2C-seccionDerecha">
          {/* Contenedor para la imagen principal */}
          <div className="Paso2C-principal">
            {primerasCincoImagenes.slice(0, 1).map((imagen, index) => (
              <div key={index} className="Paso2C-seccionDerecha principal">
                <img
                  src={URL.createObjectURL(imagen)}
                  alt={`Imagen ${index}`}
                />
              </div>
            ))}
          </div>

          {/* Contenedor para las imágenes secundarias */}
          <div className="Paso2C-secundaria">
            {primerasCincoImagenes.slice(1).map((imagen, index) => (
              <div key={index} className="Paso2C-seccionDerecha secundaria">
                <img
                  src={URL.createObjectURL(imagen)}
                  alt={`Imagen ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paso2C;
