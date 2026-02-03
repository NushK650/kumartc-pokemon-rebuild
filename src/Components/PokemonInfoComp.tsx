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
  const types = info?.types ? info.types.split(", ") : [];
  const abilities = info?.abilities ? info.abilities.split(", ") : [];
  const moves = info?.moves ? info.moves.split(", ") : [];
  const evoChain = info?.evoChain ?? [];

  return (
    <div className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur animate-[slideUp_600ms_ease-out]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">Field Notes</p>
          <h3 className="font-[family:var(--font-display)] text-2xl tracking-wide text-[#1b1b1b]">
            Habitat & Traits
          </h3>
        </div>
        <div className="rounded-full border border-black/10 bg-[#0f766e]/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#0f766e]">
          #{info?.id ?? "----"}
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <div className="rounded-2xl border border-black/5 bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-black/40">Location</p>
          <p className="mt-1 text-lg font-semibold text-[#1b1b1b]">
            {info?.locationName || "N/A"}
          </p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-black/40">Types</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {types.length > 0
              ? types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-black/10 bg-[#ff7a3c]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff7a3c]"
                  >
                    {type}
                  </span>
                ))
              : "N/A"}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-black/40">Evolution Line</p>
          <p className="mt-2 text-sm font-semibold text-[#1b1b1b]">
            {evoChain.length > 0 ? evoChain.join(" → ") : "N/A"}
          </p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-black/40">Abilities</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {abilities.length > 0
              ? abilities.map((ability) => (
                  <span
                    key={ability}
                    className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/70"
                  >
                    {ability}
                  </span>
                ))
              : "N/A"}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-black/40">Moves</p>
          <div className="mt-2 max-h-32 overflow-y-auto pr-2 text-sm text-black/70">
            {moves.length > 0 ? moves.join(", ") : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfoComp;
