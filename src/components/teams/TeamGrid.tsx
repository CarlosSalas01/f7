import React, { useEffect, useState } from 'react';
import { Team } from '../../types';
import { leagues } from '../../services/leagueData';
import { getSquad } from '../../services/playerData';
import { PlayersView } from '../players/PlayersView';
import { Crown, ChevronRight } from 'lucide-react';
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
      playersCount: getSquad(record.name).length || record.playersCount,
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

  const squad = selectedTeam ? getSquad(selectedTeam.name) : [];

  useEffect(() => {
    if (!selectedTeam) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTeam(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTeam]);

  const visibleTeams =
    activeLeague === ALL ? allTeams : allTeams.filter((t) => t.league === activeLeague);

  // Rendered inline (not fixed) so the app sidebar stays visible
  if (selectedTeam) {
    return (
      <div className="animate-fadeIn space-y-6">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedTeam(null)}
              className="cursor-pointer rounded text-[#647067] transition-colors hover:text-[#0A4D1A] focus-visible:ring-2 focus-visible:ring-[#0A4D1A] focus-visible:outline-none dark:text-slate-400 dark:hover:text-[#2FE85F]"
            >
              Equipos
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden />
            <span aria-current="page" className="text-[#17211B] dark:text-white">
              {selectedTeam.name}
            </span>
          </nav>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="lg:shrink-0">
              <h1 className="font-display text-3xl font-extrabold text-[#17211B] dark:text-white">
                Plantilla
              </h1>
              <p className="mt-1 text-sm text-[#647067] dark:text-slate-400">
                Gestiona y consulta los jugadores de tu equipo
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-2 rounded-2xl border border-[#E1E8E2] bg-white px-5 py-3 text-xs sm:grid-cols-4 dark:border-slate-700 dark:bg-slate-900">
              {[
                ['Capitán', selectedTeam.captainName],
                ['Teléfono', selectedTeam.captainPhone],
                ['Temporada', SEASON],
                ['Jugadores', String(squad.length)],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="font-semibold text-[#647067] dark:text-slate-400">{label}</dt>
                  <dd className="truncate font-bold text-[#17211B] dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <PlayersView teamName={selectedTeam.name} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-2 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="lg:shrink-0">
          <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold text-[#111827] dark:text-white">
            {/* <Users className="h-6 w-6 text-emerald-700" /> */}
            Equipos
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Directorio oficial de capitanes, números de camisas y registros disciplinarios
          </p>
        </div>

        {/* League filter (right aligned) */}
        <div className="flex flex-wrap items-center gap-2 text-xs lg:ml-auto lg:justify-end">
          {[...leagues.map((l) => l.name), ALL].map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                activeLeague === league
                  ? 'border border-[#2FE85F]/40 bg-[#05AD31] font-extrabold text-white shadow-sm'
                  : 'text-[#05AD31] hover:bg-[#DCEFE1] dark:text-[#DCEFE1] dark:hover:bg-[#05AD31]/50'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
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
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-3">
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
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <h3 className="font-display text-xl font-black text-[#111827] uppercase dark:text-white">
                  {team.name}
                </h3>
                {isLeader && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-extrabold text-amber-700 uppercase">
                    <Crown className="h-4 w-4" /> Líder
                  </span>
                )}
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Capitán: {team.captainName}
                </p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-200 text-center dark:divide-slate-800">
                <div>
                  <span className="block text-3xl font-black text-[#111827] dark:text-white">
                    {team.playersCount}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Jugadores
                  </span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-[#111827] dark:text-white">
                    {team.points}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Puntos
                  </span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-[#111827] dark:text-white">
                    #{position}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Posición
                  </span>
                </div>
              </div>

              <div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: team.primaryColor }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Temporada {SEASON}</span>
                  <span>
                    {team.points} de {MAX_POINTS} pts
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#2FE85F]/30 bg-[#05AD31] py-3 text-sm font-bold text-white transition-all hover:border-[#2FE85F] hover:bg-[#078328] hover:text-white"
              >
                Ver plantilla
                {/* <ArrowRight className="w-4 h-4" /> */}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
