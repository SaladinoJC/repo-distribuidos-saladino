"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type BasicPokemon = {
  name: string;
  url: string;
};

type Stat = {
  name: string;
  value: number;
};

type PokemonDetail = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  abilities: string[];
  stats: Stat[];
  base_experience: number;
  height: number;
  weight: number;
  url: string;
};

const typeColors: Record<string, string> = {
  normal: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-black",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-300 text-black",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-stone-500 text-white",
  ghost: "bg-indigo-700 text-white",
  dragon: "bg-purple-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-slate-500 text-white",
  fairy: "bg-pink-300 text-black",
};

export default function PokemonPage() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [clicks, setClicks] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const listRes = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
      );
      const list: BasicPokemon[] = listRes.data.results;

      const detailPromises = list.map((p) =>
        axios.get(p.url).then((r) => {
          const d = r.data;
          const image =
            d.sprites?.other?.["official-artwork"]?.front_default ||
            d.sprites?.front_default ||
            null;

          return {
            id: d.id,
            name: d.name,
            image,
            types: d.types.map((t: any) => t.type.name),
            abilities: d.abilities.map((a: any) => a.ability.name),
            stats: d.stats.map((s: any) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
            base_experience: d.base_experience ?? 0,
            height: d.height ?? 0,
            weight: d.weight ?? 0,
            url: p.url,
          } as PokemonDetail;
        })
      );

      const details = await Promise.all(detailPromises);
      setPokemons(details);
      setError(null);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
      setError("No se pudieron cargar los pokemons. Revisá la consola.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleClick = (id: number) => {
    setClicks((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
    const audio = new Audio(audioUrl);
    audio.volume = 0.2;
    audio.play().catch((err) => console.error("Error al reproducir audio:", err));
  };

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const allTypes = Array.from(new Set(pokemons.flatMap((p) => p.types))).sort();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">Listado de Pokémons (Generación 1)</h1>
      <p className="mb-4 text-sm text-gray-600">
        Hacé click en cada tarjeta para escuchar su sonido y ver cuántas veces fue usado.
      </p>

      {/* Buscador */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {loading && <p>Cargando pokemons…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemons.map((p) => {
            const mainType = p.types[0] || "normal";
            const mainColor = typeColors[mainType] || "bg-gray-300 text-black";

            return (
              <li key={p.id}>
                <button
                  onClick={() => handleClick(p.id)}
                  className={`relative w-full text-left p-4 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform ${mainColor}`}
                >
                  {clicks[p.id] && (
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                      {clicks[p.id]}
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center rounded">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          width={96}
                          height={96}
                          style={{
                            objectFit: "contain",
                            maxWidth: "96px",
                            maxHeight: "96px",
                          }}
                        />
                      ) : (
                        <span className="text-xs text-gray-500">sin imagen</span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold capitalize">{p.name}</h3>

                      <p className="text-sm mb-1">
                        <strong>Tipos:</strong>{" "}
                        <span className="inline-flex gap-1 rounded p-1 bg-black mt-1">
                          {p.types.map((t) => (
                            <span
                              key={t}
                              className={`inline-block px-2 py-0.5 rounded text-xs font-medium border border-white ${
                                typeColors[t] || "bg-gray-300 text-black"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </span>
                      </p>

                      <p className="text-sm mb-1">
                        <strong>Base exp:</strong> {p.base_experience} — <strong>Alt:</strong>{" "}
                        {p.height} — <strong>Peso:</strong> {p.weight}
                      </p>

                      <p className="text-sm mb-1">
                        <strong>Habilidades:</strong>{" "}
                        <span className="block h-10 overflow-hidden">{p.abilities.join(", ")}</span>
                      </p>

                      <div className="text-sm">
                        <strong>Stats:</strong>
                        <ul className="list-none ml-0 mt-1">
                          {p.stats.map((s) => (
                            <li key={s.name} className="flex items-center gap-1">
                              <span className="capitalize w-20">{s.name}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded">
                                <div
                                  className="h-2 rounded bg-black"
                                  style={{ width: `${s.value > 100 ? 100 : s.value}%` }}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
