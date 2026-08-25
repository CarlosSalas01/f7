import React, { useState } from 'react';
import { Team } from '../../types';
import { INITIAL_TEAMS } from '../../services/mockData';
import { Modal } from '../common/Modal';
import { Users, Flame } from 'lucide-react';
import "@fontsource-variable/manrope";

export const TeamGrid: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="white-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] font-display flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-700" /> Equipos & Plantillas de Jugadores
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Directorio oficial de capitanes, números de camisas y registros disciplinarios
          </p>
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_TEAMS.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="white-card white-card-hover p-6 cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border"
                    style={{ borderColor: team.primaryColor, backgroundColor: `${team.primaryColor}15` }}
                  >
                    {team.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0f172a] font-display">{team.name}</h3>
                    <p className="text-xs text-slate-500">Capitán: {team.captainName}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Plantilla</span>
                  <span className="text-sm font-bold text-slate-900">{team.playersCount} Jugadores</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Efectividad</span>
                  <span className="text-sm font-extrabold text-emerald-700">
                    {Math.round((team.wins / (team.matchesPlayed || 1)) * 100)}%
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Puntos</span>
                  <span className="text-sm font-black text-amber-600">{team.points} PTS</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-emerald-800 font-bold">
              <span>Ver Plantilla Completa</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Roster Modal */}
      {selectedTeam && (
        <Modal
          isOpen={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          title={`Plantilla Oficial - ${selectedTeam.name}`}
          subtitle={`Capitán: ${selectedTeam.captainName} • Teléfono: ${selectedTeam.captainPhone}`}
        >
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Jugadores Registrados</h4>

            <div className="space-y-2">
              {selectedTeam.players.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  La plantilla completa se encuentra en proceso de validación por la liga.
                </p>
              ) : (
                selectedTeam.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#032e22] text-[#a3e635] flex items-center justify-center font-mono font-black text-sm">
                        #{player.number}
                      </span>
                      <div>
                        <h5 className="font-extrabold text-[#0f172a]">{player.name}</h5>
                        <span className="text-[10px] text-slate-500">{player.position}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> {player.goals} Goles
                      </span>
                      <span className="text-amber-600 font-bold">🟨 {player.yellowCards}</span>
                      <span className="text-rose-600 font-bold">🟥 {player.redCards}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
