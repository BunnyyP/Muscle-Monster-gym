import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_TRACKS } from '../data/gymData';
import { Track } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc, ListMusic, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// YouTube IFrame Window Declaration
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicPlayerProps {
  soundEnabled: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const [tracks] = useState<Track[]>(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('00:00');
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Initialize YouTube IFrame API
  useEffect(() => {
    // Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer(currentTrack.youtubeId);
    };

    if (window.YT && window.YT.Player) {
      createPlayer(currentTrack.youtubeId);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const createPlayer = (videoId: string) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      return;
    }

    playerRef.current = new window.YT.Player('youtube-hidden-player', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressTracker();
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            stopProgressTracker();
          } else if (event.data === window.YT.PlayerState.ENDED) {
            handleNextTrack();
          }
        },
      },
    });
  };

  const startProgressTracker = () => {
    stopProgressTracker();
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
        const cur = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 1;
        const pct = (cur / dur) * 100;
        setProgress(pct);

        const mins = Math.floor(cur / 60);
        const secs = Math.floor(cur % 60);
        setCurrentTimeStr(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    }, 1000);
  };

  const stopProgressTracker = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  // Change Video when track changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(currentTrack.youtubeId);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(val);
    }
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume || 80);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !playerRef.current.getDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const pct = clickX / width;
    const dur = playerRef.current.getDuration() || 1;
    playerRef.current.seekTo(pct * dur, true);
    setProgress(pct * 100);
  };

  return (
    <>
      {/* Hidden YouTube IFrame Container */}
      <div id="youtube-hidden-player" className="hidden" />

      {/* Glassmorphism Player Fixed Container Near Bottom */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        
        {/* Playlist Drawer Modal / Slideup */}
        <AnimatePresence>
          {showPlaylistDrawer && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="mb-3 p-4 bg-zinc-950/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl max-h-72 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase font-mono">
                  <ListMusic className="w-4 h-4 text-amber-400" />
                  <span>2000s GYM BOLLYWOOD BANGER PLAYLIST</span>
                </div>
                <a
                  href="https://youtu.be/8afBXZawfQw?si=J-6UkqeEHC90O5oA"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Open Original YouTube Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2">
                {tracks.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrackIndex(idx);
                      setShowPlaylistDrawer(false);
                      setIsPlaying(true);
                      if (playerRef.current) playerRef.current.playVideo();
                    }}
                    className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all text-xs font-mono ${
                      idx === currentTrackIndex
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-amber-500 font-bold">#{idx + 1}</span>
                      <div>
                        <div className="text-zinc-200 text-sm font-sans font-bold">{t.title}</div>
                        <div className="text-zinc-400 text-[11px]">{t.artist} • {t.year}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-black/40 text-amber-400 rounded text-[10px] border border-amber-500/20">
                      {t.vibe}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Player Bar */}
        <div className="bg-zinc-950/80 backdrop-blur-2xl border-2 border-amber-500/40 rounded-2xl p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
          
          {/* Track Info & Vinyl Spinning Icon */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`relative p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow border border-amber-300/40 shrink-0 ${isPlaying ? 'animate-spin' : ''}`}>
              <Disc className="w-6 h-6 text-zinc-950" />
            </div>

            <div className="min-w-0 flex-1 sm:max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30 uppercase">
                  NOW PLAYING
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-mono animate-pulse">
                    <Sparkles className="w-3 h-3" /> AUDIO ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-sm font-black text-amber-200 truncate font-sans">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-zinc-400 truncate font-mono">
                {currentTrack.artist} ({currentTrack.year})
              </p>
            </div>
          </div>

          {/* Central Controls & Progress Bar */}
          <div className="flex flex-col items-center gap-1.5 w-full sm:max-w-md">
            
            {/* Play, Prev, Next Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevTrack}
                className="p-2 text-zinc-400 hover:text-amber-400 transition-colors"
                title="Previous Track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300 hover:scale-105 transition-transform cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-zinc-950" /> : <Play className="w-5 h-5 fill-zinc-950 ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-2 text-zinc-400 hover:text-amber-400 transition-colors"
                title="Next Track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Clickable Progress Bar */}
            <div className="w-full flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span>{currentTimeStr}</span>
              <div
                onClick={handleSeek}
                className="flex-1 h-2 bg-zinc-800 rounded-full border border-zinc-700/80 cursor-pointer overflow-hidden relative"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{currentTrack.duration}</span>
            </div>

          </div>

          {/* Right Volume & Playlist Selector */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            
            {/* Equalizer Visualizer Animation */}
            <div className="hidden md:flex items-center gap-1 h-5 px-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-1 bg-amber-400 rounded-full ${
                    isPlaying ? 'animate-bounce' : 'h-2 opacity-40'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.floor(Math.random() * 12) + 6}px` : '6px',
                    animationDuration: `${0.3 + i * 0.15}s`
                  }}
                />
              ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button onClick={toggleMute} className="text-zinc-400 hover:text-amber-400">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 bg-zinc-800 rounded-lg appearance-none accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Playlist Drawer Toggle */}
            <button
              onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-mono font-bold ${
                showPlaylistDrawer
                  ? 'bg-amber-500 text-zinc-950 border-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800'
              }`}
              title="Toggle Playlist Drawer"
            >
              <ListMusic className="w-4 h-4" />
              <span className="hidden lg:inline">TRACKS</span>
            </button>
          </div>

        </div>

      </div>
    </>
  );
};
