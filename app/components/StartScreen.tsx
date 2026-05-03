"use client";

interface StartScreenProps {
  region: string;
  difficulty: string;
  onRegionChange: (region: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onStart: () => void;
}

const regions = [
  { id: "world", icon: "🌍", label: "World" },
  { id: "asia", icon: "🌏", label: "Asia" },
  { id: "europe", icon: "🌍", label: "Europe" },
  { id: "americas", icon: "🌎", label: "Americas" },
];

const difficulties = [
  { id: "easy", label: "EASY", desc: "Famous places", color: "text-emerald-500", border: "border-emerald-400" },
  { id: "medium", label: "MEDIUM", desc: "Cities & towns", color: "text-amber-500", border: "border-amber-400" },
  { id: "hard", label: "HARD", desc: "Middle of nowhere", color: "text-rose-500", border: "border-rose-400" },
];

export default function StartScreen({
  region,
  difficulty,
  onRegionChange,
  onDifficultyChange,
  onStart,
}: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="pattern-bg"></div>
      
      {/* Funky Background elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
        <img src="/main.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-10 left-10 text-[80px] drop-shadow-xl animate-float-fun" style={{ animationDelay: "0s" }}>☁️</div>
      <div className="absolute top-40 right-20 text-[90px] drop-shadow-xl animate-float-fun" style={{ animationDelay: "1s" }}>✈️</div>
      <div className="absolute bottom-20 right-10 text-[100px] drop-shadow-xl animate-float-fun" style={{ animationDelay: "2s" }}>🎈</div>
      <div className="absolute bottom-10 left-10 text-[120px] drop-shadow-xl animate-float-fun" style={{ animationDelay: "0.5s" }}>🗺️</div>
      <div className="absolute top-1/4 left-1/4 text-[60px] drop-shadow-xl animate-float-fun" style={{ animationDelay: "1.5s" }}>⭐</div>

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center gap-6 animate-bounce-in">
        
        {/* Game Title */}
        <div className="flex flex-col items-center text-center animate-pulse-fun">
          <img src="/banner.png" alt="LOL MAP" className="w-[300px] md:w-[450px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] mb-4" />
          <div className="bg-yellow-300 px-8 py-3 rounded-full transform -rotate-3 border-[6px] border-white shadow-[0_8px_0_rgba(0,0,0,0.15)] mt-[-20px] z-20">
            <p className="text-xl font-black text-amber-800 tracking-widest uppercase">
              REVERSE GEOGUESSER! 🤪
            </p>
          </div>
        </div>

        {/* Settings Container */}
        <div className="w-full bg-white/95 backdrop-blur-sm p-8 rounded-[3rem] flex flex-col gap-8 shadow-[0_15px_30px_rgba(0,0,0,0.2)] border-8 border-white/40 relative mt-4">
          
          <div className="absolute -top-6 -right-6 text-6xl transform rotate-12 drop-shadow-lg">✨</div>

          {/* Region Selector */}
          <div className="w-full bg-slate-50 p-6 rounded-[2rem] border-4 border-slate-200">
            <h3 className="text-center font-black text-slate-400 uppercase tracking-widest mb-4 text-sm flex justify-center items-center gap-2">
              <span>🗺️</span> Pick a Region <span>🗺️</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {regions.map((r) => {
                const isSelected = region === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => onRegionChange(r.id)}
                    className={`flex flex-col items-center gap-2 py-4 px-2 rounded-[1.5rem] transition-all cursor-pointer border-[4px] font-black uppercase text-sm ${isSelected ? 'border-sky-400 bg-sky-100 text-sky-600 shadow-[0_4px_0_#38bdf8] transform -translate-y-1' : 'border-slate-200 text-slate-400 bg-white hover:bg-slate-50 hover:border-slate-300'}`}
                  >
                    <span className="text-4xl drop-shadow-sm">{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="w-full bg-slate-50 p-6 rounded-[2rem] border-4 border-slate-200">
            <h3 className="text-center font-black text-slate-400 uppercase tracking-widest mb-4 text-sm flex justify-center items-center gap-2">
              <span>🌶️</span> Difficulty <span>🌶️</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {difficulties.map((d) => {
                const isSelected = difficulty === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => onDifficultyChange(d.id)}
                    className={`flex flex-col items-center justify-center gap-1 py-4 px-2 rounded-[1.5rem] transition-all cursor-pointer border-[4px] font-black uppercase ${isSelected ? `${d.border} bg-white shadow-[0_4px_0_rgba(0,0,0,0.1)] transform -translate-y-1` : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'}`}
                  >
                    <span className={`text-lg ${d.color}`}>
                      {d.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 normal-case">
                      {d.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="btn-game btn-pink mt-6 px-12 py-5 text-4xl w-full max-w-md flex items-center justify-center gap-3 animate-pulse-fun"
        >
          <span>PLAY NOW!</span>
          <span className="text-4xl">🚀</span>
        </button>

      </div>
    </div>
  );
}
