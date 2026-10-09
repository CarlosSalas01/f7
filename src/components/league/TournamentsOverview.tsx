import React, { useState } from 'react';
import { Plus, UserPlus, Calendar, FileEdit, MoreVertical, Mail, CheckCircle, Shield } from 'lucide-react';
import { Modal } from '../common/Modal';

const LEAGUE_TABS: Record<string, string> = {
  'League One': 'league-one',
  'League Two': 'league-two',
  'League Three': 'league-three',
};

interface TournamentsOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const TournamentsOverview: React.FC<TournamentsOverviewProps> = ({ onNavigateTab }) => {
  const [isNewTournamentModalOpen, setIsNewTournamentModalOpen] = useState(false);
  const [isRegisterTeamModalOpen, setIsRegisterTeamModalOpen] = useState(false);

  const activeTournaments = [
    {
      id: 't-1',
      name: 'League One',
      status: 'Active',
      format: 'Liga',
      teamsCount: 22,
      maxTeams: 22,
      progressPercent: 100,
      progressLabel: 'Registro cerrado',
      // barColor: 'bg-[#0c7d2e]',
      barColor: 'bg-rose-700',
    },
    {
      id: 't-2',
      name: 'League Two',
      status: 'Active',
      format: 'Liguilla',
      teamsCount: 8,
      maxTeams: 8,
      progressPercent: 100,
      progressLabel: 'Registro cerrado',
      barColor: 'bg-rose-700',
    },
    {
      id: 't-3',
      name: 'League Three',
      status: 'Active',
      format: 'Eliminación',
      teamsCount: 8,
      maxTeams: 8,
      progressPercent: 100,
      progressLabel: 'Registro cerrado',
      barColor: 'bg-rose-700',
    },
  ];


  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0f172a] dark:text-white font-display">
            Torneos & Ligas
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Panel de control de torneos y copas.</p>
        </div>

        <button
          onClick={() => setIsNewTournamentModalOpen(true)}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <div className="w-6 h-6 rounded-full bg-[#21de5a] text-emerald-600 font-bold flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <span>Crear nuevo torneo</span>
        </button>
      </div>

      {/* Quick Action Cards (3 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Inscribir Equipo */}
        <div
          onClick={() => setIsRegisterTeamModalOpen(true)}
          className="white-card white-card-hover p-5 flex items-center space-x-4 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-600 dark:bg-slate-800 text-white dark:text-white flex items-center justify-center flex-shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0f172a] dark:text-white">Inscribir equipo</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Añadir a las ligas.</p>
          </div>
        </div>

        {/* Card 2: Generar Fixture */}
        <div
          onClick={() => onNavigateTab('fixtures')}
          className="white-card white-card-hover p-5 flex items-center space-x-4 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-600 dark:bg-slate-800 text-white dark:text-white flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0f172a] dark:text-white">Generar partidos</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Asignar fechas y horarios</p>
          </div>
        </div>

        {/* Card 3: Cargar Resultados */}
        <div
          onClick={() => onNavigateTab('results')}
          className="white-card white-card-hover p-5 flex items-center space-x-4 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600 dark:bg-slate-800 text-white dark:text-white flex items-center justify-center flex-shrink-0">
            <FileEdit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0f172a] dark:text-white">Cargar resultados</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Actualizar marcadores</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Tournaments (Left) & Recent Registrations (Right) */}
      <div className="w-full gap-8">

        {/* Active Tournaments Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#0f172a] dark:text-white font-display">
              Torneos activos
            </h2>
            <button
              onClick={() => onNavigateTab('tournaments')}
              className="text-xs font-bold text-emerald-600 dark:text-[#a3e635] hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {activeTournaments.map((tourney) => (
              <div
                key={tourney.id}
                onClick={LEAGUE_TABS[tourney.name] ? () => onNavigateTab(LEAGUE_TABS[tourney.name]) : undefined}
                className={`white-card p-6 space-y-6 flex flex-col justify-between ${
                  LEAGUE_TABS[tourney.name] ? 'white-card-hover cursor-pointer' : ''
                }`}
              >
                <div>
                  {/* Status badge & options menu */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0f172a] font-display mt-3">
                    {tourney.name}
                  </h3>

                  {/* Format & Teams count */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Formato</span>
                      <span className="font-bold text-[#0f172a]">{tourney.format}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Equipos</span>
                      <span className="font-bold text-[#0f172a]">
                        {tourney.teamsCount} / {tourney.maxTeams}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tourney.barColor}`}
                      style={{ width: `${tourney.progressPercent}%` }}
                    />
                  </div>
                  <div className="text-right text-[11px] font-semibold text-slate-500">
                    {tourney.progressLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations Column */}
        {/* <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#0f172a] font-display">
              Registros recientes
            </h2>
          </div>

          <div className="white-card p-4 space-y-3">
            {recentRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl ${reg.color} flex items-center justify-center font-bold text-sm shadow-sm`}>
                    {reg.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0f172a]">{reg.teamName}</h4>
                    <p className="text-xs text-slate-500">{reg.league}</p>
                  </div>
                </div>
                <button
                  title="Contactar al capitán"
                  className="p-2 text-slate-400 hover:text-[#0f172a] hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div> */}

      </div>

      {/* Modal: New Tournament */}
      <Modal
        isOpen={isNewTournamentModalOpen}
        onClose={() => setIsNewTournamentModalOpen(false)}
        title="Crear Nuevo Torneo / Liga"
        subtitle="Configura el formato del campeonato y número máximo de equipos"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('¡Torneo creado exitosamente!');
            setIsNewTournamentModalOpen(false);
          }}
          className="space-y-4 text-sm"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del torneo</label>
            <input
              type="text"
              required
              placeholder="Ej. Copa de Verano 2026"
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#032e22]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Formato</label>
              <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#032e22]">
                <option value="Round-robin">Round-robin (Liga)</option>
                <option value="Knockout">Knockout (Eliminación Directa)</option>
                <option value="Mixto">Fase de Grupos + Liguilla</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Límite de equipos</label>
              <input
                type="number"
                defaultValue={16}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#032e22]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsNewTournamentModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#a3e635] text-[#0f172a] rounded-xl text-xs font-black hover:bg-[#84cc16]"
            >
              Guardar torneo
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Inscribir Equipo */}
      <Modal
        isOpen={isRegisterTeamModalOpen}
        onClose={() => setIsRegisterTeamModalOpen(false)}
        title="Inscribir equipo a Liga"
        subtitle="Registrar nuevo equipo y capitán al torneo activo"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('¡Equipo inscrito con éxito!');
            setIsRegisterTeamModalOpen(false);
          }}
          className="space-y-4 text-sm"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del equipo</label>
            <input
              type="text"
              required
              placeholder="Ej. Pumas FC"
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#032e22]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del capitán</label>
              <input
                type="text"
                required
                placeholder="Ej. Roberto Gómez"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#032e22]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Torneo destino</label>
              <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#032e22]">
                <option value="League One">League One</option>
                <option value="League Two">League Two</option>
                <option value="League Three">League Three</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsRegisterTeamModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl text-xs font-black"
            >
              Confirmar inscripción
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
