import DatosBancarios from '../../Componentes/DatosBancarios/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import MenuUsuariosInferior from '../../Componentes/MenuUsuariosInferior/index'; 
import "./estilos.css";

function GestionBancos() {
  return (
    <div className='GestionBancos-contenedor'>
      <HeaderIcono descripcion="Glamperos" />   
      <DatosBancarios/>    
      <MenuUsuariosInferior/>
    </div>
  );
}


export default GestionBancos;
