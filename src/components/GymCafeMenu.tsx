import React, { useState } from 'react';
import { DIET_MENU } from '../data/gymData';
import { DietItem } from '../types';
import { Utensils, Zap, Flame, Check, Sparkles, Coffee } from 'lucide-react';
import { gymAudio } from '../utils/audio';

interface GymCafeMenuProps {
  soundEnabled: boolean;
}

export const GymCafeMenu: React.FC<GymCafeMenuProps> = ({ soundEnabled }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['d1']);
  const [gheeVsWheyVote, setGheeVsWheyVote] = useState<'ghee' | 'whey' | null>(null);

  const toggleItem = (id: string) => {
    if (soundEnabled) gymAudio.playPlateClink();
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((acc, id) => {
      const item = DIET_MENU.find(d => d.id === id);
      if (!item) return acc;
      const num = parseInt(item.cost.replace('₹', ''), 10) || 0;
      return acc + num;
    }, 0);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 font-mono text-xs font-bold rounded border border-orange-500/30 uppercase">
                GYM CAFE & JUICE BAR
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> PURE 2000s DESI NUTRITION
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-amber-300 uppercase tracking-tight mt-1">
              BANANA SHAKE & EGG CORNER
            </h2>
          </div>

          <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 text-xs font-mono font-bold flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>BLENDED FRESH AT THE COUNTER</span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {DIET_MENU.map((item: DietItem) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'bg-zinc-950/80 border-zinc-800 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded font-bold uppercase">
                      {item.tag}
                    </span>
                    <span className="text-lg font-black text-amber-400 font-mono">{item.cost}</span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-100 mb-1">{item.name}</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-green-400" /> {item.protein}
                  </span>
                  <div className={`p-1.5 rounded-lg border ${
                    isSelected ? 'bg-amber-500 text-zinc-950 border-amber-300' : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Desi Ghee vs Whey Debate Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-zinc-800">
          
          {/* Order Calculator */}
          <div className="lg:col-span-6 bg-zinc-950/90 p-5 rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                SELECTED CAFE ITEMS ({selectedItems.length})
              </div>
              <div className="text-xl font-black text-zinc-100 font-mono mt-1">
                TOTAL BILL: <span className="text-amber-400">₹{calculateTotal()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (soundEnabled) gymAudio.playWhistle();
                alert(`Order Placed at Gym Juice Bar! Total: ₹${calculateTotal()}. Fresh shake will be served in 2 mins!`);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg border border-amber-300 hover:scale-105 active:scale-95 transition-transform"
            >
              ORDER AT COUNTER 🥤
            </button>
          </div>

          {/* Desi Ghee vs Whey Debate Simulator */}
          <div className="lg:col-span-6 bg-zinc-950/90 p-5 rounded-2xl border border-amber-500/20">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>THE GREAT 2000s GYM DEBATE: DESI GHEE VS WHEY?</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                onClick={() => setGheeVsWheyVote('ghee')}
                className={`p-3 rounded-xl border text-left font-mono transition-all ${
                  gheeVsWheyVote === 'ghee'
                    ? 'bg-amber-500 text-zinc-950 border-amber-300 font-bold'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-500/40'
                }`}
              >
                <div className="text-xs font-bold uppercase">TEAM DESI GHEE 🧈</div>
                <div className="text-[10px] opacity-80">Guruji's choice for bone strength & stamina.</div>
              </button>

              <button
                onClick={() => setGheeVsWheyVote('whey')}
                className={`p-3 rounded-xl border text-left font-mono transition-all ${
                  gheeVsWheyVote === 'whey'
                    ? 'bg-orange-500 text-zinc-950 border-orange-300 font-bold'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-orange-500/40'
                }`}
              >
                <div className="text-xs font-bold uppercase">TEAM WHEY PROTEIN 🧪</div>
                <div className="text-[10px] opacity-80">New 2000s imported tub craze!</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
