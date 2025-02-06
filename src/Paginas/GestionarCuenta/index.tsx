import Cuenta from '../../Componentes/Cuenta/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function GestionarCuenta() {
  return (
    <div className='GestionarCuenta-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <Cuenta />
        <MenuUsuariosInferior/>
    </div>
  );
}

export default GestionarCuenta;
