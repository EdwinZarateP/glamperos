import React, { useContext, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { GiCampingTent } from "react-icons/gi";
import ReactDOMServer from "react-dom/server";
import { ContextoApp } from "../../Contexto";
import "./estilos.css";

interface MapaGlampingsProps {
  lat: number;
  lng: number;
  nombre: string;
}

const MapaGlampings: React.FC<MapaGlampingsProps> = ({ lat, lng, nombre }) => {
  const contexto = useContext(ContextoApp);

  if (!contexto) {
    throw new Error(
      "ContextoApp no está disponible. Asegúrate de envolver el componente en el ProveedorVariables."
    );
  }

  const { libraries } = contexto;

  const mapRef = useRef<google.maps.Map | null>(null);

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as any, // Usa "as any" para evitar el error de tipo.
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      new google.maps.Marker({
        position: { lat, lng },
        map: mapRef.current,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(campingTentIcon),
          scaledSize: new window.google.maps.Size(40, 40),
        },
        title: nombre,
      });
    }
  }, [isLoaded, lat, lng, nombre, campingTentIcon]);

  if (loadError) {
    return <div>Error al cargar el mapa.</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="mapa-contenedor">
      <h2 className="mapa-titulo">Ubicación del Glamping</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat, lng }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{
          disableDefaultUI: true,
        }}
      />
    </div>
  );
};

export default MapaGlampings;

