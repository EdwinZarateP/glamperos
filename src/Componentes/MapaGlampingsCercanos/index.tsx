import React from "react"; 
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { GiCampingTent } from "react-icons/gi";
import "./estilos.css";

interface Props {
  center: { lat: number; lng: number };
  nearbyCoordinates: { lat: number; lng: number }[];
}

const MapaGlampingsCercanosCercanos: React.FC<Props> = ({ center, nearbyCoordinates }) => {
  // Crear los datos GeoJSON para el óvalo (puede ser un círculo simplificado)
  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            // Ejemplo de un círculo con puntos generados alrededor de la coordenada principal
            Array.from({ length: 36 }, (_, i) => {
              const angle = (i * 10) * (Math.PI / 180); // Dividir 360° en segmentos
              const radius = 0.03; // Radio del círculo (en grados, aproximadamente 5 km)
              return [
                center.lng + radius * Math.cos(angle),
                center.lat + radius * Math.sin(angle),
              ];
            }).concat([[center.lng + 0.05, center.lat]]), // Cerrar el círculo
          ],
        },
        properties: {},
      },
    ],
  };

  // Configuración de la capa para el óvalo
  const layerStyle = {
    id: "circle",
    type: "fill" as const, // Asegúrate de que 'fill' sea un valor específico
    paint: {
      "fill-color": "#8888ff",
      "fill-opacity": 0.4,
    },
  };

  return (
    <div className="MapaGlampingsCercanos-contenedor">
      <h1 className="MapaGlampingsCercanos-titulo">Lugares cercanos</h1>

      <div className="MapaGlampingsCercanos-mapa-container">
        <Map
          mapboxAccessToken="pk.eyJ1IjoiZWR3aW56YXIiLCJhIjoiY200OXd3ZnF4MDFoaDJxcHpwd2lzdGM0ZSJ9.c4C1qbzuCJqKjQ01Jn-2nA"
          initialViewState={{
            latitude: center.lat,
            longitude: center.lng,
            zoom: 16,
            pitch: 30,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          minZoom={6}
          maxZoom={16}
        >
          <NavigationControl position="top-right" />

          {/* Dibujar el óvalo */}
          <Source id="circle-source" type="geojson" data={geoJsonData}>
            <Layer {...layerStyle} />
          </Source>

          {/* Marcar los puntos cercanos */}
          {nearbyCoordinates.map((coord, index) => (
            <Marker
              key={index}
              latitude={coord.lat}
              longitude={coord.lng}
            >
              <GiCampingTent className="MapaGlampingsCercanos-icono" />
            </Marker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default MapaGlampingsCercanosCercanos;
