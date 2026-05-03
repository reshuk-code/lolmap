"use client";

interface RoundResultProps {
  status: { text: string; color: string };
  score: number;
  distance: number;
  maxScore: number;
  isLastRound: boolean;
  onNext: () => void;
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} meters`;
  if (km < 100) return `${km.toFixed(1)} km`;
  return `${Math.round(km).toLocaleString()} km`;
}

export default function RoundResult({ status, score, distance, maxScore, isLastRound, onNext }: RoundResultProps) {
  const pct = Math.min(100, (score / maxScore) * 100);

  return (
    <div className="absolute inset-0 z-[1100] flex items-center justify-center bg-sky-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-[3rem] p-8 pb-10 flex flex-col items-center w-[400px] border-[12px] border-sky-400 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-bounce-in relative">
        
        {/* Star Badge */}
        <div className="absolute -top-20 bg-amber-400 w-[120px] h-[120px] rounded-full flex items-center justify-center border-[10px] border-white shadow-[0_8px_0_rgba(0,0,0,0.1)]">
          <span className="text-7xl animate-star drop-shadow-md">⭐</span>
        </div>

        <div className="mt-12 flex items-center gap-2">
          <span className={`text-4xl font-black uppercase tracking-wider ${status.color} animate-pulse-fun text-stroke`}>
            {status.text}
          </span>
        </div>

        <div className="flex flex-col items-center w-full mt-6 bg-slate-50 p-6 rounded-3xl border-4 border-slate-200">
          <div className="text-sm font-black text-slate-400 uppercase tracking-widest">You Scored</div>
          <div className="text-[5rem] leading-none font-black text-sky-500 drop-shadow-sm mt-1 mb-2 transform -rotate-2">
            +{score}
          </div>
          <div className="text-sm font-black text-slate-500 bg-white px-5 py-2 rounded-full mt-2 border-2 border-slate-200 shadow-sm flex items-center gap-2">
            <span>📏</span> You were {formatDistance(distance)} away!
          </div>
        </div>

        <div className="w-full mt-6 mb-8">
          <div className="w-full h-8 bg-slate-200 rounded-full overflow-hidden border-[4px] border-white p-1 relative shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]">
            <div className="h-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
            <div className="absolute inset-0 bg-white/40 w-full h-1/3 rounded-t-full"></div>
          </div>
        </div>

        <button onClick={onNext}
          className="btn-game btn-yellow w-full py-4 text-2xl group flex items-center justify-center gap-2 animate-pulse-fun">
          <span>{isLastRound ? "RESULTS" : "NEXT ROUND"}</span>
          <span className="text-3xl">👉</span>
        </button>
      </div>
    </div>
  );
}
