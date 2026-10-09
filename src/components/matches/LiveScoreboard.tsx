import React, { useState } from 'react';
import { leagues, type TeamRecord } from '../../services/leagueData';

const ALL = 'Todos';
const ROUNDS = 3;

interface MatchResult {
  id: string;
  league: string;
  round: number;
  date: string;
  home: TeamRecord;
  away: TeamRecord;
  homeScore: number;
  awayScore: number;
}

// Generador pseudoaleatorio con semilla: los resultados parecen aleatorios pero no cambian al re-renderizar
const createRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const randomGoals = (random: () => number) => {
  const r = random();
  return r < 0.2 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : r < 0.9 ? 3 : r < 0.97 ? 4 : 5;
};

const formatDate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())} • ${pad(date.getMonth() + 1)} • ${date.getFullYear()}`;
};

// Round-robin (método del círculo): cada jornada enfrenta a todos los equipos una vez
const buildResults = (): MatchResult[] => {
  const random = createRandom(2026);
  const today = new Date();

  return leagues.flatMap(({ name: league, records }) => {
    const rotation = [...records];
    const half = rotation.length / 2;
    const results: MatchResult[] = [];

    for (let round = 0; round < ROUNDS; round++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (ROUNDS - round) * 7);

      for (let i = 0; i < half; i++) {
        results.push({
          id: `${league}-${round}-${i}`,
          league,
          round: round + 1,
          date: formatDate(date),
          home: rotation[i],
          away: rotation[rotation.length - 1 - i],
          homeScore: randomGoals(random),
          awayScore: randomGoals(random),
        });
      }
      rotation.splice(1, 0, rotation.pop() as TeamRecord);
    }
    return results.reverse();
  });
};

const allResults = buildResults();

const LOGO_SIZE = 'h-20 w-20';

const TeamSide: React.FC<{ team: TeamRecord }> = ({ team }) => (
  <div className="flex w-28 shrink-0 flex-col items-center gap-3 text-center">
    <div className={`${LOGO_SIZE} flex shrink-0 items-center justify-center`}>
      {team.logo ? (
        <img src={team.logo} alt={team.name} className="h-full w-full object-contain" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-200 text-lg font-black text-slate-600">
          {team.name.slice(0, 3).toUpperCase()}
        </div>
      )}
    </div>
    <span className="line-clamp-2 min-h-8 text-xs font-extrabold uppercase text-[#0f172a] dark:text-white">
      {team.name}
    </span>
  </div>
);

export const LiveScoreboard: React.FC = () => {
  const [activeLeague, setActiveLeague] = useState<string>(ALL);

  const visibleResults =
    activeLeague === ALL ? allResults : allResults.filter((result) => result.league === activeLeague);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold text-black dark:text-white">
            Resultados
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Marcadores finales de las últimas jornadas de cada liga
          </p>
        </div>
      </div>

      {/* League filter */}
      <div className="my-8 flex flex-wrap items-center gap-2 text-xs">
        {[...leagues.map((l) => l.name), ALL].map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              activeLeague === league
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Grid of Result Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleResults.map(({ id, league, round, date, home, away, homeScore, awayScore }) => (
          <div key={id} className="white-card white-card-hover flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="rounded-xl border border-emerald-400 bg-emerald-100 px-3 py-1.5 text-emerald-700">
                {league}
              </span>
              <span className="text-slate-500 dark:text-slate-400">Jornada {round}</span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <TeamSide team={home} />
              <span className="flex h-20 items-center whitespace-nowrap text-5xl font-black text-[#0f172a] dark:text-white">
                {homeScore}-{awayScore}
              </span>
              <TeamSide team={away} />
            </div>

            <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
