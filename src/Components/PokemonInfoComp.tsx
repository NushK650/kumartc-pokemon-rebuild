import React from 'react';

interface ProcessedPokemonData {
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

interface Props {
  info?: ProcessedPokemonData | null;
}

const PokemonInfoComp: React.FC<Props> = ({ info }) => {
  return (
    <div className="bg-white w-[300px] sm:w-[550px] rounded-[20px] xl:ml-5 pl-5 pt-5 h-[400px] overflow-hidden border-2 border-black font-semibold mt-20 grid gap-5">
      <p>Location: {info?.locationName || "N/A"}</p>
      <p>Element: {info?.types || "N/A"}</p>
      <p>Evolution Chain: {info?.evoChain.join(" → ") || "N/A"}</p>
      <p>Abilities: {info?.abilities || "N/A"}</p>
      <p className="overflow-y-scroll pr-5">Moves: {info?.moves || "N/A"}</p>
    </div>
  );
};

export default PokemonInfoComp;
