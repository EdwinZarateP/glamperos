import ConversacionesMoviles from '../../Componentes/ConversacionesMoviles/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function MensajesIndividuales() {
  return (
    <div className='MensajesIndividuales-contenedor'>
      <HeaderIcono descripcion="Glamperos" />   
      <div className="ConversacionesMoviles"><ConversacionesMoviles/></div>      

    </div>
  );
}


export default MensajesIndividuales;
