import CentroAyuda from '../../Componentes/CentroAyuda/index';
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import './estilos.css';

function Ayuda() {
  
    return (
      <div className='Ayuda-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <CentroAyuda /> 
      </div>
    );
  }
  
  export default Ayuda;
  