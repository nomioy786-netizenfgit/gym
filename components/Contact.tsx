'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/GymContext';
import {
  MapPin,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, addMessage, getWhatsAppUrl } = useGym();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);

    try {
      // Save locally in GymContext (instant state update)
      addMessage({
        fullName,
        phoneNumber,
        message,
      });

      // Also attempt posting to local Next.js API route if available
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, phoneNumber, message }),
        });
      } catch {
        // Fallback gracefully to context
      }

      setIsSubmitted(true);
      setFullName('');
      setPhoneNumber('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendToWhatsAppDirect = () => {
    const text = `Hello ${settings.gymName}, I have an enquiry from your website contact form.
My Name: ${fullName || 'Guest'}
My Phone: ${phoneNumber || 'Not provided'}
Message: ${message || 'I would like to inquire about membership and gym hours.'}`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Customer Assistance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            GET IN TOUCH <span className="text-yellow-400">WITH US</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Have questions about fees, personal training, or timings? Drop us a message or chat with us right away on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary WhatsApp Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                    Official WhatsApp
                  </span>
                  <div className="text-xl font-black text-white mt-0.5 tracking-wide">
                    {settings.whatsappNumber}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 mb-4">
                    Fastest response time (usually within 5 minutes)
                  </p>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location & City Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold text-yellow-400 tracking-wider">
                  Gym Location
                </span>
                <div className="text-base font-bold text-white mt-0.5">
                  {settings.gymName} Fitness Club
                </div>
                <p className="text-xs text-neutral-300 mt-0.5">
                  {settings.address}
                </p>
                <p className="text-xs text-neutral-400 font-semibold">
                  {settings.city}
                </p>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 text-yellow-400 border border-neutral-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold text-yellow-400 tracking-wider">
                  Opening Hours
                </span>
                <div className="text-sm font-semibold text-neutral-200 mt-1">
                  {settings.openingHoursWeekday}
                </div>
                <div className="text-sm font-semibold text-neutral-400 mt-0.5">
                  {settings.openingHoursSunday}
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-500">Phone Call</div>
                  <div className="text-xs font-bold text-white truncate">{settings.displayPhone}</div>
                </div>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-500">Email</div>
                  <div className="text-xs font-bold text-white truncate">{settings.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Map (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h3 className="text-2xl font-black uppercase text-white mb-2">
              Send an <span className="text-yellow-400">Enquiry</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-8">
              Fill out this quick form. Your message will be recorded in our system and our front desk will reply promptly.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-neutral-950 border border-emerald-500/40 text-center animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase text-white mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-neutral-300 max-w-md mx-auto mb-6">
                  Thank you! We have received your message. You can also connect immediately on WhatsApp with our representative.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl(`Hello ${settings.gymName}, I just submitted a message through your website form.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-3 text-sm focus:outline-none placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 03417885841"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-3 text-sm focus:outline-none placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Message / Question
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about membership packages, personal training slots, timings, or trial visits..."
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-3 text-sm focus:outline-none placeholder-neutral-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsAppDirect}
                    className="py-3.5 px-5 bg-neutral-950 hover:bg-neutral-800 text-emerald-400 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

            {/* Google Maps Embed Placeholder with Dark Aesthetic */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
                <span className="font-bold text-neutral-300 uppercase">Map & Location View</span>
                <span>Open in Google Maps</span>
              </div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center group cursor-pointer">
                {/* Styled dark map backdrop */}
                <div className="absolute inset-0 bg-neutral-950 opacity-90" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto mb-2 shadow-lg shadow-yellow-400/30 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-black uppercase text-white">{settings.gymName} Location</div>
                  <div className="text-xs text-neutral-400">{settings.address}, {settings.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
