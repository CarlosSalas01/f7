import React, { useMemo, useState } from 'react';
import { PlayerCard } from './PlayerCard';
import { allPlayers } from '../../services/playerData';
import { SquadPlayer } from '../../types';
import { ChevronDown, Search, X } from 'lucide-react';

type Posicion = 'Todos' | 'Portero' | 'Defensa' | 'Medio' | 'Delantero';

const POSITIONS: Posicion[] = ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero'];

interface PlayersViewProps {
  /** Si se indica, el directorio se limita a la plantilla de ese equipo */
  teamName?: string;
  /** Mensaje alternativo cuando el equipo no tiene jugadores registrados */
  emptyMessage?: string;
}

export const PlayersView: React.FC<PlayersViewProps> = ({ teamName, emptyMessage }) => {
  const [search, setSearch] = useState('');
  const [activePosition, setActivePosition] = useState<Posicion>('Todos');
  const [selectedPlayer, setSelectedPlayer] = useState<SquadPlayer | null>(null);

  const pool = useMemo(
    () => (teamName ? allPlayers.filter((p) => p.team === teamName) : allPlayers),
    [teamName]
  );

  const filtered = useMemo(() => {
    return pool.filter((p) => {
      const matchesPos = activePosition === 'Todos' || p.posicion === activePosition;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        p.posicion.toLowerCase().includes(q);
      return matchesPos && matchesSearch;
    });
  }, [pool, search, activePosition]);

  const hasActiveFilters = search.trim() !== '' || activePosition !== 'Todos';

  const clearFilters = () => {
    setSearch('');
    setActivePosition('Todos');
  };

  const countByPosition = useMemo(() => {
    const counts: Record<string, number> = { Todos: pool.length };
    pool.forEach((p) => {
      counts[p.posicion] = (counts[p.posicion] ?? 0) + 1;
    });
    return counts;
  }, [pool]);

  return (
    <div className="space-y-5">
      {!teamName && (
        <div className="px-2">
          <h1 className="font-display text-3xl font-extrabold text-[#17211B] dark:text-white">
            Jugadores
          </h1>
          <p className="mt-1 text-sm text-[#647067] dark:text-slate-400">
            Directorio completo de jugadores registrados en la liga · {allPlayers.length} jugadores
          </p>
        </div>
      )}

      {/* Toolbar: search + position filter + results */}
      <div
        role="search"
        className="flex flex-col gap-3 rounded-2xl border border-[#E1E8E2] bg-white p-3 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="relative min-w-0 flex-1">
          <label htmlFor="player-search" className="sr-only">
            Buscar jugador
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            id="player-search"
            type="search"
            placeholder="Buscar jugador por nombre…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E1E8E2] bg-white py-2.5 pr-4 pl-9 text-sm text-[#17211B] transition-colors placeholder:text-slate-400 hover:border-[#2FE85F] focus:border-[#0A4D1A] focus:ring-2 focus:ring-[#2FE85F]/40 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="relative inline-flex items-center sm:w-56">
          <label htmlFor="position-filter" className="sr-only">
            Filtrar por posición
          </label>
          <select
            id="position-filter"
            value={activePosition}
            onChange={(e) => setActivePosition(e.target.value as Posicion)}
            className={`w-full cursor-pointer appearance-none rounded-xl border bg-white py-2.5 pr-10 pl-4 text-sm font-bold transition-colors outline-none hover:border-[#2FE85F] focus:border-[#0A4D1A] focus:ring-2 focus:ring-[#2FE85F]/40 dark:bg-slate-800 ${
              activePosition === 'Todos'
                ? 'border-[#E1E8E2] text-[#17211B] dark:border-slate-700 dark:text-white'
                : 'border-[#0A4D1A] text-[#0A4D1A] dark:border-[#2FE85F] dark:text-[#2FE85F]'
            }`}
          >
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos}>
                {pos === 'Todos' ? 'Todas las posiciones' : pos} ({countByPosition[pos] ?? 0})
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 h-4 w-4 text-[#0A4D1A] dark:text-[#2FE85F]"
            aria-hidden
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0A4D1A] transition-colors hover:bg-[#DCEFE1] focus-visible:ring-2 focus-visible:ring-[#0A4D1A] focus-visible:outline-none dark:text-[#2FE85F] dark:hover:bg-[#0A4D1A]/40"
          >
            <X className="h-4 w-4" aria-hidden /> Limpiar
          </button>
        )}

        <span
          aria-live="polite"
          className="text-xs font-semibold whitespace-nowrap text-[#647067] sm:ml-auto sm:px-2 dark:text-slate-400"
        >
          {filtered.length} de {pool.length} jugadores
        </span>
      </div>

      <div>
        <div className="my-4 flex items-center justify-between gap-1.5 bg-fuchsia-50 shadow-sm">
          <div className="flex gap-1.5 px-2 my-1.5">
            <div className="border border-amber-300 bg-amber-200 p-3">
              <h1>Posición</h1>
            </div>
            <div className="border border-amber-300 bg-amber-200 p-3">
              <h1>Puntos</h1>
            </div>
            <div className="border border-amber-300 bg-amber-200 p-3">
              <h1>Goles</h1>
            </div>
            <div className="border border-amber-300 bg-amber-200 p-3">
              <h1>Máximo goleador</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Player cards grid */}
      {pool.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-slate-400">
            {emptyMessage ??
              'La plantilla completa se encuentra en proceso de validación por la liga.'}
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#E1E8E2] bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-[#17211B] dark:text-white">
            No se encontraron jugadores con ese criterio
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer rounded-xl bg-[#0A4D1A] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0e5f22] focus-visible:ring-2 focus-visible:ring-[#2FE85F] focus-visible:outline-none"
          >
            Limpiar búsqueda y filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} onClick={(p) => setSelectedPlayer(p)} />
          ))}
        </div>
      )}

      {/* Simple detail overlay (optional quick stats) */}
      {selectedPlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="white-card w-full max-w-md space-y-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <PlayerCard player={selectedPlayer} />

            <div className="grid grid-cols-3 divide-x divide-slate-200 pt-2 text-center dark:divide-slate-800">
              <div>
                <span className="block text-2xl font-black text-[#111827] dark:text-white">
                  {selectedPlayer.matchesPlayed}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  PJ
                </span>
              </div>
              <div>
                <span className="block text-2xl font-black text-[#111827] dark:text-white">
                  {selectedPlayer.goals}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Goles
                </span>
              </div>
              <div>
                <span className="block text-2xl font-black text-[#111827] dark:text-white">
                  {selectedPlayer.assists}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Asistencias
                </span>
              </div>
            </div>

            {selectedPlayer.saves !== undefined && (
              <div className="border-t border-slate-200 pt-3 text-center dark:border-slate-800">
                <span className="block text-2xl font-black text-sky-600">
                  {selectedPlayer.saves}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Atajadas
                </span>
              </div>
            )}

            <p className="text-center text-xs text-slate-400">{selectedPlayer.age} años</p>

            <button
              onClick={() => setSelectedPlayer(null)}
              className="mt-2 w-full rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
