import React, { useEffect, useState, useCallback } from "react";
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  nombreGlamping: string;
  ciudad_departamento: string;
  precioEstandar: number;
  calificacion: number | null;
  imagenes: string[];
  ubicacion: {
    lat: number;
    lng: number;
  };
}

const ContenedorTarjetas: React.FC = () => {
  const [glampings, setGlampings] = useState<GlampingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Cantidad de elementos visibles inicialmente

  useEffect(() => {
    const fetchGlampings = async () => {
      const storedData = sessionStorage.getItem("glampingsData");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setGlampings(parsedData);
        setLoading(false);
      } else {
        try {
          const response = await fetch("https://glamperosapi.onrender.com/glampings/");
          if (!response.ok) throw new Error("Error al obtener los datos de la API");
          const data = await response.json();

          const parsedData = data.map((glamping: any) => ({
            nombreGlamping: glamping.nombreGlamping || "Nombre no disponible",
            ciudad_departamento: glamping.ciudad_departamento || "Ciudad no disponible",
            precioEstandar: glamping.precioEstandar || 0,
            calificacion: glamping.calificacion,
            imagenes: glamping.imagenes || [],
            ubicacion: {
              lat: glamping.ubicacion.lat,
              lng: glamping.ubicacion.lng,
            },
          }));

          sessionStorage.setItem("glampingsData", JSON.stringify(parsedData));
          setGlampings(parsedData);
        } catch (error) {
          console.error("Error al obtener glampings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGlampings();
  }, []);

  // Función para cargar más resultados
  const handleLoadMore = useCallback(() => {
    setVisibleCount((prevCount) => Math.min(prevCount + 8, glampings.length));
  }, [glampings.length]);

  // Función para manejar el evento scroll
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
      handleLoadMore();
    }
  }, [handleLoadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="contenedor-tarjetas">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="tarjeta-skeleton">
            <div className="tarjeta-skeleton-imagen" />
            <div className="tarjeta-skeleton-info" />
          </div>
        ))}
      </div>
    );
  }

  if (glampings.length === 0) {
    return <div>No se encontraron glampings.</div>;
  }

  return (
    <div className="contenedor-tarjetas">
      {glampings.slice(0, visibleCount).map((glamping, index) => (
        <Tarjeta
          key={index}
          imagenes={glamping.imagenes}
          ciudad={glamping.ciudad_departamento}
          precio={glamping.precioEstandar}
          calificacion={glamping.calificacion || 0}
          favorito={false}
          nombreGlamping={glamping.nombreGlamping}
          ubicacion={glamping.ubicacion}
          onFavoritoChange={(nuevoEstado) =>
            console.log(`Favorito en tarjeta ${index + 1}:`, nuevoEstado)
          }
        />
      ))}
    </div>
  );
};

export default ContenedorTarjetas;
