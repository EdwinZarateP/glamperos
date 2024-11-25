import React, { useState } from "react";
import axios from "axios";
import "./estilos.css";

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [mostrandoClave, setMostrandoClave] = useState(false);
  const [cargando, setCargando] = useState(false);

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
        "https://glamperosapi.onrender.com/usuarios", // URL de tu API
        datosUsuario
      );

      setMensaje("¡Registro exitoso!"); // Mensaje de éxito
      console.log("Usuario registrado:", response.data);
    } catch (error: any) {
      console.error("Error en el registro:", error);

      // Validar si el mensaje de error es un objeto y manejarlo correctamente
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === "string") {
          setMensaje(error.response.data.detail); // Si es un string, lo mostramos directamente
        } else if (typeof error.response.data.detail === "object") {
          // Si es un objeto, lo convertimos a una cadena legible
          const detalles = Object.values(error.response.data.detail)
            .map((msg: any) => msg?.msg || msg) // Tomar los mensajes específicos
            .join(", "); // Concatenarlos
          setMensaje(detalles);
        } else {
          setMensaje("Hubo un error inesperado. Intenta nuevamente.");
        }
      } else {
        setMensaje("Hubo un error al registrar. Intenta nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  const handleGoogleAuth = () => {
    // Redirigir al endpoint de autenticación con Google de tu API
    window.location.href = "https://glamperosapi.onrender.com/auth/google";
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
        <button className="Registro-google-boton" onClick={handleGoogleAuth}>
          Registrarse con Google
        </button>
      </div>
    </div>
  );
};

export default Registro;
