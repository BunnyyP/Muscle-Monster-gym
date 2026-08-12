import React from 'react';
import { Award, AlertTriangle, Sparkles, CheckCircle } from 'lucide-react';

export const PosterWall: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
          <Award className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> GYM WALL OF LEGENDS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-100 uppercase tracking-tight">
            2000s ICONIC POSTERS & RULES
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Poster 1: Arnold Schwarzenegger */}
        <div className="bg-zinc-950 border-2 border-amber-500/30 rounded-2xl p-6 relative shadow-2xl overflow-hidden group hover:border-amber-400 transition-colors">
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 text-zinc-950 font-mono text-[10px] font-bold rounded">
            THE GURU
          </div>
          <div className="w-full h-52 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black rounded-xl border border-zinc-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="text-6xl font-black text-amber-500/20 font-serif select-none">
              ARNOLD
            </div>
            <div className="text-center z-10">
              <h3 className="text-xl font-black text-amber-200 uppercase font-serif">ARNOLD SCHWARZENEGGER</h3>
              <p className="text-xs text-orange-400 font-mono mt-1">7x MR. OLYMPIA LEGEND</p>
            </div>
            <div className="absolute inset-0 border-2 border-dashed border-amber-500/20 m-2 rounded-lg pointer-events-none" />
          </div>
          <div className="mt-4 text-xs font-mono text-zinc-400 italic">
            "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character."
          </div>
        </div>

        {/* Poster 2: Ronnie Coleman */}
        <div className="bg-zinc-950 border-2 border-amber-500/30 rounded-2xl p-6 relative shadow-2xl overflow-hidden group hover:border-amber-400 transition-colors">
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500 text-zinc-950 font-mono text-[10px] font-bold rounded">
            KING OF HEAVY
          </div>
          <div className="w-full h-52 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black rounded-xl border border-zinc-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="text-5xl font-black text-orange-500/20 font-serif select-none">
              RONNIE
            </div>
            <div className="text-center z-10">
              <h3 className="text-xl font-black text-orange-200 uppercase font-serif">RONNIE COLEMAN</h3>
              <p className="text-xs text-amber-400 font-mono mt-1">"LIGHTWEIGHT BABY!"</p>
            </div>
            <div className="absolute inset-0 border-2 border-dashed border-orange-500/20 m-2 rounded-lg pointer-events-none" />
          </div>
          <div className="mt-4 text-xs font-mono text-zinc-400 italic">
            "Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights!"
          </div>
        </div>

        {/* Poster 3: Desi Gym Rules Stencil Wall */}
        <div className="bg-zinc-950 border-2 border-red-500/40 rounded-2xl p-6 relative shadow-2xl">
          <div className="flex items-center gap-2 text-red-400 text-sm font-mono font-bold uppercase mb-4 pb-2 border-b border-red-500/30">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>GYM RULES STENCIL BOARD</span>
          </div>

          <ul className="space-y-3 font-mono text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Racks pe weight set ke baad wapas rakhna mandatory hai!</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Dumbbell floor pe drop kiya toh ₹100 fine lagega!</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Bench press pe towel use karein hygiene ke liye.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Month ki 1st date ko fees ₹1100/- counter pe submit karein.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
