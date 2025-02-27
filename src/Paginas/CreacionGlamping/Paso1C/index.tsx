import React, { useState, useContext } from "react";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import { GiCampingTent } from "react-icons/gi"; // Importar el ícono
import { ContextoApp } from "../../../Contexto";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import "mapbox-gl/dist/mapbox-gl.css";
import "./estilos.css";

interface Coordenadas {
  lat: number;
  lng: number;
}

const Paso1C: React.FC = () => {
  const { latitud, setLatitud, longitud, setLongitud, setUbicacion, direccion, setDireccion} = useContext(ContextoApp)!; // Extraer las funciones del contexto

  const [coordenadas, setCoordenadas] = useState<Coordenadas>({
    lat: latitud,
    lng: longitud,
  });

  const [viewState, setViewState] = useState({
    latitude: latitud,
    longitude: longitud,
    zoom: 10,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "co" }, // Limitar a Colombia
    },
    debounce: 300,
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setSelectedIndex(null);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      setCoordenadas({ lat, lng });
      setViewState((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        zoom: 14,
      }));

      // Guardar las coordenadas en el contexto global
      setLatitud(lat);
      setLongitud(lng);
      const nuevaUbicacion = JSON.stringify({ lat: lat, lng: lng });
      setUbicacion(nuevaUbicacion);

      // Guardar la dirección completa
      const direccionCompleta = results[0].formatted_address;
      setDireccion(direccionCompleta);

    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
    }
  };

  const handleMarkerDragEnd = async (event: any) => {
    const { lngLat } = event;

    const nuevaCoordenadas = {
      lat: lngLat.lat,
      lng: lngLat.lng,
    };

    setCoordenadas(nuevaCoordenadas);
    setViewState((prev) => ({
      ...prev,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    }));

    // Guardar las coordenadas en el contexto global
    setLatitud(lngLat.lat);
    setLongitud(lngLat.lng);
    const nuevaUbicacion = JSON.stringify(nuevaCoordenadas);
    setUbicacion(nuevaUbicacion);

    try {
      // Obtener la dirección completa desde las nuevas coordenadas
      const results = await getGeocode({ location: nuevaCoordenadas });
      const direccionCompleta = results[0].formatted_address;

      // Guardar la dirección completa
      setDireccion(direccionCompleta);

    } catch (error) {
      console.error("Error al obtener la dirección:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value, true);
    setSelectedIndex(null); // Resetear índice seleccionado al escribir
  };

  const clearInput = () => {
    setValue("");
    clearSuggestions();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (status === "OK" && data.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
      } else if (e.key === "Enter" && selectedIndex !== null) {
        handleSelect(data[selectedIndex].description);
      }
    }
  };

  return (
    <div className="Paso1C-contenedor">
      <h1 className="Paso1C-titulo">¿Dónde se encuentra tu Glamping?</h1>

      <div className="Paso1C-busqueda">
        <div className="Paso1C-input-contenedor">
          <input
            type="text"
            placeholder="Escribe una dirección, un municipio o una ciudad"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="Paso1C-input"
            disabled={!ready}
          />
          {value && (
            <button className="Paso1C-clear" onClick={clearInput}>
              x
            </button>
          )}
        </div>

        {status === "OK" && (
          <ul className="Paso1C-sugerencias">
            {data.map(({ place_id, description }, index) => (
              <li
                key={place_id}
                className={`Paso1C-sugerencia ${index === selectedIndex ? "seleccionado" : ""}`}
                onClick={() => handleSelect(description)}
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="Paso1C-mapa-contenedor">
        <Map
          mapboxAccessToken="pk.eyJ1IjoiZWR3aW56YXIiLCJhIjoiY200OXd3ZnF4MDFoaDJxcHpwd2lzdGM0ZSJ9.c4C1qbzuCJqKjQ01Jn-2nA"
          {...viewState}
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onMove={(evt) => setViewState(evt.viewState)}
        >
          <NavigationControl position="top-right" />
          <GeolocateControl position="top-left" />

          <Marker
            latitude={coordenadas.lat}
            longitude={coordenadas.lng}
            draggable
            onDragEnd={handleMarkerDragEnd}
          >
            <div className="Paso1C-marcador">
              <GiCampingTent size={35} color="black" />
            </div>
          </Marker>
        </Map>
      </div>

      <div className="Paso1C-coordenadas">
        <p>"Arrastra y suelta el ícono del glamping si requieres mayor exactitud"</p>
        <p><strong>Dirección seleccionada:</strong> {direccion}</p>
      </div>
    </div>
  );
};

export default Paso1C;
