import React, { useEffect, useState } from "react";
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  nombre: string;
  ciudad_departamento: string; // Cambiado para reflejar el campo correcto.
  precio_noche: number;
  calificacion: number | null;
  imagenes: string[];
}

const ContenedorTarjetas: React.FC = () => {
  const [glampings, setGlampings] = useState<GlampingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlampings = async () => {
      try {
        const response = await fetch("https://glamperosapi.onrender.com/glampings/");
        if (!response.ok) throw new Error("Error al obtener los datos de la API");
        const data = await response.json();

        // Mapear los datos para asegurar la estructura
        const parsedData = data.map((glamping: any) => ({
          nombre: glamping.nombre,
          ciudad_departamento: glamping.ciudad_departamento, // Usar el campo correcto
          precio_noche: glamping.precio_noche,
          calificacion: glamping.calificacion,
          imagenes: glamping.imagenes,
        }));

        setGlampings(parsedData);
      } catch (error) {
        console.error("Error al obtener glampings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlampings();
  }, []);

  if (loading) {
    return <div>Cargando glampings...</div>;
  }

  if (glampings.length === 0) {
    return <div>No se encontraron glampings.</div>;
  }

  return (
    <div className="contenedor-tarjetas">
      {glampings.map((glamping, index) => (
        <Tarjeta
          key={index}
          imagenes={glamping.imagenes}
          ciudad={glamping.ciudad_departamento} // Mostrar ciudad y departamento
          precio={glamping.precio_noche}
          calificacion={glamping.calificacion || 0} // Si `calificacion` es null, usar 0
          favorito={false}
          nombreGlamping={glamping.nombre}
          onFavoritoChange={(nuevoEstado) =>
            console.log(`Favorito en tarjeta ${index + 1}:`, nuevoEstado)
          }
        />
      ))}
    </div>
  );
};

export default ContenedorTarjetas;
