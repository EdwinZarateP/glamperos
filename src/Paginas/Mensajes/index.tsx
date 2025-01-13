import MensajeriaInterna from '../../Componentes/MensajeriaInterna/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function Mensajes() {
  return (
    <div className='Mensajes-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <MensajeriaInterna/>
    </div>
  );
}

export default Mensajes;
