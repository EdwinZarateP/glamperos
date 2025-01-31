import React, { useState, useEffect } from 'react';
import './estilos.css';

interface Reserva {
  id: string;
  idCliente: string;
  idPropietario: string;
  idGlamping: string;
  ciudad_departamento: string;
  FechaIngreso: string;
  FechaSalida: string;
  Noches: number;
  ValorReserva: number;
  CostoGlamping: number;
  ComisionGlamperos: number;
  adultos: number;
  ninos: number;
  bebes: number;
  mascotas: number;
  EstadoReserva: string;
  fechaCreacion: string;
  codigoReserva: string;
}

interface Props {
  idPropietario: string;
}

const ReservasPropietario: React.FC<Props> = ({ idPropietario }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await fetch(`https://glamperosapi.onrender.com/reservas/documentos_cliente/${idPropietario}`);
        const data = await response.json();
        if (response.ok) {
          setReservas(data);
        } else {
          console.error('No se pudieron obtener las reservas');
        }
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, [idPropietario]);

  return (
    <div className="ReservasPropietario-container">
      {cargando ? (
        <p className="ReservasPropietario-cargando">Cargando reservas...</p>
      ) : reservas.length === 0 ? (
        <p className="ReservasPropietario-sinReservas">No se encontraron reservas para este cliente.</p>
      ) : (
        <div className="ReservasPropietario-lista">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="ReservasPropietario-tarjeta">
              <h3 className="ReservasPropietario-titulo">Reserva Código: {reserva.codigoReserva}</h3>
              <p className="ReservasPropietario-detalle"><strong>Glamping:</strong> {reserva.idGlamping}</p>
              <p className="ReservasPropietario-detalle"><strong>Ciudad:</strong> {reserva.ciudad_departamento}</p>
              <p className="ReservasPropietario-detalle"><strong>Fechas:</strong> {new Date(reserva.FechaIngreso).toLocaleDateString()} - {new Date(reserva.FechaSalida).toLocaleDateString()}</p>
              <p className="ReservasPropietario-detalle"><strong>Estado:</strong> {reserva.EstadoReserva}</p>
              <p className="ReservasPropietario-detalle"><strong>Noches:</strong> {reserva.Noches}</p>
              <p className="ReservasPropietario-detalle"><strong>Valor Total:</strong> ${reserva.ValorReserva.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservasPropietario;
