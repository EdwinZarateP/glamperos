import Conversaciones from '../../Componentes/Conversaciones/index'; 
import ListadoConversaciones from '../../Componentes/ListadoConversaciones/index'; 
import ListadoConversacionesMoviles from '../../Componentes/ListadoConversacionesMoviles/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function Mensajes() {
  return (
    <div className='Mensajes-contenedor'>
      <HeaderIcono descripcion="Glamperos" />   
      <div className="ListadoConversaciones"><ListadoConversaciones/></div>
      <div className="Conversaciones"><Conversaciones/></div>
      <div className="ListadoConversacionesMoviles"><ListadoConversacionesMoviles/></div>
      <MenuUsuariosInferior/>
    </div>
  );
}


export default Mensajes;
