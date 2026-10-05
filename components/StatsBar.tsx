'use client';

import React from 'react';
import { Users, Award, Dumbbell, Flame } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Happy Members',
      subtext: 'Active community in Pakistan',
    },
    {
      icon: Award,
      value: '20+',
      label: 'Expert Trainers',
      subtext: 'Certified fitness professionals',
    },
    {
      icon: Dumbbell,
      value: '50+',
      label: 'Workout Programs',
      subtext: 'Custom plans & routines',
    },
    {
      icon: Flame,
      value: '100%',
      label: 'Fitness Focus',
      subtext: 'Guaranteed transformations',
    },
  ];

  return (
    <section className="relative z-20 bg-neutral-900 border-y border-neutral-800 shadow-xl py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-black border border-neutral-800 flex items-center justify-center text-yellow-400 group-hover:border-yellow-400/50 group-hover:scale-105 transition-all duration-200 shrink-0 shadow-md">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums group-hover:text-yellow-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-neutral-200 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
