'use client';

import React from 'react';
import { useGym } from '@/lib/GymContext';
import {
  Dumbbell,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Shield,
  ArrowUp,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, getWhatsAppUrl, setIsAdminModalOpen, setIsMembershipModalOpen } = useGym();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-400 text-black flex items-center justify-center font-black text-xl rounded-md">
                <Dumbbell className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-wider text-white uppercase">
                {settings.gymName}
                <span className="text-yellow-400">.</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Pakistan&apos;s modern strength and fitness center. Equipped with certified trainers, high-performance machinery, and structured plans to help you become the best version of yourself.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-400/50 text-neutral-400 hover:text-yellow-400 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-400/50 text-neutral-400 hover:text-yellow-400 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-400/50 text-neutral-400 hover:text-yellow-400 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 text-neutral-400 hover:text-emerald-400 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#home" className="hover:text-yellow-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-yellow-400 transition-colors">
                  Workout Programs
                </a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-yellow-400 transition-colors">
                  Expert Trainers
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-yellow-400 transition-colors">
                  Membership Plans
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-400 transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider">
              Workout Programs
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#programs" className="hover:text-yellow-400 transition-colors block">
                  Muscle Building &amp; Hypertrophy
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-yellow-400 transition-colors block">
                  Fat Loss &amp; Metabolic Conditioning
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-yellow-400 transition-colors block">
                  Strength &amp; Powerlifting
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-yellow-400 transition-colors block">
                  Yoga, Mobility &amp; Recovery
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsMembershipModalOpen(true)}
                  className="text-yellow-400 font-bold hover:underline mt-1 block"
                >
                  Join via WhatsApp &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider">
              Contact &amp; Timings
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong className="text-white">{settings.whatsappNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{settings.displayPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <div>{settings.openingHoursWeekday}</div>
                  <div>{settings.openingHoursSunday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} {settings.gymName} Fitness Club. All Rights Reserved. Built with Black &amp; Yellow Performance Design.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-yellow-400 transition-colors py-1 px-2.5 rounded bg-neutral-900 border border-neutral-800"
            >
              <Shield className="w-3.5 h-3.5 text-yellow-400" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded bg-neutral-900 hover:bg-yellow-400 hover:text-black border border-neutral-800 flex items-center justify-center transition-colors text-neutral-400"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
