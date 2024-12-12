import React, { useState, useContext } from "react";
import axios from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ContextoApp } from '../../Contexto/index';
import { useNavigate } from "react-router-dom"; // Importar el hook de navegación
import "./estilos.css";

const Registro: React.FC = () => {
  const { setIdUsuario, siono } = useContext(ContextoApp)!; // Accedemos al método para guardar en el contexto
  const [mensaje, setMensaje] = useState<string | null>(null);
  const navigate = useNavigate(); // Crear la función de navegación

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

    let emailUsuario = ""; // Declaramos emailUsuario aquí para asegurar el acceso en todos los bloques de código

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

      if (response.status === 200 && response.data.id_usuario) {
        setIdUsuario(response.data.id_usuario);
      
      // Evaluar si siono es true
      if (siono) {
        navigate("/CrearGlamping");
      } else {
        navigate("/");
      }
      } else {
        if (siono) {
          navigate("/CrearGlamping");
        } else {
          navigate("/");
        }
      }
      
    } catch (error: any) {
      if (error.response?.status === 400) {
        console.log("Correo ya existe");
        setMensaje("El correo ya está registrado. Intentando redirigir...");

        try {
          // Aquí usamos emailUsuario para validar el usuario ya existente
          const errorResponse = await axios.get(`${API_URL}/${emailUsuario}`);
          if (errorResponse?.data?.id_usuario) {
            setIdUsuario(errorResponse.data.id_usuario);
            navigate("/");
          }
        } catch (error) {
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
