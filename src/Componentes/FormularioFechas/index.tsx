import React, { useContext, useEffect } from "react";
import "./estilos.css";
import { ContextoApp } from "../../Contexto/index";

interface FormularioFechasProps {
  precioPorNoche: number;
  tarifaServicio?: number; // Hacer que la propiedad sea opcional
  huespedes: number;
}

const FormularioFechas: React.FC<FormularioFechasProps> = ({ 
  precioPorNoche, 
  tarifaServicio, 
  huespedes 
}) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
  }

  const { 
    fechaInicio, 
    fechaFin, 
    totalDias, 
    setTotalSinImpuestos 
  } = almacenVariables;

  const formatearFecha = (fecha: Date | null): string => {
    if (!fecha) return "-";
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  };

  // Calcular tarifa de servicio basada en la tabla
  const calcularTarifaServicio = (precio: number): number => {
    if (precio >= 200000 && precio <= 299999) return 1.15;
    if (precio >= 300000 && precio <= 400000) return 1.12;
    if (precio >= 401000 && precio <= 500000) return 1.11;
    if (precio >= 501000 && precio <= 600000) return 1.1;
    if (precio >= 601000 && precio <= 800000) return 1.09;
    if (precio >= 801000 && precio <= 2000000) return 1.08;
    return 0; // Valor predeterminado si no cae en ningún rango
  };

  const tarifa = tarifaServicio ?? calcularTarifaServicio(precioPorNoche);
  const totalSinImpuestos = (precioPorNoche * totalDias) * tarifa;

  // Actualiza el valor en el contexto cuando se recalcula
  useEffect(() => {
    setTotalSinImpuestos(totalSinImpuestos);
  }, [totalSinImpuestos, setTotalSinImpuestos]);

  return (
    <div className="FormularioFechas-contenedor">
      <div className="FormularioFechas-precio">
        <span className="FormularioFechas-precioNoche">${precioPorNoche.toLocaleString()} COP</span> <span>/ noche</span>
      </div>

      <div className="FormularioFechas-fechas">
        <div className="FormularioFechas-fecha">
          <span className="FormularioFechas-fechaTitulo">LLEGADA</span>
          <span>{formatearFecha(fechaInicio)}</span>
        </div>
        <div className="FormularioFechas-fecha">
          <span className="FormularioFechas-fechaTitulo">SALIDA</span>
          <span>{formatearFecha(fechaFin)}</span>
        </div>
      </div>

      <div className="FormularioFechas-huespedes">
        <span>Huéspedes</span>
        <span>{huespedes} huésped{huespedes > 1 ? 'es' : ''}</span>
      </div>

      <button className="FormularioFechas-botonReserva">
        <span className="FormularioFechas-botonReserva-icono">🗓️</span>
        Reserva
      </button>
      <p className="FormularioFechas-info">No se hará ningún cargo por ahora</p>

      <div className="FormularioFechas-detalleCosto">
        <div className="FormularioFechas-item">
          <span>${precioPorNoche.toLocaleString()} COP x {totalDias} noche{totalDias > 1 ? 's' : ''}</span>
          <span>${(precioPorNoche * totalDias).toLocaleString()} COP</span>
        </div>
        <div className="FormularioFechas-item">
          <span>Tarifa por servicio</span>
          <span>${(precioPorNoche * totalDias * (tarifa - 1)).toLocaleString()} COP</span>
        </div>
      </div>

      <div className="FormularioFechas-total">
        <span>Total sin incluir impuestos</span>
        <span>${totalSinImpuestos.toLocaleString()} COP</span>
      </div>
    </div>
  );
};

export default FormularioFechas;
