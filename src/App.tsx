import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NostalgicQuotes } from './components/NostalgicQuotes';
import { GymDetailsBanner } from './components/GymDetailsBanner';
import { MusclePumpStation } from './components/MusclePumpStation';
import { WorkoutOfTheDay } from './components/WorkoutOfTheDay';
import { ReceptionLedger } from './components/ReceptionLedger';
import { GymCafeMenu } from './components/GymCafeMenu';
import { PosterWall } from './components/PosterWall';
import { SoundBoard } from './components/SoundBoard';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalPumps, setTotalPumps] = useState<number>(12);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 relative overflow-x-hidden">
      
      {/* Background Retro Grid & Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] z-0" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* App Main Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          totalPumps={totalPumps}
        />

        {/* Auto-Rotating Quotes Ticker */}
        <NostalgicQuotes />

        {/* Prominent Gym Info Banner (No Registration Fees, Timings & Address) */}
        <GymDetailsBanner />

        {/* Hero Central Visual Object: Muscle Pump Station */}
        <main className="flex-1 pb-28 sm:pb-24">
          <section id="pump-station">
            <MusclePumpStation
              soundEnabled={soundEnabled}
              totalPumps={totalPumps}
              setTotalPumps={setTotalPumps}
            />
          </section>

          {/* Vintage Workout of the Day Feature */}
          <section id="workout-of-day">
            <WorkoutOfTheDay soundEnabled={soundEnabled} />
          </section>

          {/* Gym Reception Area & Member Fee Slip */}
          <section id="reception-ledger">
            <ReceptionLedger soundEnabled={soundEnabled} />
          </section>

          {/* Gym Cafe & Desi Shake Corner */}
          <section id="gym-cafe">
            <GymCafeMenu soundEnabled={soundEnabled} />
          </section>

          {/* Posters & Wall of Legends */}
          <section id="poster-wall">
            <PosterWall />
          </section>

          {/* Desi Gym Interactive Soundboard */}
          <section id="soundboard">
            <SoundBoard soundEnabled={soundEnabled} />
          </section>
        </main>

        {/* Exact Required Footer */}
        <Footer />

        {/* Bottom Fixed Glassmorphism YouTube Music Player */}
        <MusicPlayer soundEnabled={soundEnabled} />

      </div>

    </div>
  );
}
