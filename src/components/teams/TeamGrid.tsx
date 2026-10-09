import React, { useState } from 'react';
import { Team } from '../../types';
import { leagues } from '../../services/leagueData';
import { Modal } from '../common/Modal';
import { Users, Flame, Crown, MoreHorizontal, ArrowRight } from 'lucide-react';
import '@fontsource-variable/manrope';

const SEASON = '2025/26';
const MAX_POINTS = 30;
const ALL = 'Todos';

// Los logos pueden ser una imagen (ruta/URL) o un emoji
const isImageLogo = (logo: string) => /^(\/|https?:|data:)/.test(logo);

interface LeagueTeam extends Team {
  league: string;
  position: number;
}

const compareStandings = (a: Team, b: Team) =>
  b.points - a.points ||
  b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst) ||
  b.goalsFor - a.goalsFor;

// La posición se calcula dentro de cada liga
const allTeams: LeagueTeam[] = leagues.flatMap(({ name: league, records }) =>
  records
    .map<Team & { league: string }>((record, i) => ({
      id: `${league}-${i}`,
      league,
      name: record.name,
      logo: record.logo ?? '⚽',
      primaryColor: record.primaryColor,
      captainName: record.captainName,
      captainPhone: record.captainPhone,
      playersCount: record.playersCount,
      players: [],
      matchesPlayed: record.wins + record.draws + record.losses,
      wins: record.wins,
      draws: record.draws,
      losses: record.losses,
      goalsFor: record.goalsFor,
      goalsAgainst: record.goalsAgainst,
      points: record.wins * 3 + record.draws,
    }))
    .sort(compareStandings)
    .map((team, i) => ({ ...team, position: i + 1 }))
);

export const TeamGrid: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeLeague, setActiveLeague] = useState<string>(ALL);

  const visibleTeams =
    activeLeague === ALL ? allTeams : allTeams.filter((t) => t.league === activeLeague);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold text-black">
            {/* <Users className="h-6 w-6 text-emerald-700" /> */}
             Equipos & Plantillas de jugadores
          </h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Directorio oficial de capitanes, números de camisas y registros disciplinarios
          </p>
        </div>
      </div>

      {/* League filter */}
      <div className="my-8 flex flex-wrap items-center gap-2 text-xs">
        {[...leagues.map((l) => l.name), ALL].map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={`rounded-xl text-sm px-4 py-2 font-bold transition-colors ${
              activeLeague === league
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {league}
          </button> 
        ))}
        
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleTeams.map((team) => {
          const { position } = team;
          const isLeader = position === 1;
          const progress = Math.min((team.points / MAX_POINTS) * 100, 100);

          return (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`white-card white-card-hover flex cursor-pointer flex-col gap-5 p-6 ${
                isLeader ? 'border-2 border-blue-400' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {isImageLogo(team.logo) ? (
                    <img src={team.logo} alt={team.name} className="h-20 w-20 object-contain" />
                  ) : (
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border text-4xl"
                      style={{
                        borderColor: team.primaryColor,
                        backgroundColor: `${team.primaryColor}15`,
                      }}
                    >
                      {team.logo}
                    </div>
                  )}
                  {isLeader && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-extrabold text-amber-700 uppercase">
                      <Crown className="h-4 w-4" /> Líder
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Más opciones"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-xl bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div>
                <h3 className="font-display text-xl font-black text-[#0f172a] uppercase">
                  {team.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">Capitán: {team.captainName}</p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
                <div>
                  <span className="block text-3xl font-black text-[#0f172a]">
                    {team.playersCount}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Jugadores</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-[#0f172a]">{team.points}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Puntos</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-[#0f172a]">#{position}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Posición</span>
                </div>
              </div>

              <div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: team.primaryColor }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>Temporada {SEASON}</span>
                  <span>
                    {team.points} de {MAX_POINTS} pts
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={`mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-colors ${
                  isLeader
                    ? 'border-[#0f172a] bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'border-slate-200 bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Ver plantilla
                {/* <ArrowRight className="w-4 h-4" /> */}
              </button>
            </div>
          );
        })}
      </div>

      {/* Roster Modal */}
      {selectedTeam && (
        <Modal
          isOpen={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          title={`Plantilla Oficial - ${selectedTeam.name}`}
          subtitle={`Capitán: ${selectedTeam.captainName} • Teléfono: ${selectedTeam.captainPhone}`}
        >
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Jugadores Registrados
            </h4>

            <div className="space-y-2">
              {selectedTeam.players.length === 0 ? (
                <p className="py-4 text-center text-xs text-slate-500">
                  La plantilla completa se encuentra en proceso de validación por la liga.
                </p>
              ) : (
                selectedTeam.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#032e22] font-mono text-sm font-black text-[#a3e635]">
                        #{player.number}
                      </span>
                      <div>
                        <h5 className="font-extrabold text-[#0f172a]">{player.name}</h5>
                        <span className="text-[10px] text-slate-500">{player.position}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Flame className="h-3.5 w-3.5" /> {player.goals} Goles
                      </span>
                      <span className="font-bold text-amber-600">🟨 {player.yellowCards}</span>
                      <span className="font-bold text-rose-600">🟥 {player.redCards}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
