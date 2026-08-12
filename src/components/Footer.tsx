import React from 'react';
import { Dumbbell, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t-2 border-amber-500/30 text-zinc-400 py-10 px-4 mt-20 relative z-20 pb-28">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
        
        {/* Logo and Tagline */}
        <div className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-amber-500 animate-pulse" />
          <span className="text-lg font-black text-amber-400 uppercase tracking-wider font-serif">
            MUSCLE MONSTER GYM 💪
          </span>
        </div>

        <p className="text-xs font-mono text-zinc-500 max-w-md">
          A deeply nostalgic tribute to early 2000s Indian gym culture, raw cast iron weights, ₹1100 monthly fees (NO REGISTRATION FEES), and timeless Bollywood workout energy.
        </p>

        {/* Timings & Address Details */}
        <div className="bg-zinc-900/80 border border-amber-500/30 rounded-xl p-4 max-w-2xl text-xs font-mono text-zinc-300 space-y-2">
          <div className="text-amber-400 font-bold uppercase tracking-wider">
            📍 Gym Address: Near Tadka restaurant, Shanti nagar ,Jhansi road , Orai (Jalaun) 285001
          </div>
          <div className="text-amber-300">
            ⏰ Gym Timings: Monday to Saturday | 6:00 AM to 10:00 AM & 5:00 PM to 9:00 PM
          </div>
          <div className="text-green-400 font-bold">
            ⚡ NO REGISTRATION FEES • Monthly Fees ₹1100/- Only
          </div>
        </div>

        {/* Developer Credit Banner - Exact Two Lines */}
        <div className="mt-2 px-8 py-4 bg-gradient-to-r from-amber-950/90 via-zinc-900 to-amber-950/90 border-2 border-amber-400/60 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center text-center text-amber-300 font-mono text-base font-bold tracking-wide space-y-1">
          <div className="text-amber-400">Designed & developed by - Vinay Patel</div>
          <div className="text-amber-300">Contact - 7753908364</div>
        </div>

        <div className="text-[10px] text-zinc-600 font-mono mt-2 flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>for Muscle Monster Gym • Est. 2002</span>
        </div>

      </div>
    </footer>
  );
};
