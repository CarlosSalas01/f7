import React, { useState, useEffect } from 'react';
import { Pitch, Booking, PaymentMethod } from '../../types';
import { Modal } from '../common/Modal';
import { calculateBookingPrice, formatCurrency } from '../../utils/formatters';
import { Calendar, Clock, User, Phone } from 'lucide-react';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pitches: Pitch[];
  selectedPitch?: Pitch | null;
  onSubmitBooking: (bookingData: Omit<Booking, 'id'>) => void;
}

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  pitches,
  selectedPitch,
  onSubmitBooking,
}) => {
  const [pitchId, setPitchId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('19:00');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [depositPaid, setDepositPaid] = useState<number>(400);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Efectivo');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedPitch?.id) {
      setPitchId(selectedPitch.id);
    } else if (pitches && pitches.length > 0) {
      setPitchId(pitches[0].id);
    }
  }, [selectedPitch, pitches, isOpen]);

  if (!isOpen) return null;

  const currentPitch = pitches.find((p) => p.id === pitchId) || pitches[0] || selectedPitch || {
    id: 'pitch-1',
    name: 'Cancha 1',
    surface: 'Sintético Premium',
    pricePerHour: 650,
    nightPricePerHour: 780,
  };

  const priceCalc = calculateBookingPrice(
    startTime,
    currentPitch.pricePerHour || 650,
    currentPitch.nightPricePerHour || 780
  );

  const totalPrice = priceCalc.price;
  const isFullyPaid = depositPaid >= totalPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !currentPitch) return;

    const endHour = parseInt(startTime.split(':')[0], 10) + 1;
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;

    onSubmitBooking({
      pitchId: currentPitch.id,
      pitchName: currentPitch.name,
      customerName,
      customerPhone,
      date,
      startTime,
      endTime,
      totalPrice,
      depositPaid,
      paymentStatus: isFullyPaid ? 'Pagado Total' : depositPaid > 0 ? 'Anticipo 50%' : 'Pendiente',
      paymentMethod,
      status: 'Confirmada',
      teamA: teamA || undefined,
      teamB: teamB || undefined,
      notes: notes || undefined,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Reserva de Cancha" subtitle="Registrar turno de juego y cobro de anticipo">
      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-800 dark:text-slate-200">
        {/* Pitch & Date Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cancha a Reservar</label>
            <select
              value={pitchId}
              onChange={(e) => setPitchId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 font-medium focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
            >
              {pitches.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.surface})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Fecha del Partido</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 font-medium focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Time Slot Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Horario (Duración 1 Hora)</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-1.5 sm:gap-2">
            {TIME_SLOTS.map((slot) => {
              const isSelected = startTime === slot;
              const slotHour = parseInt(slot.split(':')[0], 10);
              const isNight = slotHour >= 18;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setStartTime(slot)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#a3e635] text-[#0f172a] border-[#84cc16] shadow-sm font-extrabold'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div>{slot}</div>
                  <div className={`text-[9px] ${isSelected ? 'text-[#0f172a]' : isNight ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {isNight ? 'Noche' : 'Día'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre del Cliente / Capitan</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ej. Carlos Mendoza"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Teléfono / WhatsApp</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+52 55 1234 5678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Teams (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Equipo Local (Opcional)</label>
            <input
              type="text"
              placeholder="Los Pumas FC"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Equipo Visitante (Opcional)</label>
            <input
              type="text"
              placeholder="Deportivo Norte"
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
            />
          </div>
        </div>

        {/* Pricing & Deposit */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400">
              Cancha: <strong className="text-slate-900 dark:text-slate-100">{currentPitch?.name || 'Cancha'}</strong>
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              Tarifa {priceCalc.isNightRate ? 'Nocturna (Luz LED)' : 'Diurna'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/80">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Costo Total Renta</span>
              <span className="text-xl font-black text-[#0f172a] dark:text-white">{formatCurrency(totalPrice)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial">
                <label className="text-[11px] text-slate-700 dark:text-slate-300 font-bold block mb-1">Monto Pagado Hoy</label>
                <input
                  type="number"
                  step="50"
                  value={depositPaid}
                  onChange={(e) => setDepositPaid(Number(e.target.value))}
                  className="w-full sm:w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-right font-bold text-emerald-700 dark:text-emerald-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
                />
              </div>

              <div className="flex-1 sm:flex-initial">
                <label className="text-[11px] text-slate-700 dark:text-slate-300 font-bold block mb-1">Método de Pago</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 dark:text-slate-100 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
                >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Notas / Balones / Petos</label>
          <textarea
            rows={2}
            placeholder="Ej. Requieren 2 balones #5 y petos amarillos..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#032e22] dark:focus:border-[#a3e635] focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#a3e635] hover:bg-[#84cc16] text-[#0f172a] font-black text-xs rounded-xl shadow-sm transition-all"
          >
            Confirmar Reserva
          </button>
        </div>
      </form>
    </Modal>
  );
};
