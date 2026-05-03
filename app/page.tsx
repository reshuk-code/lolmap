"use client";

import dynamic from "next/dynamic";
import { useGameState } from "./hooks/useGameState";
import StartScreen from "./components/StartScreen";
import GameHUD from "./components/GameHUD";
import RoundResult from "./components/RoundResult";
import ResultsScreen from "./components/ResultsScreen";

const GameMap = dynamic(() => import("./components/GameMap"), { ssr: false });

const TIMER_DURATIONS: Record<string, number> = {
  easy: 45,
  medium: 30,
  hard: 20,
};

function getResultStatus(score: number): { text: string; color: string } {
  if (score >= 4500) return { text: "PERFECT! 🎯", color: "text-rose-500" };
  if (score >= 3500) return { text: "AWESOME! 🌟", color: "text-orange-500" };
  if (score >= 2000) return { text: "NICE! 👍", color: "text-green-500" };
  if (score >= 1000) return { text: "OKAY! 🤔", color: "text-sky-500" };
  if (score >= 500) return { text: "OOPS! 😅", color: "text-slate-500" };
  return { text: "WAY OFF! 😭", color: "text-slate-600" };
}

export default function Home() {
  const {
    state,
    setRegion,
    setDifficulty,
    startGame,
    setGuess,
    confirmGuess,
    nextRound,
    goHome,
  } = useGameState();

  if (state.phase === "start") {
    return (
      <StartScreen
        region={state.region}
        difficulty={state.difficulty}
        onRegionChange={setRegion}
        onDifficultyChange={setDifficulty}
        onStart={startGame}
      />
    );
  }

  if (state.phase === "finished") {
    return (
      <ResultsScreen
        totalScore={state.totalScore}
        maxScore={state.totalRounds * 5000}
        roundResults={state.roundResults}
        onPlayAgain={() => {
          goHome();
          setTimeout(startGame, 50);
        }}
        onHome={goHome}
      />
    );
  }

  const currentLocation = state.locations[state.currentRound];
  const lastResult = state.roundResults[state.roundResults.length - 1];
  const isResultPhase = state.phase === "result";
  const isLastRound = state.currentRound >= state.totalRounds - 1;
  const timerDuration = TIMER_DURATIONS[state.difficulty] || 30;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {currentLocation && (
        <GameHUD
          roundNum={state.currentRound + 1}
          totalRounds={state.totalRounds}
          score={state.totalScore}
          locationName={currentLocation.name}
          hint={currentLocation.hint}
          country={currentLocation.country}
          timeLeft={state.timeLeft}
          timerDuration={timerDuration}
          hasGuess={!!state.guessPosition}
          onConfirm={confirmGuess}
        />
      )}

      <GameMap
        onGuess={setGuess}
        guessPosition={state.guessPosition}
        showResult={isResultPhase}
        answerLat={isResultPhase ? currentLocation?.lat : undefined}
        answerLng={isResultPhase ? currentLocation?.lng : undefined}
      />

      {isResultPhase && lastResult && (
        <RoundResult
          status={getResultStatus(lastResult.score)}
          score={lastResult.score}
          distance={lastResult.distance}
          maxScore={5000}
          isLastRound={isLastRound}
          onNext={nextRound}
        />
      )}
    </div>
  );
}
