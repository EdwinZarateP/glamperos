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

  const {  setMostrarFiltros, setActivarFiltros, tipoGlamping,setPrecioFiltrado, setTipoGlamping, 
    precioFiltrado, setFiltros, setCantiadfiltrosAplicados} = almacenVariables;

    
 const aplicarFiltros = () => {
  // Verificar la cantidad de filtros aplicados
  let filtrosActivos = 0;
  
  // Comprobar si el filtro de precio es distinto al valor por defecto
  const valorPorDefectoPrecio: [number, number] = [60000, 2200000];
  if (JSON.stringify(precioFiltrado) !== JSON.stringify(valorPorDefectoPrecio)) {
    filtrosActivos++; // Filtro de precio activo
  }

  // Comprobar si el filtro de tipoGlamping tiene un valor
  if (tipoGlamping && tipoGlamping !== '') {
    filtrosActivos++; // Filtro de tipoGlamping activo
  }
  // Actualizar el contador de filtros aplicados
  setCantiadfiltrosAplicados(filtrosActivos);

  // Actualiza el estado global de filtros con el valor de precioFiltrado
  setFiltros((prevFiltros) => ({
    ...prevFiltros, // Mantiene las demás propiedades
    precioFilter: precioFiltrado.length === 2 ? precioFiltrado : [60000, 2200000],
    tipoFilter: tipoGlamping
    
  }));
  
  setMostrarFiltros(false);
  setActivarFiltros(true);
  document.body.style.overflow = "auto";
};



  const cerrarFiltros = () => {
    setMostrarFiltros(false); 
    document.body.style.overflow = "auto"; 
  };

  const limpiarFiltros = () => {
    setTipoGlamping('')
    setPrecioFiltrado([60000,2200000])
    setActivarFiltros(false);
    setCantiadfiltrosAplicados(0); 
  };
  
  return (
    <div className="FiltrosContenedor-overlay" onClick={(e) => {
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
              <button className="FiltrosContenedor-boton-limpiar" onClick={limpiarFiltros}>Limpiar filtros</button>
              <button className="FiltrosContenedor-boton-aplicar" onClick={aplicarFiltros}>Aplicar</button>
            </div>  
      </div>
      
    </div>
  );
};

export default FiltrosContenedor;
