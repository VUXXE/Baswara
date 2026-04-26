"use client";

import { useRef } from 'react';
import { useScroll } from 'framer-motion';

import HeroSection from '@/components/landing/HeroSection';
import Navbar from '@/components/Navbar';
import StatsSection from '@/components/landing/StatsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#fedbdf] text-[#6b1d1d] selection:bg-[#fd5e4b] selection:text-white font-sans">
      {/* Texture Overlay (Dots) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#6b1d1d 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Noise Overlay */}
      <div className="noise-overlay opacity-[0.06]" />

      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
