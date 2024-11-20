import React, { useState, useContext, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import CalendarioGeneral from "../CalendarioGeneral";
import Visitantes from "../Visitantes";
import { ContextoApp } from "../../Contexto/index";
import parejaIcono from "../../Imagenes/pareja.png";
import municipios from "../BaseCiudades/municipios.json"; // Importación del archivo JSON
import "./estilos.css";

interface PanelBusquedaProps {
  onBuscar: (destino: string, fechas: string, huespedes: number) => void;
  onCerrar: () => void;
}

const PanelBusqueda: React.FC<PanelBusquedaProps> = ({ onBuscar, onCerrar }) => {
  const [destino, setDestino] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarVisitantes, setMostrarVisitantes] = useState(false);
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);


  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const {
    fechaInicio,
    fechaFin,
    setFechaInicio,
    setFechaFin,
    Cantidad_Adultos,
    Cantidad_Niños,
    setCantidad_Adultos,
    setCantidad_Niños,
    setCantidad_Bebes,
    setCantidad_Mascotas,
    setTotalDias,
  } = almacenVariables;

  const manejarBuscar = () => {
    const fechas = fechaInicio && fechaFin ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}` : "";
    const totalHuespedes = Cantidad_Adultos + Cantidad_Niños;
    onBuscar(destino, fechas, totalHuespedes);
    onCerrar();
  };

  const cerrarCalendario = () => {
    setMostrarCalendario(false);
  };

  const cerrarVisitantes = () => {
    setMostrarVisitantes(false);
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
      if (query.length > 2) {
        const resultados = municipios
          .filter((municipio: any) =>
            municipio.CIUDAD_DEPARTAMENTO.toLowerCase().includes(query.toLowerCase())
          )
          .map((municipio: any) => municipio.CIUDAD_DEPARTAMENTO)
          .slice(0, 10); // Limitar a 10 resultados
        setSugerencias(resultados);
      } else {
        setSugerencias([]);
      }
    },
    []
  );

  const manejarCambioDestino = (query: string) => {
    setDestino(query);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      buscarSugerenciasDesdeJSON(query);
    }, 300); // Debounce de 300 ms
    setTimeoutId(newTimeoutId);
  };

  const manejarSeleccionSugerencia = (sugerencia: string) => {
    setDestino(sugerencia);
    setSugerencias([]); // Ocultar las sugerencias inmediatamente
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      <div className="PanelBusqueda-fondo" onClick={onCerrar}></div>

      <div className="PanelBusqueda-contenedor">
        <h2 className="PanelBusqueda-titulo">¿A dónde quieres viajar?</h2>

        <div className="PanelBusqueda-barra">
          <div className="PanelBusqueda-destino">
            <FiSearch className="PanelBusqueda-icono" />
            <input
              type="text"
              placeholder="Explora destinos"
              className="PanelBusqueda-input"
              value={destino}
              onChange={(e) => manejarCambioDestino(e.target.value)}
            />
            {sugerencias.length > 0 && (
              <div className="PanelBusqueda-sugerencias">
                {sugerencias.map((sugerencia, index) => (
                  <div
                    key={index}
                    className="PanelBusqueda-sugerencia"
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
              {fechaInicio && fechaFin ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}` : "Selecciona fechas"}
            </span>
          </div>

          <div className="PanelBusqueda-huespedes" onClick={() => setMostrarVisitantes(true)}>
            <span className="PanelBusqueda-huespedes-titulo">Huéspedes</span>
            <span className="PanelBusqueda-huespedes-valor">
              {Cantidad_Adultos + Cantidad_Niños > 0
                ? `${Cantidad_Adultos + Cantidad_Niños} huésped${Cantidad_Adultos + Cantidad_Niños > 1 ? "es" : ""}`
                : "Agrega huéspedes"}
            </span>
          </div>
        </div>

        <div className="PanelBusqueda-botones">
          <button
            className="PanelBusqueda-limpiar"
            onClick={() => {
              setDestino("");
              setFechaInicio(null);
              setFechaFin(null);
              setCantidad_Adultos(0);
              setCantidad_Niños(0);
              setCantidad_Bebes(0);
              setCantidad_Mascotas(0);
              setTotalDias(0);
            }}
          >
            Limpiar todo
          </button>

          <button className="PanelBusqueda-buscar" onClick={manejarBuscar}>
            <FiSearch className="PanelBusqueda-buscar-icono" /> Busca
          </button>
        </div>
      </div>

      {mostrarCalendario && <CalendarioGeneral cerrarCalendario={cerrarCalendario} FechasReservadas={[]} />}

      {mostrarVisitantes && (
        <>
          <div className="Visitantes-fondo" onClick={cerrarVisitantes}></div>
          <div className="Visitantes-modal">
            <Visitantes />
            <button className="Visitantes-cerrar" onClick={cerrarVisitantes}>
              Ellos son los elegidos
            </button>
            <div className="Visitantes-versiculo-contenedor">
              <img src={parejaIcono} alt="Icono de amistad" className="Visitantes-icono-amistad" />
              <p className="Visitantes-versiculo">
                Ámense unos a otros con un afecto genuino y deléitense al honrarse mutuamente. Romanos 12:10
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PanelBusqueda;
