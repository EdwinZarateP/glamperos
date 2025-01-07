import EditarPerfil from '../../Componentes/EditarPerfil/index';
import HeaderIcono from '../../Componentes/HeaderIcono/index';  
import "./estilos.css";

function EdicionPerfil() {
  return (
    <div className='EdicionPerfil-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <EditarPerfil/>
    </div>
  );
}

export default EdicionPerfil;
