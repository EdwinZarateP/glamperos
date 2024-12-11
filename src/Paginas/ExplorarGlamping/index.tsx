import { useEffect, useContext } from 'react';
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
import './estilos.css';

function ExplorarGlamping() {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { setTarifaServicio, precioPorNoche, ciudad_Elegida, nombreGlamping, imagenesSeleccionadas } = almacenVariables;

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

  // Validación para evitar errores si no hay imágenes seleccionadas
  if (!imagenesSeleccionadas || imagenesSeleccionadas.length === 0) {
    return <div>No hay imágenes disponibles para mostrar.</div>;
  }

  const caracteristicas = [
    { icono: 'https://via.placeholder.com/24', descripcion: 'Secadora de pelo' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Champú' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Jabón corporal' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Agua caliente' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Gel de ducha' },
  ];

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
      <div className="header-container">
        <Header />
      </div>
      <main>
        <div className="encabezado-explorado-container">
          <EncabezadoExplorado 
            nombreGlamping={`${nombreGlamping} - ${ciudad_Elegida.split(" - ")[0]}`} />            
        </div>
        <div className="imagenes-exploradas-container">
          <ImagenesExploradas imagenes={imagenesSeleccionadas} />
        </div>
        <div className="img-exploradas-individual-container">
          <ImgExploradasIndividual imagenes={imagenesSeleccionadas} />
        </div>
        <div className="nombre-glamping-container">
          <NombreGlamping nombreGlamping={`${nombreGlamping}  - ${ciudad_Elegida.split(" - ")[0]}`} />
          
        </div>
        <div className='contenedor-descripcion-glamping'>
          <div className='contenedor-descripcion-glamping-izq'>
            <DescripcionGlamping
              calificacionNumero={5}
              calificacionEvaluaciones={2}
              calificacionMasAlta="Su piscina fue lo mejor calificado"
              descripcion_glamping='Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
              Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable.'
            />

            <div className='contenedor-lo-que-ofrece'>
              <LoQueOfrece
                titulo="Lo que este lugar ofrece"
                caracteristicas={caracteristicas}
              />
            </div>

            <div className='contenedor-calendario'>
              <Calendario 
                nombreGlamping={`${nombreGlamping}  - ${ciudad_Elegida.split(" - ")[0]}`}
                FechasReservadas={fechasReservadas} 
              />
            </div>
          </div>
          <div className='contenedor-descripcion-glamping-der'>
            <FormularioFechas
              precioPorNoche={precioPorNoche || 0}
            />
          </div>
        </div>
        <ManejoErrores>
        <MapaGlampings lat={5.1865} lng={-74.48111} />
        </ManejoErrores>
        <Comentarios comentarios={datosComentarios} />
        <ReservarBoton totalSinImpuestos={almacenVariables.totalSinImpuestos || 0} />
      </main>
    </div>
  );
}

export default ExplorarGlamping;
