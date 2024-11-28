import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { GiCampingTent } from "react-icons/gi"; // Importamos el ícono
import ReactDOMServer from "react-dom/server"; // Para convertir JSX a SVG renderizable por Google Maps
import "./estilos.css";

interface MapaGlampingsProps {
  lat: number; // Latitud de la ubicación
  lng: number; // Longitud de la ubicación
  nombre: string; // Nombre del glamping
}

const MapaGlampings: React.FC<MapaGlampingsProps> = ({ lat, lng, nombre }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!, // Usar tu clave API desde variables de entorno
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  };

  // Convertimos el ícono GiCampingTent a un SVG renderizable
  const campingTentIcon = ReactDOMServer.renderToString(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "black", // Fondo negro
        color: "gold", // Color dorado para el ícono
      }}
    >
      <GiCampingTent size={24} />
    </div>
  );

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="mapa-contenedor">
      <h2 className="mapa-titulo">Ubicación del Glamping</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat, lng }}
        zoom={12}
      >
        <Marker
          position={{ lat, lng }}
          title={nombre}
          icon={{
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(campingTentIcon),
            scaledSize: new window.google.maps.Size(40, 40), // Tamaño del ícono
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default MapaGlampings;
