import { useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import Cookies from 'js-cookie';
import "./estilos.css";

const MenuUsuario: React.FC = () => {
  const navigate = useNavigate();
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const { mostrarMenuUsuarios, setMostrarMenuUsuarios } = almacenVariables;
  const nombreUsuarioCookie = Cookies.get('nombreUsuario');
  // const idUsuarioCookie = Cookies.get('idUsuario');

  // Referencia al contenedor del menú
  const menuRef = useRef<HTMLDivElement>(null);

  // Función para manejar el cierre de sesión
  const cerrarSesion = () => {
    // Remover las cookies
    Cookies.remove('nombreUsuario');
    Cookies.remove('idUsuario');

    // Actualizar el estado para ocultar el menú
    setMostrarMenuUsuarios(false);

    // Redirigir al inicio y recargar la página
    navigate("/");
    window.location.reload();
  };

  // Función para detectar clics fuera del menú
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMostrarMenuUsuarios(false);
    }
  };

  // Agregar el event listener cuando el componente se monte
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Si mostrarMenuUsuarios es falso, no renderizamos nada
  if (!mostrarMenuUsuarios) {
    return null;
  }

  return (
    <div ref={menuRef} className="MenuUsuario-contenedor">
      <ul className="MenuUsuario-lista">
        {nombreUsuarioCookie && (
          <>
            <li className="MenuUsuario-opcion" onClick={() => navigate("/mensajes")}>
              Mensajes
            </li>
            <li className="MenuUsuario-opcion" onClick={() =>{navigate("/ListaDeseos"), setMostrarMenuUsuarios(false)}}>
              Lista de favoritos
            </li>
            <li className="MenuUsuario-opcion" onClick={() => navigate("/Modificacion/6765ec4dd88a28903688b6e8")}>
              Cuenta
            </li>
          </>
        )}
        <li className="MenuUsuario-opcion" onClick={() => navigate("/centro-ayuda")}>
          Centro de ayuda
        </li>
        <li
          className="MenuUsuario-opcion"
          onClick={() => {
            nombreUsuarioCookie ? cerrarSesion() : (navigate("/Registrarse"), setMostrarMenuUsuarios(false));
          }}
        >
          {nombreUsuarioCookie ? "Cerrar sesión" : "Registro/Iniciar sesión"}
        </li>
      </ul>
    </div>
  );
};

export default MenuUsuario;
