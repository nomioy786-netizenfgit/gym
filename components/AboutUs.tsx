'use client';

import React from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { Play, Check, Dumbbell, Award, HeartHandshake, Sparkles, PhoneCall } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { settings, setIsVideoModalOpen, setIsMembershipModalOpen } = useGym();

  const features = [
    {
      icon: Dumbbell,
      title: 'Modern Gym Equipment',
      desc: 'Top-tier biomechanical selectorized machines, Olympic platforms, and free weights up to 50kg.',
    },
    {
      icon: Award,
      title: 'Experienced Trainers',
      desc: 'Internationally certified coaches with proven client transformation records across Pakistan.',
    },
    {
      icon: Sparkles,
      title: 'Personalized Workout Plans',
      desc: 'Scientific, progressive programming customized for your body type, schedule, and goals.',
    },
    {
      icon: HeartHandshake,
      title: 'Friendly Training Environment',
      desc: 'An inspiring, supportive, and safe culture for beginner and advanced lifters alike.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Media with Video Badge */}
          <div className="relative group">
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                src="/images/about.jpg"
                alt="GYM Facility Interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Video Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Watch Virtual Gym Tour"
                  className="flex items-center gap-3 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-all duration-200 active:scale-95 group/play"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-yellow-400 flex items-center justify-center group-hover/play:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-yellow-400 translate-x-0.5" />
                  </div>
                  <span>WATCH VIDEO TOUR</span>
                </button>
              </div>

              {/* Bottom tag on image */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">State-of-the-Art Facility</div>
                  <div className="text-neutral-400 text-xs">{settings.address}, {settings.city}</div>
                </div>
                <div className="text-yellow-400 font-black text-xs uppercase px-2.5 py-1 bg-yellow-400/10 rounded border border-yellow-400/30">
                  Open 7 Days
                </div>
              </div>
            </div>

            {/* Accent border backdrop */}
            <div className="absolute -bottom-3 -right-3 -z-10 w-full h-full rounded-2xl border-2 border-yellow-400/30 pointer-events-none" />
          </div>

          {/* Right Column: Copy & Core Highlights */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-yellow-400" />
              <span>ABOUT {settings.gymName}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-tight mb-6">
              WE HELP YOU BECOME THE <br />
              <span className="text-yellow-400">BEST VERSION OF YOU</span>
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed mb-6">
              Welcome to <strong>{settings.gymName}</strong>, Pakistan&apos;s premier strength and fitness hub. We believe that true fitness is not just about lifting weights—it&apos;s about cultivating mental resilience, boosting confidence, and enjoying sustainable lifelong vitality.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Whether you are taking your very first step into a gym or you are an elite athlete aiming for competition stage, our coaches guide every rep, tune every meal plan, and hold you accountable until you smash your personal bests.
            </p>

            {/* 4 Feature Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-3 p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                  <div className="w-8 h-8 rounded bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                    <p className="text-xs text-neutral-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsMembershipModalOpen(true)}
                className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-md transition-colors shadow-lg shadow-yellow-400/20 active:scale-95"
              >
                Join {settings.gymName} Today
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-sm uppercase tracking-wider rounded-md border border-neutral-700 transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Watch Facility Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
