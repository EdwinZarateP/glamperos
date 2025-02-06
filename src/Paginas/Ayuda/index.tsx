import CentroAyuda from '../../Componentes/CentroAyuda/index';
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import './estilos.css';

function Ayuda() {
  
    return (
      <div className='Ayuda-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <CentroAyuda /> 
        <MenuUsuariosInferior/>
      </div>
    );
  }
  
  export default Ayuda;
  