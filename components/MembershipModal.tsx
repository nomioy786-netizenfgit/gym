'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/GymContext';
import { MembershipEnquiry } from '@/lib/types';
import {
  X,
  Dumbbell,
  CheckCircle2,
  MessageCircle,
  Calendar,
  User,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export const MembershipModal: React.FC = () => {
  const {
    isMembershipModalOpen,
    setIsMembershipModalOpen,
    selectedPlan,
    setSelectedPlan,
    plans,
    settings,
    addEnquiry,
    getWhatsAppUrl,
  } = useGym();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState<string>('24');
  const [joiningDate, setJoiningDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');
  const [activePlanId, setActivePlanId] = useState<string>('');
  const [submittedEnquiry, setSubmittedEnquiry] = useState<MembershipEnquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isMembershipModalOpen) return null;

  // Resolve plan dynamically without needing a synchronous effect
  const currentPlanId = activePlanId || selectedPlan?.id || plans[1]?.id || plans[0]?.id || '';
  const currentPlan = plans.find((p) => p.id === currentPlanId) || plans[0];

  const handleClose = () => {
    setIsMembershipModalOpen(false);
    setSubmittedEnquiry(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);

    try {
      const planName = currentPlan ? currentPlan.name : 'STANDARD PLAN';
      const planPrice = currentPlan ? currentPlan.price : 1499;

      // Add to store & state
      const created = addEnquiry({
        fullName,
        phoneNumber,
        planId: currentPlanId,
        planName,
        planPrice,
        age: parseInt(age, 10) || 20,
        joiningDate: joiningDate || 'Immediate',
        notes,
      });

      // Also call Next.js API route in background
      try {
        await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            enquiryNumber: created.enquiryNumber,
            fullName,
            phoneNumber,
            planName,
            planPrice,
            age,
            joiningDate,
            notes,
          }),
        });
      } catch {
        // Ignored, state handles preview
      }

      setSubmittedEnquiry(created);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppChat = () => {
    if (!submittedEnquiry) return;
    const msg = `Hello ${settings.gymName}! I have submitted my gym membership registration:
• Enquiry ID: ${submittedEnquiry.enquiryNumber}
• Full Name: ${submittedEnquiry.fullName}
• Phone: ${submittedEnquiry.phoneNumber}
• Selected Plan: ${submittedEnquiry.planName} (${settings.currency} ${submittedEnquiry.planPrice.toLocaleString()}/month)
• Age: ${submittedEnquiry.age}
• Preferred Joining Date: ${submittedEnquiry.joiningDate}
${submittedEnquiry.notes ? `• Note: ${submittedEnquiry.notes}` : ''}

Please confirm my membership slot and guidance on timings!`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative max-w-2xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase text-white tracking-wide">
                Join <span className="text-yellow-400">{settings.gymName}</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Quick Membership Registration &amp; WhatsApp Verification
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close registration form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submittedEnquiry ? (
            /* Confirmation Screen */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black uppercase text-yellow-400 tracking-widest block mb-1">
                  Enquiry Registered
                </span>
                <h4 className="text-2xl font-black uppercase text-white">
                  Welcome to {settings.gymName}!
                </h4>
                <div className="mt-3 inline-block px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-mono text-neutral-200">
                  Enquiry Number:{' '}
                  <strong className="text-yellow-400 font-bold">{submittedEnquiry.enquiryNumber}</strong>
                </div>
              </div>

              {/* Summary card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Name:</span>
                  <span className="font-bold text-white">{submittedEnquiry.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Phone:</span>
                  <span className="font-bold text-white">{submittedEnquiry.phoneNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Plan:</span>
                  <span className="font-bold text-yellow-400">{submittedEnquiry.planName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Fee:</span>
                  <span className="font-bold text-white">
                    {settings.currency} {submittedEnquiry.planPrice.toLocaleString()} / Month
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Joining Date:</span>
                  <span className="font-bold text-white">{submittedEnquiry.joiningDate}</span>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleOpenWhatsAppChat}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Registration to WhatsApp ({settings.whatsappNumber})</span>
                </button>

                <p className="text-[11px] text-neutral-400">
                  Clicking the button opens WhatsApp with your pre-filled enquiry number and details.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
                  >
                    Done &amp; Close Window
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Plan Picker Carousel / Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Select Membership Plan *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {plans.map((p) => {
                    const isSelected = p.id === currentPlanId;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setActivePlanId(p.id);
                          setSelectedPlan(p);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-yellow-400/10 border-yellow-400 text-white shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold uppercase ${isSelected ? 'text-yellow-400' : 'text-neutral-300'}`}>
                            {p.name.replace(' PLAN', '')}
                          </span>
                          {p.isPopular && (
                            <span className="text-[9px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black uppercase">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-base font-black text-white mt-1 tabular-nums">
                          {settings.currency} {p.price.toLocaleString()}
                          <span className="text-[10px] font-normal text-neutral-400">/mo</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-yellow-400 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Mobile / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 03417885841"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-yellow-400 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="e.g. 24"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Preferred Joining Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-yellow-400 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Fitness Goals / Special Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Prefer morning slots, looking for weight loss guidance..."
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              {/* Selected Plan Summary Banner */}
              {currentPlan && (
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-400">Total Payable at Counter:</span>
                    <div className="text-sm font-black text-yellow-400 mt-0.5">
                      {settings.currency} {currentPlan.price.toLocaleString()} / Month
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Zero Admission Fee</span>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-yellow-400/20 active:scale-95 disabled:opacity-60"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Submit &amp; Join via WhatsApp</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-neutral-500">
                No online payment required now. You can inspect the facility and pay conveniently at the gym desk.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
