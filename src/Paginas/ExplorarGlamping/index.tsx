import Header from '../../Componentes/Header'; // Importa el componente Header
import ImagenesExploradas from '../../Componentes/ImgExploradas/index'; // Importa ImagenesExploradas
import EncabezadoExplorado from '../../Componentes/EncabezadoExplorado/index';
import ImgExploradasIndividual from '../../Componentes/ImgExploradasIndividual'; // Importa ImgExploradasIndividual
import NombreGlamping from '../../Componentes/NombreGlamping/index';
import DescripcionGlamping from '../../Componentes/DescripcionGlamping/index'
import FormularioFechas from '../../Componentes/FormularioFechas/index'
import LoQueOfrece from '../../Componentes/LoQueOfrece'; // Importa el nuevo componente
import Calendario from '../../Componentes/Calendario/index'
import MapaGlampings from '../../Componentes/Mapa/index'


import './estilos.css';

function ExplorarGlamping() {
  const imagenes = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-33556265/original/934a550a-17ea-46c2-a25e-86751d5c6bf8.jpeg?im_w=1200',
    'https://rumbonaturaleza.com/wp-content/uploads/2023/08/glamping_megaGuia_furimufilms.jpg',
    'https://media.admagazine.com/photos/666a5173a0a09ff28cdff9e6/16:9/w_2560%2Cc_limit/GettyImages-1740469306.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/529183840.jpg?k=fe86b8b2731b17900d37b685f368a06cabcf8d7aa823c823b2e50df1f912d81a&o=&hp=1',
    'https://entrepinosglamping.com/wp-content/uploads/2022/11/22-tipi-sin-jacuzzi-glamping-1.jpeg'
  ];

  const caracteristicas = [
    { icono: 'https://miscelandia.vtexassets.com/arquivos/ids/236292-800-auto?v=637776269051930000&width=800&height=auto&aspect=true', descripcion: 'Secadora de pelo' },
    { icono: 'https://miscelandia.vtexassets.com/arquivos/ids/236292-800-auto?v=637776269051930000&width=800&height=auto&aspect=true', descripcion: 'Secadora de pelo' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Champú' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Jabón corporal' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Agua caliente' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Gel de ducha' },
    { icono: 'https://miscelandia.vtexassets.com/arquivos/ids/236292-800-auto?v=637776269051930000&width=800&height=auto&aspect=true', descripcion: 'Secadora de pelo' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Productos de limpieza' },
    { icono: 'https://miscelandia.vtexassets.com/arquivos/ids/236292-800-auto?v=637776269051930000&width=800&height=auto&aspect=true', descripcion: 'Secadora de pelo' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Champú' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Jabón corporal' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Agua caliente' },
    { icono: 'https://via.placeholder.com/24', descripcion: 'Gel de ducha' },
  ];

  const precioPorNoche = 41400;
  const tarifaServicio = 6955;
  const totalNoches = 1;
  const fechaLlegada = "7/11/2024";
  const fechaSalida = "8/11/2024";
  const huespedes = 1;

  const glampingsData = [
    {
      id: 1,
      nombre: 'Casa del Árbol - Utica',
      region: 'Cundinamarca',
      ubicacion: [5.1543, -74.5234] as [number, number],
      puntosTuristicosCercanos: ['Río Magdalena', 'Cascadas de Tobia'],
    },
    {
      id: 3,
      nombre: 'Bubble Glamping',
      region: 'Boyacá',
      ubicacion: [5.5353, -73.3677] as [number, number],
      puntosTuristicosCercanos: ['Lago de Tota', 'Villa de Leyva'],
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
            
            {/* Nuevo componente LoQueOfrece */}
            <div className='contenedor-lo-que-ofrece'>
              <LoQueOfrece 
                titulo="Lo que este lugar ofrece"
                caracteristicas={caracteristicas}
              />
            </div>

            {/* Nuevo componente Calendario */}
            <div className='contenedor-calendario'>
              <Calendario nombreGlamping="Casa del árbol - Utica" />
            </div>
            
          </div>
          <div className='contenedor-descripcion-glamping-der'>
            <FormularioFechas
              precioPorNoche={precioPorNoche}
              tarifaServicio={tarifaServicio}
              totalNoches={totalNoches}
              fechaLlegada={fechaLlegada}
              fechaSalida={fechaSalida}
              huespedes={huespedes}
            />  
          </div>
          
        </div>
        <MapaGlampings glampings={glampingsData} />
      </main>
    </div>
  );
}

export default ExplorarGlamping;
