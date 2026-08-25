export type PitchSurface = 'Sintético Premium' | 'Césped Híbrido' | 'Techado VIP';
export type PitchStatus = 'Disponible' | 'Ocupado' | 'Mantenimiento' | 'Reservado';
export type BookingStatus = 'Confirmada' | 'Pendiente' | 'Completada' | 'Cancelada';
export type PaymentMethod = 'Efectivo' | 'Transferencia' | 'Tarjeta' | 'Pendiente';

export interface Pitch {
  id: string;
  name: string; // e.g. "Cancha 1 - Camp Nou", "Cancha 2 - Maracaná"
  type: 'Fútbol 7' | 'Fútbol 5';
  surface: PitchSurface;
  pricePerHour: number; // e.g., $450 MXN / $35 USD
  nightPricePerHour: number; // Light surcharge after 18:00
  isIndoor: boolean;
  hasLighting: boolean;
  status: PitchStatus;
  imageUrl: string;
  features: string[];
}

export interface Booking {
  id: string;
  pitchId: string;
  pitchName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm e.g. "18:00"
  endTime: string; // HH:mm e.g. "19:00"
  totalPrice: number;
  depositPaid: number;
  paymentStatus: 'Pagado Total' | 'Anticipo 50%' | 'Pendiente';
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  notes?: string;
  teamA?: string;
  teamB?: string;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Portero' | 'Defensa' | 'Medio' | 'Delantero';
  goals: number;
  yellowCards: number;
  redCards: number;
  avatarUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  captainName: string;
  captainPhone: string;
  playersCount: number;
  players: Player[];
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Match {
  id: string;
  title: string;
  teamA: {
    id: string;
    name: string;
    logo: string;
    score: number;
    color: string;
  };
  teamB: {
    id: string;
    name: string;
    logo: string;
    score: number;
    color: string;
  };
  pitchId: string;
  pitchName: string;
  date: string;
  time: string;
  period: '1er Tiempo' | 'Descanso' | '2do Tiempo' | 'Finalizado';
  timerSeconds: number;
  isTimerRunning: boolean;
  events: MatchEvent[];
  refereeName: string;
  status: 'Programado' | 'En Vivo' | 'Finalizado';
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'Gol' | 'Tarjeta Amarilla' | 'Tarjeta Roja' | 'Falta';
  team: 'A' | 'B';
  playerName: string;
}

export interface TopScorer {
  id: string;
  playerName: string;
  teamName: string;
  goals: number;
  matchesPlayed: number;
}

export interface FinancialMetric {
  totalRevenue: number;
  pendingCollect: number;
  totalBookings: number;
  occupancyRate: number; // Percentage 0-100
  recentTransactions: Array<{
    id: string;
    bookingId: string;
    customer: string;
    pitchName: string;
    amount: number;
    method: PaymentMethod;
    date: string;
    type: 'Pago Completo' | 'Anticipo' | 'Cancelación';
  }>;
}
