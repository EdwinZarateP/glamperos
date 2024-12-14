import Header from '../../Componentes/Header';
import ContenedorTarjetas from '../../Componentes/ContenedorTarjetas/index';
import MenuIconos from '../../Componentes/MenuIconos/index'; 
import './estilos.css';

function Inicio() {

  return (
    <div className='contenedor-principal'>
      <Header /> 
      <MenuIconos /> 
      <main>
        <ContenedorTarjetas /> 
      </main>
    </div>
  );
}

export default Inicio;
