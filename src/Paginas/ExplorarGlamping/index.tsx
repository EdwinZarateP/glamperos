import Header from '../../Componentes/Header'; // Importa el componente Header
import ImagenesExploradas from '../../Componentes/ImgExploradas/index'; // Importa ImagenesExploradas
import EncabezadoExplorado from '../../Componentes/EncabezadoExplorado/index';
import ImgExploradasIndividual from '../../Componentes/ImgExploradasIndividual'; // Importa ImgExploradasIndividual
import NombreGlamping from '../../Componentes/NombreGlamping/index';
import DescripcionGlamping from '../../Componentes/DescripcionGlamping/index'
import FormularioFechas from '../../Componentes/FormularioFechas/index'

import './estilos.css';

function ExplorarGlamping() {
  const imagenes = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-33556265/original/934a550a-17ea-46c2-a25e-86751d5c6bf8.jpeg?im_w=1200',
    'https://rumbonaturaleza.com/wp-content/uploads/2023/08/glamping_megaGuia_furimufilms.jpg',
    'https://media.admagazine.com/photos/666a5173a0a09ff28cdff9e6/16:9/w_2560%2Cc_limit/GettyImages-1740469306.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/529183840.jpg?k=fe86b8b2731b17900d37b685f368a06cabcf8d7aa823c823b2e50df1f912d81a&o=&hp=1',
    'https://entrepinosglamping.com/wp-content/uploads/2022/11/22-tipi-sin-jacuzzi-glamping-1.jpeg'
  ];

    // Ejemplo de datos que pasarás como props al componente FormularioFechas
    const precioPorNoche = 41400;
    const tarifaServicio = 6955;
    const totalNoches = 1;
    const fechaLlegada = "7/11/2024";
    const fechaSalida = "8/11/2024";
    const huespedes = 1;

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
          <ImgExploradasIndividual imagenes={imagenes} /> {/* Agrega el carrusel de fotos aquí */}
        </div>
        {/* Solo visible en pantallas pequeñas */}
        <div className="nombre-glamping-container">
          <NombreGlamping nombreGlamping="Casa del árbol - Utica" />
        </div>
          <div className='contenedor-descripcion-glamping'>
            <div className='contenedor-descripcion-glamping-izq'>
              <DescripcionGlamping calificacionNumero ={5} calificacionEvaluaciones ={2} calificacionMasAlta="Su piscina fué lo mejor calificado" descripcion_glamping='Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable,Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable
        Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura.
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable
        Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable, Disfruta de una experiencia única en contacto con la naturaleza, combinando comodidad y aventura. 
        Explora las mejores vistas, servicios de primera calidad y una piscina que hará de tu estadía un recuerdo inolvidable'/>
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
          
      </main>
    </div>
  );
}

export default ExplorarGlamping;
