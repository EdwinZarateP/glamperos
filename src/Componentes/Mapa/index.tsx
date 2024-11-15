import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { GiCampingTent } from "react-icons/gi";
import ReactDOMServer from "react-dom/server";
import "./estilos.css";

// Define las propiedades de los glampings
interface Glamping {
  id: number;
  nombre: string;
  ubicacion: [number, number];
  puntosTuristicosCercanos: string[];
}

interface MapaGlampingsProps {
  glampings: Glamping[];
}

const MapaGlampings: React.FC<MapaGlampingsProps> = ({ glampings }) => {
  const apiKey = "150916424994462a85b859d4177a3cc7"; // Tu API Key de Thunderforest

  // Crea un ícono personalizado con React Icons convertido a HTML
  const createCustomIcon = () =>
    L.divIcon({
      html: ReactDOMServer.renderToString(
        <div className="marcador-icono">
          <GiCampingTent size={24} />
        </div>
      ),
      iconSize: [40, 40],
      className: "custom-leaflet-icon",
    });  

  return (
    <div className="mapa-contenedor">
      <h2 className="mapa-titulo">Tu aventura en el mapa</h2>
      <div className="mapa-wrapper">
        <MapContainer center={[5.5353, -73.3677]} zoom={7} className="mapa-interactivo">
          <TileLayer
            // url={`https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${apiKey}`}
            // url={`https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${apiKey}`}
            // url={`https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${apiKey}`}
            url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${apiKey}`}



            attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          />
          {glampings.map((glamping) => (
            <Marker
              key={glamping.id}
              position={glamping.ubicacion}
              icon={createCustomIcon()} // Usa el ícono personalizado
            >
              <Popup>
                <h3>{glamping.nombre}</h3>
                <p>Puntos turísticos cercanos: {glamping.puntosTuristicosCercanos.join(", ")}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaGlampings;
