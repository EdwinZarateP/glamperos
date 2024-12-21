import React, { useEffect, useState, useCallback, useContext } from "react";
import { ContextoApp } from '../../Contexto/index';
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  _id: string;  // Cambié _id por glampingId
  nombreGlamping: string;
  tipoGlamping: string;
  ciudad_departamento: string;
  precioEstandar: number;
  calificacion: number | null;
  imagenes: string[];
  ubicacion: {
    lat: number | null;
    lng: number | null;
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
  const [page, setPage] = useState(1);

  const fetchDataFromAPI = useCallback(async (page = 1, limit = 18) => {
    try {
      const response = await fetch(`https://glamperosapi.onrender.com/glampings?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error("Error al obtener los datos de la API");
      
      const data: GlampingData[] = await response.json();
  
      if (data.length === 0) {
        // Si no hay más datos, no incrementes la página
        return;
      }
  
      const parsedData = data.map((glamping) => ({
        _id: glamping._id,
        nombreGlamping: glamping.nombreGlamping || "Nombre no disponible",
        tipoGlamping: glamping.tipoGlamping || "Choza",
        ciudad_departamento: glamping.ciudad_departamento || "Ciudad no disponible",
        precioEstandar: glamping.precioEstandar || 0,
        calificacion: glamping.calificacion || null, 
        imagenes: glamping.imagenes || [],
        ubicacion: {
          lat: glamping.ubicacion?.lat || null,
          lng: glamping.ubicacion?.lng || null,
        },
        Acepta_Mascotas: glamping.Acepta_Mascotas || false,
      }));
  
      setGlampings((prevData) => {
        // Filtrar para evitar elementos duplicados antes de agregar
        const newData = parsedData.filter(
          (newGlamping) => !prevData.some((glamping) => glamping._id === newGlamping._id)
        );
        return [...prevData, ...newData];  // Asegúrate de que se agreguen los datos nuevos
      });
  
      setPage((prevPage) => prevPage + 1);
  
    } catch (error) {
      console.error("Error al obtener glampings:", error);
    } finally {
      setLoading(false);
    }
  }, []);     

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
          await fetchDataFromAPI(page);
        }
      } else {
        await fetchDataFromAPI(page);
      }
    };

    fetchGlampings();
  }, [page, fetchDataFromAPI]);

  // Función para cargar más resultados
  const handleLoadMore = useCallback(() => {
    if (!loading) {
      fetchDataFromAPI(page, 18);  // Se cargan siempre 18 registros
      setVisibleCount(prevCount => prevCount + 18);  // Aumentar en 18
    }
  }, [loading, page, fetchDataFromAPI]);  

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
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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
      filtros.cordenadasFilter?.LATITUD,  // Uso del encadenamiento opcional
      filtros.cordenadasFilter?.LONGITUD, // Uso del encadenamiento opcional
      glamping.ubicacion.lat ?? 0, 
      glamping.ubicacion.lng ?? 0
    ) <= 150);

  return cumplePrecio && cumpleTipo && cumpleCoordenadas;
});

// Ordenar los glampings por distancia si activarFiltrosUbicacion es true
const glampingsOrdenados = activarFiltrosUbicacion && filtros?.cordenadasFilter
  ? glampingsFiltrados.sort((a, b) => {
      const distanciaA = calcularDistancia(
        filtros.cordenadasFilter?.LATITUD ?? 0,  // Valor por defecto si es undefined
        filtros.cordenadasFilter?.LONGITUD ?? 0, // Valor por defecto si es undefined
        a.ubicacion.lat ?? 0, 
        a.ubicacion.lng ?? 0 
      );
      const distanciaB = calcularDistancia(
        filtros.cordenadasFilter?.LATITUD ?? 0,  // Valor por defecto si es undefined
        filtros.cordenadasFilter?.LONGITUD ?? 0, // Valor por defecto si es undefined
        b.ubicacion.lat ?? 0,
        b.ubicacion.lng ?? 0 
      );
      return distanciaA - distanciaB; // Orden ascendente por distancia (más cercano primero)
    })
  : glampingsFiltrados;

// Limitar la cantidad de glampings visibles según visibleCount
const glampingsMostrados = glampingsOrdenados.slice(0, visibleCount);


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
        glampingId={glamping._id}
        imagenes={glamping.imagenes}
        ciudad={glamping.ciudad_departamento}
        precio={glamping.precioEstandar}
        calificacion={glamping.calificacion || 0}
        favorito={false}
        nombreGlamping={glamping.nombreGlamping}
        tipoGlamping={glamping.tipoGlamping}
        ubicacion={{
          lat: glamping.ubicacion.lat ?? 0, // Valor por defecto si es null
          lng: glamping.ubicacion.lng ?? 0, // Valor por defecto si es null
        }}
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
