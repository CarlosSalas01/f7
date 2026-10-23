import rawPlayers from './players.json';
import { SquadPlayer } from '../types';
import kaiImg from '../assets/players/kai.png';

interface RawPlayer {
  nombreCompleto: string;
  equipo: string;
  posicion: 'Portero' | 'Defensa' | 'Medio' | 'Delantero';
  edad: number;
  partidosJugados: number;
  goles: number;
  asistencias: number;
  atajadas?: number;
  dorsal?: number;
}

// El JSON usa nombres largos; se normalizan a los nombres de League One
const TEAM_ALIASES: Record<string, string> = {
  'Manchester City': 'Manchester City',
  'Manchester United': 'Manchester United',
  'Tottenham Hotspur': 'Tottenham',
  'Newcastle United': 'Newcastle',
};

const players = rawPlayers as unknown as RawPlayer[];

// Plantilla agrupada por nombre de equipo de League One
export const squadByTeam: Record<string, SquadPlayer[]> = players.reduce(
  (acc, player, index) => {
    const teamName = TEAM_ALIASES[player.equipo] ?? player.equipo;
    (acc[teamName] ??= []).push({
      id: `${teamName}-${index}`,
      name: player.nombreCompleto,
      team: teamName,
      posicion: player.posicion,
      age: player.edad,
      matchesPlayed: player.partidosJugados,
      goals: player.goles,
      assists: player.asistencias,
      saves: player.atajadas,
      dorsal: player.dorsal,
      avatarUrl: kaiImg, // TODO: replace with individual player photos
    });
    return acc;
  },
  {} as Record<string, SquadPlayer[]>
);

export const getSquad = (teamName: string): SquadPlayer[] => squadByTeam[teamName] ?? [];

// All players flattened
export const allPlayers: SquadPlayer[] = Object.values(squadByTeam).flat();
