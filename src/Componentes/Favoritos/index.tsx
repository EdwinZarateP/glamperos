import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tarjeta from "../../Componentes/Tarjeta/index";
import animal from '../../Imagenes/animal.png';
import { useNavigate } from "react-router-dom";
import './estilos.css';

interface Glamping {
  _id: string;
  imagenes: string[];
  ciudad_departamento: string;
  precioEstandar: number;
  descuento?: number;
  calificacion?: number;
  nombreGlamping: string;
  tipoGlamping: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  Acepta_Mascotas: boolean;
  fechasReservadas: string[];
}

const Favoritos: React.FC = () => {
  const [glampings, setGlampings] = useState<Glamping[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const irAInicio = () => {
  navigate("/"); 
  window.location.reload(); 
  };  


  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const idUsuarioCookie = Cookies.get('idUsuario');
        if (!idUsuarioCookie) {
          setError('Usuario no autenticado');
          return;
        }

        // Obtener los IDs de los favoritos del usuario
        const favoritosResponse = await axios.get<string[]>(`https://glamperosapi.onrender.com/favoritos/${idUsuarioCookie}`);
        
        // Verificar si la respuesta es un 404
        if (favoritosResponse.status === 404) {
          setError('Ups, es hora de elegir favoritos');
          return;
        }

        const favoritosIds = favoritosResponse.data;

        if (favoritosIds.length === 0) {
          setError('Ups, es hora de elegir favoritos');
          return;
        }

        // Obtener los detalles de los glampings
        const glampingsResponse = await axios.post<Glamping[]>(
          'https://glamperosapi.onrender.com/glampings/por_ids', favoritosIds
        );

        setGlampings(glampingsResponse.data);
      } catch (err: any) {
        // Si ocurre un error específico de 404, mostrar el mensaje
        if (err.response?.status === 404) {
          setError('Ups, es hora de elegir favoritos');
        } else {
          setError(err.response?.data?.detail || 'Error al cargar los favoritos');
        }
      }
    };

    fetchFavoritos();
  }, []);

  const esFavorito = (glampingId: string, favoritos: string[]) => favoritos.includes(glampingId);

  // Si hay un error, mostramos el mensaje
  if (error) {
    return (
      <div className="favoritos-error-container">
        <div className="favoritos-error">
          {error}
          <img src={animal} alt="Glamperos logo" className="favoritos-logo" onClick={irAInicio} />
        </div>
      </div>
    );
  }

  return (
    <div className="favoritos-contenedor">
      <div className='favoritos-titulo'>
        {glampings.length > 0 ? (
          <>
            <img src={animal} alt="Glamperos logo" className="favoritos-logo-titulo" onClick={irAInicio} />
            <h1>Tu lista de deseos</h1>
            
          </>
        ) : null}
      </div>
      <div className="favoritos-contenedor-tarjetas">
        {/* Aquí ya no es necesario comprobar el length de glampings */}
        {glampings.map((glamping, index) => (
          <Tarjeta
            key={index}
            glampingId={glamping._id}
            imagenes={glamping.imagenes}
            ciudad={glamping.ciudad_departamento}
            precio={glamping.precioEstandar}
            descuento={glamping.descuento}
            calificacion={glamping.calificacion || 0}
            favorito={esFavorito(glamping._id, glampings.map(g => g._id))}
            nombreGlamping={glamping.nombreGlamping}
            tipoGlamping={glamping.tipoGlamping}
            ubicacion={{
              lat: glamping.ubicacion.lat ?? 0,
              lng: glamping.ubicacion.lng ?? 0,
            }}
            onFavoritoChange={(nuevoEstado) =>
              console.log(`Favorito en tarjeta ${index + 1}:`, nuevoEstado)
            }
            Acepta_Mascotas={glamping.Acepta_Mascotas}
            fechasReservadas={glamping.fechasReservadas}
          />
        ))}
        
      </div>
    </div>
  );
};

export default Favoritos;
