import React, { useState } from 'react';
import { WORKOUT_EXERCISES } from '../data/gymData';
import { WorkoutExercise } from '../types';
import { Dumbbell, Flame, Sparkles, RefreshCw, Zap, Award, Target, HelpCircle } from 'lucide-react';
import { gymAudio } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutOfTheDayProps {
  soundEnabled: boolean;
}

export const WorkoutOfTheDay: React.FC<WorkoutOfTheDayProps> = ({ soundEnabled }) => {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutExercise | null>(WORKOUT_EXERCISES[0]);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const handleDrawWorkout = () => {
    if (isRevealing) return;
    setIsRevealing(true);

    if (soundEnabled) {
      gymAudio.playWhistle();
    }

    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * WORKOUT_EXERCISES.length);
      if (currentWorkout && WORKOUT_EXERCISES[randomIndex].id === currentWorkout.id) {
        randomIndex = (randomIndex + 1) % WORKOUT_EXERCISES.length;
      }
      setCurrentWorkout(WORKOUT_EXERCISES[randomIndex]);
      setIsRevealing(false);
      if (soundEnabled) {
        gymAudio.playBarbellClank();
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden">
        
        {/* Background Vintage Texture Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="sticker text-xs px-2.5 py-0.5">
                VINTAGE 2000s ROUTINE
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> DAILY AKHADA CHALLENGE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#fbbf24] iron-text italic uppercase tracking-tighter mt-1">
              WORKOUT OF THE DAY
            </h2>
          </div>

          <button
            onClick={handleDrawWorkout}
            disabled={isRevealing}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-zinc-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] border-2 border-amber-300 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-zinc-950 ${isRevealing ? 'animate-spin' : ''}`} />
            <span>{isRevealing ? 'DRAWING WORKOUT...' : 'REVEAL RANDOM WORKOUT 🎲'}</span>
          </button>
        </div>

        {/* Main Exercise Vintage Card Display */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isRevealing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12 flex flex-col items-center gap-4"
              >
                <div className="p-5 bg-amber-500/20 border-2 border-amber-400 rounded-full animate-bounce">
                  <Dumbbell className="w-12 h-12 text-amber-400 animate-spin" />
                </div>
                <p className="text-lg font-black text-amber-300 font-mono tracking-widest uppercase">
                  SHUFFLING GURUJI'S EXERCISE REGISTER...
                </p>
              </motion.div>
            ) : currentWorkout ? (
              <motion.div
                key={currentWorkout.id}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full bg-amber-100/95 text-zinc-900 rounded-2xl p-6 sm:p-8 border-4 border-amber-800/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative font-serif transform -rotate-1"
                style={{
                  backgroundImage: 'radial-gradient(#d97706 0.75px, transparent 0.75px)',
                  backgroundSize: '16px 16px',
                  backgroundColor: '#fef3c7'
                }}
              >
                {/* Stamp Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 border-2 border-red-700 rounded-md text-red-700 font-black text-xs uppercase rotate-6 tracking-widest bg-amber-200/80 shadow-sm pointer-events-none">
                  {currentWorkout.difficulty}
                  <div className="text-[8px] text-center font-mono">APPROVED BY GURUJI</div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-amber-900 text-amber-100 rounded-xl shadow">
                    <Dumbbell className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-900 uppercase tracking-widest">
                      2000s CLASSIC GYM EXERCISE
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
                      {currentWorkout.name}
                    </h3>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 font-mono text-xs">
                  <div className="p-3 bg-amber-200/80 rounded-xl border border-amber-400/60">
                    <span className="font-bold text-amber-950 uppercase flex items-center gap-1.5 mb-1">
                      <Target className="w-4 h-4 text-orange-700" /> TARGET MUSCLE:
                    </span>
                    <span className="text-sm font-black text-amber-900">{currentWorkout.targetMuscle}</span>
                  </div>

                  <div className="p-3 bg-amber-200/80 rounded-xl border border-amber-400/60">
                    <span className="font-bold text-amber-950 uppercase flex items-center gap-1.5 mb-1">
                      <Zap className="w-4 h-4 text-green-700" /> REPS & SETS:
                    </span>
                    <span className="text-sm font-black text-amber-900">{currentWorkout.repsAndSets}</span>
                  </div>

                  <div className="p-3 bg-amber-200/80 rounded-xl border border-amber-400/60">
                    <span className="font-bold text-amber-950 uppercase flex items-center gap-1.5 mb-1">
                      <Award className="w-4 h-4 text-amber-800" /> DESI EQUIPMENT:
                    </span>
                    <span className="text-sm font-black text-amber-900">{currentWorkout.desiEquipment}</span>
                  </div>
                </div>

                {/* Guruji Advice Box */}
                <div className="p-4 bg-amber-950 text-amber-100 rounded-xl border border-amber-800 font-sans shadow-inner">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-400" /> GURUJI'S DESI TECHNIQUE ADVICE:
                  </div>
                  <p className="text-sm italic font-serif leading-relaxed text-amber-200">
                    "{currentWorkout.guruAdvice}"
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
