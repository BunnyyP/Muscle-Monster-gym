import React, { useState, useEffect } from 'react';
import { NOSTALGIC_QUOTES } from '../data/gymData';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, Play, Pause, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NostalgicQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredQuotes = selectedCategory === 'all'
    ? NOSTALGIC_QUOTES
    : NOSTALGIC_QUOTES.filter(q => q.category === selectedCategory);

  useEffect(() => {
    if (!isPlaying || filteredQuotes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, filteredQuotes.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  const currentQuote = filteredQuotes[currentIndex] || NOSTALGIC_QUOTES[0];

  return (
    <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-y border-amber-500/30 py-6 px-4 sm:px-8 relative overflow-hidden shadow-xl">
      
      {/* Background Vintage Texture Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Section Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-amber-400">
            <Quote className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> GYM WISDOM & MEMORIES
              </span>
            </div>
            <h2 className="text-lg font-black text-zinc-100 uppercase tracking-wide">
              2000s Gym Dialogues
            </h2>
          </div>
        </div>

        {/* Center Rotating Quote Display */}
        <div className="flex-1 w-full max-w-2xl min-h-[90px] flex items-center justify-center px-4 py-2 bg-black/40 border border-amber-500/20 rounded-2xl backdrop-blur-md relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <p className="text-base sm:text-lg font-serif italic text-amber-200/90 drop-shadow-[0_1px_4px_rgba(245,158,11,0.2)]">
                "{currentQuote.text}"
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-xs font-mono text-orange-400 font-bold">
                  — {currentQuote.speaker}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 uppercase font-mono">
                  {currentQuote.category}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            className="p-2.5 bg-zinc-900 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl transition-colors"
            title="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 bg-zinc-900 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl transition-colors"
            title={isPlaying ? "Pause auto-rotate" : "Start auto-rotate"}
          >
            {isPlaying ? <Pause className="w-5 h-5 text-amber-400" /> : <Play className="w-5 h-5 text-amber-400" />}
          </button>

          <button
            onClick={handleNext}
            className="p-2.5 bg-zinc-900 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-xl transition-colors"
            title="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Category Filter Pills */}
      <div className="max-w-5xl mx-auto mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-center flex-wrap gap-2 text-xs font-mono">
        <span className="text-zinc-500 mr-2 flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" /> Filter Quotes:
        </span>
        {['all', 'motivation', 'humor', 'diet', 'rules'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-full uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-zinc-950 font-bold shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                : 'bg-zinc-900 text-zinc-400 hover:text-amber-300 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
};
