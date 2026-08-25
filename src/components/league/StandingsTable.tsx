import React from 'react';
import { INITIAL_TEAMS } from '../../services/mockData';
import { Trophy, Flame } from 'lucide-react';

export const StandingsTable: React.FC = () => {
  const sortedTeams = [...INITIAL_TEAMS].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const dgB = b.goalsFor - b.goalsAgainst;
    const dgA = a.goalsFor - a.goalsAgainst;
    return dgB - dgA;
  });

  const topScorers = [
    { name: 'Mateo Hernández', team: 'Los Galácticos F7', goals: 9, matches: 7, avatar: '⚽' },
    { name: 'Rodrigo "El Rayo" Benítez', team: 'Dep. La Gambeta', goals: 8, matches: 7, avatar: '🔥' },
    { name: 'Alejandro Vega', team: 'Rayo Vallecano F7', goals: 7, matches: 7, avatar: '⚡' },
    { name: 'Gael Morales', team: 'Los Galácticos F7', goals: 6, matches: 6, avatar: '👟' },
  ];

  return (
    <div className="space-y-6">
      {/* League Header */}
      <div className="white-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 text-[10px] font-extrabold rounded-full">
              TORNEO CLAUSURA F7
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Jornada 8 de 14</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-white font-display mt-1 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" /> Tabla general de clasificación
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Clasifican directo a liguilla los primeros 4 lugares
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Standings Table */}
        <div className="lg:col-span-2 white-card p-4 sm:p-6 overflow-hidden">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-4">Equipo</th>
                  <th className="py-3 px-2 text-center">PJ</th>
                  <th className="py-3 px-2 text-center">PG</th>
                  <th className="py-3 px-2 text-center">PE</th>
                  <th className="py-3 px-2 text-center">PP</th>
                  <th className="py-3 px-2 text-center">GF</th>
                  <th className="py-3 px-2 text-center">GC</th>
                  <th className="py-3 px-2 text-center">DG</th>
                  <th className="py-3 px-3 text-center font-black text-[#032e22] dark:text-[#a3e635]">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {sortedTeams.map((team, idx) => {
                  const dg = team.goalsFor - team.goalsAgainst;
                  const isPlayoffZone = idx < 4;

                  return (
                    <tr
                      key={team.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                        isPlayoffZone ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            idx === 0
                              ? 'bg-amber-400 text-[#0f172a] shadow-sm font-black'
                              : idx < 4
                                ? 'bg-[#032e22] dark:bg-[#a3e635] text-white dark:text-[#032e22] font-bold'
                                : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-extrabold text-[#0f172a] dark:text-white flex items-center gap-2">
                        <span className="text-lg">{team.logo}</span>
                        <span>{team.name}</span>
                      </td>

                      <td className="py-3.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{team.matchesPlayed}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-emerald-700 dark:text-emerald-400 font-bold">{team.wins}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-slate-500 dark:text-slate-400">{team.draws}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-rose-600 dark:text-rose-400">{team.losses}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{team.goalsFor}</td>
                      <td className="py-3.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{team.goalsAgainst}</td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
                        {dg > 0 ? `+${dg}` : dg}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-black text-base text-[#032e22] dark:text-[#a3e635]">
                        {team.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Scorers Leaderboard */}
        <div className="white-card p-4 sm:p-6 space-y-4">
          <h3 className="text-lg font-extrabold text-[#0f172a] dark:text-white font-display flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" /> Tabla de goleadores
          </h3>

          <div className="space-y-3">
            {topScorers.map((scorer, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{scorer.avatar}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{scorer.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{scorer.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">{scorer.goals}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Goles</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
