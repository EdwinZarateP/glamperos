import Registro from '../../Componentes/Registro/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function Registrarse() {
  return (
    <div className='Registrarse-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <Registro />
    </div>
  );
}

export default Registrarse;
