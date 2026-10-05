'use client';

import React from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { ArrowRight, Flame, ShieldCheck, Dumbbell, PhoneCall } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, setIsMembershipModalOpen } = useGym();

  const scrollToPrograms = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('programs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsMembershipModalOpen(true);
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-neutral-950">
      {/* Background Hero Image with Optimized Next Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Athletes training at GYM"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-65"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlays & Gradients for Crisp Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/70" />
        {/* Subtle Yellow Ambient Accent Light in Top Corner */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl">
          {/* Top Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-yellow-400/40 text-yellow-400 text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.15)]">
            <Flame className="w-4 h-4 fill-yellow-400" />
            <span>Pakistan&apos;s Elite Fitness Destination</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6 drop-shadow-lg">
            BE STRONGER <br />
            <span className="text-yellow-400 underline decoration-yellow-400/40 decoration-wavy underline-offset-8">
              THAN YOUR EXCUSES
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-bold text-neutral-200 tracking-wide mb-4">
            {settings.heroSubtitle}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-10">
            {settings.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={scrollToPricing}
              className="flex items-center justify-center gap-2.5 px-8 py-4 text-base font-black text-black bg-yellow-400 hover:bg-yellow-300 active:scale-95 rounded-md uppercase tracking-wider transition-all duration-200 shadow-[0_0_30px_rgba(250,204,21,0.35)]"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={scrollToPrograms}
              className="flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white hover:text-yellow-400 bg-neutral-900/90 hover:bg-neutral-800 border-2 border-neutral-700 hover:border-yellow-400/80 active:scale-95 rounded-md uppercase tracking-wider transition-all duration-200"
            >
              <Dumbbell className="w-5 h-5 text-yellow-400" />
              <span>VIEW PROGRAMS</span>
            </button>
          </div>

          {/* Trust badges below buttons */}
          <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>Certified International Coaches</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-yellow-400" />
              <span>Instant WhatsApp Support: {settings.whatsappNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-300">Open Daily: 6:00 AM - 11:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
