import Header from '../../Componentes/Header';
import { useContext } from 'react';
import ContenedorTarjetas from '../../Componentes/ContenedorTarjetas/index';
import MenuIconos from '../../Componentes/MenuIconos/index'; 
import FiltrosContenedor from "../../Componentes/FiltrosContenedor/index";
import { ContextoApp } from "../../Contexto/index";
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import { Helmet } from "react-helmet-async";  // 👈 Importar Helmet
import './estilos.css';

function Inicio() {

  const contexto = useContext(ContextoApp);

  if (!contexto) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente con ProveedorContextoApp.");
  }
  
  const { mostrarFiltros } = contexto;

  return (
    <div className='contenedor-principal'>

      {/* 🔥 Meta etiquetas para SEO */}
      <Helmet>
        <title>Glamperos - Encuentra los Mejores Glampings</title>
        <meta name="description" content="Descubre y reserva los mejores glampings en todo el mundo. Vive una experiencia única en la naturaleza con Glamperos." />
        <meta property="og:title" content="Glamperos - La Mejor Experiencia de Glamping" />
        <meta property="og:description" content="Explora y reserva los mejores glampings del mundo con Glamperos." />
        <meta property="og:image" content="https://glamperos.com/imagen-portada.jpg" />
        <meta property="og:url" content="https://glamperos.com/" />
      </Helmet>

      <Header /> 
      <MenuIconos /> 
      {mostrarFiltros && <FiltrosContenedor />}
      <main>
        <ContenedorTarjetas /> 
      </main>
      <MenuUsuariosInferior/>

    </div>
  );
}

export default Inicio;
