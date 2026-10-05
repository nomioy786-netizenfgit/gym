'use client';

import React from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { WorkoutProgram } from '@/lib/types';
import { Dumbbell, ArrowRight, CheckCircle2, Flame, UserCheck } from 'lucide-react';

export const Programs: React.FC = () => {
  const { programs, setSelectedProgram } = useGym();

  return (
    <section id="programs" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>Targeted Training</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            CHOOSE YOUR <span className="text-yellow-400">PROGRAM</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Whether your goal is muscle hypertrophy, rapid fat loss, peak strength, or full-body flexibility, our world-class trainers have designed the optimal pathway for you.
          </p>
        </div>

        {/* 4 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program: WorkoutProgram) => (
            <div
              key={program.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-yellow-400/60 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Program Image with Aspect Ratio and Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-neutral-700 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded">
                  {program.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-white group-hover:text-yellow-400 transition-colors mb-2">
                    {program.name}
                  </h3>
                  <p className="text-yellow-400/90 text-xs font-semibold uppercase tracking-wider mb-3">
                    {program.tagline}
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {program.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 mb-6">
                    {program.features.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trainer tag & Action button */}
                <div className="pt-4 border-t border-neutral-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                    <UserCheck className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Lead Coach: <strong className="text-neutral-200">{program.trainerName}</strong></span>
                  </div>

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-yellow-400 text-white hover:text-black font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
