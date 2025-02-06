import ReservasPropietario from '../../Componentes/ReservasPropietario/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function ReservasPropiedades() {
  return (
    <div className='ReservasClientes-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <ReservasPropietario />
        <MenuUsuariosInferior/>
    </div>
  );
}

export default ReservasPropiedades;
