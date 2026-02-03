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
      className="fixed right-4 top-24 z-20 w-[min(320px,90vw)] rounded-3xl border border-black/10 bg-white/85 p-5 shadow-lg backdrop-blur animate-[slideUp_400ms_ease-out]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
            Favorites
          </p>
          <h2 className="font-[family:var(--font-display)] text-2xl tracking-wide text-[#1b1b1b]">
            Pokeboard
          </h2>
        </div>
        <button
          type="button"
          onClick={hideFavList}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 shadow-sm transition hover:-translate-y-0.5"
          aria-label="Close favorites"
        >
          <img
            className="h-4 w-4"
            src="/assets/icons/cancel.png"
            alt=""
          />
        </button>
      </div>

      
      <ul className="mt-5 space-y-2 max-h-[360px] overflow-y-auto pr-1 text-sm">
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white/70 px-3 py-2"
            >
              <span className="font-semibold text-black/80">{fav}</span>
              <button
                type="button"
                onClick={() => removeFavorite(fav)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/80 transition hover:bg-[#ff7a3c]/10"
                aria-label={`Remove ${fav}`}
              >
                <img
                  src="/assets/icons/cancel.png"
                  alt=""
                  className="h-3 w-3"
                />
              </button>
            </li>
          ))
        ) : (
          <li className="rounded-2xl border border-black/5 bg-white/70 px-3 py-4 text-center text-black/50">
            No favorites yet.
          </li>
        )}
      </ul>
    </section>
  );
};

export default PokemonFavListComp;
