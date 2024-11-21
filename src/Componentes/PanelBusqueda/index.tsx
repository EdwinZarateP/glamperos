import React, { useState, useContext, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import CalendarioGeneral from "../CalendarioGeneral";
import Visitantes from "../Visitantes";
import { ContextoApp } from "../../Contexto/index";
import municipios from "../BaseCiudades/municipios.json";
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
    fechaInicio,
    fechaFin,
    setFechaInicio,
    setFechaFin,
    setTotalDias,
    ciudad_departamento,
    setCiudad_departamento,
    totalHuespedes,
    setTotalHuespedes,
    setCantidad_Adultos,
    setCantidad_Niños,
    setCantidad_Bebes,
    setCantidad_Mascotas,
    mostrarCalendario,
    setMostrarCalendario,
    mostrarVisitantes,
    setMostrarVisitantes,
  } = almacenVariables;

  const [destino, setDestino] = useState(ciudad_departamento || "");
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [sugerenciaActiva, setSugerenciaActiva] = useState<number>(-1);

  const manejarBuscar = () => {
    const fechas = fechaInicio && fechaFin ? `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin)}` : "";
    onBuscar(destino, fechas, totalHuespedes);
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
        const resultados = municipios
          .filter((municipio: any) =>
            municipio.CIUDAD_DEPARTAMENTO.toLowerCase().includes(query.toLowerCase())
          )
          .map((municipio: any) => municipio.CIUDAD_DEPARTAMENTO)
          .slice(0, 10);
        setSugerencias(resultados);
      } else {
        setSugerencias([]);
      }
    },
    []
  );

  const manejarCambioDestino = (query: string) => {
    setDestino(query);
    setSugerenciaActiva(-1);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      buscarSugerenciasDesdeJSON(query);
    }, 0);
    setTimeoutId(newTimeoutId);
  };

  const manejarSeleccionSugerencia = (sugerencia: string) => {
    setDestino(sugerencia);
    setCiudad_departamento(sugerencia);
    setSugerencias([]);
    setSugerenciaActiva(-1);

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

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  // Fechas reservadas (puedes modificar este array según tus necesidades)
  const FechasReservadas: Date[] = [
    new Date(2024, 11, 24),
    new Date(2024, 11, 25),
    new Date(2024, 11, 31),
  ];

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
              onKeyDown={manejarTecla}
            />
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
              setDestino("");
              setCiudad_departamento("");
              setFechaInicio(null);
              setFechaFin(null);
              setTotalDias(0);
              setTotalHuespedes(1);
              setCantidad_Adultos(1);
              setCantidad_Niños(0);
              setCantidad_Bebes(0);
              setCantidad_Mascotas(0);
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
        <CalendarioGeneral cerrarCalendario={() => setMostrarCalendario(false)} FechasReservadas={FechasReservadas} />
      )}

      {mostrarVisitantes && (
        <div className="Visitantes-overlay">
          <Visitantes onCerrar={() => setMostrarVisitantes(false)} />
        </div>
      )}
    </>
  );
};

export default PanelBusqueda;
