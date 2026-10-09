import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { leagueTwoRecords as records } from '@/services/leagueData';

interface LeagueTwoProps {
  onBack?: () => void;
}

const PLAYOFF_SPOTS = 4;

const standings = records
  .map((team) => ({
    ...team,
    played: team.wins + team.draws + team.losses,
    diff: team.goalsFor - team.goalsAgainst,
    points: team.wins * 3 + team.draws,
  }))
  .sort((a, b) => b.points - a.points || b.diff - a.diff || b.goalsFor - a.goalsFor);

const columns = [
  { key: 'PJ', title: 'Partidos jugados' },
  { key: 'PG', title: 'Partidos ganados' },
  { key: 'PE', title: 'Partidos empatados' },
  { key: 'PP', title: 'Partidos perdidos' },
  { key: 'GF', title: 'Goles a favor' },
  { key: 'GC', title: 'Goles en contra' },
  { key: 'DIF', title: 'Diferencia' },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

export const LeagueTwo: React.FC<LeagueTwoProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="white-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-white font-display flex items-center gap-2">
            League Two
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tabla de clasificación · Clasifican a liguilla los primeros {PLAYOFF_SPOTS} lugares
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 text-xs font-bold text-emerald-700 dark:text-[#a3e635] hover:bg-[#84CA16] hover:text-slate-800 rounded-xl flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a torneos
          </button>
        )}
      </div>

      <div className="white-card p-4 sm:p-6">
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-4">Equipo</th>
                {columns.map(({ key, title }) => (
                  <th key={key} title={title} className="py-3 px-2 text-center">
                    {key}
                  </th>
                ))}
                <th
                  title="Puntos"
                  className="py-3 px-3 text-center font-black text-[#032e22] dark:text-[#a3e635]"
                >
                  PTS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {standings.map((team, idx) => (
                <tr
                  key={team.name}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                    idx < PLAYOFF_SPOTS ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        idx === 0
                          ? 'bg-amber-400 text-[#0f172a] font-black'
                          : idx < PLAYOFF_SPOTS
                            ? 'bg-[#032e22] dark:bg-[#a3e635] text-white dark:text-[#032e22]'
                            : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3 font-extrabold text-[#0f172a] dark:text-white">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          width={28}
                          height={28}
                          className="h-7 w-7 shrink-0 object-contain"
                        />
                      ) : (
                        <span className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-black text-slate-600 dark:text-slate-200 flex items-center justify-center">
                          {getInitials(team.name)}
                        </span>
                      )}
                      <span>{team.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{team.played}</td>
                  <td className="py-3 px-2 text-center font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {team.wins}
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-slate-500 dark:text-slate-400">{team.draws}</td>
                  <td className="py-3 px-2 text-center font-mono text-rose-600 dark:text-rose-400">{team.losses}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{team.goalsFor}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-600 dark:text-slate-400">
                    {team.goalsAgainst}
                  </td>
                  <td className="py-3 px-2 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
                    {team.diff > 0 ? `+${team.diff}` : team.diff}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-black text-base text-[#032e22] dark:text-[#a3e635]">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
          {[...columns, { key: 'PTS', title: 'Puntos' }].map(({ key, title }) => (
            <div key={key} className="flex gap-1">
              <dt className="font-bold text-slate-700 dark:text-slate-300">{key}:</dt>
              <dd>{title}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
