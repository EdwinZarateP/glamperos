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

  const API_URL = "https://glamperosapi.onrender.com/usuarios";

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
      const response = await axios.post(API_URL, datosUsuario);
      setMensaje("¡Registro exitoso!"); // Mensaje de éxito
      console.log("Usuario registrado:", response.data);
    } catch (error: any) {
      manejarError(error);
    } finally {
      setCargando(false);
    }
  };

  // Manejar inicio de sesión con Google
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse | undefined) => {
    if (!credentialResponse?.credential) {
      setMensaje("No se recibió el credencial de Google.");
      return;
    }

    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const nombreUsuario = decoded.name;
      const emailUsuario = decoded.email;

      // Intentar registrar o verificar usuario en la API
      const response = await axios.post(API_URL, {
        nombre: nombreUsuario,
        email: emailUsuario,
        telefono: "",
        clave: "autenticacionGoogle", // Generar clave ficticia
      });

      setMensaje("¡Registro exitoso con Google!");
      console.log("Usuario registrado con Google:", response.data);
    } catch (error: any) {
      manejarError(error);
    }
  };

  const handleGoogleError = () => {
    setMensaje("Hubo un error al iniciar sesión con Google. Intenta nuevamente.");
  };

  // Función para manejar errores
  const manejarError = (error: any) => {
    console.error("Error:", error);
    if (error.response?.data?.detail) {
      setMensaje(
        typeof error.response.data.detail === "string"
          ? error.response.data.detail
          : "Ocurrió un error inesperado."
      );
    } else {
      setMensaje("Hubo un error al registrar. Intenta nuevamente.");
    }
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