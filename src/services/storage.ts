import { Pitch, Booking, Team, Match, FinancialMetric } from '../types';
import {
  INITIAL_PITCHES,
  INITIAL_BOOKINGS,
  INITIAL_TEAMS,
  INITIAL_LIVE_MATCH,
  INITIAL_FINANCES,
} from './mockData';

const KEYS = {
  PITCHES: 'f7_pitches_v1',
  BOOKINGS: 'f7_bookings_v1',
  TEAMS: 'f7_teams_v1',
  MATCH: 'f7_match_v1',
  FINANCES: 'f7_finances_v1',
};

export const storage = {
  getPitches: (): Pitch[] => {
    const data = localStorage.getItem(KEYS.PITCHES);
    if (!data) {
      localStorage.setItem(KEYS.PITCHES, JSON.stringify(INITIAL_PITCHES));
      return INITIAL_PITCHES;
    }
    return JSON.parse(data);
  },
  savePitches: (pitches: Pitch[]): void => {
    localStorage.setItem(KEYS.PITCHES, JSON.stringify(pitches));
  },

  getBookings: (): Booking[] => {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    if (!data) {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  },
  saveBookings: (bookings: Booking[]): void => {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  getTeams: (): Team[] => {
    const data = localStorage.getItem(KEYS.TEAMS);
    if (!data) {
      localStorage.setItem(KEYS.TEAMS, JSON.stringify(INITIAL_TEAMS));
      return INITIAL_TEAMS;
    }
    return JSON.parse(data);
  },
  saveTeams: (teams: Team[]): void => {
    localStorage.setItem(KEYS.TEAMS, JSON.stringify(teams));
  },

  getMatch: (): Match => {
    const data = localStorage.getItem(KEYS.MATCH);
    if (!data) {
      localStorage.setItem(KEYS.MATCH, JSON.stringify(INITIAL_LIVE_MATCH));
      return INITIAL_LIVE_MATCH;
    }
    return JSON.parse(data);
  },
  saveMatch: (match: Match): void => {
    localStorage.setItem(KEYS.MATCH, JSON.stringify(match));
  },

  getFinances: (): FinancialMetric => {
    const data = localStorage.getItem(KEYS.FINANCES);
    if (!data) {
      localStorage.setItem(KEYS.FINANCES, JSON.stringify(INITIAL_FINANCES));
      return INITIAL_FINANCES;
    }
    return JSON.parse(data);
  },
  saveFinances: (finances: FinancialMetric): void => {
    localStorage.setItem(KEYS.FINANCES, JSON.stringify(finances));
  },

  resetAll: (): void => {
    localStorage.setItem(KEYS.PITCHES, JSON.stringify(INITIAL_PITCHES));
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    localStorage.setItem(KEYS.TEAMS, JSON.stringify(INITIAL_TEAMS));
    localStorage.setItem(KEYS.MATCH, JSON.stringify(INITIAL_LIVE_MATCH));
    localStorage.setItem(KEYS.FINANCES, JSON.stringify(INITIAL_FINANCES));
  },
};
