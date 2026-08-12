import React, { useState, useEffect } from 'react';
import { Dumbbell, Flame, Volume2, VolumeX, Sparkles, Clock, Menu, X, Phone, User, Compass, FileText, Coffee, Trophy, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-b-2 border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      
      {/* Primary Top Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative p-2 sm:p-2.5 bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 rounded-xl shadow-lg border border-amber-300/50 transform -rotate-1 hover:rotate-0 transition-transform">
            <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-100 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-zinc-950 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 font-serif drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]">
                MUSCLE MONSTER GYM 💪
              </h1>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded uppercase tracking-wider shrink-0">
                EST. 2023
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-mono tracking-tight hidden sm:flex items-center gap-2">
              <span className="text-amber-400 font-semibold">2000s DESI HARDCORE IRON TEMPLE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-orange-400 font-semibold">FEES: ₹1100/- MONTH</span>
            </p>
          </div>
        </div>

        {/* Center Live Badge & Developer Credit (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3 bg-zinc-900/90 px-3.5 py-1.5 rounded-xl border border-amber-500/30 shadow-inner">
            <Flame className="w-5 h-5 text-orange-500 animate-bounce shrink-0" />
            <div className="text-left font-mono">
              <div className="text-[9px] uppercase tracking-widest text-zinc-400">PUMP REPS LOGGED</div>
              <div className="text-xs font-black text-amber-400">{totalPumps} REPS ({totalPumps * 20} KG)</div>
            </div>
          </div>

          {/* Developer Credit Header Badge - Exact 2 Lines */}
          <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900 to-amber-950/80 border border-amber-500/50 rounded-xl px-3 py-1 text-right font-mono text-[11px] leading-tight shadow-md">
            <div className="text-amber-300 font-bold">Designed & developed by - Vinay Patel</div>
            <div className="text-amber-400 font-bold">Contact - 7753908364</div>
          </div>
        </div>

        {/* Right Action Controls & Clock */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Digital Neon Clock (Hidden on very small mobile) */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-black/70 border border-amber-500/30 rounded-lg text-amber-400 font-mono text-xs shadow-[0_0_10px_rgba(245,158,11,0.15)]">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{timeStr || '06:00:00 AM'}</span>
          </div>

          {/* Fee Badge Pill */}
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-red-950/90 to-amber-950/90 border border-red-500/50 rounded-lg text-red-300 font-bold text-[11px] sm:text-xs flex items-center gap-1 shrink-0 shadow-md">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>₹1100/MO</span>
          </div>

          {/* Sound FX Toggle Button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-1.5 text-xs font-bold ${
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

          {/* Mobile Navigation / Control Drawer Trigger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors relative"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </button>

        </div>

      </div>

      {/* Prominent Mobile Developer Credit Bar (Always visible on mobile right below top bar) */}
      <div className="lg:hidden bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border-t border-amber-500/30 px-3 py-1.5 text-center font-mono text-[11px] leading-tight text-amber-300 border-b border-amber-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-3">
          <span className="text-amber-400 font-bold">Designed & developed by - Vinay Patel</span>
          <span className="hidden sm:inline text-amber-600">•</span>
          <a href="tel:7753908364" className="text-amber-300 font-bold hover:underline flex items-center gap-1">
            <Phone className="w-3 h-3 text-amber-400 inline" /> Contact - 7753908364
          </a>
        </div>
      </div>

      {/* Mobile Drawer / Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950/98 border-b-2 border-amber-500/50 px-4 py-5 space-y-4 shadow-2xl overflow-hidden font-mono"
          >
            {/* Developer Credit High-Contrast Panel */}
            <div className="bg-gradient-to-br from-amber-950 via-zinc-900 to-zinc-950 p-3.5 rounded-2xl border-2 border-amber-500/50 shadow-lg text-center space-y-1">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" /> CREATOR CREDITS
              </div>
              <div className="text-sm font-black text-amber-300">Designed & developed by - Vinay Patel</div>
              <div className="text-xs font-bold text-amber-400">
                Contact - <a href="tel:7753908364" className="underline underline-offset-2 hover:text-white">7753908364</a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">TOTAL REPS</div>
                  <div className="font-bold text-amber-400">{totalPumps} REPS</div>
                </div>
              </div>
              <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">LIVE TIME</div>
                  <div className="font-bold text-amber-300 text-[11px]">{timeStr || '06:00 AM'}</div>
                </div>
              </div>
            </div>

            {/* Quick Jump Navigation Buttons */}
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" /> QUICK JUMP NAVIGATION
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => scrollToSection('pump-station')}
                  className="p-2.5 bg-zinc-900 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/40 rounded-xl text-left flex items-center gap-2 transition-colors"
                >
                  <Dumbbell className="w-4 h-4 text-amber-500 shrink-0" /> Barbell Rack
                </button>
                <button
                  onClick={() => scrollToSection('reception-ledger')}
                  className="p-2.5 bg-zinc-900 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/40 rounded-xl text-left flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-green-400 shrink-0" /> Fee Slip Form
                </button>
                <button
                  onClick={() => scrollToSection('gym-cafe')}
                  className="p-2.5 bg-zinc-900 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/40 rounded-xl text-left flex items-center gap-2 transition-colors"
                >
                  <Coffee className="w-4 h-4 text-orange-400 shrink-0" /> Shake Cafe
                </button>
                <button
                  onClick={() => scrollToSection('poster-wall')}
                  className="p-2.5 bg-zinc-900 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/40 rounded-xl text-left flex items-center gap-2 transition-colors"
                >
                  <Trophy className="w-4 h-4 text-yellow-400 shrink-0" /> Wall of Legends
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
