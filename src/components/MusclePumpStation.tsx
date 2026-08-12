import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, Flame, Trophy, Sparkles, Zap, Award, Keyboard } from 'lucide-react';
import { gymAudio } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface MusclePumpStationProps {
  soundEnabled: boolean;
  totalPumps: number;
  setTotalPumps: React.Dispatch<React.SetStateAction<number>>;
}

export const MusclePumpStation: React.FC<MusclePumpStationProps> = ({
  soundEnabled,
  totalPumps,
  setTotalPumps,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(60); // 60 kg default
  const [isLifting, setIsLifting] = useState<boolean>(false);
  const [sweatMeter, setSweatMeter] = useState<number>(20);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activePlateCount, setActivePlateCount] = useState<number>(2); // 2 plates each side

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Motivational shouts on rep
  const REP_SHOUTS = [
    "LIGHTWEIGHT BABY! 🏋️‍♂️",
    "HAATHI KA ZOR! 💪",
    "BICEP 16 INCH HOGAYA! 🔥",
    "GURUJI IS PROUD OF YOU! 🌟",
    "ONE MORE REP BRO! 😤",
    "CHEST BENCH PRESS RECORD! 🏆",
    "FULL DESI POWER! 💥",
    "NO PAIN NO GAIN! 💯"
  ];

  // Title Rank based on total reps
  const getRankTitle = (reps: number) => {
    if (reps < 10) return { title: 'Beginner Gym Rat', color: 'text-zinc-400', border: 'border-zinc-700' };
    if (reps < 25) return { title: 'Desi Protein Hunter', color: 'text-amber-400', border: 'border-amber-500/50' };
    if (reps < 50) return { title: 'Heavy Bench Presser', color: 'text-orange-400', border: 'border-orange-500' };
    if (reps < 100) return { title: 'Desi Hulk of the Colony', color: 'text-red-400', border: 'border-red-500' };
    return { title: 'MUSCLE MONSTER LEGEND 👑', color: 'text-amber-300 font-extrabold animate-pulse', border: 'border-amber-400' };
  };

  const handlePump = () => {
    if (isLifting) return;
    setIsLifting(true);

    if (soundEnabled) {
      gymAudio.playBarbellClank();
    }

    setTotalPumps((prev) => prev + 1);
    setSweatMeter((prev) => Math.min(100, prev + 8));

    // Random Toast
    const randomShout = REP_SHOUTS[Math.floor(Math.random() * REP_SHOUTS.length)];
    setToastMessage(randomShout);

    setTimeout(() => {
      setIsLifting(false);
    }, 300);

    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Keyboard spacebar listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        // Prevent default scrolling if spacebar is pressed
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handlePump();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled, isLifting]);

  // Chalk particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 280;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new floating chalk dust particles periodically
      if (Math.random() < 0.2) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height - 10,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -Math.random() * 1.5 - 0.5,
          size: Math.random() * 3 + 1,
          alpha: Math.random() * 0.4 + 0.2
        });
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.005;

        ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0 || p.y < 0) {
          particles.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentRank = getRankTitle(totalPumps);

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-6">
      <div className="relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden">
        
        {/* Top Header & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-700 rounded-2xl shadow-lg border border-amber-300/40">
              <Dumbbell className="w-10 h-10 text-zinc-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                  CENTRAL VISUAL OBJECT
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Keyboard className="w-3.5 h-3.5 text-amber-400" /> PRESS SPACEBAR TO PUMP
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 uppercase tracking-tight">
                2000s OLYMPIC BARBELL & PUMP RACK
              </h2>
            </div>
          </div>

          {/* User Rank Badge */}
          <div className={`px-4 py-2 bg-zinc-900/90 border ${currentRank.border} rounded-2xl flex items-center gap-3 shadow-lg`}>
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">CURRENT STATUS</div>
              <div className={`text-sm font-black uppercase tracking-wide ${currentRank.color}`}>
                {currentRank.title}
              </div>
            </div>
          </div>
        </div>

        {/* Central Visual Barbell Canvas Stage */}
        <div className="relative my-8 min-h-[280px] bg-zinc-950/90 rounded-2xl border border-amber-500/20 p-6 flex flex-col items-center justify-center overflow-hidden">
          
          {/* Canvas Background Chalk Dust Effect */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Toast Notification Floating Alert */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute top-4 z-30 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-zinc-950 font-black text-base uppercase rounded-full shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center gap-2 border-2 border-yellow-200"
              >
                <Zap className="w-5 h-5 text-zinc-950 fill-zinc-950 animate-bounce" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Barbell Assembly Container */}
          <div className="relative w-full max-w-2xl py-12 flex items-center justify-center">
            
            {/* The Barbell Steel Shaft */}
            <motion.div
              animate={{
                y: isLifting ? -35 : 0,
                rotate: isLifting ? [0, -1, 1, 0] : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="relative w-full h-6 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-full border-y border-zinc-600 shadow-[0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-between px-8"
            >
              
              {/* Knurling Grip Center Lines */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-48 bg-[repeating-linear-gradient(45deg,#000,#000_2px,#d4d4d8_2px,#d4d4d8_4px)] opacity-40 rounded" />

              {/* Left Side Iron Plates */}
              <div className="flex items-center -space-x-2 relative -left-6">
                {Array.from({ length: activePlateCount }).map((_, idx) => (
                  <div
                    key={`left-${idx}`}
                    className="w-8 h-32 sm:h-40 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 border-2 border-amber-600/50 rounded-lg shadow-2xl flex items-center justify-center relative group"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8), 0 5px 15px rgba(0,0,0,0.9)'
                    }}
                  >
                    <span className="text-[9px] font-mono text-amber-500 font-bold -rotate-90 select-none">
                      {selectedWeight / (activePlateCount * 2)} KG
                    </span>
                    {/* Metal rim highlight */}
                    <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-1 bg-amber-500/30 rounded" />
                  </div>
                ))}
                {/* Collar Lock */}
                <div className="w-5 h-12 bg-amber-500 rounded border border-amber-300 shadow" />
              </div>

              {/* Center Plate Weight Tag */}
              <div className="z-10 px-4 py-1.5 bg-zinc-900/90 border border-amber-500/60 rounded-xl text-center shadow-lg">
                <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">TOTAL WEIGHT</div>
                <div className="text-xl font-black text-amber-400 font-mono">{selectedWeight} KG</div>
              </div>

              {/* Right Side Iron Plates */}
              <div className="flex items-center -space-x-2 relative -right-6">
                {/* Collar Lock */}
                <div className="w-5 h-12 bg-amber-500 rounded border border-amber-300 shadow" />
                {Array.from({ length: activePlateCount }).map((_, idx) => (
                  <div
                    key={`right-${idx}`}
                    className="w-8 h-32 sm:h-40 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 border-2 border-amber-600/50 rounded-lg shadow-2xl flex items-center justify-center relative group"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8), 0 5px 15px rgba(0,0,0,0.9)'
                    }}
                  >
                    <span className="text-[9px] font-mono text-amber-500 font-bold -rotate-90 select-none">
                      {selectedWeight / (activePlateCount * 2)} KG
                    </span>
                    {/* Metal rim highlight */}
                    <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-1 bg-amber-500/30 rounded" />
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* Interactive Heavy Action Button */}
          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              onClick={handlePump}
              disabled={isLifting}
              className={`group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-zinc-950 font-black text-xl uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-amber-300 transform transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isLifting ? 'scale-95 opacity-90' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Dumbbell className="w-8 h-8 text-zinc-950 animate-pulse" />
                <span>PUMP IRON NOW! 💪</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-950/80 font-bold tracking-widest mt-0.5">
                [ CLICK OR PRESS SPACEBAR ]
              </div>
            </button>

            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Heavy sound effect plays on every rep!
            </span>
          </div>

        </div>

        {/* Weight Plate Selector & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
          
          {/* Weight Plate Configuration */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-amber-500/20">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center justify-between">
              <span>LOAD CAST IRON WEIGHTS</span>
              <span className="text-zinc-500">{selectedWeight} KG</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { weight: 40, plates: 1, label: '40 KG' },
                { weight: 60, plates: 2, label: '60 KG' },
                { weight: 100, plates: 3, label: '100 KG' },
                { weight: 140, plates: 4, label: '140 KG' },
              ].map((opt) => (
                <button
                  key={opt.weight}
                  onClick={() => {
                    setSelectedWeight(opt.weight);
                    setActivePlateCount(opt.plates);
                    if (soundEnabled) gymAudio.playPlateClink();
                  }}
                  className={`py-2 px-1 text-xs font-mono font-bold rounded-xl border transition-all ${
                    selectedWeight === opt.weight
                      ? 'bg-amber-500 text-zinc-950 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-500/40'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sweat & Energy Meter */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 uppercase">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" /> SWEAT & PUMP METER
              </span>
              <span className="text-orange-400">{sweatMeter}%</span>
            </div>
            <div className="w-full h-4 bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden my-2">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 transition-all duration-300 rounded-full"
                style={{ width: `${sweatMeter}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              {sweatMeter > 80 ? '🔥 MAXIMUM DESI PUMP REACHED!' : 'Keep lifting to boost sweat meter!'}
            </p>
          </div>

          {/* Total Lift Tonnage Stats */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400" /> TOTAL TONNAGE LIFTED
              </div>
              <div className="text-2xl font-black text-zinc-100 font-mono">
                {(totalPumps * selectedWeight).toLocaleString()} <span className="text-sm font-normal text-zinc-400">KG</span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-1">
                Total Reps: {totalPumps} Reps
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Flame className="w-8 h-8 animate-bounce" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
