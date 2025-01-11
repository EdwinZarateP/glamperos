import { useContext } from "react";
import { ContextoApp } from "../../Contexto/index";
import "./estilos.css";

interface Props {
  urlVideo?: string; // URL del video de YouTube, ahora es opcional
}

const VerVideo: React.FC<Props> = ({ urlVideo }) => {
  const { verVideo, setVerVideo } = useContext(ContextoApp)!;

  // Función para cerrar el video
  const onCerrar = () => {
    setVerVideo(false); // Cambia el estado de verVideo a false cuando se cierra el video
  };

  // Si no está activado el video o no hay URL, no renderiza nada
  if (!verVideo || !urlVideo) {
    return null;
  }

  // Convertir la URL de YouTube a formato embed
  const videoEmbedUrl = urlVideo.replace("watch?v=", "embed/");

  return (
    <div className="VerVideo-contenedor">
      <div className="VerVideo-video">
        <iframe
          className="VerVideo-iframe"
          src={videoEmbedUrl} // Usar la URL convertida a formato embed
          title="Video de YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button className="VerVideo-boton-cerrar" onClick={onCerrar}>
        X
      </button>
    </div>
  );
};

export default VerVideo
