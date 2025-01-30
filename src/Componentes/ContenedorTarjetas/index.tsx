import { useEffect, useState, useCallback, useContext } from "react";
import { ContextoApp } from '../../Contexto/index';
import Tarjeta from "../../Componentes/Tarjeta/index";
import { precioConRecargo } from '../../Funciones/precioConRecargo'; 
import meme from '../../Imagenes/meme.jpg'
import Cookies from 'js-cookie';
import "./estilos.css"; 

interface GlampingData {
  _id: string; 
  habilitado: boolean;
  nombreGlamping: string;
  tipoGlamping: string;
  ciudad_departamento: string;
  precioEstandar: number;
  descuento: number;
  calificacion: number | null;
  imagenes: string[];
  ubicacion: {
    lat: number | null;
    lng: number | null;
  };
  Acepta_Mascotas: boolean;
  fechasReservadas: string[];
  amenidadesGlobal:string[];
  precioEstandarAdicional: number;
  Cantidad_Huespedes:number;
  Cantidad_Huespedes_Adicional:number;
  favorito?: boolean;
}

const ContenedorTarjetas: React.FC = () => {

  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { activarFiltros, filtros, activarFiltrosUbicacion,activarFiltrosUbicacionBogota,activarFiltrosUbicacionMedellin,
    activarFiltrosUbicacionCali, activarFiltrosFechas, activarFiltrosHuespedes,huespedesConfirmado,
    fechaInicio,fechaFin, activarFiltrosDomo, activarFiltrosTienda, activarFiltrosCabaña, activarFiltrosCasaArbol,
    activarFiltrosRemolques, activarFiltrosChoza, activarFiltrosMascotas, activarFiltrosClimaCalido,
    activarFiltrosClimaFrio, activarFiltrosPlaya, activarFiltrosNaturaleza, activarFiltrosRio,
    activarFiltrosCascada, activarFiltrosMontana, activarFiltrosCaminata, activarFiltrosDesierto,
    activarFiltrosJacuzzi } = almacenVariables;

  const [glampings, setGlampings] = useState<GlampingData[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(18);
  const [page, setPage] = useState(1);
  const idUsuarioCookie = Cookies.get('idUsuario'); 
  
  const esFavorito = (glampingId: string, favoritos: string[] = []): boolean => {
    return Array.isArray(favoritos) && favoritos.includes(glampingId);
  };  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Obtener favoritos desde la API
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (idUsuarioCookie) {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/favoritos/${idUsuarioCookie}`);
          const data = await response.json();
          setFavoritos(data); 
        } catch (error) {
          console.error("Error al obtener los favoritos:", error);
        }
      }
    };
    fetchFavoritos();
  }, [idUsuarioCookie]);

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
        habilitado:glamping.habilitado || false,
        nombreGlamping: glamping.nombreGlamping || "Nombre no disponible",
        tipoGlamping: glamping.tipoGlamping || "Choza",
        ciudad_departamento: glamping.ciudad_departamento || "Ciudad no disponible",
        precioEstandar: glamping.precioEstandar || 0,
        descuento: glamping.descuento || 0,
        calificacion: glamping.calificacion || null, 
        imagenes: glamping.imagenes || [],
        ubicacion: {
          lat: glamping.ubicacion?.lat || null,
          lng: glamping.ubicacion?.lng || null,
        },
        Acepta_Mascotas: glamping.Acepta_Mascotas || false,
        fechasReservadas: glamping.fechasReservadas || [],
        amenidadesGlobal: glamping.amenidadesGlobal || [],
        precioEstandarAdicional:glamping.precioEstandarAdicional || 0,
        Cantidad_Huespedes:glamping.Cantidad_Huespedes || 1,
        Cantidad_Huespedes_Adicional:glamping.Cantidad_Huespedes_Adicional || 0,        

      }));
  
      setGlampings((prevData) => {
        // Filtrar para evitar elementos duplicados antes de agregar
        const newData = parsedData.filter(
          (newGlamping) => !prevData.some((glamping) => glamping._id === newGlamping._id)
        );
        return [...prevData, ...newData];
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


  
  const noTieneFechasReservadasEnRango = (fechasReservadas: string[]) => {
    if (!fechaInicio || !fechaFin) {
      return true; // Si las fechas no están definidas, no aplicar filtro
    }  
  
    // Convertir las fechas de inicio y fin a objetos Date
    let inicio = new Date(fechaInicio);
    let fin = new Date(fechaFin);
    
    // Restar un día a la fecha de inicio
    inicio.setDate(inicio.getDate() - 1);
  
    // Restar un día a la fecha de fin
    fin.setDate(fin.getDate() - 1);
  
    // Comprobar si alguna de las fechas reservadas está dentro del rango
    return !fechasReservadas.some((fecha) => {
      const fechaReservada = new Date(fecha);
      
      // Evaluar si la fecha reservada está dentro del rango, incluyendo los límites
      return fechaReservada >= inicio && fechaReservada <= fin;
    });
  };  
  
  
  
  // Filtrar los glampings según los criterios del diccionario de filtros
  const glampingsFiltrados = glampings.filter((glamping) => {
    
    const filtraHabilitados = 
      glamping.habilitado === true;

    const cumplePrecio =
      !activarFiltros ||
      (filtros?.precioFilter?.[0] !== undefined &&
        filtros?.precioFilter?.[1] !== undefined &&
        precioConRecargo(glamping.precioEstandar) >= filtros.precioFilter[0] &&
        precioConRecargo(glamping.precioEstandar) <= filtros.precioFilter[1]);

    const cumpleCoordenadas =
      !activarFiltrosUbicacion ||
      (filtros?.cordenadasFilter?.LATITUD !== undefined &&
        filtros?.cordenadasFilter?.LONGITUD !== undefined &&
        calcularDistancia(
          filtros.cordenadasFilter?.LATITUD,
          filtros.cordenadasFilter?.LONGITUD,
          glamping.ubicacion.lat ?? 0,
          glamping.ubicacion.lng ?? 0
        ) <= 150);

    const cumpleCoordenadasBogota =
      !activarFiltrosUbicacionBogota ||
      calcularDistancia(
        4.316107698, // Coordenada fija para Bogotá
        -74.181072702, // Coordenada fija para Bogotá
        glamping.ubicacion.lat ?? 0, // Latitud del glamping (puede ser null o undefined)
        glamping.ubicacion.lng ?? 0  // Longitud del glamping (puede ser null o undefined)
      ) <= 150; // Verifica si está dentro de los 150 metros
  
    const cumpleCoordenadasMedellin =
      !activarFiltrosUbicacionMedellin ||
      calcularDistancia(
        6.257590259, // Coordenada fija para Bogotá
        -75.611031065, // Coordenada fija para Bogotá
        glamping.ubicacion.lat ?? 0, // Latitud del glamping (puede ser null o undefined)
        glamping.ubicacion.lng ?? 0  // Longitud del glamping (puede ser null o undefined)
      ) <= 150; // Verifica si está dentro de los 150 metros

      const cumpleCoordenadasCali =
      !activarFiltrosUbicacionCali ||
      calcularDistancia(
        3.399043723, // Coordenada fija para Bogotá
        -76.576492589, // Coordenada fija para Bogotá
        glamping.ubicacion.lat ?? 0, // Latitud del glamping (puede ser null o undefined)
        glamping.ubicacion.lng ?? 0  // Longitud del glamping (puede ser null o undefined)
      ) <= 150; // Verifica si está dentro de los 150 metros

  
    // Filtro de fechas reservadas
    const cumpleFechasReservadas =
      !activarFiltrosFechas || noTieneFechasReservadasEnRango(glamping.fechasReservadas);
      
    // Filtro de Huespedes
    const cumpleHuespedes = 
    !activarFiltrosHuespedes || (huespedesConfirmado && (glamping.Cantidad_Huespedes+glamping.Cantidad_Huespedes_Adicional) >= huespedesConfirmado);
        
    const filtraDomo =
    !activarFiltrosDomo || glamping.tipoGlamping === "Domo";

    const filtraTienda =
    !activarFiltrosTienda || glamping.tipoGlamping === "Tienda";
    
    const filtraCabaña =
    !activarFiltrosCabaña || glamping.tipoGlamping === "Cabaña";
   
    const filtraCasaArbol =
    !activarFiltrosCasaArbol  || glamping.tipoGlamping === "Casa del arbol";
    
    const filtraRemolque =
    !activarFiltrosRemolques  || glamping.tipoGlamping === "Remolque";
    
    const filtraChoza =
    !activarFiltrosChoza  || glamping.tipoGlamping === "Choza";
    
    const filtraMascotas =
    !activarFiltrosMascotas  || glamping.Acepta_Mascotas === true;

    const filtraClimaCalido =
    !activarFiltrosClimaCalido || glamping.amenidadesGlobal.includes("Clima Calido");

    const filtraClimaFrio =
    !activarFiltrosClimaFrio || glamping.amenidadesGlobal.includes("Clima Frio");

    const filtraPlaya =
    !activarFiltrosPlaya || glamping.amenidadesGlobal.includes("Playa");

    const filtraNaturaleza=
    !activarFiltrosNaturaleza || glamping.amenidadesGlobal.includes("Naturaleza");
    
    const filtraRio=
    !activarFiltrosRio || glamping.amenidadesGlobal.includes("Rio");
    
    const filtraCascada=
    !activarFiltrosCascada || glamping.amenidadesGlobal.includes("Cascada");

    const filtraMontana=
    !activarFiltrosMontana || glamping.amenidadesGlobal.includes("En la montaña");

    const filtraCaminata=
    !activarFiltrosCaminata || glamping.amenidadesGlobal.includes("Caminata");

    const filtraDesierto=
    !activarFiltrosDesierto || glamping.amenidadesGlobal.includes("Desierto");

    const filtraJacuzzi=
    !activarFiltrosJacuzzi || glamping.amenidadesGlobal.includes("Jacuzzi");

    return filtraHabilitados && cumplePrecio && cumpleCoordenadas && cumpleCoordenadasBogota &&cumpleCoordenadasMedellin
    && cumpleCoordenadasCali && cumpleFechasReservadas && cumpleHuespedes && filtraDomo
    && filtraTienda && filtraCabaña && filtraCasaArbol && filtraRemolque && filtraChoza
    && filtraMascotas && filtraClimaCalido && filtraClimaFrio && filtraPlaya 
    && filtraNaturaleza && filtraRio && filtraCascada && filtraMontana && filtraCaminata
    && filtraDesierto && filtraJacuzzi; 
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
    return (
      <div className="no-glampings-container">
      <div className="no-glampings-message">
        <img src={meme} alt="Meme divertido" className="meme-imagen" />
        <h2>Lo sentimos, no hemos encontrado glamping con tus filtros</h2>
        <p>Pero no te preocupes, ¡estamos trabajando para agregar más opciones!</p>
      </div>
    </div>
    );
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
        descuento={glamping.descuento}
        calificacion={glamping.calificacion || 4.5}
        favorito={esFavorito(glamping._id, favoritos)}
        nombreGlamping={glamping.nombreGlamping}
        tipoGlamping={glamping.tipoGlamping}
        ubicacion={{
          lat: glamping.ubicacion.lat ?? 0, 
          lng: glamping.ubicacion.lng ?? 0, 
        }}
        onFavoritoChange={(nuevoEstado) =>
          console.log(`Favorito en tarjeta ${index + 1}:`, nuevoEstado)
        }
        Acepta_Mascotas={glamping.Acepta_Mascotas}
        fechasReservadas={glamping.fechasReservadas}
        Cantidad_Huespedes={glamping.Cantidad_Huespedes}
        precioEstandarAdicional={glamping.precioEstandarAdicional}
        Cantidad_Huespedes_Adicional={glamping.Cantidad_Huespedes_Adicional}
      />      
      ))}
    </div>
  );
};

export default ContenedorTarjetas;
