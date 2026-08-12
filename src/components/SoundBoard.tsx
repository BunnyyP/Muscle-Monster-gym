import React from 'react';
import { Volume2, Sparkles, Music, Bell, Megaphone, Dumbbell, Radio } from 'lucide-react';
import { gymAudio } from '../utils/audio';

interface SoundBoardProps {
  soundEnabled: boolean;
}

export const SoundBoard: React.FC<SoundBoardProps> = ({ soundEnabled }) => {
  const sounds = [
    {
      name: 'Barbell Clank',
      desc: 'Heavy cast iron impact',
      icon: Dumbbell,
      action: () => gymAudio.playBarbellClank(),
      color: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Plate Clink',
      desc: 'Metallic ring on sleeve',
      icon: Music,
      action: () => gymAudio.playPlateClink(),
      color: 'from-orange-500 to-red-600',
    },
    {
      name: 'Trainer Whistle',
      desc: 'Coach set start whistle',
      icon: Megaphone,
      action: () => gymAudio.playWhistle(),
      color: 'from-amber-600 to-yellow-600',
    },
    {
      name: 'Gym Counter Bell',
      desc: 'Reception fee desk bell',
      icon: Bell,
      action: () => gymAudio.playGymBell(),
      color: 'from-yellow-500 to-amber-600',
    },
    {
      name: '2000s Dial-up Sound',
      desc: 'LAN internet cafe vibe',
      icon: Radio,
      action: () => gymAudio.playDialUp(),
      color: 'from-red-600 to-orange-700',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Volume2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE SOUND FX
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100 uppercase tracking-tight">
                2000s DESI GYM SOUNDBOARD
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            SYNTHESIZED WEB AUDIO API
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sounds.map((snd) => {
            const Icon = snd.icon;
            return (
              <button
                key={snd.name}
                onClick={snd.action}
                className="p-4 rounded-2xl bg-zinc-900 border border-amber-500/20 hover:border-amber-400 hover:bg-zinc-800/80 transition-all transform hover:-translate-y-1 active:translate-y-0 text-left group shadow-lg cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${snd.color} flex items-center justify-center text-zinc-950 mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-zinc-100 font-sans group-hover:text-amber-300">
                  {snd.name}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  {snd.desc}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
