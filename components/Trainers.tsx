'use client';

import React from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { Trainer } from '@/lib/types';
import { Instagram, Facebook, MessageCircle, Award, Sparkles } from 'lucide-react';

export const Trainers: React.FC = () => {
  const { trainers, settings, getWhatsAppUrl } = useGym();

  const handleBookTrainer = (trainerName: string) => {
    const text = `Hello ${settings.gymName}, I want to book a personal training consultation with coach ${trainerName}!`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="trainers" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Certified Fitness Coaches</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            MEET OUR <span className="text-yellow-400">EXPERT TRAINERS</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Our certified mentors bring international conditioning standards, bespoke diet design, and relentless dedication to push you past every barrier.
          </p>
        </div>

        {/* 4 Trainer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer: Trainer) => (
            <div
              key={trainer.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-yellow-400/60 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Trainer Photo Container */}
              <div className="relative h-72 w-full bg-neutral-950 overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/20" />

                {/* Experience Badge */}
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-neutral-700 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span>{trainer.experience}</span>
                </div>

                {/* Social Floating Icons on Photo */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <a
                    href={trainer.socials.instagram || 'https://instagram.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${trainer.name} on Instagram`}
                    className="w-8 h-8 rounded-full bg-black/80 hover:bg-yellow-400 text-white hover:text-black flex items-center justify-center transition-colors border border-neutral-700"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={trainer.socials.facebook || 'https://facebook.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${trainer.name} on Facebook`}
                    className="w-8 h-8 rounded-full bg-black/80 hover:bg-yellow-400 text-white hover:text-black flex items-center justify-center transition-colors border border-neutral-700"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleBookTrainer(trainer.name)}
                    aria-label={`Chat with ${trainer.name} on WhatsApp`}
                    className="w-8 h-8 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trainer Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-white group-hover:text-yellow-400 transition-colors">
                    {trainer.name}
                  </h3>
                  <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
                    {trainer.speciality}
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                </div>

                {/* Quick Consultation CTA */}
                <button
                  onClick={() => handleBookTrainer(trainer.name)}
                  className="w-full py-2.5 px-3 bg-neutral-800 hover:bg-yellow-400 text-white hover:text-black text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black" />
                  <span>Consult with {trainer.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
