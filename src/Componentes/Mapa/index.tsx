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
}

interface MapaGlampingsProps {
  glamping: Glamping; // Ahora recibimos solo un glamping
}

const MapaGlampings: React.FC<MapaGlampingsProps> = ({ glamping }) => {
  const apiKey = "150916424994462a85b859d4177a3cc7"; // Tu API Key de Thunderforest

  // Ícono personalizado
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
      <h2 className="mapa-titulo">Ubicación del Glamping</h2>
      <div className="mapa-wrapper">
        <MapContainer center={glamping.ubicacion} zoom={13} className="mapa-interactivo">
          <TileLayer
            url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${apiKey}`}
            attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          />
          <Marker
            position={glamping.ubicacion}
            icon={createCustomIcon()}
          >
            <Popup>
              <h3>{glamping.nombre}</h3>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaGlampings;
