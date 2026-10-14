import React, { useState } from 'react';
import { useMatch } from '../../hooks/useMatch';
import { formatSecondsToMinutes } from '../../utils/formatters';
import { Play, Pause, RotateCcw, Volume2, Plus, Flag, ShieldAlert, Radio } from 'lucide-react';

export const LiveScoreboard: React.FC = () => {
  const { match, toggleTimer, resetTimer, setPeriod, addGoal, addCard, playWhistleSound } = useMatch();
  const [goalPlayerName, setGoalPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<'A' | 'B'>('A');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="white-card p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-700 border border-rose-300 text-xs font-extrabold rounded-full flex items-center gap-1.5 animate-pulse-fast">
                <span className="w-2 h-2 rounded-full bg-rose-600" /> EN VIVO
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">{match.pitchName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-display mt-1">
              {match.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Árbitro Oficial: <strong className="text-[#0f172a]">{match.refereeName}</strong></p>
          </div>

          {/* Period selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {(['1er Tiempo', 'Descanso', '2do Tiempo', 'Finalizado'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  match.period === p
                    ? 'bg-[#032e22] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Scoreboard Display */}
      <div className="white-card p-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Team A */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-500/50 flex items-center justify-center text-4xl shadow-sm">
              {match.teamA.logo}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0f172a] font-display">{match.teamA.name}</h2>
              <span className="text-xs text-emerald-700 font-bold">Local</span>
            </div>
            <div className="text-6xl font-black font-display text-[#032e22] tracking-tight">
              {match.teamA.score}
            </div>
            <button
              onClick={() => {
                setSelectedTeam('A');
                addGoal('A', goalPlayerName || 'Mateo Hernández');
              }}
              className="px-4 py-2 bg-[#a3e635] hover:bg-[#84cc16] text-[#0f172a] font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> +1 Gol Local
            </button>
          </div>

          {/* Timer & Whistle Center Box */}
          <div className="flex flex-col items-center justify-center space-y-4 py-4 md:py-0 border-y md:border-y-0 md:border-x border-slate-200 px-4">
            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700 border border-slate-200">
              {match.period}
            </span>

            {/* Big Stopwatch Display */}
            <div className="font-mono text-5xl sm:text-6xl font-black tracking-widest text-[#032e22]">
              {formatSecondsToMinutes(match.timerSeconds)}
            </div>

            {/* Stopwatch controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTimer}
                className={`p-3.5 rounded-full font-bold transition-transform active:scale-95 shadow-md ${
                  match.isTimerRunning
                    ? 'bg-amber-500 text-white'
                    : 'bg-[#a3e635] text-[#0f172a]'
                }`}
              >
                {match.isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button
                onClick={resetTimer}
                title="Reiniciar Cronómetro"
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full border border-slate-300 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={playWhistleSound}
                title="Silbato de Árbitro (Sonido Audio)"
                className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded-full transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-amber-50 border-2 border-amber-500/50 flex items-center justify-center text-4xl shadow-sm">
              {match.teamB.logo}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0f172a] font-display">{match.teamB.name}</h2>
              <span className="text-xs text-amber-700 font-bold">Visitante</span>
            </div>
            <div className="text-6xl font-black font-display text-amber-600 tracking-tight">
              {match.teamB.score}
            </div>
            <button
              onClick={() => {
                setSelectedTeam('B');
                addGoal('B', goalPlayerName || 'Rodrigo Benítez');
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> +1 Gol Visitante
            </button>
          </div>

        </div>
      </div>

      {/* Referee Logger & Events Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Card / Incident Logger */}
        <div className="white-card p-6 space-y-4">
          <h3 className="text-lg font-extrabold text-[#0f172a] font-display flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" /> Registro de Tarjetas
          </h3>
          <p className="text-xs text-slate-500">Amonestaciones del árbitro durante el encuentro</p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Jugador</label>
              <input
                type="text"
                placeholder="Ej. Adrián Castillo #4"
                value={goalPlayerName}
                onChange={(e) => setGoalPlayerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => addCard('A', 'Tarjeta Amarilla', goalPlayerName)}
                className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all text-center"
              >
                🟨 Amarilla Local
              </button>
              <button
                onClick={() => addCard('B', 'Tarjeta Amarilla', goalPlayerName)}
                className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all text-center"
              >
                🟨 Amarilla Visit.
              </button>
              <button
                onClick={() => addCard('A', 'Tarjeta Roja', goalPlayerName)}
                className="py-2.5 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 rounded-xl text-xs font-bold transition-all text-center"
              >
                🟥 Roja Local
              </button>
              <button
                onClick={() => addCard('B', 'Tarjeta Roja', goalPlayerName)}
                className="py-2.5 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 rounded-xl text-xs font-bold transition-all text-center"
              >
                🟥 Roja Visit.
              </button>
            </div>
          </div>
        </div>

        {/* Live Match Log Timeline */}
        <div className="lg:col-span-2 white-card p-6 space-y-4">
          <h3 className="text-lg font-extrabold text-[#0f172a] font-display flex items-center gap-2">
            <Flag className="w-5 h-5 text-[#032e22]" /> Cronología de Incidencias en Vivo
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {match.events.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No hay incidencias registradas en este partido.</p>
            ) : (
              match.events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-slate-200 rounded-lg text-[#0f172a] font-mono font-bold text-[11px]">
                      {ev.minute}' min
                    </span>
                    <span className="text-base">
                      {ev.type === 'Gol' ? '⚽' : ev.type === 'Tarjeta Amarilla' ? '🟨' : '🟥'}
                    </span>
                    <div>
                      <span className="font-extrabold text-slate-900">{ev.playerName}</span>
                      <span className="text-slate-500 ml-2">
                        ({ev.team === 'A' ? match.teamA.name : match.teamB.name})
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">{ev.type}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
