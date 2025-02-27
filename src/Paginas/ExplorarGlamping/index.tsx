import { useEffect, useContext, useState } from 'react';
import Header from '../../Componentes/Header';
import ImagenesExploradas from '../../Componentes/ImgExploradas/index';
import EncabezadoExplorado from '../../Componentes/EncabezadoExplorado/index';
import ImgExploradasIndividual from '../../Componentes/ImgExploradasIndividual';
import NombreGlamping from '../../Componentes/NombreGlamping/index';
import DescripcionGlamping from '../../Componentes/DescripcionGlamping/index';
import FormularioFechas from '../../Componentes/FormularioFechas/index';
import LoQueOfrece from '../../Componentes/LoQueOfrece';
import Calendario from '../../Componentes/Calendario/index';
import MapaGlampings from '../../Componentes/Mapa/index';
import Comentarios from '../../Componentes/Comentarios/index';
import ReservarBoton from '../../Componentes/BotonReservar/index';
import { ContextoApp } from '../../Contexto/index';
import ManejoErrores from '../../Funciones/ManejoErrores';
import { obtenerGlampingPorId } from "../../Funciones/obtenerGlamping";
import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VerVideo from "../../Componentes/Video/index";
import PerfilUsuario from "../../Componentes/PerfilUsuario/index";
import { MdOndemandVideo } from "react-icons/md"; // Importación de iconos
import './estilos.css';

interface Glamping {
  nombreGlamping: string;
  ciudad_departamento: string;
  tipoGlamping: string;
  Acepta_Mascotas: boolean;
  fechasReservadas?: string[];
  precioEstandar: number;
  precioEstandarAdicional: number;
  descuento: number;
  Cantidad_Huespedes: number;
  Cantidad_Huespedes_Adicional: number;
  descripcionGlamping: string;
  imagenes: string[];
  ubicacion: Ubicacion | null;
  amenidadesGlobal: string[];
  video_youtube: string;
  propietario_id: string;
  diasCancelacion: number;
}

//para ubicacion
interface Ubicacion {
  lat: number;
  lng: number;
}


function ExplorarGlamping() {

  const navigate = useNavigate();
  
  const irAInicio = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const { glampingId } = useParams<{ glampingId: string }>();
  const almacenVariables = useContext(ContextoApp);
  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }
  const { setTarifaServicio, setFechasSeparadas, setVerVideo } = almacenVariables;

  // Establece la tarifa de servicio predeterminada
  useEffect(() => {
    setTarifaServicio(1.12); // Tarifa predeterminada
  }, [setTarifaServicio]);

  // Scroll hacia la parte superior al cargar el componente
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

//vamos a extraer la info del glamping

  const [informacionGlamping, setInformacionGlamping] = useState<Glamping | null>(null);

  useEffect(() => {
    const consultarGlamping = async () => {
      if (!glampingId) {
        console.error("No se proporcionó un ID de glamping.");
        return;
      }
  
      const datos = await obtenerGlampingPorId(glampingId);
  
      if (datos) {
        setInformacionGlamping({
          nombreGlamping: datos.nombreGlamping || "No disponible",
          ciudad_departamento: datos.ciudad_departamento || "No disponible",
          tipoGlamping: datos.tipoGlamping || "No disponible",
          Acepta_Mascotas: datos.Acepta_Mascotas ?? false,
          fechasReservadas: datos.fechasReservadas || [],
          precioEstandar: datos.precioEstandar || 0,
          precioEstandarAdicional: datos.precioEstandarAdicional || 0,
          descuento: Number(datos.descuento) || 0,
          Cantidad_Huespedes: datos.Cantidad_Huespedes || 0,
          Cantidad_Huespedes_Adicional: datos.Cantidad_Huespedes_Adicional || 0,          
          descripcionGlamping: datos.descripcionGlamping || "No disponible",
          imagenes: datos.imagenes || [],
          ubicacion: datos.ubicacion
            ? { lat: datos.ubicacion.lat, lng: datos.ubicacion.lng }
            : null,
          amenidadesGlobal: datos.amenidadesGlobal || [],
          video_youtube: datos.video_youtube || "sin video", 
          propietario_id: datos.propietario_id || "No disponible", 
          diasCancelacion : datos.diasCancelacion || 3,         
        });
  
        // Convierte las fechas de string a Date y asegura que no haya problemas de husos horarios
        if (datos.fechasReservadas) {
          const fechasComoDate = datos.fechasReservadas.map((fechaString: string) => {
            const [year, month, day] = fechaString.split('-').map(Number);
            return new Date(year, month - 1, day); // Crear Date con mes ajustado (0-indexado)
          });
          setFechasSeparadas(fechasComoDate); // Guardar en el contexto
        }
      }
    };
  
    consultarGlamping();
  }, [glampingId, setFechasSeparadas]);
  
  // Definir el estado para calificaciones
  const [calificacionEvaluaciones, setCalificacionEvaluaciones] = useState<number | null>(null);
  const [calificacionPromedio, setCalificacionPromedio] = useState<number>(4.5); // Valor predeterminado

  useEffect(() => {
    if (glampingId) {
      const obtenerCalificaciones = async () => {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/evaluaciones/glamping/${glampingId}/promedio`);                                        
          const data = await response.json();

          if (data) {
            setCalificacionPromedio(data.calificacion_promedio || 4.5);  // Actualización con el valor obtenido
            setCalificacionEvaluaciones(data.calificacionEvaluaciones|| 1);  // Actualización con el valor obtenido
          }
        } catch (error) {
          console.error("Error al obtener las calificaciones:", error);
        }
      };

      obtenerCalificaciones();
    }
  }, [glampingId]);


  useEffect(() => {
    const manejarNavegacion = (_: PopStateEvent) => {
      irAInicio();
    };
  
    window.addEventListener("popstate", manejarNavegacion);
  
    return () => {
      window.removeEventListener("popstate", manejarNavegacion);
    };
  }, [navigate]);  

  const handleVideoClick = () => {
    // Activar el estado setVerVideo a true
    setVerVideo(true);
  };

  return (
    <div className='contenedor-principal-exploracion'>
      {informacionGlamping ? (
        <>
          <div className="header-container">
            <Header />
          </div>
          <main>
            <div className="encabezado-explorado-container">
              <EncabezadoExplorado 
                nombreGlamping={`${informacionGlamping?.nombreGlamping} - ${informacionGlamping?.ciudad_departamento?.split(" - ")[0] || ''}`} 
              />            
            </div>
            <div className="imagenes-exploradas-container">
              {informacionGlamping?.imagenes && informacionGlamping?.imagenes.length > 0 ? (
                <ImagenesExploradas 
                  imagenes={informacionGlamping?.imagenes}
                  video_youtube={informacionGlamping?.video_youtube}
                  Acepta_Mascotas={informacionGlamping?.Acepta_Mascotas}  />
              ) : (
                <div className="lottie-container">
                  <Lottie 
                    animationData={animationData} 
                    style={{ height: 200, width: '100%', margin: 'auto' }} 
                  />
                </div>
              )}
            </div>
            <div className="img-exploradas-individual-container">
              {informacionGlamping?.imagenes && informacionGlamping?.imagenes.length > 0 ? (
                <ImgExploradasIndividual imagenes={informacionGlamping?.imagenes} />
              ) : null}

              {informacionGlamping && informacionGlamping.video_youtube && informacionGlamping.video_youtube.trim() !== "sin video" && (
              <button
                className="ImgExploradas-iconoVideo-peque"
                onClick={handleVideoClick}
              >
                <MdOndemandVideo title="Mostrar Video" />
                Video
              </button>
               )}
              <VerVideo urlVideo={informacionGlamping.video_youtube} />

            </div>
            <div className="nombre-glamping-container">
              <NombreGlamping nombreGlamping={`${informacionGlamping?.nombreGlamping}  - ${informacionGlamping?.ciudad_departamento?.split(" - ")[0] || ''}`} />              
            </div>

            <div className='contenedor-descripcion-glamping'>
              <div className='contenedor-descripcion-glamping-izq'>
                <DescripcionGlamping
                  calificacionNumero={calificacionPromedio || 4.5}
                  calificacionEvaluaciones={calificacionEvaluaciones || 1}
                  calificacionMasAlta="Su piscina fue lo mejor calificado"
                  descripcion_glamping={informacionGlamping?.descripcionGlamping}  
                />
  
                <div className='contenedor-lo-que-ofrece'>
                  <LoQueOfrece amenidades={informacionGlamping?.amenidadesGlobal} />
                </div>
  
                <div className='contenedor-calendario'>
                  <Calendario 
                    nombreGlamping={`${informacionGlamping?.nombreGlamping}  - ${informacionGlamping?.ciudad_departamento?.split(" - ")[0] || ''}`}
                  />
                </div>
              </div>
              <div className='contenedor-descripcion-glamping-der'>
                <FormularioFechas
                  precioPorNoche={informacionGlamping?.precioEstandar || 0}
                  precioPersonaAdicional={informacionGlamping?.precioEstandarAdicional || 0}
                  descuento={informacionGlamping?.descuento || 0}
                  admiteMascotas={informacionGlamping?.Acepta_Mascotas || false}
                  Cantidad_Huespedes={informacionGlamping?.Cantidad_Huespedes || 10}
                  Cantidad_Huespedes_Adicional={informacionGlamping?.Cantidad_Huespedes_Adicional || 0}                  
                />
              </div>
            </div>
  
            <Comentarios glampingId={glampingId || ''} />
            <ManejoErrores>        
              <MapaGlampings lat={informacionGlamping?.ubicacion?.lat ?? 0 }  lng={informacionGlamping?.ubicacion?.lng ?? 0} />          
            </ManejoErrores>
            {informacionGlamping && informacionGlamping.propietario_id ? (
            <PerfilUsuario propietario_id={informacionGlamping.propietario_id} />
                ) : (
              <p>El propietario no está disponible</p>
                )}
            <ReservarBoton 
              precioPorNoche={informacionGlamping?.precioEstandar || 0}
              descuento={informacionGlamping?.descuento || 0}
              precioPersonaAdicional={informacionGlamping?.precioEstandarAdicional || 0}
              Cantidad_Huespedes={informacionGlamping?.Cantidad_Huespedes || 10}
              admiteMascotas={informacionGlamping?.Acepta_Mascotas || false}                  
              Cantidad_Huespedes_Adicional={informacionGlamping?.Cantidad_Huespedes_Adicional || 0}                  
              />
          </main>
        </>
      ) : (
        <div className="lottie-cargando">
          <Lottie 
            animationData={animationData} 
            style={{ height: 200, width: 200, margin: 'auto' }} 
          />
        </div>
      )}
    </div>
  );
  
}

export default ExplorarGlamping;
