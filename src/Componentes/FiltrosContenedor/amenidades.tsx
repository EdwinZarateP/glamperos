import "./amenidades.css";

interface FiltrosAmenidadesProps {
  amenidadesGlobalFiltrado: string[];
  setAmenidadesGlobalFiltrado: React.Dispatch<React.SetStateAction<string[]>>;
  handleAmenidadesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FiltrosAmenidades: React.FC<FiltrosAmenidadesProps> = ({
  amenidadesGlobalFiltrado,
  handleAmenidadesChange,
}) => {
  return (
    <div className="FiltrosAmenidades-container">
      <label className="FiltrosAmenidades-label">Amenidades</label>
      <div className="FiltrosAmenidades-option">
        <input
          type="checkbox"
          value="Wifi"
          checked={amenidadesGlobalFiltrado.includes("Wifi")}
          onChange={handleAmenidadesChange}
          className="FiltrosAmenidades-checkbox"
        />
        <label className="FiltrosAmenidades-checkbox-label">Wifi</label>
      </div>
      <div className="FiltrosAmenidades-option">
        <input
          type="checkbox"
          value="Lavadora"
          checked={amenidadesGlobalFiltrado.includes("Lavadora")}
          onChange={handleAmenidadesChange}
          className="FiltrosAmenidades-checkbox"
        />
        <label className="FiltrosAmenidades-checkbox-label">Lavadora</label>
      </div>
      <div className="FiltrosAmenidades-option">
        <input
          type="checkbox"
          value="Jacuzzi"
          checked={amenidadesGlobalFiltrado.includes("Jacuzzi")}
          onChange={handleAmenidadesChange}
          className="FiltrosAmenidades-checkbox"
        />
        <label className="FiltrosAmenidades-checkbox-label">Jacuzzi</label>
      </div>
      <div className="FiltrosAmenidades-option">
        <input
          type="checkbox"
          value="Tv"
          checked={amenidadesGlobalFiltrado.includes("Tv")}
          onChange={handleAmenidadesChange}
          className="FiltrosAmenidades-checkbox"
        />
        <label className="FiltrosAmenidades-checkbox-label">Tv</label>
      </div>
    </div>
  );
};

export default FiltrosAmenidades;
