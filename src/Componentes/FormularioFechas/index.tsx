import React from "react";
import "./estilos.css";

interface FormularioFechasProps {
  precioPorNoche: number;
  tarifaServicio: number;
  totalNoches: number;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
}

const FormularioFechas: React.FC<FormularioFechasProps> = ({ 
  precioPorNoche, 
  tarifaServicio, 
  totalNoches, 
  fechaLlegada, 
  fechaSalida, 
  huespedes 
}) => {
  const totalSinImpuestos = (precioPorNoche * totalNoches) + tarifaServicio;

  return (
    <div className="FormularioFechas-contenedor">
      <div className="FormularioFechas-precio">
        <span className="FormularioFechas-precioNoche">${precioPorNoche.toLocaleString()} COP</span> <span>/ noche</span>
      </div>

      <div className="FormularioFechas-fechas">
        <div className="FormularioFechas-fecha">
          <span className="FormularioFechas-fechaTitulo">LLEGADA</span>
          <span>{fechaLlegada}</span>
        </div>
        <div className="FormularioFechas-fecha">
          <span className="FormularioFechas-fechaTitulo">SALIDA</span>
          <span>{fechaSalida}</span>
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
          <span>${precioPorNoche.toLocaleString()} COP x {totalNoches} noche{totalNoches > 1 ? 's' : ''}</span>
          <span>${(precioPorNoche * totalNoches).toLocaleString()} COP</span>
        </div>
        <div className="FormularioFechas-item">
          <span>Tarifa por servicio de Glamperos</span>
          <span>${tarifaServicio.toLocaleString()} COP</span>
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
