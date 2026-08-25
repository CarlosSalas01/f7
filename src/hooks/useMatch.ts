import { useState, useEffect, useRef } from 'react';
import { Match, MatchEvent } from '../types';
import { storage } from '../services/storage';

export function useMatch() {
  const [match, setMatch] = useState<Match>(storage.getMatch());
  const timerRef = useRef<number | null>(null);

  // Stopwatch effect
  useEffect(() => {
    if (match.isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setMatch((prev) => {
          const nextSeconds = prev.timerSeconds + 1;
          const updated = { ...prev, timerSeconds: nextSeconds };
          storage.saveMatch(updated);
          return updated;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [match.isTimerRunning]);

  const toggleTimer = () => {
    const updated = { ...match, isTimerRunning: !match.isTimerRunning };
    setMatch(updated);
    storage.saveMatch(updated);
  };

  const resetTimer = () => {
    const updated = { ...match, timerSeconds: 0, isTimerRunning: false };
    setMatch(updated);
    storage.saveMatch(updated);
  };

  const setPeriod = (period: Match['period']) => {
    const updated = { ...match, period };
    setMatch(updated);
    storage.saveMatch(updated);
  };

  const addGoal = (team: 'A' | 'B', playerName: string) => {
    const minute = Math.floor(match.timerSeconds / 60) || 1;
    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      minute,
      type: 'Gol',
      team,
      playerName: playerName || (team === 'A' ? match.teamA.name : match.teamB.name),
    };

    const updatedMatch: Match = {
      ...match,
      teamA: {
        ...match.teamA,
        score: team === 'A' ? match.teamA.score + 1 : match.teamA.score,
      },
      teamB: {
        ...match.teamB,
        score: team === 'B' ? match.teamB.score + 1 : match.teamB.score,
      },
      events: [newEvent, ...match.events],
    };

    setMatch(updatedMatch);
    storage.saveMatch(updatedMatch);
  };

  const addCard = (team: 'A' | 'B', cardType: 'Tarjeta Amarilla' | 'Tarjeta Roja', playerName: string) => {
    const minute = Math.floor(match.timerSeconds / 60) || 1;
    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      minute,
      type: cardType,
      team,
      playerName: playerName || 'Jugador',
    };

    const updatedMatch: Match = {
      ...match,
      events: [newEvent, ...match.events],
    };

    setMatch(updatedMatch);
    storage.saveMatch(updatedMatch);
  };

  const playWhistleSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2800, audioCtx.currentTime); // High whistle pitch
      osc.frequency.exponentialRampToValueAtTime(3200, audioCtx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(2600, audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.log('Audio whistle error', e);
    }
  };

  return {
    match,
    toggleTimer,
    resetTimer,
    setPeriod,
    addGoal,
    addCard,
    playWhistleSound,
  };
}
