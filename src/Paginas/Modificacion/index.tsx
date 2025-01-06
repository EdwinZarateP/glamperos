import ModificarGlamping from '../../Componentes/ModificarGlamping/index'; 
import ModificarFotos from '../../Componentes/ModificarFotos/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function Modificacion() {
  return (
    <div className='Modificacion-contenedor'>
      <HeaderIcono descripcion="Glamperos" />
      <h1 className="Modificacion-titulo">Modificar datos del Glamping</h1>
        <ModificarGlamping/>
      <h1 className="Modificacion-titulo">Modificar Fotos</h1>
        <ModificarFotos/>
    </div>
  );
}

export default Modificacion;
