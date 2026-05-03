"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Location, getGameLocations } from "../data/locations";

export type GamePhase = "start" | "playing" | "result" | "finished";

export interface RoundResult {
  location: Location;
  guessLat: number;
  guessLng: number;
  distance: number;
  score: number;
}

export interface GameState {
  phase: GamePhase;
  region: string;
  difficulty: string;
  locations: Location[];
  currentRound: number;
  totalRounds: number;
  totalScore: number;
  roundResults: RoundResult[];
  guessPosition: { lat: number; lng: number } | null;
  timeLeft: number;
  timerActive: boolean;
}

const TIMER_DURATIONS: Record<string, number> = {
  easy: 45,
  medium: 30,
  hard: 20,
};

const MAX_SCORE_PER_ROUND = 5000;

/**
 * Calculate distance between two points on Earth using the Haversine formula.
 * Returns distance in kilometers.
 */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate score based on distance. Uses an exponential decay.
 * Perfect guess = 5000 points. Further away = fewer points.
 */
function calculateScore(distanceKm: number): number {
  if (distanceKm < 1) return MAX_SCORE_PER_ROUND;
  // Score decreases as distance increases. 
  // ~150km = ~4500, ~500km = ~3500, ~2000km = ~1500, ~5000km = ~200
  const score = MAX_SCORE_PER_ROUND * Math.exp(-distanceKm / 2000);
  return Math.max(0, Math.round(score));
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: "start",
    region: "world",
    difficulty: "medium",
    locations: [],
    currentRound: 0,
    totalRounds: 5,
    totalScore: 0,
    roundResults: [],
    guessPosition: null,
    timeLeft: 30,
    timerActive: false,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer logic
  useEffect(() => {
    if (state.timerActive && state.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.timeLeft <= 1) {
            // Time's up - auto-submit
            return { ...prev, timeLeft: 0, timerActive: false };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.timerActive, state.timeLeft]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (state.timeLeft === 0 && state.phase === "playing" && !state.timerActive) {
      confirmGuess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timeLeft, state.phase, state.timerActive]);

  const setRegion = useCallback((region: string) => {
    setState((prev) => ({ ...prev, region }));
  }, []);

  const setDifficulty = useCallback((difficulty: string) => {
    setState((prev) => ({ ...prev, difficulty }));
  }, []);

  const startGame = useCallback(() => {
    const gameLocations = getGameLocations(state.region, state.difficulty, 5);
    const timerDuration = TIMER_DURATIONS[state.difficulty] || 30;
    setState((prev) => ({
      ...prev,
      phase: "playing",
      locations: gameLocations,
      currentRound: 0,
      totalScore: 0,
      roundResults: [],
      guessPosition: null,
      timeLeft: timerDuration,
      timerActive: true,
    }));
  }, [state.region, state.difficulty]);

  const setGuess = useCallback((lat: number, lng: number) => {
    setState((prev) => ({
      ...prev,
      guessPosition: { lat, lng },
    }));
  }, []);

  const confirmGuess = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;

      const currentLocation = prev.locations[prev.currentRound];
      if (!currentLocation) return prev;

      let distance: number;
      let score: number;

      if (prev.guessPosition) {
        distance = haversineDistance(
          prev.guessPosition.lat,
          prev.guessPosition.lng,
          currentLocation.lat,
          currentLocation.lng
        );
        score = calculateScore(distance);
      } else {
        // No guess made (time ran out) — 0 points
        distance = 20000;
        score = 0;
      }

      const roundResult: RoundResult = {
        location: currentLocation,
        guessLat: prev.guessPosition?.lat ?? 0,
        guessLng: prev.guessPosition?.lng ?? 0,
        distance,
        score,
      };

      return {
        ...prev,
        phase: "result",
        timerActive: false,
        totalScore: prev.totalScore + score,
        roundResults: [...prev.roundResults, roundResult],
      };
    });
  }, []);

  const nextRound = useCallback(() => {
    setState((prev) => {
      const nextIdx = prev.currentRound + 1;
      if (nextIdx >= prev.totalRounds) {
        return { ...prev, phase: "finished" };
      }
      const timerDuration = TIMER_DURATIONS[prev.difficulty] || 30;
      return {
        ...prev,
        phase: "playing",
        currentRound: nextIdx,
        guessPosition: null,
        timeLeft: timerDuration,
        timerActive: true,
      };
    });
  }, []);

  const goHome = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "start",
      locations: [],
      currentRound: 0,
      totalScore: 0,
      roundResults: [],
      guessPosition: null,
      timeLeft: 30,
      timerActive: false,
    }));
  }, []);

  return {
    state,
    setRegion,
    setDifficulty,
    startGame,
    setGuess,
    confirmGuess,
    nextRound,
    goHome,
  };
}
