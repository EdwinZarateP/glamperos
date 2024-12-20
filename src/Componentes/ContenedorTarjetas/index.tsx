import React, { useEffect, useState, useCallback, useContext } from "react";
import { ContextoApp } from '../../Contexto/index';
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  glampingId: string;
  nombreGlamping: string;
  tipoGlamping: string;
  ciudad_departamento: string;
  precioEstandar: number;
  calificacion: number | null;
  imagenes: string[];
  ubicacion: {
    lat: number;
    lng: number;
  };
  Acepta_Mascotas: boolean;
}


const ContenedorTarjetas: React.FC = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { activarFiltros, filtros, activarFiltrosUbicacion } = almacenVariables;

  const [glampings, setGlampings] = useState<GlampingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(18);

  useEffect(() => {
    const fetchGlampings = async () => {
      const storedData = sessionStorage.getItem("glampingsData");

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setGlampings(parsedData);
          setLoading(false);
        } catch (error) {
          console.error("Error al parsear los datos de sessionStorage:", error);
          sessionStorage.removeItem("glampingsData");
          await fetchDataFromAPI();
        }
      } else {
        await fetchDataFromAPI();
      }
    };

    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch("https://glamperosapi.onrender.com/glampings/");
        if (!response.ok) throw new Error("Error al obtener los datos de la API");
        const data = await response.json();

        const parsedData = data.map((glamping: any) => ({
          glampingId: glamping._id,
          nombreGlamping: glamping.nombreGlamping || "Nombre no disponible",
          tipoGlamping: glamping.tipoGlamping || "Choza",
          ciudad_departamento: glamping.ciudad_departamento || "Ciudad no disponible",
          precioEstandar: glamping.precioEstandar || 0,
          calificacion: glamping.calificacion,
          imagenes: glamping.imagenes || [],
          ubicacion: {
            lat: glamping.ubicacion.lat,
            lng: glamping.ubicacion.lng,
          },
          Acepta_Mascotas: glamping.Acepta_Mascotas || false,
        }));

        sessionStorage.setItem("glampingsData", JSON.stringify(parsedData));
        setGlampings(parsedData);
      } catch (error) {
        console.error("Error al obtener glampings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlampings();
  }, []);

  // Función para cargar más resultados
  const handleLoadMore = useCallback(() => {
    const cantidadNueva = Math.min(visibleCount + 8, glampings.length);
    setVisibleCount(cantidadNueva);
  }, [visibleCount, glampings.length]);

  // Función para manejar el evento scroll
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    // Se carga más contenido al llegar cerca del final
    if (scrollTop + windowHeight >= fullHeight - 200) {
      handleLoadMore();
    }
  }, [handleLoadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Función para calcular la distancia entre dos puntos geográficos usando la fórmula de Haversine
  function calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en kilómetros
  }

  // Filtrar los glampings según los criterios del diccionario de filtros
  const glampingsFiltrados = glampings.filter((glamping) => {
    // Filtros de precio y tipo si activarFiltros es true
    const cumplePrecio =
      !activarFiltros || (filtros?.precioFilter?.[0] !== undefined &&
      filtros?.precioFilter?.[1] !== undefined &&
      glamping.precioEstandar >= filtros.precioFilter[0] &&
      glamping.precioEstandar <= filtros.precioFilter[1]);
      
    const cumpleTipo =
      !activarFiltros || filtros.tipoFilter === '' || glamping.tipoGlamping === filtros.tipoFilter;
    
    // Filtro de coordenadas solo si activarFiltrosUbicacion es true
    const cumpleCoordenadas =
      !activarFiltrosUbicacion || 
      (filtros?.cordenadasFilter?.LATITUD !== undefined &&
      filtros?.cordenadasFilter?.LONGITUD !== undefined &&
      calcularDistancia(
        filtros.cordenadasFilter.LATITUD,
        filtros.cordenadasFilter.LONGITUD,
        glamping.ubicacion.lat,
        glamping.ubicacion.lng
      ) <= 100);

    return cumplePrecio && cumpleTipo && cumpleCoordenadas;
  });

  // Limitar la cantidad de glampings visibles según visibleCount
  const glampingsMostrados = glampingsFiltrados.slice(0, visibleCount);


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

  if (glampingsMostrados.length === 0) {
    return <div>No se encontraron glampings.</div>;
  }

  return (
    <div className="contenedor-tarjetas">
      {glampingsMostrados.map((glamping, index) => (
        <Tarjeta
          key={index}
          glampingId={glamping.glampingId}
          imagenes={glamping.imagenes}
          ciudad={glamping.ciudad_departamento}
          precio={glamping.precioEstandar}
          calificacion={glamping.calificacion || 0}
          favorito={false}
          nombreGlamping={glamping.nombreGlamping}
          tipoGlamping={glamping.tipoGlamping}
          ubicacion={glamping.ubicacion}
          onFavoritoChange={(nuevoEstado) =>
            console.log(`Favorito en tarjeta ${index + 1}:`, nuevoEstado)
          }
          Acepta_Mascotas={glamping.Acepta_Mascotas}
        />
      ))}
    </div>
  );
};

export default ContenedorTarjetas;
