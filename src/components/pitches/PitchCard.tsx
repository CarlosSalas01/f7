import React from 'react';
import { Pitch } from '../../types';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';
import { Check, ShieldCheck, Sun, Moon, CalendarPlus } from 'lucide-react';

interface PitchCardProps {
  pitch: Pitch;
  onBookClick: (pitch: Pitch) => void;
  onToggleStatus: (pitchId: string, currentStatus: Pitch['status']) => void;
}

export const PitchCard: React.FC<PitchCardProps> = ({ pitch, onBookClick, onToggleStatus }) => {
  return (
    <div className="white-card white-card-hover overflow-hidden flex flex-col justify-between">
      <div>
        {/* Cover Image & Status Header */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={pitch.imageUrl}
            alt={pitch.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 bg-[#032e22]/90 text-white font-bold text-xs rounded-lg backdrop-blur-md border border-white/10">
              {pitch.type}
            </span>
            <Badge status={pitch.status} />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-extrabold text-white font-display leading-tight">{pitch.name}</h3>
            <p className="text-xs text-[#a3e635] font-semibold">{pitch.surface}</p>
          </div>
        </div>

        {/* Details & Features */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Día (10:00-18:00)
              </span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 block">{formatCurrency(pitch.pricePerHour)}/h</span>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Noche (18:00+)
              </span>
              <span className="text-sm font-extrabold text-[#032e22] dark:text-[#a3e635] mt-0.5 block">{formatCurrency(pitch.nightPricePerHour)}/h</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Equipamiento y amenidades:</p>
            <div className="grid grid-cols-2 gap-1.5">
              {pitch.features.map((feat, idx) => (
                <span key={idx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
        <button
          onClick={() => onBookClick(pitch)}
          className="flex-1 py-2.5 px-4 bg-[#a3e635] hover:bg-[#84cc16] text-[#0f172a] font-extrabold text-xs rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4" /> Reservar cancha
        </button>
        <button
          onClick={() =>
            onToggleStatus(
              pitch.id,
              pitch.status === 'Disponible' ? 'Mantenimiento' : 'Disponible'
            )
          }
          title="Cambiar estado de cancha"
          className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 text-xs transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
