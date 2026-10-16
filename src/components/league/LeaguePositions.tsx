import React, { useState } from 'react';
import { LeagueOne } from './LeagueOne/LeagueOne';
import { LeagueTwo } from './LeagueTwo/LeagueTwo';
import { LeagueThree } from './LeagueThree/LeagueThree';

const leagues = [
  { id: 'league-one', label: 'League One' },
  { id: 'league-two', label: 'League Two' },
  { id: 'league-three', label: 'League Three' },
] as const;

type LeagueId = (typeof leagues)[number]['id'];

export const LeaguePositions: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<LeagueId>('league-one');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827] dark:text-white font-display">
          Posiciones
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Consulta la tabla de clasificación de cada liga
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Seleccionar liga"
      >
        {leagues.map((league) => {
          const isSelected = selectedLeague === league.id;

          return (
            <button
              key={league.id}
              id={`${league.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${league.id}-panel`}
              onClick={() => setSelectedLeague(league.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                isSelected
                  ? 'bg-[#0A4D1A] text-white dark:bg-[#2FE85F] dark:text-[#111827]'
                  : 'bg-white text-slate-600 hover:bg-[#DCEFE1] dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {league.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${selectedLeague}-panel`}
        role="tabpanel"
        aria-labelledby={`${selectedLeague}-tab`}
      >
        {selectedLeague === 'league-one' && <LeagueOne />}
        {selectedLeague === 'league-two' && <LeagueTwo />}
        {selectedLeague === 'league-three' && <LeagueThree />}
      </div>
    </div>
  );
};
