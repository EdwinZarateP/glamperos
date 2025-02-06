import EditarGlamping from '../../Componentes/EditarGlamping/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function EdicionGlamping() {
  return (
    <div className='EdicionGlamping-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <EditarGlamping/>
        <MenuUsuariosInferior/>
    </div>
  );
}

export default EdicionGlamping;
