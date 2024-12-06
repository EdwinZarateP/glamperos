import React, { useState } from "react";
import "./estilos.css";

const Paso2D: React.FC = () => {
  const [linkVideo, setLinkVideo] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkVideo(e.target.value);
  };

  // Extraer ID válido de YouTube
  const extraerIdVideo = (url: string) => {
    const regex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const videoId = extraerIdVideo(linkVideo);

  return (
    <div className="Paso2D-contenedor">
      <h1 className="Paso2D-titulo">Comparte tu video promocional</h1>

      <p className="Paso2D-instrucciones">
        Puedes colocar aquí tu video promocional del glamping para que los usuarios lo puedan ver.
      </p>

      {/* Input para capturar el enlace */}
      <div className="Paso2D-input-contenedor">
        <input
          type="text"
          placeholder="Pega tu enlace de YouTube aquí"
          value={linkVideo}
          onChange={handleChange}
          className="Paso2D-input"
        />
      </div>

      {/* Renderizar el iframe solo si tenemos un videoId válido */}
      {videoId && (
        <div className="Paso2D-video-contenedor">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?controls=0&disablekb=1&rel=0&modestbranding=1&showinfo=0`}
            className="Paso2D-video"
            title="Video promocional"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Paso2D;
