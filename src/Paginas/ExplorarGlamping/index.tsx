import { useEffect, useContext } from 'react'; // Importa useContext
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
import ReservarBoton from '../../Componentes/BotonReservar/index'; // Importa ReservarBoton
import { ContextoApp } from '../../Contexto/index'; // Importa el contexto
import './estilos.css';

function ExplorarGlamping() {
  // Accede al contexto
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { setTarifaServicio, precioPorNoche } = almacenVariables;

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

  const imagenes = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-33556265/original/934a550a-17ea-46c2-a25e-86751d5c6bf8.jpeg?im_w=1200',
    'https://www.dosisverde.com/cmsd/wp-content/uploads/2022/05/casa_en_el_arbol_utica_n_0.jpeg',
    'https://media.admagazine.com/photos/666a5173a0a09ff28cdff9e6/16:9/w_2560%2Cc_limit/GettyImages-1740469306.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/529183840.jpg?k=fe86b8b2731b17900d37b685f368a06cabcf8d7aa823c823b2e50df1f912d81a&o=&hp=1',
    'https://entrepinosglamping.com/wp-content/uploads/2022/11/22-tipi-sin-jacuzzi-glamping-1.jpeg',
  ];

  const caracteristicas = [
    { icono: 'https://via.placeholder.com/24', descripcion: 'Secadora de pelo' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Champú' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Jabón corporal' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Agua caliente' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Gel de ducha' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Champú' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Jabón corporal' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Agua caliente' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Gel de ducha' },
  ];

  const huespedes = 1;

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
          <EncabezadoExplorado nombreGlamping="Casa del árbol - Utica" />
        </div>
        <div className="imagenes-exploradas-container">
          <ImagenesExploradas imagenes={imagenes} />
        </div>
        <div className="img-exploradas-individual-container">
          <ImgExploradasIndividual imagenes={imagenes} />
        </div>
        <div className="nombre-glamping-container">
          <NombreGlamping nombreGlamping="Casa del árbol - Utica" />
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
              <Calendario nombreGlamping="Casa del árbol - Utica" />
            </div>
          </div>
          <div className='contenedor-descripcion-glamping-der'>
            <FormularioFechas
              precioPorNoche={precioPorNoche || 0} // Usa el valor del contexto
              huespedes={huespedes}
            />
          </div>
        </div>
        <MapaGlampings glamping={{
          id: 1,
          nombre: 'Casa del Árbol - Utica',
          ubicacion: [5.1886, -74.48111],
        }} />
        <Comentarios comentarios={datosComentarios} />
        <ReservarBoton totalSinImpuestos={almacenVariables.totalSinImpuestos || 0} />
      </main>
    </div>
  );
}

export default ExplorarGlamping;
