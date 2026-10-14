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

const FIRST_HOUR = 18;
const PITCH_COUNT = 2;
const DEFAULT_LEAGUE_ONE = 'League One';
const DEFAULT_LEAGUE_TWO = 'League Two';
const DEFAULT_LEAGUE_THREE = 'League Three';
const LEAGUES = [DEFAULT_LEAGUE_ONE, DEFAULT_LEAGUE_TWO, DEFAULT_LEAGUE_THREE];

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
  const [activeLeague, setActiveLeague] = useState<string>('Todos');

  const leagueFilters = [
    DEFAULT_LEAGUE_ONE,
    DEFAULT_LEAGUE_TWO,
    DEFAULT_LEAGUE_THREE,
    'Todos',
  ];

  const visibleFixturesByDay = fixturesByDay.map((fixtures) =>
    activeLeague === 'Todos' ? fixtures : fixtures.filter((fixture) => fixture.league === activeLeague)
  );

  return (
    <div className="white-card p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display flex items-center gap-2 text-xl font-extrabold text-[#0f172a] dark:text-white">
            Calendario
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-xl p-2 text-xs">
          {leagueFilters.map((league, index) => {
            const isActive = activeLeague === league;
            return (
              <React.Fragment key={league}>
                {index > 0 && <span className="text-slate-300">|</span>}
                <button
                  onClick={() => setActiveLeague(league)}
                  className={`flex cursor-pointer items-center text-sm gap-1 rounded-xl p-2 font-bold transition-colors ${isActive
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

      {days.map((day, index) => {
        const dayFixtures = visibleFixturesByDay[index];
        return (
          <section key={day}>
            <p
              className={`border-b border-slate-300 pb-3 font-extrabold ${index === 0 ? 'mb-5' : 'my-5'}`}
            >
              {day}
            </p>
            {dayFixtures.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {dayFixtures.map(({ home, away, time, pitch, league }) => (
                  <div
                    key={`${day}-${home.name}-${away.name}`}
                    className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 pb-9"
                  >
                    <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-600">
                      <span>{time} hrs</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                        Cancha {pitch}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-1 flex-col items-center gap-1 text-center">
                        <img src={home.logo} alt={home.name} className="h-12 w-12 object-contain" />
                        <span className="text-xs font-semibold text-slate-800">{home.name}</span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-400">VS</span>
                      <div className="flex flex-1 flex-col items-center gap-1 text-center">
                        <img src={away.logo} alt={away.name} className="h-12 w-12 object-contain" />
                        <span className="text-xs font-semibold text-slate-800">{away.name}</span>
                      </div>
                    </div>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-emerald-100 px-4 pt-1 pb-0.5 text-xs font-bold text-emerald-700">
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
