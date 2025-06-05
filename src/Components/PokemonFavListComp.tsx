'use client'
import React from "react";

type Props = {
  hideFavList: () => void;
  favorites: string[];
  removeFavorite: (name: string) => void;
};

const PokemonFavListComp = ({ hideFavList, favorites, removeFavorite }: Props) => {
  return (
    <section
      className="font-semibold bg-white border-2 border-black rounded-[50px] xl:h-auto sm:w-[200px] w-full fixed col-start-1 p-4 top-10"
      
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px]">POKEDEX</h2>
        <img
          onClick={hideFavList}
          className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] cursor-pointer"
          src="/assets/icons/cancel.png"
          alt="Close"
        />
      </div>

      
      <ul className="space-y-2 max-h-[400px] overflow-y-auto">
  {favorites.map((fav, index) => (
    <li key={index} className="flex justify-between items-center pb-1">
      <span>{fav}</span>
      <img
        src="/assets/icons/cancel.png"
        alt="Remove"
        className="w-[20px] h-[20px] cursor-pointer"
        onClick={() => removeFavorite(fav)}
      />
    </li>
  ))}
</ul>
    </section>
  );
};

export default PokemonFavListComp;
