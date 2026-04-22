"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Zap, Star, CheckCircle2, Heart } from 'lucide-react';
import { useRef } from 'react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#fedbdf] text-[#6b1d1d] selection:bg-[#fd5e4b] selection:text-white">
      {/* Noise Overlay */}
      <div className="noise-overlay opacity-[0.03]" />
      
      {/* Hero Section - 60% Sakura Milk Base */}
      <section className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Heart className="text-[#fd5e4b] fill-[#fd5e4b]" size={20} />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#fd5e4b]">Era Baru Manajemen Acara</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12 text-[#fd5e4b]">
              BASWARA <br />
              <span className="editorial-heading text-[#6b1d1d] block mt-4 ml-[0.1em]">Event Joy.</span>
            </motion.h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <motion.div variants={fadeInUp} className="lg:col-span-6">
                <p className="text-xl md:text-2xl text-[#6b1d1d]/80 leading-relaxed font-medium max-w-xl">
                  Rencanakan momen spesialmu dengan palet kebahagiaan. Undangan digital yang vibran dan manajemen RSVP yang seru.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="lg:col-span-6 flex flex-col sm:flex-row gap-6 lg:justify-end">
                <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "h-16 px-10 text-lg rounded-full bg-[#fecf00] hover:bg-[#fd5e4b] hover:text-white transition-all duration-500 text-[#6b1d1d] border-none shadow-xl shadow-[#fecf00]/20 font-bold" })}>
                  Buat Acara <ArrowRight className="ml-2" />
                </Link>
                <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline", className: "h-16 px-10 text-lg rounded-full border-2 border-[#fd5e4b] text-[#fd5e4b] hover:bg-[#fd5e4b]/10 transition-all duration-500 font-bold" })}>
                  Lihat Fitur
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - 30% Berry Pink Support */}
      <section className="relative z-10 py-24 bg-[#fd8391] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 text-center">
            {[
              { label: "Momen Tercipta", value: "10K+" },
              { label: "Tamu Bahagia", value: "1.5M" },
              { label: "Desain Ceria", value: "48+" },
              { label: "Organizer Aktif", value: "250K" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-[#fecf00] drop-shadow-md">{stat.value}</h3>
                <p className="text-xs uppercase tracking-[0.3em] font-black text-white/90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid - Soft Lemon Background */}
      <section id="features" className="relative z-10 py-32 md:py-48 px-6 bg-[#fddf98]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl">
              <h2 className="text-sm font-black tracking-[0.4em] uppercase text-[#fd5e4b] mb-6">Kenapa Baswara?</h2>
              <p className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-[#6b1d1d]">
                Kesempurnaan di setiap <span className="italic font-serif text-[#fd5e4b]">detail citrus.</span>
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px]">
            {/* Feature 1: Juicy Coral (10% Accent Focus) */}
            <motion.div 
              className="md:col-span-8 md:row-span-2 bg-[#fd5e4b] text-white rounded-[3rem] p-12 flex flex-col justify-between group overflow-hidden shadow-2xl shadow-[#fd5e4b]/20"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="relative z-10 space-y-8">
                <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Calendar size={40} className="text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Undangan Paling Fresh</h3>
                  <p className="text-xl text-white/90 max-w-md font-medium leading-relaxed">
                    Desain yang segar dan penuh warna, membuat setiap tamu antusias menunggu harinya tiba.
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex gap-4">
                <span className="px-6 py-2 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest">Premium UI</span>
                <span className="px-6 py-2 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest">Fast Loading</span>
              </div>
            </motion.div>

            {/* Feature 2: Lemon Pop */}
            <motion.div 
              className="md:col-span-4 md:row-span-1 bg-[#fecf00] text-[#6b1d1d] rounded-[3rem] p-10 flex flex-col justify-between shadow-xl"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="h-14 w-14 rounded-2xl bg-[#6b1d1d]/10 flex items-center justify-center">
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight mb-2 italic font-serif">Smart RSVP</h3>
                <p className="text-sm font-bold opacity-80 leading-relaxed">Pantau kehadiran tamu dengan sistem paling ceria dan akurat.</p>
              </div>
            </motion.div>

            {/* Feature 3: Berry Pink */}
            <motion.div 
              className="md:col-span-4 md:row-span-1 bg-[#fd8391] text-white rounded-[3rem] p-10 flex flex-col justify-between shadow-xl"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight mb-2 italic font-serif">Instant Pop</h3>
                <p className="text-sm font-medium opacity-90 leading-relaxed">Notifikasi instan yang langsung mendarat di WhatsApp-mu.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Clean Sakura Milk */}
      <section className="relative z-10 py-32 md:py-64 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div 
            className="max-w-5xl mx-auto space-y-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={24} className="fill-[#fecf00] text-[#fecf00]" />)}
            </div>
            <blockquote className="text-4xl md:text-7xl font-serif italic font-light leading-tight tracking-tight text-[#6b1d1d]">
              &ldquo;Baswara memberikan energi baru dalam setiap acara kami. Visualnya sungguh <span className="text-[#fd5e4b] font-black">menyenangkan!</span>&rdquo;
            </blockquote>
            <div className="space-y-4">
              <div className="text-[#fd5e4b] font-black tracking-[0.4em] uppercase text-sm">Alexandra Vane</div>
              <div className="text-[#6b1d1d]/40 text-xs font-bold uppercase tracking-[0.2em]">Creative Director, Citrus Media</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Juicy Coral Dominance */}
      <section className="relative z-10 py-32 md:py-64 px-6 bg-[#fd5e4b] text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#fecf00] rounded-full blur-[150px] opacity-40" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none">
              Get <br />
              <span className="text-[#fecf00] italic font-serif">Juicy.</span>
            </h2>
            <div className="flex flex-col items-center gap-12">
              <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4 p-4 bg-white/10 backdrop-blur-md rounded-[2.5rem]">
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="flex-1 h-16 px-8 bg-transparent text-xl focus:outline-none placeholder:text-white/50 border-none text-white font-bold"
                />
                <Button className="h-16 px-12 text-lg rounded-full bg-[#fecf00] text-[#6b1d1d] hover:scale-105 transition-transform font-black uppercase tracking-widest border-none">
                  Daftar Sekarang
                </Button>
              </div>
              <p className="text-[10px] text-white font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#fecf00]" /> 100% Refreshing Event Platform
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 bg-[#fedbdf] text-[#6b1d1d]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-6">
            <span className="text-3xl font-black tracking-tighter text-[#fd5e4b]">BASWARA</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40">© 2026 Crafted with Passion.</span>
          </div>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-black opacity-60">
            <Link href="#" className="hover:text-[#fd5e4b] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#fd5e4b] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#fd5e4b] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
