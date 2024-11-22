import React, { useEffect, useState } from "react";
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  nombre: string;
  ubicacion: string;
  precio_noche: number;
  calificacion: number;
  imagenes: string[];
}

const ContenedorTarjetas: React.FC = () => {
  const [glampings, setGlampings] = useState<GlampingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlampings = async () => {
      try {
        const response = await fetch("https://glamperosapi.onrender.com/glampings/");
        const data = await response.json();
        setGlampings(data);
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
          ciudad={glamping.ubicacion}
          precio={glamping.precio_noche}
          calificacion={glamping.calificacion ?? 0}
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
