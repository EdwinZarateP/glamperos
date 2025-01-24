import React from "react";
import "./estilos.css";

const NoEncontrado: React.FC = () => {
    return (
        <div className="NoEncontrado-pagina">
            <div className="NoEncontrado-contenido">
                <h1 className="NoEncontrado-titulo">404</h1>
                <p className="NoEncontrado-mensaje">¡Oops! En Glamperos la página que buscas no existe.</p>
                <p className="NoEncontrado-submensaje">Pero no te preocupes, puedes explorar nuestras opciones de glamping y encontrar tu escapada perfecta.</p>
                <a href="/" className="NoEncontrado-boton">Volver al inicio</a>
            </div>
        </div>
    );
};

export default NoEncontrado;