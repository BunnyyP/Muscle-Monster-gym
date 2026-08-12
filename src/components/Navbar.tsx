import React, { useState, useEffect } from 'react';
import { Dumbbell, Flame, Volume2, VolumeX, Sparkles, Clock } from 'lucide-react';

interface NavbarProps {
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  totalPumps: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  setSoundEnabled,
  totalPumps,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 rounded-xl shadow-lg border border-amber-400/40 transform -rotate-1 hover:rotate-0 transition-transform">
            <Dumbbell className="w-8 h-8 text-zinc-100 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 font-serif drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
                MUSCLE MONSTER GYM 💪
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded uppercase tracking-widest">
                EST. 2002
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-tight flex items-center gap-2">
              <span className="text-amber-400">2000s DESI HARDCORE IRON TEMPLE</span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="hidden sm:inline text-orange-400 font-semibold">FEES: ₹1100/- MONTH</span>
            </p>
          </div>
        </div>

        {/* Center Live Badge & Developer Info */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-xl border border-amber-500/30 shadow-inner">
            <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">PUMP REPS LOGGED</div>
              <div className="text-sm font-black text-amber-400 font-mono">{totalPumps} REPS ({totalPumps * 20} KG LIFTED)</div>
            </div>
          </div>

          {/* Developer Credit Header Badge - 2 lines */}
          <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl px-3 py-1.5 text-right font-mono text-[11px] leading-tight">
            <div className="text-amber-300 font-bold">Designed & developed by - Vinay Patel</div>
            <div className="text-amber-400 font-bold">Contact - 7753908364</div>
          </div>
        </div>

        {/* Right Action Controls & Clock */}
        <div className="flex items-center gap-3">
          
          {/* Digital Neon Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/60 border border-amber-500/30 rounded-lg text-amber-400 font-mono text-xs shadow-[0_0_10px_rgba(245,158,11,0.15)]">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{timeStr || '06:00:00 AM'}</span>
          </div>

          {/* Fee Badge Pill */}
          <div className="px-3 py-1.5 bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-red-500/40 rounded-lg text-red-300 font-bold text-xs flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>₹1100/MO</span>
          </div>

          {/* Sound FX Toggle Button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 text-xs font-bold ${
              soundEnabled
                ? 'bg-amber-500/20 border-amber-500 text-amber-400 hover:bg-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300'
            }`}
            title={soundEnabled ? 'Mute Gym Audio FX' : 'Enable Gym Audio FX'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">SFX ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-500" />
                <span className="hidden sm:inline">SFX OFF</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
