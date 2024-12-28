import React, { useState, useContext, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md"; // Icono de "X" para borrar
import CalendarioGeneral from "../CalendarioGeneral";
import Visitantes from "../Visitantes";
import { ContextoApp } from "../../Contexto/index";
import municipios from "../BaseCiudades/municipios.json";
import { useNavigate } from "react-router-dom";
import "./estilos.css";

interface PanelBusquedaProps {
  onBuscar: (destino: string, fechas: string, huespedes: number) => void;
  onCerrar: () => void;
}

const PanelBusqueda: React.FC<PanelBusquedaProps> = ({ onBuscar, onCerrar }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const {
    fechaInicio,fechaFin,
    setFechaInicio,setFechaFin,
    setFechaInicioConfirmado,setFechaFinConfirmado,
    setTotalDias,ciudad_departamento,
    setCiudad_departamento,totalHuespedes,
    setTotalHuespedes,setCantidad_Adultos,
    setCantidad_Niños,setCantidad_Bebes,
    setCantidad_Mascotas, Cantidad_Mascotas,
    mostrarCalendario,setMostrarCalendario,
    mostrarVisitantes,setMostrarVisitantes,
    setFiltros, setActivarFiltrosUbicacion,
    setIconoSeleccionado, setActivarFiltrosFechas,setActivarFiltrosHuespedes,
    setHuespedesConfirmado, setBusqueda,cordenadasElegidas,setCordenadasElegidas, setActivarFiltrosMascotas,setActivarFiltrosDomo, setActivarFiltrosTienda, setActivarFiltrosCabaña, setActivarFiltrosCasaArbol,
    setActivarFiltrosRemolques, setActivarFiltrosChoza, setActivarFiltrosClimaCalido, setActivarFiltrosClimaFrio, setActivarFiltrosPlaya,
    setActivarFiltrosNaturaleza, setActivarFiltrosRio, setActivarFiltrosCascada, setActivarFiltrosMontana,
    setActivarFiltrosDesierto, setActivarFiltrosCaminata, setActivarFiltrosJacuzzi,
    setActivarFiltrosUbicacionBogota,setActivarFiltrosUbicacionMedellin, setActivarFiltrosUbicacionCali
  } = almacenVariables;
  
  const navigate = useNavigate();
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [sugerenciaActiva, setSugerenciaActiva] = useState<number>(-1);

  const manejarBuscar = () => {
    navigate("/");
    window.scrollTo(0, 0);
    setActivarFiltrosTienda(false);
    setActivarFiltrosCasaArbol(false);
    setActivarFiltrosCabaña(false);
    setActivarFiltrosRemolques(false);
    setActivarFiltrosChoza(false);
    setActivarFiltrosDomo(false);
    setActivarFiltrosMascotas(false); 
    setActivarFiltrosClimaCalido(false);
    setActivarFiltrosClimaFrio(false);
    setActivarFiltrosPlaya(false);
    setActivarFiltrosNaturaleza(false);
    setActivarFiltrosRio(false);
    setActivarFiltrosCascada(false);
    setActivarFiltrosMontana(false);
    setActivarFiltrosDesierto(false);
    setActivarFiltrosCaminata(false);
    setActivarFiltrosJacuzzi(false); 
    setActivarFiltrosUbicacionBogota(false);
    setActivarFiltrosUbicacionMedellin(false);
    setActivarFiltrosUbicacionCali(false); 
    setIconoSeleccionado(100)
    
    // Lógica para el destino (usamos ciudad_departamento en lugar de destino)
    if (ciudad_departamento) {
      setActivarFiltrosUbicacion(true);
    } else {
      setActivarFiltrosUbicacion(false);
    }
    // Lógica para las fechas
    if (fechaInicio && fechaFin) {
      setActivarFiltrosFechas(true);
      setFechaInicioConfirmado(fechaInicio);
      setFechaFinConfirmado(fechaFin);
    } else {
      setActivarFiltrosFechas(false);
    }

    // Lógica para los huespedes
    if (totalHuespedes) {
      setHuespedesConfirmado(totalHuespedes)
      setActivarFiltrosHuespedes(true)
    } else {
      setActivarFiltrosHuespedes(false);
    }

    // Lógica para las mascotas
    if (Cantidad_Mascotas>0) {
      setActivarFiltrosMascotas(true)
    } else {
      setActivarFiltrosMascotas(false);
    }
  
    // Configurar filtros para la búsqueda
    const fechas =
      fechaInicio && fechaFin ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}` : "";
    setBusqueda({ destino: ciudad_departamento || "", fechas });
    // Asignar coordenadas predeterminadas si no están presentes
    const coordenadasPredeterminadas = {
      LATITUD: 10.463433617,
      LONGITUD: -75.45889915,
    };

    if (ciudad_departamento || (fechaInicio && fechaFin)) {
      setFiltros((prevFiltros) => ({
        ...prevFiltros,
        cordenadasFilter: cordenadasElegidas.length > 0
          ? cordenadasElegidas[0]
          : coordenadasPredeterminadas, // Usar coordenadas predeterminadas si no hay coordenadas elegidas
      }));
    }
    onBuscar(ciudad_departamento, fechas, totalHuespedes);
    onCerrar();
  };
    

  const formatFecha = (fecha: Date): string => {
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  
  const buscarSugerenciasDesdeJSON = useCallback(
    (query: string) => {
      if (query.length > 1) {
        const resultados = municipios.filter((municipio: any) =>
          municipio.CIUDAD_DEPARTAMENTO.toLowerCase().includes(query.toLowerCase())
        );

        setSugerencias(resultados.map((municipio: any) => municipio.CIUDAD_DEPARTAMENTO).slice(0, 10));
        setCordenadasElegidas(resultados.map((municipio: any) => ({ LATITUD: municipio.LATITUD, LONGITUD: municipio.LONGITUD })).slice(0, 10));
      } else {
        setSugerencias([]);
        setCordenadasElegidas([]);
      }
    },
    []
  );

  const manejarCambioDestino = (query: string) => {
    setCiudad_departamento(query); // Actualizamos ciudad_departamento en lugar de destino
    setSugerenciaActiva(-1);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      buscarSugerenciasDesdeJSON(query);
    }, 0);
    setTimeoutId(newTimeoutId);
  };

  const manejarSeleccionSugerencia = (sugerencia: string) => {
    setCiudad_departamento(sugerencia); // Actualizamos ciudad_departamento en lugar de destino
    setSugerencias([]);
    setSugerenciaActiva(-1);
  
    // Encontrar el municipio seleccionado en el JSON
    const municipioSeleccionado = municipios.find(
      (municipio: any) => municipio.CIUDAD_DEPARTAMENTO === sugerencia
    );
    if (municipioSeleccionado) {
      setCordenadasElegidas([
        { LATITUD: municipioSeleccionado.LATITUD, LONGITUD: municipioSeleccionado.LONGITUD },
      ]);
    } else {
      setCordenadasElegidas([]); // Limpiar si no se encuentra
    }  
    if (!fechaFin) {
      setMostrarCalendario(true);
    }
  };
  

  const manejarTecla = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (sugerencias.length === 0) return;

    if (e.key === "ArrowDown") {
      setSugerenciaActiva((prev) => (prev < sugerencias.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSugerenciaActiva((prev) => (prev > 0 ? prev - 1 : sugerencias.length - 1));
    } else if (e.key === "Enter") {
      if (sugerenciaActiva >= 0 && sugerenciaActiva < sugerencias.length) {
        manejarSeleccionSugerencia(sugerencias[sugerenciaActiva]);
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <div className="PanelBusqueda-fondo" onClick={onCerrar}></div>

      <div className="PanelBusqueda-contenedor">
        <h2 className="PanelBusqueda-titulo">¿A dónde quieres viajar?</h2>

        <div className="PanelBusqueda-barra">
          <div className="PanelBusqueda-destino">
            <FiSearch className="PanelBusqueda-icono" />
            <div className="PanelBusqueda-inputWrapper">
            <input
                type="text"
                placeholder="Explora Municipios"
                className="PanelBusqueda-input"
                value={ciudad_departamento} // Usamos ciudad_departamento aquí
                onChange={(e) => manejarCambioDestino(e.target.value)}
                onKeyDown={manejarTecla}
              />
              {ciudad_departamento && (
                <button
                  className="PanelBusqueda-botonBorrar"
                  onClick={() => {
                    setCiudad_departamento(''); // Limpiar ciudad_departamento
                  }}
                >
                  <MdClose />
                </button>        
              )}
            </div>
            {sugerencias.length > 0 && (
              <div className="PanelBusqueda-sugerencias">
                {sugerencias.map((sugerencia, index) => (
                  <div
                    key={index}
                    className={`PanelBusqueda-sugerencia ${sugerenciaActiva === index ? "activo" : ""}`}
                    onClick={() => manejarSeleccionSugerencia(sugerencia)}
                  >
                    {sugerencia}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="PanelBusqueda-fechas" onClick={() => setMostrarCalendario(true)}>
            <span className="PanelBusqueda-fechas-titulo">Fechas</span>
            <span className="PanelBusqueda-fechas-valor">
              {fechaInicio && fechaFin
                ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}`
                : "Selecciona fechas"}
            </span>
          </div>

          <div className="PanelBusqueda-huespedes" onClick={() => setMostrarVisitantes(true)}>
            <span className="PanelBusqueda-huespedes-titulo">Huéspedes</span>
            <span className="PanelBusqueda-huespedes-valor">
              {totalHuespedes > 0
                ? `${totalHuespedes} huésped${totalHuespedes > 1 ? "es" : ""}`
                : "Agrega huéspedes"}
            </span>
          </div>
        </div>

        <div className="PanelBusqueda-botones">
          <button
            className="PanelBusqueda-limpiar"
            onClick={() => { 
     
              setCiudad_departamento("");
              setFechaInicio(null);
              setFechaFin(null);
              setFechaInicioConfirmado(null);
              setFechaFinConfirmado(null);
              setTotalDias(1);
              setTotalHuespedes(1);
              setCantidad_Adultos(1);
              setCantidad_Niños(0);
              setCantidad_Bebes(0);
              setCantidad_Mascotas(0);
              setCordenadasElegidas([])
              setActivarFiltrosUbicacion(false);
              setActivarFiltrosFechas(false);
              setBusqueda({ destino: "", fechas: "" })
              
            }}
          >
            Limpiar todo
          </button>

          <button className="PanelBusqueda-buscar" onClick={manejarBuscar}>
            <FiSearch className="PanelBusqueda-buscar-icono" /> Busca
          </button>
        </div>
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral cerrarCalendario={() =>
          setMostrarCalendario(false)} />
      )}

      {mostrarVisitantes && (
        <div>
          <Visitantes onCerrar={() => setMostrarVisitantes(false)} />
        </div>
      )}
    </>
  );
};

export default PanelBusqueda;
