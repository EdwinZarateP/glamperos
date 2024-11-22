import React, { useEffect, useState } from "react";
import "./estilos.css"; // Importar la hoja de estilos asociada

// Definir la interfaz de un glamping
interface Glamping {
  id: string;
  nombre: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  precio_noche: number;
  descripcion: string;
  imagenes: string[];
  video_youtube?: string;
  calificacion?: number;
  caracteristicas: string[];
  creado: string;
}

const Pruebas: React.FC = () => {
  const [glampings, setGlampings] = useState<Glamping[]>([]); // Estado para los datos de la API
  const [cargando, setCargando] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Función para obtener los datos de la API
  const obtenerGlampings = async () => {
    try {
      const respuesta = await fetch("https://glamperosapi.onrender.com/glampings/");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los glampings");
      }
      const datos: Glamping[] = await respuesta.json();
      setGlampings(datos);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setCargando(false);
    }
  };

  // Llamar a la API al montar el componente
  useEffect(() => {
    obtenerGlampings();
  }, []);

  if (cargando) {
    return <div className="Pruebas-cargando">Cargando glampings...</div>;
  }

  if (error) {
    return (
      <div className="Pruebas-error">
        <p>Error: {error}</p>
        <p>Por favor, verifica tu conexión e intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="Pruebas-contenedor">
      <h1 className="Pruebas-titulo">Listado de Glampings</h1>
      <div className="Pruebas-lista">
        {glampings.map((glamping) => (
          <div key={glamping.id} className="Pruebas-tarjeta">
            <h2 className="Pruebas-nombre">{glamping.nombre}</h2>
            <p className="Pruebas-descripcion">{glamping.descripcion}</p>
            <p className="Pruebas-precio">
              Precio por noche: ${glamping.precio_noche.toLocaleString("es-CO")}
            </p>
            <p className="Pruebas-ubicacion">
              Ubicación: Latitud {glamping.ubicacion.lat}, Longitud {glamping.ubicacion.lng}
            </p>
            <div className="Pruebas-caracteristicas">
              <strong>Características:</strong>
              <ul>
                {glamping.caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))}
              </ul>
            </div>
            {glamping.imagenes.length > 0 ? (
              <div className="Pruebas-imagenes">
                <img
                  src={glamping.imagenes[0]}
                  alt={glamping.nombre}
                  className="Pruebas-imagen"
                />
              </div>
            ) : (
              <p className="Pruebas-imagenes-placeholder">Sin imágenes disponibles</p>
            )}
            {glamping.video_youtube && (
              <div className="Pruebas-video">
                <a
                  href={glamping.video_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Pruebas-enlace-video"
                >
                  Ver video en YouTube
                </a>
              </div>
            )}
            <p className="Pruebas-creado">
              Fecha de creación:{" "}
              {new Date(glamping.creado).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pruebas;
