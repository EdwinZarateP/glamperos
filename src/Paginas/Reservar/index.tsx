import Reservacion from '../../Componentes/Reservacion/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function Reservar() {
  return (
    <div className='Reservar-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <Reservacion />
    </div>
  );
}

export default Reservar;
