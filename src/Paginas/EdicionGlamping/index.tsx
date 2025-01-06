import EditarGlamping from '../../Componentes/EditarGlamping/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function EdicionGlamping() {
  return (
    <div className='EvaluacionFinal-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <EditarGlamping/>
    </div>
  );
}

export default EdicionGlamping;
