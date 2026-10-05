'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, Dumbbell } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen, settings, setIsMembershipModalOpen } = useGym();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isVideoModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={() => setIsVideoModalOpen(false)}
    >
      <div
        className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase text-white">
                {settings.gymName} — Virtual Tour &amp; Facility Preview
              </h3>
              <p className="text-[11px] text-neutral-400">
                Experience the atmosphere, equipment, and training intensity
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative h-[48vh] sm:h-[60vh] w-full bg-black overflow-hidden flex items-center justify-center">
          <Image
            src="/images/about.jpg"
            alt="Virtual Gym Tour"
            fill
            className={`object-cover transition-all duration-1000 ${
              isPlaying ? 'scale-105 filter brightness-85' : 'scale-100 filter brightness-50'
            }`}
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

          {/* Animated visualizer bar */}
          {isPlaying && (
            <div className="absolute bottom-16 left-6 right-6 flex items-end gap-1.5 h-12 pointer-events-none opacity-80">
              <div className="w-1.5 bg-yellow-400 animate-pulse h-6 rounded-full" />
              <div className="w-1.5 bg-yellow-400 animate-pulse h-10 rounded-full delay-100" />
              <div className="w-1.5 bg-yellow-400 animate-pulse h-8 rounded-full delay-75" />
              <div className="w-1.5 bg-yellow-400 animate-pulse h-12 rounded-full delay-150" />
              <div className="w-1.5 bg-yellow-400 animate-pulse h-5 rounded-full" />
              <div className="w-1.5 bg-yellow-400 animate-pulse h-9 rounded-full delay-200" />
              <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider ml-2">
                4K Virtual Gym Showcase
              </span>
            </div>
          )}

          {/* Center Play/Pause Control */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-20 h-20 rounded-full bg-yellow-400/95 hover:bg-yellow-300 text-black flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.6)] transition-all hover:scale-110 active:scale-95"
            aria-label={isPlaying ? 'Pause tour' : 'Play tour'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-black" />
            ) : (
              <Play className="w-8 h-8 fill-black translate-x-1" />
            )}
          </button>

          {/* Video bottom control bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="text-xs font-mono text-neutral-300">
                02:18 / 03:45
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsMembershipModalOpen(true);
                }}
                className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-md transition-colors"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Video Footer info */}
        <div className="p-4 sm:p-5 bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>Facility verified by international bodybuilding standards</span>
          </div>
          <div className="text-neutral-400">
            Visit us in person: {settings.address}, {settings.city}
          </div>
        </div>
      </div>
    </div>
  );
};
