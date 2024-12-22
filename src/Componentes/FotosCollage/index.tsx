import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerGlampingPorId } from "../../Funciones/obtenerGlamping"; 
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import './estilos.css';

function FotosCollage() {
  const { glampingId } = useParams<{ glampingId: string }>();
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [ciudadDepartamento, setCiudadDepartamento] = useState<string>(""); 
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<number>(0);
  const [activo, setActivo] = useState<boolean>(false);

  useEffect(() => {
    const consultarGlamping = async () => {
      if (!glampingId) {
        console.error("No se proporcionó un ID de glamping.");
        return;
      }

      try {
        const datos = await obtenerGlampingPorId(glampingId);
        if (datos) {
          setImagenes(datos.imagenes || []);
          const ciudadDepto = datos.ciudad_departamento || "No disponible";
          const textoDespuesDeGuion = ciudadDepto.includes("-")
            ? ciudadDepto.split("-")[1].trim()
            : ciudadDepto;

          setCiudadDepartamento(textoDespuesDeGuion);
        }
      } catch (error) {
        console.error("Error al consultar el glamping:", error);
      }
    };

    consultarGlamping();
  }, [glampingId]);

  const abrirModal = (index: number) => {
    setImagenSeleccionada(index);
    setMostrarModal(true);
    document.body.style.overflow = "hidden"; // Bloquea el scroll
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    document.body.style.overflow = "auto"; // Restablece el scroll
  };

  const cambiarImagen = (direccion: "izquierda" | "derecha") => {
    setImagenSeleccionada((prev) => {
      if (direccion === "izquierda") {
        return Math.max(0, prev - 1); // Asegura que no se pase al índice negativo
      }
      return Math.min(imagenes.length - 1, prev + 1); // Asegura que no se pase al índice fuera de rango
    });
  };

  const toggleActivo = () => setActivo(!activo); // Alternar el tamaño del botón

  // Función para manejar el deslizamiento táctil
  const manejarDeslizamiento = (event: React.TouchEvent) => {
    const touchStart = event.touches[0].clientX;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchEnd = moveEvent.touches[0].clientX;
      if (touchStart - touchEnd > 50) {
        // Desplazamiento hacia la derecha
        cambiarImagen("derecha");
      } else if (touchEnd - touchStart > 50) {
        // Desplazamiento hacia la izquierda
        cambiarImagen("izquierda");
      }
      // Detener el movimiento en la página
      moveEvent.preventDefault();
      window.removeEventListener("touchmove", handleTouchMove);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
  };

  return (
    <div className="fotosCollage-contenedor">
      <h1>Una joya del departamento de {ciudadDepartamento} 😍</h1>
      <div className="fotosCollage-grid">
        {imagenes.map((imagen, index) => {
          let itemClass = "fotosCollage-item"; 
          if (index % 3 === 0) {
            itemClass += " fotosCollage-item-span-2"; 
          }

          return (
            <div key={index} className={itemClass} onClick={() => abrirModal(index)}>
              <img src={imagen} alt={`Imagen ${index + 1}`} className="fotosCollage-imagen" />
            </div>
          );
        })}
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido" onTouchStart={manejarDeslizamiento}>
            <button className="cerrar" onClick={cerrarModal}>✖</button>

            <button
              className={`navegar izquierda ${imagenSeleccionada === 0 ? "oculta" : ""} ${activo ? "aumentar" : ""}`}
              onClick={() => { cambiarImagen("izquierda"); toggleActivo(); }}
            >
              <MdOutlineKeyboardArrowLeft size={30} />
            </button>
            <img
              src={imagenes[imagenSeleccionada]}
              alt={`Imagen ${imagenSeleccionada + 1}`}
              className="modal-imagen"
            />
            <button
              className={`navegar derecha ${imagenSeleccionada === imagenes.length - 1 ? "oculta" : ""} ${activo ? "aumentar" : ""}`}
              onClick={() => { cambiarImagen("derecha"); toggleActivo(); }}
            >
              <MdOutlineKeyboardArrowRight size={30} />
            </button>
            <div className="contador-imagenes">
              {imagenSeleccionada + 1} / {imagenes.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FotosCollage;
