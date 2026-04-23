"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Zap, Shield } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-32 md:py-64 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-32 space-y-6"
        >
          <h2 className="text-xs font-black tracking-[0.5em] uppercase text-[#fd5e4b]">Gallery</h2>
          <p className="text-5xl md:text-8xl font-black tracking-tighter text-[#6b1d1d]">
            Fitur <span className="editorial-heading text-[#fd5e4b]">Luar Biasa.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Feature 1: Large Card (Digital Invitation) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-8 bg-[#fedbdf]/40 rounded-3xl p-16 flex flex-col md:flex-row gap-12 items-center overflow-hidden border border-[#fd5e4b]/10 shadow-2xl shadow-[#fd5e4b]/5 group"
          >
            <div className="flex-1 space-y-8">
              <div className="h-16 w-16 rounded-3xl bg-white flex items-center justify-center text-[#fd5e4b] shadow-xl">
                <Calendar size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-[#6b1d1d] italic font-serif">Undangan Digital Premium</h3>
                <p className="text-xl text-[#6b1d1d]/60 font-medium leading-relaxed max-w-md">
                  Desain yang dikurasi secara personal untuk mencerminkan prestise brand atau gaya unik acara Anda.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="px-6 py-2 rounded-full border border-[#fd5e4b]/20 text-[10px] font-bold uppercase tracking-widest text-[#fd5e4b]">Premium Design</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative group-hover:scale-105 transition-transform duration-700">
              <div className="relative z-10 drop-shadow-[-20px_30px_60px_rgba(107,29,29,0.2)]">
                <Image src="/Design-mock2.png" alt="Digital Invitation" width={800} height={1000} className="w-full h-auto object-contain rounded-3xl" />
              </div>
              <div className="absolute inset-0 bg-[#fd5e4b]/20 blur-[80px] -z-10 rounded-full scale-75" />
            </div>
          </motion.div>

          {/* Feature 2: Square Card (RSVP) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-4 bg-[#fecf00] rounded-3xl p-12 flex flex-col justify-between shadow-2xl border border-white/20 group"
          >
            <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center text-[#6b1d1d] backdrop-blur-md">
              <Users size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black tracking-tighter text-[#6b1d1d] italic font-serif">Smart RSVP</h3>
              <p className="text-lg text-[#6b1d1d]/70 font-bold leading-tight">Pelacakan tamu otomatis dengan sistem analitik real-time yang presisi.</p>
            </div>
            <div className="pt-8">
              <ArrowRight size={40} className="text-[#6b1d1d] group-hover:translate-x-4 transition-transform" />
            </div>
          </motion.div>

          {/* Feature 3: Medium Card (Notifikasi) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-6 bg-[#fd8391] rounded-3xl p-12 flex flex-col md:flex-row gap-8 items-center shadow-2xl border border-white/20"
          >
            <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <Zap size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase">Notifikasi Instan</h3>
              <p className="text-lg text-white/80 font-medium">Update real-time yang mendarat langsung di tangan Anda melalui WhatsApp.</p>
            </div>
          </motion.div>

          {/* Feature 4: Medium Card (Aman) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-6 bg-[#6b1d1d] rounded-3xl p-12 flex flex-col md:flex-row gap-8 items-center shadow-2xl border border-white/5"
          >
            <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center text-[#fd5e4b] shrink-0">
              <Shield size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase">Aman & Privat</h3>
              <p className="text-lg text-white/40 font-medium">Perlindungan data kelas dunia untuk memastikan privasi tamu Anda terjaga.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
