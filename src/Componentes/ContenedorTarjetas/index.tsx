import React, { useEffect, useState } from "react";
import Tarjeta from "../../Componentes/Tarjeta/index";
import "./estilos.css";

interface GlampingData {
  nombre: string;
  ciudad_departamento: string;
  precio_noche: number;
  calificacion: number | null;
  imagenes: string[];
}

const ContenedorTarjetas: React.FC = () => {
  const [glampings, setGlampings] = useState<GlampingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlampings = async () => {
      const storedData = sessionStorage.getItem("glampingsData");

      if (storedData) {
        setGlampings(JSON.parse(storedData));
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            "https://glamperosapi.onrender.com/glampings/"
          );
          if (!response.ok)
            throw new Error("Error al obtener los datos de la API");
          const data = await response.json();

          const parsedData = data.map((glamping: any) => ({
            nombre: glamping.nombre,
            ciudad_departamento: glamping.ciudad_departamento,
            precio_noche: glamping.precio_noche,
            calificacion: glamping.calificacion,
            imagenes: glamping.imagenes,
          }));

          sessionStorage.setItem(
            "glampingsData",
            JSON.stringify(parsedData)
          );

          setGlampings(parsedData);
        } catch (error) {
          console.error("Error al obtener glampings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGlampings();
  }, []);

  if (loading) {
    return (
      <div className="contenedor-tarjetas">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="tarjeta-skeleton">
            <div className="tarjeta-skeleton-imagen" />
            <div className="tarjeta-skeleton-info">
              <div className="tarjeta-skeleton-linea" />
              <div className="tarjeta-skeleton-linea corta" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (glampings.length === 0) {
    return <div>No se encontraron glampings.</div>;
  }

  return (
    <div className="contenedor-tarjetas">
      {glampings.map((glamping, index) => (
        <Tarjeta
          key={index}
          imagenes={glamping.imagenes}
          ciudad={glamping.ciudad_departamento}
          precio={glamping.precio_noche}
          calificacion={glamping.calificacion || 0}
          favorito={false}
          nombreGlamping={glamping.nombre}
          onFavoritoChange={(nuevoEstado) =>
            console.log(`Favorito en tarjeta ${index + 1}:`, nuevoEstado)
          }
        />
      ))}
    </div>
  );
};

export default ContenedorTarjetas;
