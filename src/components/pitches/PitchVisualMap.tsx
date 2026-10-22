import React, { useState } from 'react';
import type { Pitch, Booking } from '../../types';
import { teamLogos } from '@/assets/teams/logos';

const {
  Arsenal,
  Brentford,
  Cheelsea: Chelsea,
  Liverpool,
  Manchester_city: ManCity,
  Manchester_United: ManUnited,
  Tottenham,
  Barcelona,
  Real_Madrid: RealMadrid,
  Atletico: AtleticoMadrid,
  Sevilla,
  Levante,
  Betis: RealBetis,
  Athletic: AthleticBilbao,
  Villarreal,
  Celta: CeltaVigo,
  Malaga,
  Bayern,
  Dortmund,
  Frankfurt,
  Hamburgo,
  Koln,
  Leipzig,
  Leverkusen,
  Mainz,
  Monchen,
  Stuttgart,
} = teamLogos;

interface PitchVisualMapProps {
  pitches: Pitch[];
  bookings: Booking[];
  onSelectPitch: (pitch: Pitch) => void;
}

interface TeamInfo {
  name: string;
  logo: string;
}

type Matchup = { home: TeamInfo; away: TeamInfo; league: string };

interface Fixture extends Matchup {
  time: string;
  pitch: number;
}

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] as const;
type Day = (typeof days)[number];
const ALL_DAYS = 'Todos los días';

const FIRST_HOUR = 18;
const PITCH_COUNT = 2;
const DEFAULT_LEAGUE_ONE = 'League One';
const DEFAULT_LEAGUE_TWO = 'League Two';
const DEFAULT_LEAGUE_THREE = 'League Three';
const LEAGUES = [DEFAULT_LEAGUE_ONE, DEFAULT_LEAGUE_TWO, DEFAULT_LEAGUE_THREE];
const ALL_LEAGUES = 'Todas las ligas';
const CANCHA1 = 'Cancha 1';
const CANCHA2 = 'Cancha 2';
const CANCHA3 = 'Cancha 3';

const leagueTeams: Record<string, TeamInfo[]> = {
  [DEFAULT_LEAGUE_ONE]: [
    { name: 'Arsenal', logo: Arsenal },
    { name: 'Brentford', logo: Brentford },
    { name: 'Chelsea', logo: Chelsea },
    { name: 'Liverpool', logo: Liverpool },
    { name: 'Man City', logo: ManCity },
    { name: 'Man United', logo: ManUnited },
    { name: 'Tottenham', logo: Tottenham },
  ],
  [DEFAULT_LEAGUE_TWO]: [
    { name: 'Barcelona', logo: Barcelona },
    { name: 'Real Madrid', logo: RealMadrid },
    { name: 'Atlético Madrid', logo: AtleticoMadrid },
    { name: 'Sevilla', logo: Sevilla },
    { name: 'Levante', logo: Levante },
    { name: 'Real Betis', logo: RealBetis },
    { name: 'Athletic Bilbao', logo: AthleticBilbao },
    { name: 'Villarreal', logo: Villarreal },
    { name: 'Celta Vigo', logo: CeltaVigo },
    { name: 'Málaga', logo: Malaga },
  ],
  [DEFAULT_LEAGUE_THREE]: [
    { name: 'Bayern München', logo: Bayern },
    { name: 'Dortmund', logo: Dortmund },
    { name: 'Frankfurt', logo: Frankfurt },
    { name: 'Hamburgo', logo: Hamburgo },
    { name: 'FC Köln', logo: Koln },
    { name: 'RB Leipzig', logo: Leipzig },
    { name: 'Leverkusen', logo: Leverkusen },
    { name: 'Mainz 05', logo: Mainz },
    { name: "M'gladbach", logo: Monchen },
    { name: 'Stuttgart', logo: Stuttgart },
  ],
};

// Cantidad de partidos que se juegan por día en cada liga
const MATCHES_PER_DAY: Record<string, number> = {
  [DEFAULT_LEAGUE_ONE]: 3,
  [DEFAULT_LEAGUE_TWO]: 3,
  [DEFAULT_LEAGUE_THREE]: 3,
};

// Partidos adicionales por día. Se agregan después de los automáticos,
// por ejemplo: Lunes: [{ home: leagueTeams[DEFAULT_LEAGUE_TWO][0], away: leagueTeams[DEFAULT_LEAGUE_TWO][3], league: DEFAULT_LEAGUE_TWO }]
const extraMatchups: Partial<Record<Day, Matchup[]>> = {};

// Round-robin (método del círculo) por liga: cada día se juega una jornada distinta
// y solo se programan los primeros MATCHES_PER_DAY partidos de esa jornada.
const buildLeagueMatchups = (league: string, dayIndex: number): Matchup[] => {
  const rotation: (TeamInfo | null)[] = [...leagueTeams[league]];
  if (rotation.length % 2 !== 0) rotation.push(null);
  const half = rotation.length / 2;

  for (let round = 0; round < dayIndex; round++) {
    rotation.splice(1, 0, rotation.pop() as TeamInfo | null);
  }

  const matches: Matchup[] = [];
  for (let i = 0; i < half; i++) {
    const home = rotation[i];
    const away = rotation[rotation.length - 1 - i];
    if (home && away) matches.push({ home, away, league });
  }
  return matches.slice(0, MATCHES_PER_DAY[league]);
};

const buildMatchups = (): Matchup[][] =>
  days.map((day, dayIndex) => [
    ...LEAGUES.flatMap((league) => buildLeagueMatchups(league, dayIndex)),
    ...(extraMatchups[day] ?? []),
  ]);

// Hora y cancha se asignan según el orden: 2 canchas por hora desde las 18:00
const fixturesByDay: Fixture[][] = buildMatchups().map((matchups) =>
  matchups.map((matchup, i) => ({
    ...matchup,
    time: `${FIRST_HOUR + Math.floor(i / PITCH_COUNT)}:00`,
    pitch: (i % PITCH_COUNT) + 1,
  }))
);

export const PitchVisualMap: React.FC<PitchVisualMapProps> = () => {
  const [activeLeague, setActiveLeague] = useState<string>(ALL_LEAGUES);
  const [activeDay, setActiveDay] = useState<Day | typeof ALL_DAYS>(ALL_DAYS);

  const leagueFilters = [...LEAGUES, ALL_LEAGUES] as const;

  const dayFilters = [...days, ALL_DAYS] as const;

  const visibleFixturesByDay = fixturesByDay.map((fixtures) =>
    activeLeague === ALL_LEAGUES || activeLeague === 'Todos' || activeLeague === 'Todas'
      ? fixtures
      : fixtures.filter((fixture) => fixture.league === activeLeague)
  );

  const visibleDays = days.filter((day) => activeDay === ALL_DAYS || activeDay === day);

  return (
    <div className="white-card p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display flex items-center gap-2 text-xl font-extrabold text-[#111827] dark:text-white">
            Calendario
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
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
                className="w-44 cursor-pointer appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pr-10 pl-4 text-sm font-bold text-[#0A4D1A] dark:text-[#2FE85F] shadow-sm transition-colors outline-none hover:border-[#2FE85F] focus:border-[#0A4D1A] dark:focus:border-[#2FE85F]"
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

          <div className="flex items-center gap-3">
            <label
              htmlFor="day-filter"
              className="shrink-0 font-bold text-slate-600 dark:text-slate-300"
            >
              Día
            </label>

            <div className="relative inline-flex items-center">
              <select
                id="day-filter"
                value={activeDay}
                onChange={(e) => setActiveDay(e.target.value as Day | typeof ALL_DAYS)}
                className="w-44 cursor-pointer appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pr-10 pl-4 text-sm font-bold text-[#0A4D1A] dark:text-[#2FE85F] shadow-sm transition-colors outline-none hover:border-[#2FE85F] focus:border-[#0A4D1A] dark:focus:border-[#2FE85F]"
              >
                {dayFilters.map((day) => (
                  <option key={day} value={day}>
                    {day}
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
        </div>
      </div>

      {visibleDays.map((day, visibleIndex) => {
        const index = days.indexOf(day);
        const dayFixtures = visibleFixturesByDay[index];
        return (
          <section key={day}>
            <p
              className={`border-b border-slate-300 pb-3 font-extrabold ${visibleIndex === 0 ? 'mb-5' : 'my-5'}`}
            >
              {day}
            </p>
            {dayFixtures.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {dayFixtures.map(({ home, away, time, pitch, league }) => (
                  <div
                    key={`${day}-${home.name}-${away.name}`}
                    className="relative w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 pb-9 hover:border-emerald-600"
                  >
                    <div className="mb-5 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span>{time} hrs</span>
                      <span className="rounded-full bg-[#042274] dark:bg-[#0A4D1A]/60 px-2.5 py-0.5 text-white dark:text-[#2FE85F] font-medium border border-[#2FE85F]/20">
                        Cancha {pitch}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 py-2">
                      <div className="flex flex-1 flex-col items-center gap-1 text-center">
                        <img src={home.logo} alt={home.name} className="h-12 w-12 object-contain" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{home.name}</span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-400">VS</span>
                      <div className="flex flex-1 flex-col items-center gap-1 text-center">
                        <img src={away.logo} alt={away.name} className="h-12 w-12 object-contain" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{away.name}</span>
                      </div>
                    </div>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-[#43bd63] dark:bg-[#0A4D1A] px-4 pt-1 pb-0.5 text-xs font-medium text-white dark:text-[#2FE85F] border-t border-x border-[#2FE85F]/30">
                      {league}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-semibold text-slate-400">
                No hay partidos programados para esta liga.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
};
