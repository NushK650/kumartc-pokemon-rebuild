import React from 'react';

interface PokemonNameCompProps {
  name?: string;
}

const PokemonNameComp: React.FC<PokemonNameCompProps> = ({ name }) => {
  return (
    <div className="flex justify-center mt-40">
      <h2
        className="bg-white w-[550px] rounded-[20px] pl-5 h-[50px] sm:h-[60px] border-2 border-black font-semibold text-center text-[20px] pt-2 sm:pt-3"
      >
        {name ? name.toUpperCase() : "Pokemon"}
      </h2>
    </div>
  );
};

export default PokemonNameComp;
