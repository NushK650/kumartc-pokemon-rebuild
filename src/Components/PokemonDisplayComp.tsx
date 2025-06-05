'use client'
import React, { useState } from 'react';

interface Props {
  images?: {
    defaultImg?: string;
    shinyImg?: string;
  };
}

const PokemonDisplayComp: React.FC<Props> = ({ images }) => {
  const [pokemonImg, setPokemonImg] = useState(true)
  return (
    <div className="h-auto flex justify-center justify-items-center mt-20 xl:mr-20">
    <img
      className="h-[200px] sm:h-[400px]"
      
      src={pokemonImg? images?.defaultImg : images?.shinyImg}
    />
    <img
      onClick={()=>setPokemonImg(!pokemonImg)}
      className="h-[70px] cursor-pointer"
      src={pokemonImg? "/assets/icons/starFilled.png" : "/assets/icons/star.png"}
      alt="shiny"
    />
  </div>
  );
};

export default PokemonDisplayComp;
