import React, { useEffect, useState } from 'react';
import Tarjeta from '../../Componentes/Tarjeta/index';
import './estilos.css';

interface PokemonData {
  nombre: string;
  imagen: string;
}

const ContenedorTarjetas: React.FC = () => {
  const [imagenesPokemon, setImagenesPokemon] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonIds = Array.from({ length: 16 }, (_, index) => index + 1);
        const data = await Promise.all(
          pokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const result = await response.json();
            return {
              nombre: result.name.charAt(0).toUpperCase() + result.name.slice(1),
              imagen: result.sprites.other['official-artwork'].front_default,
            };
          })
        );
        setImagenesPokemon(data);
      } catch (error) {
        console.error("Error al obtener datos de Pokémon:", error);
      }
    };

    fetchPokemonData();
  }, []);

  // Verifica que `imagenesPokemon` tenga datos antes de renderizar las tarjetas
  if (imagenesPokemon.length === 0) {
    return <div>Cargando glamping...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="contenedor-tarjetas">
      <Tarjeta
        imagenesPokemon={imagenesPokemon} 
        ciudad="Medellín"
        precio={150}
        calificacion={4.5}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 1:', nuevoEstado)}
      />
      <Tarjeta
        imagenesPokemon={imagenesPokemon}
        ciudad="Bogotá"
        precio={200}
        calificacion={4.8}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 2:', nuevoEstado)}
      />
      <Tarjeta
        imagenesPokemon={imagenesPokemon}
        ciudad="Cali"
        precio={200}
        calificacion={4.8}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 2:', nuevoEstado)}
      />

      <Tarjeta
        imagenesPokemon={imagenesPokemon}
        ciudad="Armenia"
        precio={200}
        calificacion={4.8}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 2:', nuevoEstado)}
      />
      <Tarjeta
        imagenesPokemon={imagenesPokemon}
        ciudad="Armenia"
        precio={200}
        calificacion={4.8}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 2:', nuevoEstado)}
      />
      <Tarjeta
        imagenesPokemon={imagenesPokemon}
        ciudad="Armenia"
        precio={200}
        calificacion={4.8}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 2:', nuevoEstado)}
      />
      <Tarjeta
        imagenesPokemon={imagenesPokemon}
        ciudad="Armenia"
        precio={200}
        calificacion={4.8}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito en tarjeta 2:', nuevoEstado)}
      />
      
    </div>
  );
};

export default ContenedorTarjetas;
