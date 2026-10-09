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

const TeamSide: React.FC<{ team: TeamRecord }> = ({ team }) => (
  <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
      {team.logo ? (
        <img src={team.logo} alt={team.name} className="h-full w-full object-contain" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-600">
          {team.name.slice(0, 3).toUpperCase()}
        </div>
      )}
    </div>
    <span className="line-clamp-2 min-h-8 w-full break-words text-xs font-semibold text-slate-800">{team.name}</span>
  </div>
);

export const LiveScoreboard: React.FC = () => {
  const [activeLeague, setActiveLeague] = useState<string>(ALL);

  const visibleResults =
    activeLeague === ALL ? allResults : allResults.filter((result) => result.league === activeLeague);

  // Se agrupan por jornada, de la más reciente a la más antigua
  const rounds = Array.from({ length: ROUNDS }, (_, i) => ROUNDS - i)
    .map((round) => {
      const results = visibleResults.filter((result) => result.round === round);
      return { round, date: results[0]?.date, results };
    })
    .filter(({ results }) => results.length > 0);

  return (
    <div className="white-card p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-display flex items-center gap-2 text-xl font-extrabold text-[#0f172a] dark:text-white">
          Resultados
        </h2>
        <div className="flex items-center gap-3 rounded-xl p-2 text-xs">
          {[...leagues.map((l) => l.name), ALL].map((league, index) => {
            const isActive = activeLeague === league;
            return (
              <React.Fragment key={league}>
                {index > 0 && <span className="text-slate-300">|</span>}
                <button
                  onClick={() => setActiveLeague(league)}
                  className={`flex cursor-pointer items-center gap-1 rounded-xl p-2 font-bold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-700 hover:bg-emerald-100 hover:font-extrabold'
                  }`}
                >
                  {league}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {rounds.map(({ round, date, results }, index) => (
        <section key={round}>
          <p
            className={`flex items-center justify-between border-b border-slate-300 pb-3 font-extrabold ${
              index === 0 ? 'mb-5' : 'my-5'
            }`}
          >
            <span>Jornada {round}</span>
            <span className="text-xs font-bold text-slate-500">{date}</span>
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {results.map(({ id, league, home, away, homeScore, awayScore }) => (
              <div
                key={id}
                className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 pb-9"
              >
                <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Jornada {round}</span>
                  <span className="rounded-full bg-red-400 px-2 py-0.5 text-white">Finalizado</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <TeamSide team={home} />
                  <span className="flex h-12 items-center whitespace-nowrap text-2xl font-extrabold text-[#0f172a]">
                    {homeScore} - {awayScore}
                  </span>
                  <TeamSide team={away} />
                </div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-emerald-100 px-4 pt-1 pb-0.5 text-xs font-bold text-emerald-700">
                  {league}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

