'use client'
import React, { useState } from "react";
import { ProcessedPokemonData } from "@/app/page";

type Props = {
  onSearch: (pokemon: string) => void;
  hideFavList: () => void;
  currentPokemon: ProcessedPokemonData | null;
  toggleFavorite: (name: string) => void;

};

const SearchbarComp = ({ onSearch, hideFavList, currentPokemon, toggleFavorite }: Props) => {
  const [input, setInput] = useState('');
  const [switchFavorite, setSwitchFavorite] = useState<boolean>(false);

  const randomPokemon = ()=>{
    const randomId = Math.floor(Math.random() * 1005) + 1; 
    onSearch(randomId.toString()); 
  }

  const handleFavorite = () => {
    if (!currentPokemon?.name) return;
    toggleFavorite(currentPokemon.name.toLowerCase());
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
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
    >
      <button
        type="button"
        onClick={randomPokemon}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
        aria-label="Random Pokemon"
      >
        <img
          className="h-5 sm:h-6"
          src="/assets/icons/Random2.png"
          alt=""
        />
      </button>

      <div className="relative w-full max-w-xl">
        <input
          className="w-full rounded-full border border-black/10 bg-white/80 px-5 py-3 pr-12 text-sm font-semibold shadow-sm outline-none transition focus:border-[#ff7a3c] focus:ring-2 focus:ring-[#ff7a3c]/30"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by name or number"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] text-black/40">
          Enter
        </span>
      </div>

      <button
        type="button"
        onClick={handleFavorite}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#ff7a3c]/10 text-[#ff7a3c] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ff7a3c]/20"
        aria-label="Toggle favorite"
      >
        <img
          className="h-5 sm:h-6"
          src={switchFavorite ? "/assets/icons/pokeball.png" : "/assets/icons/pokeball (1).png"}
          alt=""
        />
      </button>

      <button
        type="button"
        onClick={hideFavList}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        aria-label="Open favorites list"
      >
        <img
          className="h-5 sm:h-6"
          src="/assets/icons/pokedex.png"
          alt=""
        />
      </button>
    </form>
  );
};

export default SearchbarComp;
