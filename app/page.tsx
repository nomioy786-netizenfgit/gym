'use client';

import React from 'react';
import { GymProvider } from '@/lib/GymContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Programs } from '@/components/Programs';
import { AboutUs } from '@/components/AboutUs';
import { Trainers } from '@/components/Trainers';
import { Pricing } from '@/components/Pricing';
import { BmiCalculator } from '@/components/BmiCalculator';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { MembershipModal } from '@/components/MembershipModal';
import { ProgramModal } from '@/components/ProgramModal';
import { VideoModal } from '@/components/VideoModal';
import { AdminModal } from '@/components/AdminModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <GymProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-yellow-400 selection:text-black">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Banner */}
          <Hero />

          {/* Stats Bar */}
          <StatsBar />

          {/* Workout Programs */}
          <Programs />

          {/* About Us & Facility */}
          <AboutUs />

          {/* Expert Trainers */}
          <Trainers />

          {/* Membership Pricing Plans in PKR */}
          <Pricing />

          {/* Interactive BMI & Goal Assessment */}
          <BmiCalculator />

          {/* Gym Photo Gallery */}
          <Gallery />

          {/* Contact Section & Map */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals & Overlays */}
        <MembershipModal />
        <ProgramModal />
        <VideoModal />
        <AdminModal />

        {/* Persistent Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </div>
    </GymProvider>
  );
}
