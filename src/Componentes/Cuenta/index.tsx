import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Lottie from 'lottie-react';
import animationData from "../../Imagenes/AnimationPuntos.json"; // Asegúrate de tener la animación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import "./estilos.css";

const Cuenta: React.FC = () => {
  const [usuario, setUsuario] = useState<{ nombre: string; email: string; glampings: any[] | undefined } | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const navigate = useNavigate(); // Inicializamos useNavigate

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const correoUsuario = Cookies.get("correoUsuario");  // Usamos el correo almacenado en cookies

      if (correoUsuario) {
        try {
          const response = await fetch(`https://glamperosapi.onrender.com/usuarios?email=${correoUsuario}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Agregar el token de autorización
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsuario({ 
              nombre: data.nombre, 
              email: data.email, 
              glampings: data.glampings || []  // Asegúrate de que glampings sea un array, incluso si es undefined
            });
          } else {
            console.error("Error al obtener los datos del usuario.");
          }
        } catch (error) {
          console.error("Error en la conexión con la API:", error);
        }
      }
      setLoading(false); // Marca que la carga ha terminado
    };

    obtenerDatosUsuario();
  }, []);

  if (loading) {
    return (
      <div className="lottie-container">
        <Lottie 
          animationData={animationData} 
          style={{ height: 200, width: '100%', margin: 'auto' }} 
        />
      </div>
    );
  }

  // Función para redirigir a la página de edición de glamping
  const manejarEditarGlamping = () => {
    const propietarioId = Cookies.get('idUsuario'); // Obtener el propietarioId desde la cookie
    if (propietarioId) {
      navigate(`/EdicionGlamping/${propietarioId}`); // Redirigir a EditarGlamping
    }
  };

  return (
    <div className="Cuenta-contenedor">
      <h1 className="Cuenta-titulo">Cuenta</h1>
      {usuario ? (
        <p className="Cuenta-informacion">
          {usuario.nombre}, {usuario.email}
        </p>
      ) : (
        <p className="Cuenta-cargando">Cargando datos del usuario...</p>
      )}

      <div className="Cuenta-tarjetas">
        <div className="Cuenta-tarjeta">
          <i className="icono-datos-personales"></i>
          <h3>Datos personales</h3>
          <p>Proporciona tus datos personales e indícanos cómo podemos ponernos en contacto contigo</p>
        </div>
        
        <div className="Cuenta-tarjeta">
          <i className="icono-pagos"></i>
          <h3>Pagos</h3>
          <p>Revisa pagos de tus reservas</p>
        </div>

        {usuario?.glampings && usuario.glampings.length > 0 && (
          <div className="Cuenta-tarjeta">
            <i className="icono-cobros"></i>
            <h3>Cobros</h3>
            <p>Revisa cobros de tus reservas</p>
          </div>
        )}

        <div className="Cuenta-tarjeta">
          <i className="icono-notificaciones"></i>
          <h3>Notificaciones</h3>
          <p>Elige las preferencias de notificación y tu forma de contacto</p>
        </div>

        {usuario?.glampings && usuario.glampings.length > 0 && (
          <div className="Cuenta-tarjeta" onClick={manejarEditarGlamping}> {/* Agrega onClick */}
            <i className="icono-glampings"></i>
            <h3>Editar información de tus glamping</h3>
            <p>Cambia información básica y fotos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cuenta;
