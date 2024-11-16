import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { GiCampingTent } from "react-icons/gi";
import ReactDOMServer from "react-dom/server";
import "./estilos.css";

const MapaAmpliado: React.FC = () => {
  const apiKey = "150916424994462a85b859d4177a3cc7";

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
    <div className="mapa-ampliado-contenedor">
      <MapContainer center={[5.5353, -73.3677]} zoom={7} className="mapa-ampliado">
        <TileLayer
          url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${apiKey}`}
          attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        />
        <Marker
          position={[5.5353, -73.3677]}
          icon={createCustomIcon()}
        >
          <Popup>Tu ubicación ampliada</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaAmpliado;
