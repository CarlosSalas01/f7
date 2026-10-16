import React, { useState } from 'react';
import { leagues, type TeamRecord } from '../../services/leagueData';

const ALL_LEAGUES = 'Todas las ligas';
const ALL_ROUNDS = 'Todas las jornadas';
const ROUNDS = 3;

interface MatchResult {
  id: string;
  league: string;
  round: number;
  date: string;
  rawDate: string;
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

const pad = (n: number) => String(n).padStart(2, '0');

const formatDate = (date: Date) => {
  return `${pad(date.getDate())} • ${pad(date.getMonth() + 1)} • ${pad(date.getFullYear())}`;
};

const toRawDate = (date: Date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
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
          rawDate: toRawDate(date),
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
const availableDates = Array.from(new Set(allResults.map((r) => r.rawDate))).sort();

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
    <span className="line-clamp-2 min-h-8 w-full text-xs font-semibold break-words text-slate-800">
      {team.name}
    </span>
  </div>
);

export const LiveScoreboard: React.FC = () => {
  const [activeLeague, setActiveLeague] = useState<string>(ALL_LEAGUES);
  const [activeRound, setActiveRound] = useState<string>(ALL_ROUNDS);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const leagueFilters = [...leagues.map((l) => l.name), ALL_LEAGUES];
  const roundFilters = [
    ALL_ROUNDS,
    ...Array.from({ length: ROUNDS }, (_, i) => `Jornada ${ROUNDS - i}`),
  ];

  const visibleResults = allResults.filter((result) => {
    const matchesLeague =
      activeLeague === ALL_LEAGUES || activeLeague === 'Todos'
        ? true
        : result.league === activeLeague;

    const matchesRound =
      activeRound === ALL_ROUNDS ? true : `Jornada ${result.round}` === activeRound;

    const matchesDate = !selectedDate ? true : result.rawDate === selectedDate;

    return matchesLeague && matchesRound && matchesDate;
  });

  // Se agrupan por jornada, de la más reciente a la más antigua
  const rounds = Array.from({ length: ROUNDS }, (_, i) => ROUNDS - i)
    .map((round) => {
      const results = visibleResults.filter((result) => result.round === round);
      return { round, date: results[0]?.date, results };
    })
    .filter(({ results }) => results.length > 0);

  return (
    <div className="">
      <div className="flex flex-col justify-between gap-4 px-2 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display flex items-center gap-2 text-3xl font-extrabold text-[#111827] dark:text-white">
            Resultados
            {/* <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> */}
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Visualiza los resultados de los partidos por liga, jornada y fecha
          </p>
        </div>
      </div>
      <div className="white-card p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-6">
            {/* Filtro Liga */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="league-filter"
                className="shrink-0 font-bold text-slate-600 dark:text-slate-300"
              >
                Liga
              </label>

              <div className="relative inline-flex items-center">
                <select
                  id="league-filter"
                  value={activeLeague}
                  onChange={(e) => setActiveLeague(e.target.value)}
                  className="w-44 cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2 pr-10 pl-4 text-sm font-bold text-[#0A4D1A] shadow-sm transition-colors outline-none hover:border-[#2FE85F] focus:border-[#0A4D1A] dark:border-slate-700 dark:bg-slate-800 dark:text-[#2FE85F] dark:focus:border-[#2FE85F]"
                >
                  {leagueFilters.map((league) => (
                    <option key={league} value={league}>
                      {league}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-3 h-4 w-4 text-[#0A4D1A] dark:text-[#2FE85F]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* Filtro Jornada */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="round-filter"
                className="shrink-0 font-bold text-slate-600 dark:text-slate-300"
              >
                Jornada
              </label>

              <div className="relative inline-flex items-center">
                <select
                  id="round-filter"
                  value={activeRound}
                  onChange={(e) => setActiveRound(e.target.value)}
                  className="w-44 cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2 pr-10 pl-4 text-sm font-bold text-[#0A4D1A] shadow-sm transition-colors outline-none hover:border-[#2FE85F] focus:border-[#0A4D1A] dark:border-slate-700 dark:bg-slate-800 dark:text-[#2FE85F] dark:focus:border-[#2FE85F]"
                >
                  {roundFilters.map((round) => (
                    <option key={round} value={round}>
                      {round}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-3 h-4 w-4 text-[#0A4D1A] dark:text-[#2FE85F]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* Filtro Calendario / Fecha */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="date-filter"
                className="shrink-0 font-bold text-slate-600 dark:text-slate-300"
              >
                Fecha
              </label>

              <div className="relative inline-flex items-center">
                <input
                  id="date-filter"
                  type="date"
                  list="match-dates"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-44 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-[#0A4D1A] shadow-sm transition-colors outline-none hover:border-[#2FE85F] focus:border-[#0A4D1A] dark:border-slate-700 dark:bg-slate-800 dark:text-[#2FE85F] dark:focus:border-[#2FE85F]"
                />
                <datalist id="match-dates">
                  {availableDates.map((date) => (
                    <option key={date} value={date} />
                  ))}
                </datalist>

                {selectedDate && (
                  <button
                    type="button"
                    onClick={() => setSelectedDate('')}
                    title="Restablecer filtro de fecha"
                    className="ml-1 cursor-pointer rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700"
                  >
                    <span className="text-xs font-bold">✕</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {rounds.length > 0 ? (
          rounds.map(({ round, date, results }, index) => (
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
                    className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 pb-9 hover:border-emerald-600 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <div className="mb-5 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span>Jornada {round}</span>
                      <span className="rounded-full bg-red-400 px-2 py-0.5 text-white">
                        Finalizado
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 pt-2">
                      <TeamSide team={home} />
                      <span className="flex h-12 items-center text-2xl font-extrabold whitespace-nowrap text-[#111827] dark:text-white">
                        {homeScore} - {awayScore}
                      </span>
                      <TeamSide team={away} />
                    </div>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full border-x border-t border-[#05AD31]/30 bg-[#43bd63] px-4 pt-1 pb-0.5 text-xs font-medium text-white dark:bg-[#0A4D1A] dark:text-[#2FE85F]">
                      {league}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              No se encontraron partidos para los filtros seleccionados.
            </p>
            {(activeLeague !== ALL_LEAGUES || activeRound !== ALL_ROUNDS || selectedDate) && (
              <button
                onClick={() => {
                  setActiveLeague(ALL_LEAGUES);
                  setActiveRound(ALL_ROUNDS);
                  setSelectedDate('');
                }}
                className="mt-3 inline-block cursor-pointer text-xs font-bold text-[#0A4D1A] hover:underline dark:text-[#2FE85F]"
              >
                Restablecer filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
