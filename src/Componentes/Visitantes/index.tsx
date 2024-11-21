import React, { useContext, useEffect } from "react";
import { ContextoApp } from "../../Contexto/index";
import parejaIcono from "../../Imagenes/pareja.png";
import "./estilos.css";

interface VisitantesProps {
  onCerrar: () => void;
}

const Visitantes: React.FC<VisitantesProps> = ({ onCerrar }) => {
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

  const limites = {
    adultos: 15,
    niños: 15,
    bebes: 5,
    mascotas: 5,
  };

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

  const incrementar = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    valor: number,
    limite: number
  ) => {
    if (valor < limite) setter(valor + 1);
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

  return (
    <div className="Visitantes-contenedor">
      <div className="Visitantes-seccion">
        <div className="Visitantes-titulo">
          <span>Adultos</span>
          <small>Edad: 13 años o más</small>
        </div>
        <div className="Visitantes-controles">
          <button
            className="Visitantes-boton"
            onClick={() => decrementar(setCantidad_Adultos, Cantidad_Adultos, true)}
            disabled={Cantidad_Adultos <= 1} // Deshabilitar si hay 1 adulto
          >
            −
          </button>
          <span>{Cantidad_Adultos}</span>
          <button
            className="Visitantes-boton"
            onClick={() =>
              incrementar(setCantidad_Adultos, Cantidad_Adultos, limites.adultos)
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
              incrementar(setCantidad_Niños, Cantidad_Niños, limites.niños)
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
              incrementar(setCantidad_Bebes, Cantidad_Bebes, limites.bebes)
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="Visitantes-seccion">
        <div className="Visitantes-titulo">
          <span>Mascotas</span>
          <small>¿Traes a un animal de servicio?</small>
        </div>
        <div className="Visitantes-controles">
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
              incrementar(setCantidad_Mascotas, Cantidad_Mascotas, limites.mascotas)
            }
          >
            +
          </button>
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
  );
};

export default Visitantes;
