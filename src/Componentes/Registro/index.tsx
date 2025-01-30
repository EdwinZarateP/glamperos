import { useState, useContext } from "react";
import axios from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ContextoApp } from '../../Contexto/index';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./estilos.css";

const Registro: React.FC = () => {
  const { setIdUsuario, setLogueado, setNombreUsuario, setCorreoUsuario,
     siono, activarChat, setActivarChat, idUrlConversacion, UrlActual, redirigirExplorado, setRedirigirExplorado } = useContext(ContextoApp)!; 
  const [mensaje, setMensaje] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const API_URL = "https://glamperosapi.onrender.com/usuarios";

  // Función para manejar errores
  const manejarError = (error: any) => {
    console.error("Error:", error);
    const errorMensaje = error.response?.data?.detail || "Hubo un error inesperado.";
    setMensaje(errorMensaje);
  };

  // Manejar inicio de sesión con Google
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse | undefined) => {
    if (!credentialResponse?.credential) {
      setMensaje("No se recibió el credencial de Google");
      return;
    }

    let emailUsuario = ""; 

    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const nombreUsuario = decoded.name;
      emailUsuario = decoded.email; // Asignamos el valor a emailUsuario aquí

      // Intentar registrar el usuario
      const response = await axios.post(API_URL, {
        nombre: nombreUsuario,
        email: emailUsuario,
        telefono: "",
        clave: "autenticacionGoogle",
      });

      if (response.status === 200 && response.data) {
        const usuario = response.data.usuario;
        // Guardar en las cookies con los valores recibidos
        Cookies.set('idUsuario', usuario._id, { expires: 7 });
        Cookies.set('nombreUsuario', usuario.nombre, { expires: 7 });
        Cookies.set('correoUsuario', usuario.email, { expires: 7 });
        // Verificar si el teléfono viene vacío o es undefined
        const telefono = usuario.telefono && usuario.telefono.trim() !== "" ? usuario.telefono : "sintelefono";
        Cookies.set('telefonoUsuario', telefono, { expires: 7 });
        

        setIdUsuario(usuario._id); // Actualizar estado
        setNombreUsuario(usuario.nombre);
        setCorreoUsuario(usuario.email);
        setLogueado(true);

        // Obtener el ID del usuario desde la cookie
        const usuarioId = Cookies.get('idUsuario');

        if (usuarioId) {
          // Hacer una consulta para obtener el usuario por ID
          const usuarioResponse = await axios.get(`${API_URL}/${usuarioId}`);

          // Verificar si el usuario tiene teléfono registrado
          if (!usuarioResponse?.data?.telefono) {
            // Si tiene teléfono registrado, redirigir a la página de edición de perfil
            navigate("/EdicionPerfil");            
          } else {
            // Redirección según `siono` y `activarChat`
            if (siono) {
              navigate("/CrearGlamping");
            } else if (activarChat) {
              setActivarChat(false)
              navigate(`/MensajesIndividuales/${idUrlConversacion}`);
            } else if (redirigirExplorado) {
              setRedirigirExplorado(false)
              navigate(UrlActual);
            }             
            else {
              navigate("/");
            }
          }
        }
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setMensaje("El correo ya está registrado. Intentando redirigir...");
        // No es necesario buscar el usuario, ya se manejará dentro de la respuesta
        const usuario = error.response?.data?.usuario;
        if (usuario) {
          Cookies.set('idUsuario', usuario._id, { expires: 7 });
          Cookies.set('nombreUsuario', usuario.nombre, { expires: 7 });
          Cookies.set('correoUsuario', usuario.email, { expires: 7 });
          // Verificar si el teléfono viene vacío o es undefined
          const telefono = usuario.telefono && usuario.telefono.trim() !== "" ? usuario.telefono : "sintelefono";
          Cookies.set('telefonoUsuario', telefono, { expires: 7 });

          setIdUsuario(usuario._id);  // Actualizar el estado con la respuesta
          setNombreUsuario(usuario.nombre);
          setCorreoUsuario(usuario.email);
          setLogueado(true);

          // Obtener el ID del usuario desde la cookie
          const usuarioId = Cookies.get('idUsuario');

          if (usuarioId) {
            // Hacer una consulta para obtener el usuario por ID
            const usuarioResponse = await axios.get(`${API_URL}/${usuarioId}`);

            // Verificar si el usuario tiene teléfono registrado
            if (usuarioResponse?.data?.telefono) {
              // Si tiene teléfono registrado, redirigir a la página de edición de perfil
              navigate("/EdicionPerfil");
            } else {
              // Redirección según `siono` y `activarChat`
              if (siono) {
                navigate("/CrearGlamping");
              } else if (activarChat) {
                setActivarChat(false)
                navigate(`/MensajesIndividuales/${idUrlConversacion}`);
              } else if (redirigirExplorado) {
                setRedirigirExplorado(false)
                navigate(UrlActual);
              } else {
                navigate("/");
              }
            }
          }
        } else {
          manejarError(error);
        }
      } else {
        manejarError(error);
      }
    }
  };

  const handleGoogleError = () => {
    setMensaje("Hubo un error al iniciar sesión con Google. Intenta nuevamente.");
  };

  return (
    <div className="Registro-contenedor">
      <h1 className="Registro-titulo">Ingreso y/o registro</h1>

      {mensaje && <p className="Mensaje-error">{mensaje}</p>}

      <div className="Registro-google">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
};

export default Registro;
