import React, { useEffect, useState, useCallback, useContext } from "react";
import { ContextoApp } from '../../Contexto/index'
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  glampingId: string;
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
    const almacenVariables = useContext(ContextoApp);
  
    if (!almacenVariables) {
      throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
    }
  
    const {
      filtros,
    } = almacenVariables;

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
          glampingId:  glamping._id,
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

    // Función para aplicar filtros dinámicos
    const aplicarFiltros = (glampings: GlampingData[]): GlampingData[] => {
      return glampings.filter((item) => {
        // Verificar si el filtro de precio está definido y si el precio está fuera del rango
        if (
          filtros.precioFiltrado &&
          (item.precioEstandar > filtros.precioFiltrado[0] || item.precioEstandar > filtros.precioFiltrado[1])
        ) {
          return false;
        }

        // Verificar si el filtro de ciudad está definido y si no coincide con la ciudad
        if (filtros.ciudadDepartamento && item.ciudad_departamento !== filtros.ciudadDepartamento) {
          return false;
        }

        return true;
      });
    };
  
    // Filtrar los datos según los filtros activos
    const glampingsFiltrados = aplicarFiltros(glampings).slice(0, visibleCount);

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
  
    if (glampingsFiltrados.length === 0) {
      return <div>No se encontraron glampings.</div>;
    }

  return (
    <div className="contenedor-tarjetas">
      
      {glampingsFiltrados.map((glamping, index) => (
        <Tarjeta
          key={index}
          glampingId={glamping.glampingId}
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