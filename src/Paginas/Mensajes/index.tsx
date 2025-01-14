import Conversaciones from '../../Componentes/Conversaciones/index'; 
import ListadoConversaciones from '../../Componentes/ListadoConversaciones/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function Mensajes() {
  return (
    <div className='Mensajes-contenedor'>
      <HeaderIcono descripcion="Glamperos" />   
      <ListadoConversaciones/>   
      <h1 className="Mensajes-titulo">parla</h1>
        <Conversaciones/>   
    </div>
  );
}

export default Mensajes;
