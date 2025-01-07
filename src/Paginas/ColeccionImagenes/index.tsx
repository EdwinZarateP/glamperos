import FotosCollage from '../../Componentes/FotosCollage/index';
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import './estilos.css';

function ColeccionImagenes() {
  
    return (
      <div className='ColeccionImagenes-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <FotosCollage /> 
      </div>
    );
  }
  
  export default ColeccionImagenes;
  