import React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";  // Importar el control de navegación
import 'mapbox-gl/dist/mapbox-gl.css';
import { GiCampingTent } from "react-icons/gi";  // Importar el ícono
import "./estilos.css";

// Definimos las propiedades que el componente va a recibir
interface Props {
  lat: number;
  lng: number;
}

const MapaGlampings: React.FC<Props> = ({ lat, lng }) => {
  return (
    <div className="MapaGlampings-contenedor">
      {/* Título agregado */}
      <h1 className="MapaGlampings-titulo">Tu lugar en el mapa</h1>
      
      <div className="MapaGlampings-mapa-container">
        <Map
          mapboxAccessToken="pk.eyJ1IjoiZWR3aW56YXIiLCJhIjoiY200OXd3ZnF4MDFoaDJxcHpwd2lzdGM0ZSJ9.c4C1qbzuCJqKjQ01Jn-2nA"
          initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom: 10,
            pitch: 30,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          minZoom={6}  // Establecer zoom mínimo
          maxZoom={13}  // Establecer zoom máximo
          scrollZoom={false}  // Desactivar el desplazamiento con la rueda del mouse
        >
          {/* Agregar el control de navegación */}
          <NavigationControl position="top-right" />
          
          <Marker latitude={lat} longitude={lng}>
            <GiCampingTent className="MapaGlampings-icono" />  {/* Usar la clase CSS */}
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default MapaGlampings;
