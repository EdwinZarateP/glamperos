import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import { ContextoApp } from "../../../Contexto/index";
import "./estilos.css";

// Interfaz para la tipificación de imágenes
interface Imagen {
  id: number;
  ruta: string;
}

// Componente Principal
const Paso2C: React.FC = () => {
  const contexto = useContext(ContextoApp);

  if (!contexto) return null;

  const { imagenesCargadas, setImagenesCargadas } = contexto;

  /** Funcionalidad para subir imágenes */
  const manejarSubida = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = event.target.files;
    if (!archivos) return;

    const imagenesArray: Imagen[] = [];
    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      if (archivo.size > 10 * 1024 * 1024) {
        Swal.fire("Error", "Una o más imágenes superan el tamaño máximo de 10MB", "error");
        continue;
      }
      imagenesArray.push({
        id: Date.now() + Math.random(),
        ruta: URL.createObjectURL(archivo),
      });
    }

    if (imagenesCargadas.length + imagenesArray.length > 10) {
      Swal.fire("Error", `Tienes cupo para 10 imágenes en total.`, "error");
      return;
    }    

    setImagenesCargadas((prev) => [...prev, ...imagenesArray]);
  };

  /** Funcionalidad para eliminar una imagen */
  const eliminarImagen = (id: number) => {
    setImagenesCargadas((prev) => prev.filter((img) => img.id !== id));
  };

  /** Manejo de arrastrar imágenes */
  const manejarArrastrar = (resultado: React.DragEvent<HTMLDivElement>, index: number) => {
    const targetIndex = parseInt(resultado.dataTransfer.getData("index"), 10);
    const copy = [...imagenesCargadas];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setImagenesCargadas(copy);
  };

  /** Actualizar las imágenes de la derecha con las primeras 5 imágenes seleccionadas */
  const primerasCincoImagenes = imagenesCargadas.slice(0, 5);

  /** Lógica para calcular cuántas imágenes restantes se pueden subir */
  const calcularCupoRestante = () => 10 - imagenesCargadas.length;

  /** Funcionalidad para mostrar el botón de "Subir Imágenes" solo si queda espacio */
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
            key={imagen.id}
            className="Paso2C-imagenContenedor"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("index", index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => manejarArrastrar(e, index)}
          >
            <img src={imagen.ruta} alt={`Imagen ${imagen.id}`} className="Paso2C-imagen" />
            <button
              className="Paso2C-boton-eliminar"
              onClick={() => eliminarImagen(imagen.id)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}

        {/* Mensaje con el botón dinámico */}
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
            {primerasCincoImagenes.slice(0, 1).map((imagen) => (
              <div key={imagen.id} className="Paso2C-seccionDerecha principal">
                <img
                  src={imagen.ruta}
                  alt={`Imagen ${imagen.id}`}
                />
              </div>
            ))}
          </div>

          {/* Contenedor para las imágenes secundarias */}
          <div className="Paso2C-secundaria">
            {primerasCincoImagenes.slice(1).map((imagen) => (
              <div key={imagen.id} className="Paso2C-seccionDerecha secundaria">
                <img
                  src={imagen.ruta}
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
