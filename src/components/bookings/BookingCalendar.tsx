import React, { useState } from 'react';
import { Booking, Pitch } from '../../types';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Calendar, Phone, XCircle, DollarSign, Clock } from 'lucide-react';

interface BookingCalendarProps {
  bookings: Booking[];
  pitches: Pitch[];
  onCancelBooking: (id: string) => void;
  onUpdateStatus: (id: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookings,
  pitches,
  onCancelBooking,
  onUpdateStatus,
}) => {
  const [selectedPitchFilter, setSelectedPitchFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    if (selectedPitchFilter !== 'ALL' && b.pitchId !== selectedPitchFilter) return false;
    if (selectedStatusFilter !== 'ALL' && b.status !== selectedStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        (b.teamA && b.teamA.toLowerCase().includes(q)) ||
        (b.teamB && b.teamB.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="white-card p-4 sm:p-6 space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0f172a] dark:text-white font-display flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-700 dark:text-emerald-400" /> Reservas & agenda de canchas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Gestión completa de turnos, anticipos pendientes y confirmaciones de juego
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          {/* Search box */}
          <input
            type="text"
            placeholder="Buscar por cliente o equipo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none w-full sm:w-60"
          />

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            {/* Pitch Filter */}
            <select
              value={selectedPitchFilter}
              onChange={(e) => setSelectedPitchFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none w-full"
            >
              <option value="ALL">Todas las canchas</option>
              {pitches.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none w-full"
            >
              <option value="ALL">Todos los estados</option>
              <option value="Confirmada">Confirmadas</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Cancelada">Canceladas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              <th className="py-3 px-4">Cancha / Horario</th>
              <th className="py-3 px-4">Cliente / Capitán</th>
              <th className="py-3 px-4">Equipos</th>
              <th className="py-3 px-4">Cobro & Anticipo</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-800 dark:text-slate-200">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                  No se encontraron reservas con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => {
                const pendingAmount = b.totalPrice - b.depositPaid;
                return (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Pitch & Time */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0f172a] dark:text-white">{b.pitchName}</div>
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-mono mt-0.5 font-bold">
                        <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {formatDate(b.date)} | {b.startTime} - {b.endTime}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{b.customerName}</div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {b.customerPhone}
                      </div>
                    </td>

                    {/* Teams */}
                    <td className="py-4 px-4">
                      {b.teamA && b.teamB ? (
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          <span className="text-emerald-800 dark:text-emerald-400 font-bold">{b.teamA}</span> vs{' '}
                          <span className="text-amber-700 dark:text-amber-400 font-bold">{b.teamB}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 italic">Renta libre / Cascarita</span>
                      )}
                      {b.notes && <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-xs mt-0.5">{b.notes}</div>}
                    </td>

                    {/* Financial details */}
                    <td className="py-4 px-4">
                      <div className="font-black text-[#0f172a] dark:text-white">{formatCurrency(b.totalPrice)}</div>
                      <div className="text-[11px] mt-0.5">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">Pagado: {formatCurrency(b.depositPaid)}</span>
                        {pendingAmount > 0 && (
                          <span className="text-rose-600 dark:text-rose-400 font-semibold ml-2">
                            Restan: {formatCurrency(pendingAmount)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <Badge status={b.status} size="sm" />
                        <div>
                          <Badge status={b.paymentStatus} size="sm" />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                      {pendingAmount > 0 && b.status !== 'Cancelada' && (
                        <button
                          onClick={() => onUpdateStatus(b.id, 'Confirmada', 'Pagado Total')}
                          title="Liquidar Total"
                          className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                        >
                          <DollarSign className="w-3 h-3" /> Liquidar
                        </button>
                      )}

                      {b.status !== 'Cancelada' && (
                        <button
                          onClick={() => onCancelBooking(b.id)}
                          title="Cancelar Reserva"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
