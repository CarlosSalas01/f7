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
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="lg:shrink-0">
          <h1 className="font-display text-3xl font-extrabold text-[#111827] dark:text-white">
            Posiciones
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Consulta la tabla de clasificación de cada liga
          </p>
        </div>

        <div
          className="flex flex-wrap gap-2 lg:ml-auto lg:justify-end"
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
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                  isSelected
                    ? 'bg-[#05AD31] text-white dark:bg-[#2FE85F] dark:text-[#111827] cursor-pointer rounded-xl px-4 py-2 transition-colors border border-[#2FE85F]/40 font-extrabold shadow-sm '
                    : ' text-[#05AD31] hover:bg-[#DCEFE1]'
                }`}
              >
                {league.label}
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${selectedLeague}-panel`} role="tabpanel" aria-labelledby={`${selectedLeague}-tab`}>
        {selectedLeague === 'league-one' && <LeagueOne />}
        {selectedLeague === 'league-two' && <LeagueTwo />}
        {selectedLeague === 'league-three' && <LeagueThree />}
      </div>
    </div>
  );
};
