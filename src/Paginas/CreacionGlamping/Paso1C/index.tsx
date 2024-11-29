import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./estilos.css";

const Paso1C: React.FC = () => {
  const [posicion, setPosicion] = useState<{ lat: number; lng: number }>({
    lat: 4.570868, // Coordenadas iniciales (Colombia)
    lng: -74.297333,
  });

  const mapContainerStyle = { width: "100%", height: "400px" };
  const center = posicion;

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "co" }, // Restringe las búsquedas a Colombia
    },
    debounce: 300,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setPosicion({ lat, lng });
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value, true);
  };

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setPosicion({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  return (
    <div className="Paso1C-contenedor">
      <h1 className="Paso1C-titulo">¿Dónde se encuentra tu espacio?</h1>
      <p className="Paso1C-descripcion">
        Solo compartiremos tu dirección con los huéspedes que hayan hecho una
        reservación.
      </p>

      {/* Campo de búsqueda con autocompletado */}
      <div className="Paso1C-buscador">
        <input
          type="text"
          placeholder="Ingresa tu dirección"
          className="Paso1C-input"
          value={value}
          onChange={handleInputChange}
          disabled={!ready}
        />
        {status === "OK" && (
          <ul className="Paso1C-sugerencias">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                className="Paso1C-sugerencia"
                onClick={() => handleSelect(description)}
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mapa */}
      <div className="Paso1C-mapa">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={16}>
          <Marker position={posicion} draggable={true} onDragEnd={handleDragEnd} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Paso1C;
