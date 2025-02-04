import GestionReserva from '../../Componentes/GestionReserva/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function GestionarReserva() {
  return (
    <div className='GestionarReserva-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <GestionReserva />
    </div>
  );
}

export default GestionarReserva;