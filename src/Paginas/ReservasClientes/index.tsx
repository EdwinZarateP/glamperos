import ReservasCliente from '../../Componentes/ReservasCliente/index'; 
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import "./estilos.css";

function ReservasClientes() {
  return (
    <div className='ReservasClientes-contenedor'>
        <HeaderIcono descripcion="Glamperos" />
        <ReservasCliente />

    </div>
  );
}

export default ReservasClientes;
