'use client';

import React from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { X, CheckCircle2, Dumbbell, Calendar, Clock, UserCheck, MessageCircle, ArrowRight } from 'lucide-react';

export const ProgramModal: React.FC = () => {
  const { selectedProgram, setSelectedProgram, settings, getWhatsAppUrl, setIsMembershipModalOpen } = useGym();

  if (!selectedProgram) return null;

  const handleEnrollViaWhatsApp = () => {
    const text = `Hello ${settings.gymName}! I am interested in joining the "${selectedProgram.name}" workout program with coach ${selectedProgram.trainerName}. Please share batch timings and membership details.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={() => setSelectedProgram(null)}
    >
      <div
        className="relative max-w-2xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Program Header Image */}
        <div className="relative h-60 sm:h-72 w-full bg-neutral-900">
          <Image
            src={selectedProgram.image}
            alt={selectedProgram.name}
            fill
            className="object-cover filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedProgram(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-neutral-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Program Details
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
              {selectedProgram.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
            {selectedProgram.tagline}
          </p>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {selectedProgram.description}
          </p>

          {/* Stats & Meta Pills (Clean metadata) */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">Duration</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{selectedProgram.duration}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">Target Level</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{selectedProgram.level}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">Coach</div>
              <div className="text-xs sm:text-sm font-bold text-yellow-400 mt-0.5">{selectedProgram.trainerName}</div>
            </div>
          </div>

          {/* Features list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              What This Program Includes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedProgram.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleEnrollViaWhatsApp}
              className="flex-1 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enroll in Program via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setSelectedProgram(null);
                setIsMembershipModalOpen(true);
              }}
              className="py-3.5 px-5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
