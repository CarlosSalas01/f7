import React from 'react';
import { SquadPlayer } from '../../types';
import { leagues } from '../../services/leagueData';
import { teamLogos } from '@/assets/teams/logos';

interface PlayerCardProps {
  player: SquadPlayer;
  /** Optional click handler */
  onClick?: (player: SquadPlayer) => void;
}

// Map each team to its primaryColor from league data
const TEAM_COLORS: Record<string, string> = Object.fromEntries(
  leagues.flatMap((l) => l.records.map((r) => [r.name, r.primaryColor]))
);

// Map team alias → logo file key
const LOGO_KEY_MAP: Record<string, string> = {
  'Man City': 'Manchester_city',
  'Man United': 'Manchester_United',
  Tottenham: 'Tottenham',
  Newcastle: 'Newcastle',
  Arsenal: 'Arsenal',
  Liverpool: 'Liverpool',
  Chelsea: 'Cheelsea',
  'Aston Villa': 'Aston_Villa',
  Brentford: 'Brentford',
  'West Ham': 'West_Ham',
};

const POSITION_COLORS: Record<string, { bg: string; text: string }> = {
  Portero: { bg: '#fef3c7', text: '#000' },
  Defensa: { bg: '#dbeafe', text: '#000' },
  Medio: { bg: '#dcfce7', text: '#000' },
  Delantero: { bg: '#fee2e2', text: '#000' },
};

/** Returns the last name (or last two words if surname is short) */
const getDisplayLastName = (fullName: string): string => {
  const parts = fullName.trim().split(' ');
  if (parts.length <= 1) return fullName.toUpperCase();
  return parts.slice(1).join(' ').toUpperCase();
};

const getFirstName = (fullName: string): string => {
  const parts = fullName.trim().split(' ');
  if (parts.length <= 1) return fullName.toUpperCase();
  return parts.slice(0, 1).join(' ').toUpperCase();
};

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  const primaryColor = TEAM_COLORS[player.team] ?? '#05AD31';
  const logoKey = LOGO_KEY_MAP[player.team];
  const logoUrl = logoKey ? teamLogos[logoKey] : undefined;
  const positionStyle = POSITION_COLORS[player.posicion] ?? { bg: '#f1f5f9', text: '#475569' };

  return (
    <article
      onClick={() => onClick?.(player)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(player) : undefined}
      className={`white-card flex h-[100px] overflow-hidden transition-all duration-200 select-none ${
        onClick ? 'white-card-hover cursor-pointer' : ''
      }`}
      style={{ fontFamily: "'Manrope Variable', sans-serif" }}
    >
      {/* LEFT: Photo + team-color bg */}
      <div
        className="relative w-[180px] flex-shrink-0 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}cc 0%, ${primaryColor}44 100%)`,
        }}
      >
        {/* Faint watermark logo */}
        {logoUrl && (
          <img
            src={logoUrl}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full translate-x-8 scale-110 object-contain opacity-20"
          />
        )}

        {/* Player photo or initials fallback */}
        {player.avatarUrl ? (
          <img
            src={player.avatarUrl}
            alt={player.name}
            className="absolute bottom-0 left-0 h-full w-auto object-cover object-top"
          />
        ) : (
          <div className="absolute bottom-0 left-4 flex h-full items-end">
            <div
              className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg"
              style={{ backgroundColor: `${primaryColor}` }}
            >
              {getInitials(player.name)}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Info panel */}
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-5">
        {/* JUGADOR label */}
        <span className="text-[10px] leading-none font-bold tracking-[0.18em] text-slate-400 uppercase">
          <h5
            className="font-title leading-none text-[#111827] dark:text-white"
            style={{ fontSize: 'clamp(0.6rem, 2.2vw, 1.15rem)', letterSpacing: '0.04em' }}
          >
            {getFirstName(player.name)}
          </h5>
        </span>

        {/* Big last-name */}
        <h3
          className="leading-none font-black text-[#111827] dark:text-white"
          style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', letterSpacing: '-0.03em' }}
        >
          {getDisplayLastName(player.name)}
        </h3>

        {/* Team badge + position */}
        <div className="mt-0.5 flex items-center gap-3">
          {/* Team badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold text-white shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            {logoUrl && (
              <img
                src={logoUrl}
                alt={player.team}
                className="h-4 w-4 flex-shrink-0 object-contain"
              />
            )}
            <span className="tracking-wide uppercase">{player.team}</span>
          </div>

          {/* Divider */}
          <span className="h-4 w-px bg-slate-300 dark:bg-slate-600" />

          {/* Position */}
          <span
            className="text-[11px] font-bold tracking-widest uppercase"
            style={{ color: positionStyle.text }}
          >
            {player.posicion}
          </span>
        </div>
      </div>
    </article>
  );
};
