import React, { useContext, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import { GiCampingTent } from "react-icons/gi";
import CalendarioGeneral from "../CalendarioGeneral";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import viernesysabadosyfestivos from "../BaseFinesSemana/fds.json";
import { calcularTarifaServicio } from "../../Funciones/calcularTarifaServicio";
import { ExtraerTarifaGlamperos } from "../../Funciones/ExtraerTarifaGlamperos";
import "./estilos.css";

interface BotonReservaProps {
  precioPorNoche: number;
  precioPersonaAdicional: number;
  descuento: number;
  Cantidad_Huespedes: number;
}

const ReservarBoton: React.FC<BotonReservaProps> = ({ precioPorNoche, precioPersonaAdicional, descuento, Cantidad_Huespedes }) => {
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
    mostrarCalendario,
    setMostrarCalendario,
    Cantidad_Adultos,
    setCantidad_Adultos,
    Cantidad_Ninos,
    setCantidad_Ninos,
    Cantidad_Bebes,
    setCantidad_Bebes,
    Cantidad_Mascotas,
    setCantidad_Mascotas,
  } = almacenVariables;

  let { glampingId, fechaInicioUrl, fechaFinUrl, totalDiasUrl, totalAdultosUrl, totalNinosUrl, totalBebesUrl, totalMascotasUrl } = useParams<{
        glampingId: string;
        fechaInicioUrl: string;
        fechaFinUrl: string;
        totalDiasUrl: string;
        totalAdultosUrl: string;
        totalNinosUrl: string;
        totalBebesUrl: string;
        totalMascotasUrl: string;
      }>();
      
    // hace que se tomen los valores url cuando es la primer vez que se inicia el componente
     useEffect(() => {
       const adultos = parseInt(totalAdultosUrl || "0", 1);
       const ninos = parseInt(totalNinosUrl || "0", 0);
       const bebes = parseInt(totalBebesUrl || "0", 0);
       const mascotas = parseInt(totalMascotasUrl || "0", 0);     
       setCantidad_Adultos(isNaN(adultos) ? 0 : adultos);
       setCantidad_Ninos(isNaN(ninos) ? 0 : ninos);
       setCantidad_Bebes(isNaN(bebes) ? 0 : bebes);
       setCantidad_Mascotas(isNaN(mascotas) ? 0 : mascotas);     
     }, []);
   
   
     const actualizarUrl = (fechaInicioParam: Date, fechaFinParam: Date, totalDias: number, Cantidad_Adultos: number, Cantidad_Ninos: number, Cantidad_Bebes: number, Cantidad_Mascotas: number) => {
       const fechaInicioStr = fechaInicioParam.toISOString().split("T")[0];
       const fechaFinStr = fechaFinParam.toISOString().split("T")[0];
       const totalDiasStr = totalDias.toString();
       const totalAdultosStr = Cantidad_Adultos.toString();    
       const totalNinosStr = Cantidad_Ninos.toString(); 
       const totalBebesStr = Cantidad_Bebes.toString(); 
       const totalMascotasStr = Cantidad_Mascotas.toString();
       const nuevaUrl = `/ExplorarGlamping/${glampingId}/${fechaInicioStr}/${fechaFinStr}/${totalDiasStr}/${totalAdultosStr}/${totalNinosStr}/${totalBebesStr}/${totalMascotasStr}`;
       window.history.replaceState(null, "", nuevaUrl);
     };
   
     useEffect(() => {
      if (
        fechaInicio &&
        fechaFin &&
        totalDias &&
        Cantidad_Adultos &&
        Cantidad_Ninos !== null &&
        Cantidad_Ninos !== undefined &&
        Cantidad_Bebes !== null &&
        Cantidad_Bebes !== undefined &&
        Cantidad_Mascotas !== null &&
        Cantidad_Mascotas !== undefined
      ) {
        actualizarUrl(fechaInicio, fechaFin, totalDias, Cantidad_Adultos, Cantidad_Ninos, Cantidad_Bebes, Cantidad_Mascotas);
      }
    }, [fechaInicio, fechaFin, totalDias, Cantidad_Adultos, Cantidad_Ninos, Cantidad_Bebes, Cantidad_Mascotas]);
    

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

  let totalDiasRender = 1;
  if (fechaInicioRender && fechaFinRender) {
    const diferenciaMillis = fechaFinRender.getTime() - fechaInicioRender.getTime();
    totalDiasRender = Math.ceil(diferenciaMillis / (24 * 60 * 60 * 1000));
  } else if (totalDiasUrl) {
    totalDiasRender = parseInt(totalDiasUrl, 10);
  }

  const adultosRender = Cantidad_Adultos 
    ? Cantidad_Adultos 
    : totalAdultosUrl 
    ? parseInt(totalAdultosUrl, 10) 
    : 1; 
  
    const ninosRender =
    Cantidad_Ninos !== undefined && Cantidad_Ninos !== null
    ? Cantidad_Ninos
    : totalNinosUrl
    ? parseInt(totalNinosUrl, 10)
    : 0;

    const bebesRender =
    Cantidad_Bebes !== undefined && Cantidad_Bebes !== null
    ? Cantidad_Bebes
    : totalBebesUrl
    ? parseInt(totalBebesUrl, 10)
    : 0;

    const mascotasRender =
    Cantidad_Mascotas !== undefined && Cantidad_Mascotas !== null
    ? Cantidad_Mascotas
    : totalMascotasUrl
    ? parseInt(totalMascotasUrl, 10)
    : 0;
    
    const totalHuespedesRender = 
    adultosRender !== undefined && ninosRender !== undefined 
      ? adultosRender + ninosRender 
      : totalAdultosUrl && totalNinosUrl 
      ? parseInt(totalAdultosUrl, 10) + parseInt(totalNinosUrl, 10) 
      : 1;

  const hoy = new Date();
  const fechaInicioPorDefecto = new Date();
  fechaInicioPorDefecto.setDate(hoy.getDate() + 1);
  const fechaFinPorDefecto = new Date();
  fechaFinPorDefecto.setDate(hoy.getDate() + 2);

  const fechaInicioReservada = fechaInicio
    ? fechaInicio.toISOString().split("T")[0]
    : fechaInicioUrl
    ? new Date(fechaInicioUrl).toISOString().split("T")[0]
    : fechaInicioPorDefecto.toISOString().split("T")[0];

    let fechaFinReservada = fechaFin
    ? fechaFin.toISOString().split('T')[0]
    : fechaFinUrl
    ? new Date(fechaFinUrl).toISOString().split('T')[0]
    : fechaFinPorDefecto.toISOString().split('T')[0];
  
    // Comprobar si la fechaInicioReservada es mayor que la fechaFinReservada
    if (new Date(fechaInicioReservada) > new Date(fechaFinReservada)) {
      const nuevaFechaFin = new Date(fechaInicioReservada);
      nuevaFechaFin.setDate(nuevaFechaFin.getDate() + 1); // Añadir un día a la fecha de inicio
      fechaFinReservada = nuevaFechaFin.toISOString().split('T')[0]; // Actualizar fechaFinReservada
    }
  

  const precioConTarifa = Math.round(calcularTarifaServicio(
    precioPorNoche,
    viernesysabadosyfestivos,
    descuento,
    fechaInicioReservada,
    fechaFinReservada
  ));

  const precioConTarifaAdicional = Math.round(calcularTarifaServicio(precioPersonaAdicional, viernesysabadosyfestivos, 0, fechaInicioReservada ?? fechaInicioPorDefecto, fechaFinReservada ?? fechaFinPorDefecto));    
  const porcentajeGlamperos = ExtraerTarifaGlamperos(precioPorNoche);

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

  const TarifaGlamperos = Math.round(
    precioConTarifa - precioConTarifa * (1 / (1 + porcentajeGlamperos))
  );

  const TarifaGlamperosAdicional = Math.round(precioConTarifaAdicional - precioConTarifaAdicional * (1 / (1 + porcentajeGlamperos)));

  useEffect(() => {
    if (!fechaInicio && fechaInicioUrl) setFechaInicio(new Date(fechaInicioUrl));
    if (!fechaFin && fechaFinUrl) setFechaFin(new Date(fechaFinUrl));
  }, [fechaInicioUrl, fechaFinUrl, setFechaInicio, setFechaFin]);

  // Función validarFechas para evitar navegar cuando selecciona mal los rangos
    const validarFechas = (): boolean => {
      if (!fechaInicio || !fechaFin) {
        Swal.fire({
          icon: "warning",
          title: "¡Ups! 🤔",
          text: `La fecha de salida debe ser mayor que la fecha de llegada, da clic en el botón Borrar fechas e intenta nuevamente`,
          confirmButtonText: "Aceptar",
        });
        return false;
      }
      return true;
    };  
  
    const handleReservarClick = (e: React.MouseEvent) => {
      if (!validarFechas()) {
        e.preventDefault(); 
      }
    };

    // calcular la Tarifa Total
    function calcularTotalFinal(
      totalHuespedes: number,
      Cantidad_Huespedes: number,
      precioConTarifa: number,
      porcentajeGlamperos: number,
      precioPersonaAdicional: number,
      totalDiasRender: number,
      TarifaGlamperos: number,
      TarifaGlamperosAdicional: number
    ): number {
      if (totalHuespedes - Cantidad_Huespedes > 0) {
        return Math.round(
          precioConTarifa * (1 / (1 + porcentajeGlamperos)) +
            precioPersonaAdicional *
              totalDiasRender *
              (totalHuespedes - Cantidad_Huespedes) +
            (TarifaGlamperos +
              TarifaGlamperosAdicional * (totalHuespedes - Cantidad_Huespedes))
        );
      } else {
        return precioConTarifa; // Corregido para retornar solo el número
      }
    }
      
    const TotalFinal = calcularTotalFinal(
      totalHuespedesRender,
      Cantidad_Huespedes,
      precioConTarifa,
      porcentajeGlamperos,
      precioPersonaAdicional,
      totalDiasRender,
      TarifaGlamperos,
      TarifaGlamperosAdicional
    );


  return (
    <div className="ReservarBoton-container">

      <div className="ReservarBoton-total">
        <span>
          ${TotalFinal.toLocaleString()} COP
        </span>
        <div
        className="ReservarBoton-fechas"
        onClick={() => {
          setFechaInicio(fechaInicioRender);          
          setFechaFin(fechaFinRender);
          setTotalDias(totalDiasRender);
          setMostrarCalendario(true);
        }}
      >
        <div className="ReservarBoton-fecha">
           <span className="ReservarBoton-fecha-dias">
              {totalDiasRender === 1 ? totalDiasRender : totalDiasRender} noche
              {totalDiasRender > 1 ? "s" : ""}
            </span>
          <span>{formatearFecha(fechaInicioRender)} - {formatearFecha(fechaFinRender)}</span>
        </div>
      </div>
      
      </div>

      {mostrarCalendario && (
        <CalendarioGeneral cerrarCalendario={() => setMostrarCalendario(false)} />
      )}
        <Link
        to={`/Reservar/${glampingId}/${fechaInicioReservada}/${fechaFinReservada}/${precioConTarifa}/${TarifaGlamperos}/${totalDiasRender}/${adultosRender}/${ninosRender}/${bebesRender}/${mascotasRender}`}
        className="ReservarBoton-boton"
        onClick={handleReservarClick}
        >
        <GiCampingTent className="ReservarBoton-boton-icono" />
        Reservar
      </Link>
    </div>
  );
};

export default ReservarBoton;
