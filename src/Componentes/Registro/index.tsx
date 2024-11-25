import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./estilos.css";

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [mostrandoClave, setMostrandoClave] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Manejar registro manual
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const datosUsuario = {
      nombre,
      email,
      telefono: celular,
      clave,
    };

    try {
      setCargando(true);
      const response = await axios.post(
        "https://glamperosapi.onrender.com/usuarios",
        datosUsuario
      );

      setMensaje("¡Registro exitoso!"); // Mensaje de éxito
      console.log("Usuario registrado:", response.data);
    } catch (error: any) {
      console.error("Error en el registro:", error);

      if (error.response?.data?.detail) {
        setMensaje(error.response.data.detail); // Mostrar mensaje de error específico
      } else {
        setMensaje("Hubo un error al registrar. Intenta nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  // Manejar inicio de sesión con Google
  const handleGoogleSuccess = (credentialResponse: CredentialResponse | undefined) => {
    if (credentialResponse?.credential) {
      try {
        const decoded: any = jwtDecode(credentialResponse.credential);
        const nombreUsuario: string = decoded.name;
        const emailUsuario: string = decoded.email;

        // Enviar el usuario decodificado a la API para registrarlo
        axios
          .post("https://glamperosapi.onrender.com/usuarios", {
            nombre: nombreUsuario,
            email: emailUsuario,
            telefono: "", // No se obtiene de Google, puedes dejarlo vacío
            clave: "autenticacionGoogle", // Generar una clave ficticia para usuarios de Google
          })
          .then((response) => {
            setMensaje("¡Registro exitoso con Google!");
            console.log("Usuario registrado con Google:", response.data);
          })
          .catch((error) => {
            console.error("Error en el registro con Google:", error);

            if (error.response?.data?.detail) {
              setMensaje(error.response.data.detail); // Mostrar mensaje de error específico
            } else {
              setMensaje("Hubo un error al registrar con Google. Intenta nuevamente.");
            }
          });
      } catch (error) {
        console.error("Error al decodificar el token de Google:", error);
        setMensaje("Hubo un error inesperado al procesar tu cuenta de Google.");
      }
    } else {
      console.log("No se recibió el credencial de Google.");
      setMensaje("No se pudo iniciar sesión con Google.");
    }
  };

  const handleGoogleError = () => {
    console.log("Login con Google falló.");
    setMensaje("Hubo un error al iniciar sesión con Google. Intenta nuevamente.");
  };

  return (
    <div className="Registro-contenedor">
      <h1 className="Registro-titulo">Registro de Usuario</h1>
      {mensaje && <p className="Registro-mensaje">{mensaje}</p>}
      <form className="Registro-formulario" onSubmit={handleSubmit}>
        <div className="Registro-campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Digite nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="Registro-campo">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Digite email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="Registro-campo">
          <label htmlFor="celular">Celular</label>
          <input
            type="tel"
            id="celular"
            placeholder="Digite celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
        </div>
        <div className="Registro-campo">
          <label htmlFor="clave">Clave</label>
          <div className="Registro-clave-contenedor">
            <input
              type={mostrandoClave ? "text" : "password"}
              id="clave"
              placeholder="Digite su clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <button
              type="button"
              className="Registro-mostrar-clave"
              onClick={() => setMostrandoClave(!mostrandoClave)}
            >
              {mostrandoClave ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button type="submit" className="Registro-boton" disabled={cargando}>
          {cargando ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <div className="Registro-google">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>
    </div>
  );
};

export default Registro;