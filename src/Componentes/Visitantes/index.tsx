import React, { useContext, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import parejaIcono from "../../Imagenes/pareja.png";
import "./estilos.css";

interface VisitantesProps {
  onCerrar: () => void;
  max_adultos: number;
  max_niños: number;
  max_bebes: number;
  max_mascotas: number;
}

const Visitantes: React.FC<VisitantesProps> = ({ onCerrar, max_adultos, max_niños, max_bebes, max_mascotas }) => {
  const almacenVariables = useContext(ContextoApp);

  if (!almacenVariables) {
    throw new Error(
      "El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto."
    );
  }

  const {
    Cantidad_Adultos,
    setCantidad_Adultos,
    Cantidad_Niños,
    setCantidad_Niños,
    Cantidad_Bebes,
    setCantidad_Bebes,
    Cantidad_Mascotas,
    setCantidad_Mascotas,
    setTotalHuespedes,
  } = almacenVariables;

  const MAX_HUESPEDES = 10;

  // Calcula y actualiza el total de huéspedes
  useEffect(() => {
    const nuevoTotal = Cantidad_Adultos + Cantidad_Niños;
    setTotalHuespedes(nuevoTotal);
  }, [
    Cantidad_Adultos,
    Cantidad_Niños,
    Cantidad_Bebes,
    Cantidad_Mascotas,
    setTotalHuespedes,
  ]);

  // Deshabilitar scroll del fondo al abrir el modal
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const incrementar = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    valor: number,
    limite: number,
    totalActual: number
  ) => {
    if (valor < limite && totalActual < MAX_HUESPEDES) {
      setter(valor + 1);
    }
  };

  const decrementar = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    valor: number,
    esAdulto: boolean = false
  ) => {
    if (esAdulto) {
      if (valor > 1) setter(valor - 1); // Los adultos no pueden bajar a 0
    } else {
      if (valor > 0) setter(valor - 1);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains("Visitantes-overlay")) {
      onCerrar();
    }
  };

  return (
    <div className="Visitantes-overlay" onClick={handleOverlayClick}>
      <div className="Visitantes-contenedor">
        <div className="Visitantes-seccion">
          <div className="Visitantes-titulo">
            <span>Adultos</span>
            <small>Edad: 13 años o más</small>
          </div>
          <div className="Visitantes-controles">
            <button
              className="Visitantes-boton"
              onClick={() =>
                decrementar(setCantidad_Adultos, Cantidad_Adultos, true)
              }
              disabled={Cantidad_Adultos <= 1}
            >
              −
            </button>
            <span>{Cantidad_Adultos}</span>
            <button
              className="Visitantes-boton"
              onClick={() =>
                incrementar(
                  setCantidad_Adultos,
                  Cantidad_Adultos,
                  max_adultos,
                  Cantidad_Adultos + Cantidad_Niños
                )
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="Visitantes-seccion">
          <div className="Visitantes-titulo">
            <span>Niños</span>
            <small>Edades 2 – 12</small>
          </div>
          <div className="Visitantes-controles">
            <button
              className="Visitantes-boton"
              onClick={() => decrementar(setCantidad_Niños, Cantidad_Niños)}
            >
              −
            </button>
            <span>{Cantidad_Niños}</span>
            <button
              className="Visitantes-boton"
              onClick={() =>
                incrementar(
                  setCantidad_Niños,
                  Cantidad_Niños,
                  max_niños,
                  Cantidad_Adultos + Cantidad_Niños
                )
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="Visitantes-seccion">
          <div className="Visitantes-titulo">
            <span>Bebés</span>
            <small>Menos de 2 años</small>
          </div>
          <div className="Visitantes-controles">
            <button
              className="Visitantes-boton"
              onClick={() => decrementar(setCantidad_Bebes, Cantidad_Bebes)}
            >
              −
            </button>
            <span>{Cantidad_Bebes}</span>
            <button
              className="Visitantes-boton"
              onClick={() =>
                incrementar(setCantidad_Bebes, Cantidad_Bebes, max_bebes, 0)
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="Visitantes-seccion">
          <div className="Visitantes-titulo">
            <span>Mascotas</span>
            <small>Tu fiel amigo también lo merece</small>
          </div>
          <div className="Visitantes-controles">
            {max_mascotas === 0 ? (
              <span>No admite mascotas</span>
            ) : (
              <>
                <button
                  className="Visitantes-boton"
                  onClick={() => decrementar(setCantidad_Mascotas, Cantidad_Mascotas)}
                >
                  −
                </button>
                <span>{Cantidad_Mascotas}</span>
                <button
                  className="Visitantes-boton"
                  onClick={() =>
                    incrementar(setCantidad_Mascotas, Cantidad_Mascotas, max_mascotas, 0)
                  }
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>

        <button className="Visitantes-cerrar" onClick={onCerrar}>
          Ellos son los elegidos
        </button>

        <div className="Visitantes-versiculo-contenedor">
          <img
            src={parejaIcono}
            alt="Icono de amistad"
            className="Visitantes-icono-amistad"
          />
          <p className="Visitantes-versiculo">
            Ámense unos a otros con un afecto genuino y deléitense al honrarse
            mutuamente. Romanos 12:10
          </p>
        </div>
      </div>
    </div>
  );
};

export default Visitantes;
