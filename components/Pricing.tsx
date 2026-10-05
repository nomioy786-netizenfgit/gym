'use client';

import React from 'react';
import { useGym } from '@/lib/GymContext';
import { MembershipPlan } from '@/lib/types';
import { Check, Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const Pricing: React.FC = () => {
  const { plans, settings, setSelectedPlan, setIsMembershipModalOpen } = useGym();

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setIsMembershipModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Affordable Memberships</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            CHOOSE YOUR <span className="text-yellow-400">PLAN</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Straightforward pricing in Pakistani Rupees (PKR) with no hidden registration costs. Select your tier and join easily in minutes via WhatsApp.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan: MembershipPlan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-yellow-400 text-black shadow-[0_0_40px_rgba(250,204,21,0.25)] ring-2 ring-yellow-400 md:-translate-y-3 z-10'
                    : 'bg-neutral-950 text-white border border-neutral-800 hover:border-neutral-700 shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-yellow-400 font-black text-xs uppercase px-4 py-1.5 rounded-full tracking-widest border border-yellow-400 flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name & Tagline */}
                  <div className="mb-6">
                    <h3
                      className={`text-2xl font-black uppercase tracking-wide mb-2 ${
                        isPopular ? 'text-black' : 'text-white'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        isPopular ? 'text-black/80 font-medium' : 'text-neutral-400'
                      }`}
                    >
                      {plan.description || 'Comprehensive access for all your fitness goals.'}
                    </p>
                  </div>

                  {/* Price Tag in PKR */}
                  <div className="mb-8 pb-6 border-b border-black/10 dark:border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-lg font-black ${
                          isPopular ? 'text-black' : 'text-yellow-400'
                        }`}
                      >
                        {settings.currency}
                      </span>
                      <span
                        className={`text-4xl sm:text-5xl font-black tracking-tight tabular-nums ${
                          isPopular ? 'text-black' : 'text-white'
                        }`}
                      >
                        {plan.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs uppercase font-bold ml-1 ${
                          isPopular ? 'text-black/70' : 'text-neutral-400'
                        }`}
                      >
                        / {plan.period}
                      </span>
                    </div>
                    <div
                      className={`text-[11px] font-medium mt-1 ${
                        isPopular ? 'text-black/70' : 'text-neutral-500'
                      }`}
                    >
                      Payment at gym desk via Cash or Bank Transfer
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isPopular
                              ? 'bg-black text-yellow-400'
                              : 'bg-yellow-400/20 text-yellow-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isPopular ? 'text-black' : 'text-neutral-300'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="p-8 pt-0">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-4 px-6 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95 ${
                      isPopular
                        ? 'bg-black hover:bg-neutral-900 text-yellow-400 shadow-md'
                        : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg shadow-yellow-400/10'
                    }`}
                  >
                    <span>Choose Plan</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice on payments */}
        <div className="mt-12 text-center text-xs text-neutral-400 max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>
            No automated credit card deductions. Register your membership details online and confirm quickly through our official WhatsApp.
          </span>
        </div>
      </div>
    </section>
  );
};
