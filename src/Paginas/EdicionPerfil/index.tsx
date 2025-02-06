import EditarPerfil from '../../Componentes/EditarPerfil/index';
import HeaderIcono from '../../Componentes/HeaderIcono/index';  
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function EdicionPerfil() {
  return (
    <div className='EdicionPerfil-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <EditarPerfil/>
        <MenuUsuariosInferior/>
    </div>
  );
}

export default EdicionPerfil;
