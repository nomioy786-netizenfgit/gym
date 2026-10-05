'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/GymContext';
import { Calculator, Activity, ArrowRight, MessageCircle, RefreshCw } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const { settings, getWhatsAppUrl } = useGym();

  const [weightKg, setWeightKg] = useState<string>('72');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('25');
  const [calculatedBmi, setCalculatedBmi] = useState<number | null>(23.5);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100;
    if (w > 20 && h > 0.5) {
      const bmi = w / (h * h);
      setCalculatedBmi(parseFloat(bmi.toFixed(1)));
    }
  };

  const getBmiDetails = (bmi: number) => {
    if (bmi < 18.5) {
      return {
        category: 'Underweight',
        color: 'text-sky-400',
        borderColor: 'border-sky-400/40',
        recommendation: 'Muscle Building & Hypertrophy Program',
        description: 'Focus on a high-protein caloric surplus combined with progressive resistance training to pack on dense muscle.',
      };
    } else if (bmi < 24.9) {
      return {
        category: 'Healthy Weight',
        color: 'text-emerald-400',
        borderColor: 'border-emerald-400/40',
        recommendation: 'Strength Training & Functional Athleticism',
        description: 'You have a solid baseline. Level up your physical performance, stamina, and power with our compound lifting protocols.',
      };
    } else if (bmi < 29.9) {
      return {
        category: 'Overweight',
        color: 'text-yellow-400',
        borderColor: 'border-yellow-400/40',
        recommendation: 'Weight Loss & Metabolic Conditioning',
        description: 'Accelerate fat reduction with structured HIIT cardio sessions and customized macronutrient adjustments.',
      };
    } else {
      return {
        category: 'Obesity Class',
        color: 'text-rose-400',
        borderColor: 'border-rose-400/40',
        recommendation: 'Personalized Weight Loss & Mobility Transformation',
        description: 'Work 1-on-1 with our head trainers to safely reconstruct your metabolism, joint health, and daily stamina.',
      };
    }
  };

  const bmiInfo = calculatedBmi ? getBmiDetails(calculatedBmi) : null;

  const handleSendBmiToWhatsApp = () => {
    if (!calculatedBmi || !bmiInfo) return;
    const msg = `Hello ${settings.gymName}! I calculated my BMI on your website:
• Weight: ${weightKg} kg
• Height: ${heightCm} cm
• BMI Score: ${calculatedBmi} (${bmiInfo.category})
• Recommended Goal: ${bmiInfo.recommendation}

Can you advise me on the best membership plan and diet guidance?`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="py-20 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Yellow ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Fitness Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                CALCULATE YOUR <span className="text-yellow-400">BMI SCORE</span>
              </h2>
              <p className="text-neutral-400 text-sm mb-6">
                Discover your Body Mass Index and receive a tailored fitness recommendation directly from {settings.gymName} trainers.
              </p>

              <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="220"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="e.g. 75"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="230"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="e.g. 175"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="e.g. 24"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2 text-xs font-bold uppercase rounded-lg border transition-colors ${
                        gender === 'male'
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2 text-xs font-bold uppercase rounded-lg border transition-colors ${
                        gender === 'female'
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Calculate BMI Now</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              {calculatedBmi && bmiInfo ? (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Your Calculated Result
                  </div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl font-black text-white tracking-tight tabular-nums">
                      {calculatedBmi}
                    </span>
                    <span className={`text-base font-extrabold uppercase px-3 py-1 rounded bg-black/60 border ${bmiInfo.borderColor} ${bmiInfo.color}`}>
                      {bmiInfo.category}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 pt-4 border-t border-neutral-800">
                    <div>
                      <div className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
                        Recommended Focus
                      </div>
                      <div className="text-base font-bold text-white">
                        {bmiInfo.recommendation}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {bmiInfo.description}
                    </p>
                  </div>

                  <button
                    onClick={handleSendBmiToWhatsApp}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Plan to WhatsApp</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  Enter your stats above to see your BMI analysis.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
