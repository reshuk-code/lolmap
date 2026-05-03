"use client";

import { RoundResult as RoundResultType } from "../hooks/useGameState";

interface ResultsScreenProps {
  totalScore: number;
  maxScore: number;
  roundResults: RoundResultType[];
  onPlayAgain: () => void;
  onHome: () => void;
}

function getGrade(score: number, max: number): { title: string; desc: string; emoji: string; color: string } {
  const pct = score / max;
  if (pct >= 0.95) return { title: "SUPERSTAR!", desc: "You know the world like the back of your hand!", emoji: "🤩", color: "text-amber-400" };
  if (pct >= 0.8) return { title: "AMAZING!", desc: "Top tier geography skills!", emoji: "😎", color: "text-sky-500" };
  if (pct >= 0.6) return { title: "GREAT JOB!", desc: "You're a solid explorer!", emoji: "🤠", color: "text-green-500" };
  if (pct >= 0.4) return { title: "NOT BAD!", desc: "You found your way around okay.", emoji: "🤔", color: "text-orange-400" };
  if (pct >= 0.2) return { title: "LOST!", desc: "Maybe buy a map next time?", emoji: "😵‍💫", color: "text-red-400" };
  return { title: "WHOOPS!", desc: "Did you click with your eyes closed?", emoji: "🙈", color: "text-slate-400" };
}

function formatDist(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  if (km < 100) return `${km.toFixed(1)}km`;
  return `${Math.round(km).toLocaleString()}km`;
}

export default function ResultsScreen({ totalScore, maxScore, roundResults, onPlayAgain, onHome }: ResultsScreenProps) {
  const grade = getGrade(totalScore, maxScore);
  const pct = totalScore / maxScore;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="pattern-bg"></div>
      
      {/* Funky Background elements */}
      <div className="absolute top-10 left-10 text-6xl drop-shadow-xl animate-float-fun" style={{ animationDelay: "0s" }}>🎉</div>
      <div className="absolute top-40 right-20 text-7xl drop-shadow-xl animate-float-fun" style={{ animationDelay: "1s" }}>🏆</div>
      <div className="absolute bottom-20 left-20 text-8xl drop-shadow-xl animate-float-fun" style={{ animationDelay: "2s" }}>🎈</div>
      <div className="absolute bottom-40 right-10 text-6xl drop-shadow-xl animate-float-fun" style={{ animationDelay: "0.5s" }}>🎊</div>

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-8 animate-bounce-in">
        
        {/* Header */}
        <div className="bg-yellow-400 px-12 py-4 rounded-full border-[6px] border-white shadow-[0_8px_0_rgba(0,0,0,0.15)] transform -rotate-2 z-20">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase text-stroke">
            LEVEL COMPLETE!
          </h1>
        </div>

        <div className="w-full bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-[3rem] border-[8px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.2)] flex flex-col items-center gap-8 -mt-6 relative">
          
          <div className="absolute -top-10 -left-6 text-7xl transform -rotate-12 animate-star">🌟</div>

          {/* Grade Section */}
          <div className="flex flex-col items-center text-center mt-4">
            <div className="text-[100px] mb-2 animate-bounce-in drop-shadow-xl">{grade.emoji}</div>
            <h2 className={`text-6xl font-black uppercase tracking-tight drop-shadow-sm ${grade.color} text-stroke`}>
              {grade.title}
            </h2>
            <p className="text-xl font-bold text-slate-500 mt-2 bg-slate-100 px-6 py-2 rounded-full border-4 border-slate-200">{grade.desc}</p>
          </div>

          {/* Big Score */}
          <div className="w-full bg-slate-50 rounded-3xl border-4 border-slate-200 p-8 flex flex-col items-center shadow-inner">
            <span className="text-base font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><span>🎯</span> Total Score <span>🎯</span></span>
            <div className="flex items-end gap-2">
              <span className="text-7xl md:text-[6rem] font-black text-sky-500 drop-shadow-sm transform -rotate-3">{totalScore.toLocaleString()}</span>
              <span className="text-3xl font-bold text-slate-300 mb-4">/ {maxScore.toLocaleString()}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-8 bg-slate-200 rounded-full overflow-hidden border-[4px] border-white p-1 relative mt-6 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-yellow-400 transition-all duration-1000 ease-out" style={{ width: `${pct * 100}%` }} />
              <div className="absolute inset-0 bg-white/40 w-full h-1/3 rounded-t-full"></div>
            </div>
          </div>

          {/* Round Breakdown */}
          <div className="w-full flex flex-col gap-3">
            <h3 className="text-center font-black text-slate-400 uppercase tracking-widest text-sm mb-2">Round Recap</h3>
            {roundResults.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 bg-white rounded-[2rem] border-4 border-slate-100 shadow-sm hover:transform hover:scale-105 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center font-black text-lg border-4 border-sky-200">
                    {i + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-slate-700">{r.location.name}</span>
                    <span className="text-sm font-bold text-slate-400">{r.location.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-200">
                    {formatDist(r.distance)}
                  </span>
                  <span className="text-2xl font-black text-pink-500 w-20 text-right">
                    +{r.score}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <button onClick={onPlayAgain}
              className="flex-1 py-4 text-2xl btn-game btn-green animate-pulse-fun flex items-center justify-center gap-2">
              PLAY AGAIN 🎮
            </button>
            <button onClick={onHome}
              className="px-8 py-4 text-xl btn-game btn-white text-slate-600 flex items-center justify-center gap-2">
              HOME 🏠
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
