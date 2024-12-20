import { ContextoApp } from '../../Contexto/index';
import { useContext } from "react";
import FiltroPrecios from "./precio"; 
// import FiltrosTipo from './tipo'; 
// import FiltrosAmenidades from './amenidades';
import "./estilos.css";

const FiltrosContenedor = () => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const {  setMostrarFiltros, setActivarFiltros, activarFiltros, tipoGlamping } = almacenVariables;

    
  const aplicarFiltros = () => {
    setMostrarFiltros(false); 
    setActivarFiltros(true); 
    console.log(activarFiltros, tipoGlamping)
    document.body.style.overflow = "auto"; 
  };

  const cerrarFiltros = () => {
    setMostrarFiltros(false); 
    document.body.style.overflow = "auto"; 
  };

  
  return (
    <div className="FiltrosContenedor-overlay">
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
          {/* <div className="FiltrosContenedor-Tipo">
            <FiltrosTipo />
          </div> */}
          <div className="FiltrosContenedor-Amenidades">
            {/* <FiltrosAmenidades
              amenidadesGlobalFiltrado={filtrosTemporales.amenidadesGlobalFiltrado}
              setAmenidadesGlobalFiltrado={setAmenidadesGlobalFiltrado}
              handleAmenidadesChange={handleAmenidadesChange}
            />   */}
          </div>
        </div>
                  
            <div className="FiltrosContenedor-botones-fijos">
                <button>Limpiar filtros</button>
                <button onClick={aplicarFiltros}>Aplicar</button>
            </div>  
      </div>
      
    </div>
  );
};

export default FiltrosContenedor;
