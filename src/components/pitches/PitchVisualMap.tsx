import React from 'react';
import { Pitch, Booking } from '../../types';
import { Badge } from '../common/Badge';
import { Zap, Sun, CloudRain } from 'lucide-react';

interface PitchVisualMapProps {
  pitches: Pitch[];
  bookings: Booking[];
  onSelectPitch: (pitch: Pitch) => void;
}

export const PitchVisualMap: React.FC<PitchVisualMapProps> = ({ pitches, bookings, onSelectPitch }) => {
  return (
    <div className="white-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0f172a] font-display flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" /> Mapa táctico del Complejo
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visualización en tiempo real de las canchas y su disponibilidad de luz LED y domo
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs bg-slate-100 p-2 rounded-xl border border-slate-200">
          <span className="flex items-center gap-1 text-slate-700 font-medium">
            <Sun className="w-3.5 h-3.5 text-amber-500" /> Tarifa Diurna
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Nocturna (LED HQ)
          </span>
        </div>
      </div>

      {/* Grid Blueprint representation of the pitches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pitches.map((pitch) => {
          const activeBooking = bookings.find((b) => b.pitchId === pitch.id && b.status === 'Confirmada');
          const isOccupied = pitch.status === 'Ocupado' || !!activeBooking;

          return (
            <div
              key={pitch.id}
              onClick={() => onSelectPitch(pitch)}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-200 cursor-pointer group ${
                isOccupied
                  ? 'border-amber-400 shadow-sm'
                  : 'border-slate-200 hover:border-[#032e22] hover:shadow-md'
              }`}
            >
              {/* Soccer Turf Canvas Background */}
              <div className="relative h-44 pitch-pattern p-4 flex flex-col justify-between overflow-hidden">
                {/* Field Markings */}
                <div className="absolute inset-2 border-2 border-white/30 rounded-lg pointer-events-none flex items-center justify-center">
                  {/* Center Circle */}
                  <div className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/40 rounded-full" />
                  </div>
                  {/* Half Field Line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30" />
                </div>

                {/* Top Badge Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#032e22]/90 backdrop-blur-md rounded-lg text-xs font-black text-white border border-white/10">
                    {pitch.name}
                  </span>
                  <Badge status={isOccupied ? 'Ocupado' : pitch.status} />
                </div>

                {/* Bottom Stats Overlay */}
                <div className="relative z-10 flex items-end justify-between">
                  <div className="bg-[#032e22]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <p className="text-[10px] text-slate-300 font-medium">Superficie</p>
                    <p className="text-xs font-bold text-[#a3e635] flex items-center gap-1">
                      {pitch.isIndoor && <CloudRain className="w-3 h-3 text-cyan-300" />}
                      {pitch.surface}
                    </p>
                  </div>
                  <div className="bg-[#032e22]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-right">
                    <p className="text-[10px] text-slate-300 font-medium">Tarifa Noche</p>
                    <p className="text-xs font-black text-amber-300">${pitch.nightPricePerHour} MXN/h</p>
                  </div>
                </div>

                {/* Active Match Banner if occupied */}
                {activeBooking && (
                  <div className="absolute inset-0 bg-[#032e22]/95 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center z-20 transition-opacity">
                    <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold rounded-full mb-1">
                      PARTIDO EN CURSO
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {activeBooking.teamA || 'Equipo A'} vs {activeBooking.teamB || 'Equipo B'}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Horario: {activeBooking.startTime} - {activeBooking.endTime} • Cliente: {activeBooking.customerName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
