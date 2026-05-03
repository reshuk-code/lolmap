"use client";

interface GameHUDProps {
  roundNum: number;
  totalRounds: number;
  score: number;
  locationName: string;
  hint: string;
  country: string;
  timeLeft: number;
  timerDuration: number;
  hasGuess: boolean;
  onConfirm: () => void;
}

export default function GameHUD({
  roundNum,
  totalRounds,
  score,
  locationName,
  hint,
  country,
  timeLeft,
  timerDuration,
  hasGuess,
  onConfirm,
}: GameHUDProps) {
  const progress = Math.max(0, timeLeft / timerDuration);
  
  const timerColorClass =
    timeLeft > timerDuration * 0.5
      ? "bg-gradient-to-r from-emerald-400 to-green-500"
      : timeLeft > timerDuration * 0.25
      ? "bg-gradient-to-r from-yellow-400 to-amber-500"
      : "bg-gradient-to-r from-rose-400 to-red-500";

  return (
    <div className="absolute top-0 left-0 right-0 z-[1000] flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-4 pointer-events-none w-full">
      
      {/* Left - Round & Score */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start pointer-events-auto">
        <img src="/logo.svg" alt="LOL MAP" className="w-[80px] drop-shadow-md hidden md:block mr-2" />
        <div className="bg-white/95 px-5 py-3 rounded-3xl border-[6px] border-sky-100 shadow-[0_6px_0_rgba(0,0,0,0.15)] flex flex-col items-center transform -rotate-3">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Round</span>
          <span className="text-3xl font-black text-sky-500 drop-shadow-sm">{roundNum}<span className="text-xl text-sky-300">/{totalRounds}</span></span>
        </div>
        
        <div className="bg-white/95 px-6 py-3 rounded-3xl border-[6px] border-amber-100 shadow-[0_6px_0_rgba(0,0,0,0.15)] flex flex-col items-center transform rotate-2">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Score</span>
          <span className="text-3xl font-black text-amber-500 drop-shadow-sm">{score.toLocaleString()}</span>
        </div>
      </div>

      {/* Center - Location Prompt */}
      <div className="bg-white/95 backdrop-blur-md px-10 py-4 rounded-[3rem] border-[8px] border-pink-400 shadow-[0_8px_0_#f43f5e] flex flex-col items-center flex-1 max-w-xl pointer-events-auto animate-bounce-in relative overflow-hidden">
        
        {/* Shine effect */}
        <div className="absolute top-0 left-10 w-full h-1/3 bg-white/40 rounded-b-full"></div>

        <div className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight truncate w-full text-center drop-shadow-sm z-10 font-display">
          {locationName}
        </div>
        <div className="flex items-center gap-2 text-base font-bold text-slate-500 z-10 bg-slate-100 px-4 py-1 rounded-full mt-2 border-2 border-slate-200">
          <span>{hint}</span>
          <span className="text-pink-400">✨</span>
          <span>{country}</span>
        </div>
      </div>

      {/* Right - Timer & Confirm */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pointer-events-auto">
        {/* Candy Bar Timer */}
        <div className="relative w-28 h-14 bg-slate-100 rounded-full border-[6px] border-white shadow-[0_6px_0_rgba(0,0,0,0.15)] overflow-hidden flex items-center p-1">
          <div className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColorClass}`} style={{ width: `${progress * 100}%` }}></div>
          <div className="absolute inset-0 bg-white/30 w-full h-1/3 rounded-t-full"></div>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-slate-800 text-stroke drop-shadow-md">
            {timeLeft}s
          </span>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          disabled={!hasGuess}
          className={`px-8 py-3 rounded-[2rem] text-2xl w-32 h-14 font-black uppercase transition-all duration-100 flex items-center justify-center ${hasGuess ? 'btn-game btn-green' : 'bg-slate-200 text-slate-400 border-[6px] border-white opacity-50 cursor-not-allowed shadow-[0_6px_0_rgba(0,0,0,0.1)]'}`}
        >
          {hasGuess ? "GO!🚀" : "..."}
        </button>
      </div>
    </div>
  );
}
