import Header from '../../Componentes/Header';
import { useContext } from 'react';
import ContenedorTarjetas from '../../Componentes/ContenedorTarjetas/index';
import MenuIconos from '../../Componentes/MenuIconos/index'; 
import FiltrosContenedor from "../../Componentes/FiltrosContenedor/index";
import { ContextoApp } from "../../Contexto/index";
import './estilos.css';

function Inicio() {

  const contexto = useContext(ContextoApp);

  if (!contexto) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente con ProveedorContextoApp.");
  }
   const { mostrarFiltros } = contexto;

  return (
    <div className='contenedor-principal'>
      <Header /> 
      <MenuIconos /> 
      {mostrarFiltros && <FiltrosContenedor />}
      <main>
        <ContenedorTarjetas /> 
      </main>
    </div>
  );
}

export default Inicio;
