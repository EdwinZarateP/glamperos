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
import { obtenerGlampingPorId } from "../../Funciones/obtenerGlamping"; //para importar la funcion que obtiene de la api la info glamping
import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json";
import { useParams } from 'react-router-dom';
import './estilos.css';

interface Glamping {
  nombreGlamping: string;
  ciudad_departamento: string;
  tipoGlamping: string;
  Acepta_Mascotas: boolean;
  precioEstandar: number;
  descuento: number;
  Cantidad_Huespedes: number;
  descripcionGlamping: string;
  imagenes: string[];
  ubicacion: Ubicacion | null;
  amenidadesGlobal: string[];
}

//para ubicacion
interface Ubicacion {
  lat: number;
  lng: number;
}


function ExplorarGlamping() {
  const { glampingId } = useParams<{ glampingId: string }>();
  const almacenVariables = useContext(ContextoApp);
  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { setTarifaServicio, totalSinImpuestos } = almacenVariables;

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
          precioEstandar: datos.precioEstandar || 0,
          descuento: Number(datos.descuento) || 0,
          Cantidad_Huespedes: datos.Cantidad_Huespedes || 0,
          descripcionGlamping: datos.descripcionGlamping || "No disponible",
          imagenes: datos.imagenes || [],
          ubicacion: datos.ubicacion
          ? { lat: datos.ubicacion.lat, lng: datos.ubicacion.lng }
          : null,
          amenidadesGlobal: datos.amenidadesGlobal || [],
        });
      }
    };

    consultarGlamping();
  }, [glampingId]);

  const fechasReservadas = [
    new Date(2024, 10, 20),
    new Date(2024, 10, 28),
    new Date(2024, 10, 29),
  ];

  const datosComentarios = [
    {
      nombre: 'Luisa Fernanda',
      calificacionNumero: 5,
      comentario: 'Fue una experiencia que repetiría, ideal para una escapada de fin de semana.',
      fotoPerfil: 'https://via.placeholder.com/48',
    },
    {
      nombre: 'Carlos Pérez',
      calificacionNumero: 4.3,
      comentario: 'Muy buena experiencia, aunque podrían mejorar en los servicios ofrecidos.',
    },
    {
      nombre: 'Ana',
      calificacionNumero: 3.8,
      comentario: 'La estadía fue buena, pero el lugar no cumplió todas mis expectativas.',
    },
    {
      nombre: 'Sofía López',
      calificacionNumero: 4.8,
      comentario: 'El lugar es hermoso, y la atención fue excepcional. Definitivamente regresaré.',
      fotoPerfil: 'https://via.placeholder.com/48',
    },
  ];

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
                <ImagenesExploradas imagenes={informacionGlamping?.imagenes} />
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
            </div>
            <div className="nombre-glamping-container">
              <NombreGlamping nombreGlamping={`${informacionGlamping?.nombreGlamping}  - ${informacionGlamping?.ciudad_departamento?.split(" - ")[0] || ''}`} />
            </div>
            <div className='contenedor-descripcion-glamping'>
              <div className='contenedor-descripcion-glamping-izq'>
                <DescripcionGlamping
                  calificacionNumero={5}
                  calificacionEvaluaciones={2}
                  calificacionMasAlta="Su piscina fue lo mejor calificado"
                  descripcion_glamping={informacionGlamping?.descripcionGlamping}  
                />
  
                <div className='contenedor-lo-que-ofrece'>
                  <LoQueOfrece amenidades={informacionGlamping?.amenidadesGlobal} />
                </div>
  
                <div className='contenedor-calendario'>
                  <Calendario 
                    nombreGlamping={`${informacionGlamping?.nombreGlamping}  - ${informacionGlamping?.ciudad_departamento?.split(" - ")[0] || ''}`}
                    FechasReservadas={fechasReservadas} 
                  />
                </div>
              </div>
              <div className='contenedor-descripcion-glamping-der'>
                <FormularioFechas
                  precioPorNoche={informacionGlamping?.precioEstandar || 0}
                />
              </div>
            </div>
  
            <ManejoErrores>        
              <MapaGlampings lat={informacionGlamping?.ubicacion?.lat ?? 0 }  lng={informacionGlamping?.ubicacion?.lng ?? 0} />          
            </ManejoErrores>
            <Comentarios comentarios={datosComentarios} />
            <ReservarBoton totalSinImpuestos={totalSinImpuestos || 0} />
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
