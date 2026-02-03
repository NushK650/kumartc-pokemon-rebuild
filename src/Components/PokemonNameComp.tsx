import React from 'react';

interface PokemonNameCompProps {
  name?: string;
}

const PokemonNameComp: React.FC<PokemonNameCompProps> = ({ name }) => {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white/80 px-6 py-4 shadow-sm backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-black/40">
          Current Entry
        </p>
        <h2 className="font-[family:var(--font-display)] text-3xl sm:text-4xl tracking-wide text-[#1b1b1b]">
          {name ? name.toUpperCase() : "POKEMON"}
        </h2>
      </div>
    </div>
  );
};

export default PokemonNameComp;
