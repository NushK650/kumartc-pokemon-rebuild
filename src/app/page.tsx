'use client'
import {useEffect, useState } from "react";
import PokemonDisplayComp from "@/Components/PokemonDisplayComp";
import SearchbarComp from "@/Components/SearchbarComp";
import PokemonNameComp from "@/Components/PokemonNameComp";
import PokemonFavListComp from "@/Components/PokemonFavListComp";
import PokemonInfoComp from "@/Components/PokemonInfoComp";

interface PokemonType {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  species: { url: string };
  location_area_encounters: string;
}

export interface ProcessedPokemonData {
  name: string;
  id: number;
  types: string;
  moves: string;
  abilities: string;
  defaultImg: string;
  shinyImg: string;
  locationName: string;
  evoChain: string[];
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);
  const [pokemonInfo, setPokemonInfo] = useState<ProcessedPokemonData | null>(null);
  const [showFavList, setShowFavList] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (name: string) => {
    const storedFavorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyFavorite = storedFavorites.includes(name);
  
    const updatedFavorites = isAlreadyFavorite
      ? storedFavorites.filter(fav => fav !== name)
      : [...storedFavorites, name];
  
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };
  

  const removeFavorite = (nameToRemove: string) => {
    const storedFavorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = storedFavorites.filter(name => name !== nameToRemove);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const getData = async (pokemon: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokemon not found");
      const data: PokemonType = await response.json();

      const locationResponse = await fetch(data.location_area_encounters);
      const locationData = await locationResponse.json();

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();

      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      const evoStage = evolutionData.chain;
      const evoChain = [evoStage.species.name];
      for (let i = 0; i < evoStage.evolves_to.length; i++) {
        evoChain.push(evoStage.evolves_to[i].species.name);
        for (let j = 0; j < evoStage.evolves_to[i].evolves_to.length; j++) {
          evoChain.push(evoStage.evolves_to[i].evolves_to[j].species.name);
        }
      }

      const moveNames = data.moves.map((m) => m.move.name).join(", ");
      const abilitiesNames = data.abilities.map((a) => a.ability.name).join(", ");
      const types = data.types.map((t) => t.type.name).join(", ");
      const defaultImg = data.sprites.other["official-artwork"].front_default;
      const shinyImg = data.sprites.other["official-artwork"].front_shiny;
      const locationName = locationData.length > 0 ? locationData[0].location_area.name.replace(/-/g, " ") : "N/A";

      setPokemonData(data);

      setPokemonInfo({
        name: data.name,
        id: data.id,
        types,
        moves: moveNames,
        abilities: abilitiesNames,
        defaultImg,
        shinyImg,
        locationName,
        evoChain,
      });
    } catch (error: any) {
      console.error("Error fetching pokemon data:", error.message);
      setPokemonData(null);
      setPokemonInfo(null);
    }
  };

 
  const toggleFavList = () => {
    setShowFavList(prev => !prev);
  };

  return (
    <div className="bg-[url(/assets/images/PokemonBackgroundMain.png)] bg-cover bg-gray-100 min-h-screen min-w-screen text-black">
    
    <SearchbarComp
  onSearch={getData}
  hideFavList={toggleFavList}
  currentPokemon={pokemonInfo}
  toggleFavorite={toggleFavorite}
/>
      <PokemonNameComp name={pokemonInfo?.name} />

      {showFavList && (<PokemonFavListComp hideFavList={toggleFavList} favorites={favorites} removeFavorite={removeFavorite} />)}

      <div className="xl:justify-between flex max-xl:flex-col-reverse max-xl:justify-center max-xl:items-center">
        <PokemonInfoComp info={pokemonInfo} />
        <PokemonDisplayComp images={{ defaultImg: pokemonInfo?.defaultImg, shinyImg: pokemonInfo?.shinyImg }} />
      </div>
    </div>
  );
}
