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
  const imageSrc = pokemonImg ? images?.defaultImg : images?.shinyImg;
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center rounded-[40px] border border-black/10 bg-white/70 p-8 shadow-sm backdrop-blur animate-[float_6s_ease-in-out_infinite]">
        <div className="absolute -inset-2 rounded-[44px] border border-[#ff7a3c]/30 opacity-70 animate-[glowPulse_4s_ease-in-out_infinite]" />
        {imageSrc ? (
          <img
            className="relative z-10 h-[220px] sm:h-[360px] object-contain"
            src={imageSrc}
            alt="Pokemon"
          />
        ) : (
          <div className="relative z-10 flex h-[220px] w-[220px] items-center justify-center rounded-3xl border border-dashed border-black/20 text-center text-xs uppercase tracking-[0.2em] text-black/40 sm:h-[360px] sm:w-[360px]">
            Awaiting Scan
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setPokemonImg(!pokemonImg)}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/70 shadow-sm transition hover:-translate-y-0.5 hover:text-[#ff7a3c]"
      >
        <img
          className="h-5 w-5"
          src={pokemonImg ? "/assets/icons/starFilled.png" : "/assets/icons/star.png"}
          alt=""
        />
        Toggle Shiny
      </button>
    </div>
  );
};

export default PokemonDisplayComp;
