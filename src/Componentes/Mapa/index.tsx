import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { GiCampingTent } from "react-icons/gi"; // Ícono
import ReactDOMServer from "react-dom/server";
import "./estilos.css";

interface MapaGlampingsProps {
  lat: number;
  lng: number;
  nombre: string;
}

const MapaGlampings: React.FC<MapaGlampingsProps> = ({ lat, lng, nombre }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  };

  const campingTentIcon = ReactDOMServer.renderToString(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "black",
        color: "gold",
      }}
    >
      <GiCampingTent size={24} />
    </div>
  );

  useEffect(() => {
    if (mapRef.current && !markerRef.current) {
      // Crea un AdvancedMarkerElement
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat, lng },
        map: mapRef.current,
        content: new DOMParser().parseFromString(campingTentIcon, "text/html").body
          .firstChild as HTMLElement, // Convierte el SVG a un elemento HTML
        title: nombre,
      });

      markerRef.current = marker;
    }
  }, [lat, lng, nombre, campingTentIcon]);

  return (
    <div className="mapa-contenedor">
      <h2 className="mapa-titulo">Ubicación del Glamping</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat, lng }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map; // Asigna la referencia del mapa
        }} // Ahora no retorna ningún valor explícito
      />
    </div>
  );
};

export default MapaGlampings;
