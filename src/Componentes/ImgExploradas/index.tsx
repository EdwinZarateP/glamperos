import { useContext } from "react";
import { ContextoApp } from "../../Contexto/index";
import { FiGrid } from "react-icons/fi";
import VerVideo from "../Video";
import { MdOutlinePets, MdOndemandVideo } from "react-icons/md"; // Importación de iconos
import { useParams, useNavigate } from "react-router-dom";
import "./estilos.css";

interface ImgExploradasProps {
  imagenes: string[];
  Acepta_Mascotas: boolean; // Indica si el glamping acepta mascotas
  video_youtube?: string; 
}

const ImgExploradas: React.FC<ImgExploradasProps> = ({
  imagenes,
  Acepta_Mascotas,
  video_youtube,
}) => {
  const imagenesMostrar = imagenes.slice(0, 5);
  const { glampingId } = useParams<{ glampingId: string }>();
  const { setVerVideo } = useContext(ContextoApp)!;
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (glampingId) {
      navigate(`/ColeccionImagenes/${glampingId}`);
    }
  };

  const handleVideoClick = () => {
    setVerVideo(true);

  };

  return (
    <div className="ImgExploradas-contenedor">
      <div className="ImgExploradas-principal" onClick={handleNavigate}>
        <img src={imagenesMostrar[0]} alt="Imagen principal" />
      </div>
      <div className="ImgExploradas-secundarias">
        {imagenesMostrar.slice(1).map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={`Imagen secundaria ${index + 1}`}
            className="ImgExploradas-imagenSecundaria"
            onClick={handleNavigate}
          />
        ))}
      </div>

      {/* Iconos condicionales */}
      <div className="ImgExploradas-iconos">
        {Acepta_Mascotas && (
          <MdOutlinePets
            className="ImgExploradas-iconoMascotas"
            title="Acepta Mascotas"
          />
        )}
        {video_youtube && 
          video_youtube.trim() !== "No disponible" && 
          video_youtube.trim().toLowerCase() !== "sin video" && (
            <button
              className="ImgExploradas-iconoVideo"
              onClick={handleVideoClick} // Cambié el evento onClick aquí
            >
              <MdOndemandVideo title="Mostrar Video" />
              Video
            </button>
        )}
      </div>

      <button className="ImgExploradas-botonMostrar" onClick={handleNavigate}>
        <FiGrid className="ImgExploradas-icono" /> Mostrar todas las fotos
      </button>

      <VerVideo urlVideo={video_youtube} />
    </div>
  );
};

export default ImgExploradas;
