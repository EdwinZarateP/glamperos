import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Paginas/App/index";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async"; // 👈 Importar HelmetProvider aquí

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Proveedor de autenticación de Google */}
    <GoogleOAuthProvider clientId="870542988514-rbpof111fdk5vlbn75vi62i06moko46s.apps.googleusercontent.com">
      <HelmetProvider> {/* 👈 Mueve HelmetProvider aquí */}
        <App />
      </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
