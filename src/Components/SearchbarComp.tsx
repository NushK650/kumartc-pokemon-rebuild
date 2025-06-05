'use client'
import React, { useState } from "react";
import { ProcessedPokemonData } from "@/app/page";

type Props = {
  onSearch: (pokemon: string) => void;
  hideFavList: () => void;
  currentPokemon: ProcessedPokemonData | null;

};

const SearchbarComp = ({ onSearch, hideFavList, currentPokemon }: Props) => {
  const [input, setInput] = useState('');
  const [switchFavorite, setSwitchFavorite] = useState<boolean>(true);

  const randomPokemon = ()=>{
    const randomId = Math.floor(Math.random() * 1005) + 1; 
    onSearch(randomId.toString()); 
  }

  const handleFavorite = () => {
    if (!currentPokemon || !currentPokemon.name) return;
  
    const storedFavorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
  
    const currentName = currentPokemon.name.toLowerCase();
    const isAlreadyFavorite = storedFavorites.includes(currentName);
  
    let updatedFavorites: string[];
  
    if (isAlreadyFavorite) {
      updatedFavorites = storedFavorites.filter(name => name !== currentName);
    } else {
      updatedFavorites = [...storedFavorites, currentName];
    }
  
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSwitchFavorite(!switchFavorite);
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (trimmed) {
      onSearch(trimmed);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-1 sm:gap-5 pt-5 mr-2 ml-2"
    >
      <img
        className="h-[25px] sm:h-[35px] cursor-pointer"
        onClick={randomPokemon}
        src="/assets/icons/Random2.png"
        alt="Random"
      />
      <input
        className="bg-white w-[450px] rounded-[50px] pl-5 h-[30px] sm:h-[40px] border-2 border-black font-semibold"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search"
      />
      <img
        className="h-[25px] sm:h-[35px] cursor-pointer"
        src={switchFavorite ? "/assets/icons/pokeball.png" : "/assets/icons/pokeball (1).png"}
        onClick={handleFavorite}
        alt="Favorites"
      />
      <img
        onClick={hideFavList}
        className="h-[25px] sm:h-[35px] cursor-pointer"
        src="/assets/icons/pokedex.png"
        alt="Favorites List"
      />
    </form>
  );
};

export default SearchbarComp;
