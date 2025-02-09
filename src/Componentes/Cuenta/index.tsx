import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Lottie from "lottie-react";
import animationData from "../../Imagenes/AnimationPuntos.json";
import { useNavigate } from "react-router-dom";
import "./estilos.css";

const Cuenta: React.FC = () => {
  const [usuario, setUsuario] = useState<{
    nombre: string;
    email: string;
    glampings: any[] | undefined;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modoPropietario, setModoPropietario] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const correoUsuario = Cookies.get("correoUsuario");

      if (correoUsuario) {
        try {
          const response = await fetch(
            `https://glamperosapi.onrender.com/usuarios?email=${correoUsuario}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUsuario({
              nombre: data.nombre,
              email: data.email,
              glampings: data.glampings || [],
            });

            if (data.glampings && data.glampings.length > 0) {
              setModoPropietario(true);
            }
          } else {
            console.error("Error al obtener los datos del usuario.");
          }
        } catch (error) {
          console.error("Error en la conexión con la API:", error);
        }
      }
      setLoading(false);
    };

    obtenerDatosUsuario();
  }, []);

  const cerrarSesion = () => {
    Cookies.remove("nombreUsuario");
    Cookies.remove("idUsuario");
    Cookies.remove("correoUsuario");
    Cookies.remove("telefonoUsuario");
    navigate("/");
    window.location.reload();
  };

  const manejarEditarGlamping = () => {
    const propietarioId = Cookies.get("idUsuario");
    if (propietarioId) {
      navigate(`/EdicionGlamping/${propietarioId}`);
    }
  };

  const manejarCentroAyuda = () => {    
      navigate("/Ayuda");
  };

  
  const irReservarCliente = () => {
    navigate(`/ReservasClientes`);
  };

  const irReservarPropiedades = () => {
    navigate(`/ReservasPropiedades`);
  };

  const manejarEditarPerfil = () => {
    navigate("/EdicionPerfil");
  };

  if (loading) {
    return (
      <div className="Cuenta-lottie-container">
        <Lottie animationData={animationData} style={{ height: 200, width: "100%", margin: "auto" }} />
      </div>
    );
  }

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

      {usuario?.glampings && usuario.glampings.length > 0 && (
        <div className="Cuenta-toggle-container">
          <span className={!modoPropietario ? "Cuenta-activo" : ""}>Modo Usuario</span>
          <label className="Cuenta-switch">
            <input
              type="checkbox"
              checked={modoPropietario}
              onChange={() => setModoPropietario(!modoPropietario)}
            />
            <span className="Cuenta-slider"></span>
          </label>
          <span className={modoPropietario ? "Cuenta-activo" : ""}>Modo Propietario</span>
        </div>
      )}

      {!modoPropietario ? (
        <div className="Cuenta-tarjetas">
          <div className="Cuenta-tarjeta" onClick={manejarEditarPerfil}>
            <h3>👤 Datos personales</h3>
            <p>Proporciona tus datos personales e indícanos cómo podemos ponernos en contacto contigo.</p>
          </div>
          <div className="Cuenta-tarjeta" onClick={irReservarCliente}>
            <h3>🧳 Mis Viajes</h3>
            <p>Mira dónde has reservado.</p>
          </div>
          <div className="Cuenta-tarjeta Cuenta-CentroAyuda" onClick={manejarCentroAyuda}>
              <h3>🆘 Centro de ayuda</h3>
            </div>
        </div>
      ) : (
        usuario?.glampings && usuario.glampings.length > 0 && (
          <div className="Cuenta-tarjetas">
            <div className="Cuenta-tarjeta" onClick={irReservarPropiedades}>
              📅
              <h3>Estado de tus reservas recibidas</h3>
              <p>Revisa tus reservas vigentes e históricas.</p>
            </div>
            <div className="Cuenta-tarjeta" onClick={manejarEditarGlamping}>
              <h3>⛺ Editar información de tus glamping</h3>
              <p>Cambia información básica y fotos.</p>
            </div>
            <div className="Cuenta-tarjeta Cuenta-CentroAyuda" onClick={manejarCentroAyuda}>
              <h3>🆘 Centro de ayuda</h3>
            </div>
          </div>
        )
      )}

      <div className="Cuenta-cerrar-sesion">
        <span onClick={cerrarSesion} className="Cuenta-cerrar-sesion">Cerrar sesión</span>
      </div>
    </div>
  );
};

export default Cuenta;
