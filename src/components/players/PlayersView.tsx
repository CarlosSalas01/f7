import React, { useMemo, useState } from 'react';
import { PlayerCard } from './PlayerCard';
import { allPlayers } from '../../services/playerData';
import { SquadPlayer } from '../../types';
import { Search } from 'lucide-react';

type Posicion = 'Todos' | 'Portero' | 'Defensa' | 'Medio' | 'Delantero';

const POSITIONS: Posicion[] = ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero'];

const POSITION_BADGE_COLORS: Record<string, string> = {
  Todos: '#05AD31',
  Portero: '#05AD31',
  Defensa: '#05AD31',
  Medio: '#05AD31',
  Delantero: '#05AD31',
};

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-2 pb-2 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="lg:shrink-0">
          <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold text-[#111827] dark:text-white">
            {teamName ?? 'Jugadores'}
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {teamName
              ? `Plantilla oficial · ${pool.length} jugadores registrados`
              : `Directorio completo de jugadores registrados en la liga · ${allPlayers.length} jugadores`}
          </p>
        </div>

        {/* Filters (right aligned) */}
        <div className="flex flex-wrap items-center gap-3 lg:ml-auto lg:justify-end">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {POSITIONS.map((pos) => {
              const isActive = activePosition === pos;
              const color = POSITION_BADGE_COLORS[pos];
              return (
                <button
                  key={pos}
                  id={`filter-pos-${pos}`}
                  onClick={() => setActivePosition(pos)}
                  className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: color, borderColor: color }
                      : { color: color, border: `1px solid ${color}33` }
                  }
                >
                  {pos}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="player-search"
              type="search"
              placeholder="Buscar jugador, equipo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-9 text-sm text-[#111827] transition placeholder:text-slate-400 focus:ring-2 focus:ring-[#2FE85F]/50 focus:outline-none dark:border-slate-700 dark:bg-[#162032] dark:text-white"
            />
          </div>

          <span className="text-xs font-semibold whitespace-nowrap text-slate-400">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
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
        <div className="py-20 text-center">
          <p className="text-sm text-slate-400">No se encontraron jugadores con ese criterio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-3">
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
