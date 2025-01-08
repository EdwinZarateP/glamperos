import React, { useContext, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import { GiCampingTent } from "react-icons/gi";
import CalendarioGeneral from "../CalendarioGeneral";
import { useParams } from "react-router-dom";
import Visitantes from "../Visitantes";
import viernesysabadosyfestivos from "../../Componentes/BaseFinesSemana/fds.json";
import { calcularTarifaServicio } from "../../Funciones/calcularTarifaServicio";
import { ExtraerTarifaGlamperos } from "../../Funciones/ExtraerTarifaGlamperos";
import Swal from 'sweetalert2';
import "./estilos.css";

interface FormularioFechasProps {
  precioPorNoche: number;
  descuento: number;
}

const FormularioFechas: React.FC<FormularioFechasProps> = ({ precioPorNoche, descuento }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const {
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    totalDias,
    setTotalDias,
    totalHuespedes,
    mostrarCalendario,
    setMostrarCalendario,
    mostrarVisitantes,
    setMostrarVisitantes,
    fechaInicioConfirmado,
    fechaFinConfirmado
  } = almacenVariables;

  let { glampingId, fechaInicioUrl, fechaFinUrl, totalDiasUrl } = useParams<{ glampingId: string; fechaInicioUrl: string; fechaFinUrl: string; totalDiasUrl: string }>();

  // Función para actualizar la URL completa
  const actualizarUrl = (fechaInicioParam: Date, fechaFinParam: Date, totalDias: number) => {
    const fechaInicioStr = fechaInicioParam.toISOString().split("T")[0];
    const fechaFinStr = fechaFinParam.toISOString().split("T")[0];
    const totalDiasStr = totalDias.toString();
    const nuevaUrl = `/ExplorarGlamping/${glampingId}/${fechaInicioStr}/${fechaFinStr}/${totalDiasStr}`;
    window.history.replaceState(null, '', nuevaUrl);
  };

  useEffect(() => {
    if (fechaInicio && fechaFin && totalDias) {
      actualizarUrl(fechaInicio, fechaFin, totalDias);
    }
  }, [fechaInicio, fechaFin, totalDias]);

  // Prioridad: primero usar el contexto si existe, de lo contrario usar la URL.
  const fechaInicioRender = fechaInicio
    ? fechaInicio
    : fechaInicioUrl
    ? new Date(fechaInicioUrl)
    : null;

  const fechaFinRender = fechaFin
    ? fechaFin
    : fechaFinUrl
    ? new Date(fechaFinUrl)
    : null;

  let totalDiasRender = totalDias
    ? totalDias
    : totalDiasUrl
    ? parseInt(totalDiasUrl, 10)
    : 1;

  // Fechas por defecto
  const hoy = new Date();
  const fechaInicioPorDefecto = new Date();
  fechaInicioPorDefecto.setDate(hoy.getDate() + 1); // Día de mañana
  const fechaFinPorDefecto = new Date();
  fechaFinPorDefecto.setDate(hoy.getDate() + 2); // Pasado mañana

  const precioConTarifa = calcularTarifaServicio(precioPorNoche, viernesysabadosyfestivos, descuento, fechaInicioConfirmado ?? fechaInicioPorDefecto, fechaFinConfirmado ?? fechaFinPorDefecto);
  const porcentajeGlamperos = ExtraerTarifaGlamperos(precioPorNoche);

  const FechasReservadas = [
    new Date(2024, 10, 20),
    new Date(2024, 10, 28),
    new Date(2024, 10, 29),
  ];

  const formatearFecha = (fecha: Date | null): string => {
    if (!fecha) return "-";
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  };

  const enviarFechasAPI = async () => {
    try {
      const inicio = fechaInicioRender || fechaInicioPorDefecto;
      const fin = fechaFinRender || fechaFinPorDefecto;
  
      // Generar array de fechas restando un día a cada una
      const fechasArray: string[] = [];
      let fechaActual = new Date(inicio);
  
      while (fechaActual < fin) {
        fechasArray.push(new Date(fechaActual).toISOString().split("T")[0]);
        fechaActual.setDate(fechaActual.getDate() + 1);
      }
  
      const response = await fetch(`https://glamperosapi.onrender.com/glampings/${glampingId}/fechasReservadas`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fechas: fechasArray }),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar las fechas reservadas");
      }
  
      // Mostrar mensaje con SweetAlert2
      Swal.fire({
        title: '¡Reservado!',
        text: `Las fechas del ${formatearFecha(inicio)} al ${formatearFecha(fin)} se han reservado correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error("Error al enviar fechas a la API:", error);
  
      // Mostrar error con SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al intentar reservar las fechas. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  useEffect(() => {
    if (mostrarVisitantes) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [mostrarVisitantes]);

  return (
    <>
      <div className="FormularioFechas-contenedor">
        <div className="FormularioFechas-precio">
          <span className="FormularioFechas-precioNoche">
            ${(Math.round(precioConTarifa / totalDias)).toLocaleString()} COP
          </span>
          <span>/ noche</span>
        </div>

        <div
          className="FormularioFechas-fechas"
          onClick={() => {
            setFechaInicio(fechaInicioRender);
            setFechaFin(fechaFinRender);
            setTotalDias(totalDiasRender);
            setMostrarCalendario(true);
          }}
        >
          <div className="FormularioFechas-fecha">
            <span className="FormularioFechas-fechaTitulo">LLEGADA</span>
            <span>{formatearFecha(fechaInicioRender)}</span>
          </div>
          <div className="FormularioFechas-fecha">
            <span className="FormularioFechas-fechaTitulo">SALIDA</span>
            <span>{formatearFecha(fechaFinRender)}</span>
          </div>
        </div>

        <div
          className="FormularioFechas-huespedes"
          onClick={() => setMostrarVisitantes(true)}
        >
          <span>Huéspedes</span>
          <span>
            {totalHuespedes} huésped{totalHuespedes > 1 ? "es" : ""}
          </span>
        </div>

        <button
          className="FormularioFechas-botonReserva"
          onClick={enviarFechasAPI}
        >
          <GiCampingTent className="FormularioFechas-botonReserva-icono" />
          Reserva
        </button>

        <p className="FormularioFechas-info">No se hará ningún cargo por ahora</p>

        <div className="FormularioFechas-detalleCosto">
          <div className="FormularioFechas-item">
            <span>
              ${(Math.round((precioConTarifa / totalDias) * (1 / (1 + porcentajeGlamperos)))).toLocaleString()} COP x{" "}
              {totalDiasRender === 1 ? totalDiasRender : totalDiasRender} noche
              {totalDiasRender > 1 ? "s" : ""}
            </span>
            <span>
              ${Math.round(precioConTarifa * (1 / (1 + porcentajeGlamperos))).toLocaleString()} COP
            </span>
          </div>
          <div className="FormularioFechas-item">
            <span>Tarifa por servicio Glamperos</span>
            <span>
              ${Math.round(precioConTarifa - precioConTarifa * (1 / (1 + porcentajeGlamperos))).toLocaleString()} COP
            </span>
          </div>
        </div>

        <div className="FormularioFechas-total">
          <span>Total</span>
          <span>${precioConTarifa.toLocaleString()} COP</span>
        </div>
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral
          cerrarCalendario={() => setMostrarCalendario(false)}
          FechasReservadas={FechasReservadas}
        />
      )}

      {mostrarVisitantes && (
        <Visitantes onCerrar={() => setMostrarVisitantes(false)} />
      )}
    </>
  );
};

export default FormularioFechas;
