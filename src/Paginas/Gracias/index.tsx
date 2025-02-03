import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import HeaderIcono from '../../Componentes/HeaderIcono/index'; 
import './estilos.css';

const Gracias: React.FC = () => {
  const { fechaInicioUrl, fechaFinUrl } = useParams<{ fechaInicioUrl: string, fechaFinUrl: string }>();
  const [fechaInicioFormateada, setFechaInicioFormateada] = useState<string>('');
  const [fechaFinFormateada, setFechaFinFormateada] = useState<string>('');

  useEffect(() => {
    const fechaInicio = fechaInicioUrl ? new Date(fechaInicioUrl) : new Date();
    const fechaFin = fechaFinUrl ? new Date(fechaFinUrl) : new Date();
    // Formatear las fechas
    const inicioFormateado = fechaInicio.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
    const finFormateado = fechaFin.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

    setFechaInicioFormateada(inicioFormateado);
    setFechaFinFormateada(finFormateado);

  }, [fechaInicioUrl, fechaFinUrl]);

  return (
    <div className="GraciasContenedor">
      <HeaderIcono descripcion="Glamperos" />
      <h1 className="GraciasTitulo">¡Gracias por tu reserva!</h1>
      <p className="GraciasMensaje">
        Tu estancia será del{' '}
        <span className="fecha-destacada">{fechaInicioFormateada}</span> al{' '}
        <span className="fecha-destacada">{fechaFinFormateada}</span>. A tu WhatsApp{' '}
        {Cookies.get('telefonoUsuario')} y correo {Cookies.get('correoUsuario')} enviamos el código de reserva, ubicación del glamping y el contacto del anfitrión. ¡Gracias por elegirnos!
      </p>
      <img src="https://storage.googleapis.com/glamperos-imagenes/Imagenes/oso.webp" alt="Glamperos logo" className="Gracias-logo" />
    </div>
  );
};

export default Gracias;