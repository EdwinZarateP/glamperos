import Header from '../../Componentes/Header'; // Importa el componente Header
import ContenedorTarjetas from '../../Componentes/ContenedorTarjetas/index'; // Importa ContenedorTarjetas
import MenuIconos from '../../Componentes/MenuIconos/index'; // Importa ContenedorTarjetas
import './estilos.css';

function Inicio() {

  return (
    <div className='contenedor-principal'>
      <Header /> 
      <MenuIconos /> 
      <main>
        <ContenedorTarjetas /> {/* Renderiza el contenedor de tarjetas */}
      </main>
    </div>
  );
}

export default Inicio;
