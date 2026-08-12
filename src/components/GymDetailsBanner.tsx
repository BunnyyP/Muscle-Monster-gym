import React from 'react';
import { MapPin, Clock, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export const GymDetailsBanner: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4 sm:px-6">
      <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900 to-amber-950/80 border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-100 font-mono text-xs">
          
          {/* Card 1: Registration & Fee Info */}
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-amber-500/30 flex items-start gap-3">
            <div className="p-2.5 bg-green-500/20 text-green-400 rounded-lg border border-green-500/40 shrink-0">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-green-400 uppercase text-sm">
                <span>NO REGISTRATION FEES</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-zinc-300 mt-1">
                Zero admission or joining charge! Pure monthly fee: <strong className="text-amber-400">₹1100/-</strong> per month only.
              </p>
            </div>
          </div>

          {/* Card 2: Gym Timings */}
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-amber-500/30 flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/40 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-amber-400 uppercase text-sm">
                GYM TIMINGS
              </div>
              <p className="text-amber-200 font-bold mt-1">
                Monday to Saturday
              </p>
              <div className="text-zinc-300 text-[11px] mt-0.5 space-y-0.5">
                <div>🌅 Morning: <strong className="text-amber-300">6:00 AM to 10:00 AM</strong></div>
                <div>🌇 Evening: <strong className="text-amber-300">5:00 PM to 9:00 PM</strong></div>
              </div>
            </div>
          </div>

          {/* Card 3: Gym Address */}
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-amber-500/30 flex items-start gap-3">
            <div className="p-2.5 bg-red-500/20 text-red-400 rounded-lg border border-red-500/40 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-red-400 uppercase text-sm">
                GYM ADDRESS
              </div>
              <p className="text-zinc-200 font-semibold mt-1 leading-relaxed">
                Near Tadka restaurant, Shanti nagar, Jhansi road, Orai (Jalaun) 285001
              </p>
            </div>
          </div>

        </div>

        {/* Developer Credit Bar - 2 Lines */}
        <div className="mt-4 pt-3 border-t border-amber-500/30 flex flex-col items-center justify-center text-center text-xs font-mono text-amber-300 font-bold space-y-0.5">
          <div className="text-amber-400">Designed & developed by - Vinay Patel</div>
          <div className="text-amber-300">Contact - 7753908364</div>
        </div>

      </div>
    </div>
  );
};
