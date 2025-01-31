import ReservasPropietario from '../../Componentes/ReservasPropietario/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function ReservasPropiedades() {
  return (
    <div className='ReservasPropiedades-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <ReservasPropietario idPropietario="675f27e0dfb2cf4c8c76b667" />

    </div>
  );
}

export default ReservasPropiedades;
