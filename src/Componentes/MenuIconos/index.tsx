import React, { useRef } from 'react';
import { FaUmbrellaBeach, FaTemperatureArrowUp, FaTemperatureArrowDown, FaHotTubPerson, FaCat } from "react-icons/fa6";
import { BsTreeFill } from "react-icons/bs";
import { PiMountainsBold, PiCoffeeBeanFill  } from "react-icons/pi";
import { GiDesert, GiTreehouse, GiHiking, GiRiver, GiWaterfall} from "react-icons/gi";
import { MdCabin, MdOutlinePets, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCaravan } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { GiCampingTent, GiHabitatDome, GiHut,  GiEagleEmblem  } from 'react-icons/gi';
import { useContext } from "react";
import { ContextoApp } from '../../Contexto/index';
import './estilos.css';

const MenuIconos: React.FC = () => {

    const almacenVariables = useContext(ContextoApp);

    if (!almacenVariables) {
    throw new Error("El contexto no está disponible. Asegúrate de envolver el componente en un proveedor de contexto.");
    }

    const { setMostrarFiltros, cantiadfiltrosAplicados,iconoSeleccionado, setIconoSeleccionado,setActivarFiltrosDomo ,
       setActivarFiltrosTienda, setActivarFiltrosCabaña, setActivarFiltrosCasaArbol,
       setActivarFiltrosRemolques, setActivarFiltrosChoza, setActivarFiltrosMascotas, 
       setActivarFiltrosClimaCalido, setActivarFiltrosClimaFrio, setActivarFiltrosPlaya,
       setActivarFiltrosNaturaleza, setActivarFiltrosRio, setActivarFiltrosCascada, setActivarFiltrosMontana,
       setActivarFiltrosDesierto, setActivarFiltrosCaminata, setActivarFiltrosJacuzzi,
       setActivarFiltrosUbicacionBogota,setActivarFiltrosUbicacionMedellin, setActivarFiltrosUbicacionCali} = almacenVariables;

    const iconos = [
        { titulo: "Cerca Bogota", icono: <GiEagleEmblem/> },
        { titulo: "Cerca Medellin", icono: < PiCoffeeBeanFill  /> },
        { titulo: "Cerca Cali", icono: < FaCat  /> },        
        { titulo: "Jacuzzi", icono: <FaHotTubPerson /> },
        { titulo: "Pet Friendly", icono: <MdOutlinePets /> },
        { titulo: "Domo", icono: <GiHabitatDome /> },
        { titulo: "Tienda", icono: <GiCampingTent /> },
        { titulo: "Cabaña", icono: <MdCabin /> },
        { titulo: "Casa del arbol", icono: <GiTreehouse /> },
        { titulo: "Remolque", icono: <FaCaravan /> },
        { titulo: "Choza", icono: <GiHut /> },               
        { titulo: "Clima Calido", icono: <FaTemperatureArrowUp /> },        
        { titulo: "Clima Frio", icono: <FaTemperatureArrowDown /> },
        { titulo: "Playa", icono: <FaUmbrellaBeach /> },
        { titulo: "Naturaleza", icono: <BsTreeFill /> },
        { titulo: "Rio", icono: <GiRiver /> },
        { titulo: "Cascada", icono: <GiWaterfall /> },
        { titulo: "En la montaña", icono: <PiMountainsBold /> },
        { titulo: "Desierto", icono: <GiDesert /> },        
        { titulo: "Caminata", icono: <GiHiking /> },           
    ];

    const contenedorListaRef = useRef<HTMLDivElement | null>(null);

    const desplazarIzquierda = () => {
        if (contenedorListaRef.current) {
            contenedorListaRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const desplazarDerecha = () => {
        if (contenedorListaRef.current) {
            contenedorListaRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    const seleccionarIcono = (indice: number) => {
      setIconoSeleccionado(indice);
          
      // Verifica qué título tiene el ícono seleccionado y aplica las acciones correspondientes
      const titulo = iconos[indice].titulo;
  
      if (titulo === "Domo") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(true);
          setActivarFiltrosMascotas(false);
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false)
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
      } else if (titulo === "Tienda") {
          setActivarFiltrosTienda(true);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false); 
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
      }else if (titulo === "Casa del arbol") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(true);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false); 
          setActivarFiltrosMascotas(false);
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
      }else if (titulo === "Cabaña") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(true);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false); 
          setActivarFiltrosMascotas(false);
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
      }else if (titulo === "Remolque") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(true);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false); 
          setActivarFiltrosMascotas(false);
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
      }else if (titulo === "Choza") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(true);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
      }else if (titulo === "Pet Friendly") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(true); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Clima Calido") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(true);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Clima Frio") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(true);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Playa") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(true);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Naturaleza") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(true);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Rio") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(true);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Cascada") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(true);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "En la montaña") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(true);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Desierto") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(true);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Caminata") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(true);
          setActivarFiltrosJacuzzi(false);
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);
        }else if (titulo === "Jacuzzi") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(true); 
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);                            
        }else if (titulo === "Cerca Bogota") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false); 
          setActivarFiltrosUbicacionBogota(true);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(false);                            
        }else if (titulo === "Cerca Medellin") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false); 
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(true);
          setActivarFiltrosUbicacionCali(false);                            
        }else if (titulo === "Cerca Cali") {
          setActivarFiltrosTienda(false);
          setActivarFiltrosCasaArbol(false);
          setActivarFiltrosCabaña(false);
          setActivarFiltrosRemolques(false);
          setActivarFiltrosChoza(false);
          setActivarFiltrosDomo(false);
          setActivarFiltrosMascotas(false); 
          setActivarFiltrosClimaCalido(false);
          setActivarFiltrosClimaFrio(false);
          setActivarFiltrosPlaya(false);
          setActivarFiltrosNaturaleza(false);
          setActivarFiltrosRio(false);
          setActivarFiltrosCascada(false);
          setActivarFiltrosMontana(false);
          setActivarFiltrosDesierto(false);
          setActivarFiltrosCaminata(false);
          setActivarFiltrosJacuzzi(false); 
          setActivarFiltrosUbicacionBogota(false);
          setActivarFiltrosUbicacionMedellin(false);
          setActivarFiltrosUbicacionCali(true);                            
        }
  }
  
    const manejarClickAbrirFiltros = () => {
      setMostrarFiltros(true); 
      document.body.style.overflow = "hidden";
    };


  return (
    <div className="MenuIconos-contenedor">
      <div className="MenuIconos-contenedor-menuConIcono">
        <div className="MenuIconos-contenedor-menu">
          <div className="MenuIconos-flecha-izquierda" onClick={desplazarIzquierda}>
            <MdOutlineKeyboardArrowLeft />
          </div>

          <div ref={contenedorListaRef} className="MenuIconos-lista-iconos">
            {iconos.map((elemento, indice) => (
              <div
                key={indice}
                className={`MenuIconos-icono-item ${
                  iconoSeleccionado === indice ? "MenuIconos-icono-seleccionado" : ""
                }`}
                onClick={() => seleccionarIcono(indice)}
              >
                <div className="MenuIconos-icono">{elemento.icono}</div>
                <span>{elemento.titulo}</span>
              </div>
            ))}
          </div>

          <div className="MenuIconos-flecha-derecha" onClick={desplazarDerecha}>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="MenuIconos-settings" onClick={manejarClickAbrirFiltros}>
          <div className="MenuIconos-settings-icono">
            <VscSettings />
          </div>
          <span>Filtros</span> 
          {cantiadfiltrosAplicados > 0 && (
            <div className="MenuIconos-badge">{cantiadfiltrosAplicados}</div>
          )}
        </div>
      </div>
    </div>

  );
};

export default MenuIconos;
