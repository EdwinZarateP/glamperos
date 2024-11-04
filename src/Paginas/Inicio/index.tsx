import Header from '../../Componentes/Header'; // Importa el componente Header
import ContenedorTarjetas from '../../Componentes/ContenedorTarjetas'; // Importa ContenedorTarjetas
import './estilos.css';

function Inicio() {
  return (
    <div className='contenedor-principal'>
      <Header /> {/* Renderiza el encabezado al inicio */}
      <main>
        <ContenedorTarjetas /> {/* Renderiza el contenedor de tarjetas */}
      </main>
    </div>
  );
}

export default Inicio;
