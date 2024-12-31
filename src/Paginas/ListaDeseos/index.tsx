import Favoritos from '../../Componentes/Favoritos/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function ListaDeseos() {
  return (
    <div className='ListaDeseos-contenedor'>
        <Favoritos />
        <MenuUsuariosInferior/>
    </div>
  );
}

export default ListaDeseos;
