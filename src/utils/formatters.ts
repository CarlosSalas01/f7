export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatSecondsToMinutes(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateBookingPrice(
  startTime: string,
  basePrice: number,
  nightPrice: number
): { price: number; isNightRate: boolean } {
  const hour = parseInt(startTime.split(':')[0], 10);
  const isNightRate = hour >= 18;
  return {
    price: isNightRate ? nightPrice : basePrice,
    isNightRate,
  };
}

export function getStatusBadgeColor(status: string): { bg: string; text: string; border: string } {
  switch (status) {
    case 'Disponible':
    case 'Confirmada':
    case 'Pagado Total':
    case 'Finalizado':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    case 'Reservado':
    case 'Ocupado':
    case 'En Vivo':
    case 'Anticipo 50%':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
    case 'Pendiente':
    case 'Programado':
      return { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' };
    case 'Mantenimiento':
    case 'Cancelada':
      return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' };
  }
}
