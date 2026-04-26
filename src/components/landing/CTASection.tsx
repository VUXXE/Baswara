"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative z-10 py-32 md:py-48 px-6 bg-[#fd5e4b] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center space-y-12 relative z-10"
      >
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">Mulai Acara <br /><span className="editorial-heading text-[#fecf00]">Pertamamu.</span></h2>
        <p className="text-lg md:text-xl text-white/80 font-medium max-w-lg mx-auto">Bergabung dengan 250K+ organizer yang sudah memilih Baswara untuk acara mereka.</p>
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Masukkan email Anda" className="flex-1 h-16 px-8 rounded-full bg-white text-[#6b1d1d] text-lg focus:outline-none font-bold placeholder:text-[#6b1d1d]/40" />
            <Link href="/onboarding">
              <Button className="h-16 px-10 text-base rounded-full bg-[#fecf00] text-[#6b1d1d] hover:bg-white transition-all font-black uppercase border-none shadow-xl">Gabung</Button>
            </Link>
          </div>
          <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.4em] flex items-center gap-3"><CheckCircle2 size={16} className="text-[#fecf00]" /> Gratis untuk acara pertama Anda</p>
        </div>
      </motion.div>
    </section>
  );
}
