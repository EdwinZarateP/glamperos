import { ContextoApp } from '../../Contexto/index';
import { useContext } from "react";
import FiltroPrecios from "./precio"; 
import FiltrosTipo from './tipo'; 
// import FiltrosAmenidades from './amenidades';
import "./estilos.css";

const FiltrosContenedor = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const {  setMostrarFiltros, setActivarFiltros, tipoGlamping,setPrecioFiltrado, setTipoGlamping, precioFiltrado, setFiltros,filtros} = almacenVariables;

    
  const aplicarFiltros = () => {
    // Actualiza el estado global de filtros con el valor de precioFiltrado
    setFiltros((prevFiltros) => ({
      ...prevFiltros, // Mantiene las demás propiedades
      precioFilter: precioFiltrado, // Actualiza solo el precioFilter con el valor actual
      tipoFilter: tipoGlamping, // Si también quieres guardar el tipo de glamping, puedes incluirlo aquí
    }));
    setMostrarFiltros(false); 
    setActivarFiltros(true); 
    console.log(filtros)
    document.body.style.overflow = "auto"; // Restaura el overflow de la página
  };

  const cerrarFiltros = () => {
    setMostrarFiltros(false); 
    document.body.style.overflow = "auto"; 
  };

  const limpiarFiltros = () => {
    setTipoGlamping('')
    setPrecioFiltrado([50000,2200000])
    setActivarFiltros(false); 
  };
  
  return (
    <div className="FiltrosContenedor-overlay"onClick={(e) => {
      if (e.target === e.currentTarget) { // Verifica si el clic fue en el overlay y no en sus hijos
        setMostrarFiltros(false);
        document.body.style.overflow = "auto";
      }
    }}>
      <div className="FiltrosContenedor-contenedor">
        <h1>Filtros</h1>
        <div className="FiltrosContenedor-contenedor-opciones">
          <button
            className="FiltrosContenedor-boton-cerrar"
            onClick={cerrarFiltros}
          >
            ×
          </button>
          <div className="FiltrosContenedor-Rango-precios">
            <FiltroPrecios/>
          </div>
          <div className="FiltrosContenedor-Tipo">
            <FiltrosTipo />
          </div>
          <div className="FiltrosContenedor-Amenidades">
            {/* <FiltrosAmenidades
              amenidadesGlobalFiltrado={filtrosTemporales.amenidadesGlobalFiltrado}
              setAmenidadesGlobalFiltrado={setAmenidadesGlobalFiltrado}
              handleAmenidadesChange={handleAmenidadesChange}
            />   */}
          </div>
        </div>
                  
            <div className="FiltrosContenedor-botones-fijos">
                <button onClick={limpiarFiltros}>Limpiar filtros</button>
                <button onClick={aplicarFiltros}>Aplicar</button>
            </div>  
      </div>
      
    </div>
  );
};

export default FiltrosContenedor;
