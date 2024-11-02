import { useEffect, useState } from 'react';
import Tarjeta from '../../Componentes/Tarjeta/index';

function Inicio() {
  const [imagenesPokemon, setImagenesPokemon] = useState<string[]>([]); // Tipo especificado como string[]

  useEffect(() => {
    // Función para obtener imágenes de Pokémon usando la PokéAPI
    const fetchPokemonImages = async () => {
      try {
        const pokemonIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; // IDs de los Pokémon (puedes cambiar estos IDs por otros)
        const imagenes = await Promise.all(
          pokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            return data.sprites.other['official-artwork'].front_default; // Imagen oficial de alta calidad
          })
        );
        setImagenesPokemon(imagenes);
      } catch (error) {
        console.error("Error al obtener imágenes de Pokémon:", error);
      }
    };

    fetchPokemonImages();
  }, []);

  return (
    <div>
      <Tarjeta
        imagenes={imagenesPokemon} // Pasa las imágenes obtenidas como prop a Tarjeta
        nombre="Glamperos Paradise"
        ciudad="Medellín"
        precio={150}
        calificacion={4.5}
        favorito={false}
        onFavoritoChange={(nuevoEstado) => console.log('Favorito:', nuevoEstado)}
      />

    </div>
  );
}

export default Inicio;
