import { teamLogos } from '@/assets/teams/logos';

export interface TeamRecord {
  name: string;
  logo?: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  captainName: string;
  captainPhone: string;
  playersCount: number;
  primaryColor: string;
}

export const LEAGUE_ONE = 'League One';
export const LEAGUE_TWO = 'League Two';
export const LEAGUE_THREE = 'League Three';

export const leagueOneRecords: TeamRecord[] = [
  { name: 'Arsenal', logo: teamLogos.Arsenal, wins: 6, draws: 1, losses: 1, goalsFor: 18, goalsAgainst: 7, captainName: 'Carlos Salas', captainPhone: '5511111101', playersCount: 16, primaryColor: '#ef4444' },
  { name: 'Man City', logo: teamLogos.Manchester_city, wins: 6, draws: 0, losses: 2, goalsFor: 17, goalsAgainst: 8, captainName: 'Diego Martínez', captainPhone: '5511111102', playersCount: 14, primaryColor: '#38bdf8' },
  { name: 'Liverpool', logo: teamLogos.Liverpool, wins: 5, draws: 2, losses: 1, goalsFor: 16, goalsAgainst: 9, captainName: 'Luis Herrera', captainPhone: '5511111103', playersCount: 15, primaryColor: '#dc2626' },
  { name: 'Chelsea', logo: teamLogos.Cheelsea, wins: 4, draws: 2, losses: 2, goalsFor: 14, goalsAgainst: 10, captainName: 'Javier Navarro', captainPhone: '5511111104', playersCount: 13, primaryColor: '#1d4ed8' },
  { name: 'Man United', logo: teamLogos.Manchester_United, wins: 4, draws: 1, losses: 3, goalsFor: 12, goalsAgainst: 11, captainName: 'Roberto Gómez', captainPhone: '5511111105', playersCount: 14, primaryColor: '#b91c1c' },
  { name: 'Tottenham', logo: teamLogos.Tottenham, wins: 3, draws: 2, losses: 3, goalsFor: 13, goalsAgainst: 13, captainName: 'Fernando Ibarra', captainPhone: '5511111106', playersCount: 12, primaryColor: '#1e3a8a' },
  { name: 'Newcastle', logo: teamLogos.Newcastle, wins: 3, draws: 1, losses: 4, goalsFor: 10, goalsAgainst: 12, captainName: 'Hugo Sánchez', captainPhone: '5511111107', playersCount: 12, primaryColor: '#334155' },
  { name: 'Aston Villa', logo: teamLogos.Aston_Villa, wins: 1, draws: 2, losses: 5, goalsFor: 9, goalsAgainst: 14, captainName: 'Mateo Hernández', captainPhone: '5511111108', playersCount: 11, primaryColor: '#7c3aed' },
  { name: 'Brentford', logo: teamLogos.Brentford, wins: 1, draws: 1, losses: 6, goalsFor: 8, goalsAgainst: 17, captainName: 'Santiago Ruiz', captainPhone: '5511111109', playersCount: 11, primaryColor: '#f59e0b' },
  { name: 'West Ham', logo: teamLogos.West_Ham, wins: 0, draws: 2, losses: 6, goalsFor: 6, goalsAgainst: 22, captainName: 'Gael Morales', captainPhone: '5511111110', playersCount: 10, primaryColor: '#9f1239' },
];

export const leagueTwoRecords: TeamRecord[] = [
  { name: 'Barcelona', logo: teamLogos.Barcelona, wins: 6, draws: 1, losses: 1, goalsFor: 18, goalsAgainst: 7, captainName: 'Andrés Castillo', captainPhone: '5522222201', playersCount: 16, primaryColor: '#1d4ed8' },
  { name: 'Real Madrid', logo: teamLogos.Real_Madrid, wins: 6, draws: 0, losses: 2, goalsFor: 17, goalsAgainst: 8, captainName: 'Rodrigo Benítez', captainPhone: '5522222202', playersCount: 14, primaryColor: '#94a3b8' },
  { name: 'Atletico Madrid', logo: teamLogos.Atletico, wins: 5, draws: 2, losses: 1, goalsFor: 16, goalsAgainst: 9, captainName: 'Adrián Vega', captainPhone: '5522222203', playersCount: 15, primaryColor: '#ef4444' },
  { name: 'Sevilla', logo: teamLogos.Sevilla, wins: 4, draws: 2, losses: 2, goalsFor: 14, goalsAgainst: 10, captainName: 'Alejandro Torres', captainPhone: '5522222204', playersCount: 13, primaryColor: '#dc2626' },
  { name: 'Levante', logo: teamLogos.Levante, wins: 4, draws: 1, losses: 3, goalsFor: 12, goalsAgainst: 11, captainName: 'Emiliano Cruz', captainPhone: '5522222205', playersCount: 12, primaryColor: '#b91c1c' },
  { name: 'Real Betis', logo: teamLogos.Betis, wins: 3, draws: 2, losses: 3, goalsFor: 13, goalsAgainst: 13, captainName: 'Iván Ortega', captainPhone: '5522222206', playersCount: 12, primaryColor: '#16a34a' },
  { name: 'Athletic Bilbao', logo: teamLogos.Athletic, wins: 3, draws: 1, losses: 4, goalsFor: 10, goalsAgainst: 12, captainName: 'Pablo Rivas', captainPhone: '5522222207', playersCount: 12, primaryColor: '#e11d48' },
  { name: 'Villarreal', logo: teamLogos.Villarreal, wins: 1, draws: 2, losses: 5, goalsFor: 9, goalsAgainst: 14, captainName: 'Sergio Luna', captainPhone: '5522222208', playersCount: 11, primaryColor: '#eab308' },
  { name: 'Celta Vigo', logo: teamLogos.Celta, wins: 1, draws: 1, losses: 6, goalsFor: 8, goalsAgainst: 17, captainName: 'Marco Delgado', captainPhone: '5522222209', playersCount: 11, primaryColor: '#38bdf8' },
  { name: 'Malaga', logo: teamLogos.Malaga, wins: 0, draws: 2, losses: 6, goalsFor: 6, goalsAgainst: 22, captainName: 'Óscar Medina', captainPhone: '5522222210', playersCount: 10, primaryColor: '#2563eb' },
];

export const leagueThreeRecords: TeamRecord[] = [
  { name: 'Bayern München', logo: teamLogos.Bayern, wins: 6, draws: 1, losses: 1, goalsFor: 18, goalsAgainst: 7, captainName: 'Kevin Müller', captainPhone: '5533333301', playersCount: 16, primaryColor: '#dc2626' },
  { name: 'Borussia Dortmund', logo: teamLogos.Dortmund, wins: 6, draws: 0, losses: 2, goalsFor: 17, goalsAgainst: 8, captainName: 'Leonardo Fuentes', captainPhone: '5533333302', playersCount: 14, primaryColor: '#facc15' },
  { name: 'Eintracht Frankfurt', logo: teamLogos.Frankfurt, wins: 5, draws: 2, losses: 1, goalsFor: 16, goalsAgainst: 9, captainName: 'Tomás Aguilar', captainPhone: '5533333303', playersCount: 15, primaryColor: '#1f2937' },
  { name: 'Hamburgo', logo: teamLogos.Hamburgo, wins: 4, draws: 2, losses: 2, goalsFor: 14, goalsAgainst: 10, captainName: 'Bruno Reyes', captainPhone: '5533333304', playersCount: 13, primaryColor: '#2563eb' },
  { name: 'FC Köln', logo: teamLogos.Koln, wins: 4, draws: 1, losses: 3, goalsFor: 12, goalsAgainst: 11, captainName: 'Ricardo Paredes', captainPhone: '5533333305', playersCount: 12, primaryColor: '#ef4444' },
  { name: 'RB Leipzig', logo: teamLogos.Leipzig, wins: 3, draws: 2, losses: 3, goalsFor: 13, goalsAgainst: 13, captainName: 'Gabriel Soto', captainPhone: '5533333306', playersCount: 12, primaryColor: '#e11d48' },
  { name: 'Bayer Leverkusen', logo: teamLogos.Leverkusen, wins: 3, draws: 1, losses: 4, goalsFor: 10, goalsAgainst: 12, captainName: 'Daniel Ponce', captainPhone: '5533333307', playersCount: 12, primaryColor: '#b91c1c' },
  { name: 'FSV Mainz 05', logo: teamLogos.Mainz, wins: 1, draws: 2, losses: 5, goalsFor: 9, goalsAgainst: 14, captainName: 'Samuel Ríos', captainPhone: '5533333308', playersCount: 11, primaryColor: '#dc2626' },
  { name: 'Borussia Mönchengladbach', logo: teamLogos.Monchen, wins: 1, draws: 1, losses: 6, goalsFor: 8, goalsAgainst: 17, captainName: 'Víctor Mena', captainPhone: '5533333309', playersCount: 11, primaryColor: '#16a34a' },
  { name: 'VfB Stuttgart', logo: teamLogos.Stuttgart, wins: 0, draws: 2, losses: 6, goalsFor: 6, goalsAgainst: 22, captainName: 'Cristian Lara', captainPhone: '5533333310', playersCount: 10, primaryColor: '#ef4444' },
];

export const leagues: { name: string; records: TeamRecord[] }[] = [
  { name: LEAGUE_ONE, records: leagueOneRecords },
  { name: LEAGUE_TWO, records: leagueTwoRecords },
  { name: LEAGUE_THREE, records: leagueThreeRecords },
];
