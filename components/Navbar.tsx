'use client';

import React, { useState, useEffect } from 'react';
import { useGym } from '@/lib/GymContext';
import { Menu, X, Dumbbell, Shield, MessageCircle, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, setIsMembershipModalOpen, setIsAdminModalOpen, getWhatsAppUrl } = useGym();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Zone */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-yellow-400 text-black flex items-center justify-center font-black text-xl rounded-md group-hover:scale-105 transition-transform duration-200">
            <Dumbbell className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-wider text-white uppercase flex items-center">
              {settings.gymName}
              <span className="text-yellow-400">.</span>
            </span>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-neutral-300 hover:text-yellow-400 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons Zone */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setIsAdminModalOpen(true)}
            title="Admin Dashboard"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-md transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-yellow-400" />
            <span>Admin</span>
          </button>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 rounded-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setIsMembershipModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-black bg-yellow-400 hover:bg-yellow-300 active:scale-95 rounded-md uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(250,204,21,0.25)]"
          >
            <span>Join Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMembershipModalOpen(true)}
            className="px-3 py-1.5 text-xs font-bold text-black bg-yellow-400 rounded uppercase tracking-wider"
          >
            Join
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 border-b border-neutral-800 px-6 py-5 mt-2 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-300 hover:text-yellow-400 py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMembershipModalOpen(true);
                }}
                className="w-full py-3 text-sm font-black text-black bg-yellow-400 hover:bg-yellow-300 rounded uppercase tracking-wider text-center"
              >
                Join Now
              </button>
              <div className="flex gap-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-xs font-bold text-center text-white bg-emerald-700/80 hover:bg-emerald-600 rounded flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
