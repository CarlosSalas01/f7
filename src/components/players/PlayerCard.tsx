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
  'Manchester City': 'Manchester_city',
  'Manchester United': 'Manchester_United',
  Tottenham: 'Tottenham',
  Newcastle: 'Newcastle',
  Arsenal: 'Arsenal',
  Liverpool: 'Liverpool',
  Chelsea: 'Chelsea',
  'Aston Villa': 'Aston_Villa',
  Brentford: 'Brentford',
  'West Ham': 'West_Ham',
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

  return (
    <article
      onClick={() => onClick?.(player)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Ver ficha de ${player.name}` : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(player);
              }
            }
          : undefined
      }
      className={`group flex min-h-28 overflow-hidden rounded-2xl border border-[#E1E8E2] bg-white transition-[border-color,box-shadow] duration-200 select-none dark:border-slate-700 dark:bg-slate-900 ${
        onClick
          ? 'cursor-pointer hover:border-[#0A4D1A]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#0A4D1A] focus-visible:outline-none dark:hover:border-[#2FE85F]/50'
          : ''
      }`}
      style={{ fontFamily: "'Manrope Variable', sans-serif" }}
    >
      {/* Photo: fixed portrait tile, same treatment for every player */}
      <div
        className="relative w-28 shrink-0 self-stretch overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}cc 0%, ${primaryColor}44 100%)`,
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full translate-x-4 scale-110 object-contain opacity-10"
          />
        )}

        {player.avatarUrl ? (
          <img
            src={player.avatarUrl}
            alt={`Foto de ${player.name}`}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white shadow-md"
              style={{ backgroundColor: primaryColor }}
              aria-hidden
            >
              {getInitials(player.name)}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] leading-tight font-bold tracking-[0.12em] text-[#647067] uppercase dark:text-slate-400">
            {getFirstName(player.name)}
          </p>
          <h3 className="mt-0.5 text-xl leading-tight font-black tracking-tight wrap-break-word text-[#17211B] dark:text-white">
            {getDisplayLastName(player.name)}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-white uppercase"
            style={{ backgroundColor: primaryColor }}
          >
            {logoUrl && (
              <img src={logoUrl} alt="" aria-hidden className="h-3.5 w-3.5 object-contain" />
            )}
            {player.team}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold tracking-wide whitespace-nowrap text-[#17211B] uppercase dark:bg-slate-800 dark:text-slate-200">
            {player.posicion}
          </span>
        </div>
      </div>

      {player.dorsal !== undefined && (
        <div
          className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 border-l border-dashed border-[#E1E8E2] transition-colors group-hover:bg-[#F3F7F4] dark:border-slate-700 dark:group-hover:bg-slate-800/60"
          role="group"
          aria-label={`Dorsal ${player.dorsal}`}
        >
          <span
            className="text-[9px] font-bold tracking-[0.16em] text-[#706464] uppercase dark:text-slate-400"
            aria-hidden
          >
            N.º
          </span>
          <span
            className="text-3xl leading-none font-black tracking-tighter text-[#000200] tabular-nums dark:text-[#2FE85F]"
            aria-hidden
          >
            {player.dorsal}
          </span>
        </div>
      )}
    </article>
  );
};
