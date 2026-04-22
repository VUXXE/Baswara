"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Zap, Shield, Star, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-primary/20 blob" 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-secondary/20 blob" 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-[10%] left-[20%] w-[800px] h-[800px] bg-[#8b5cf6]/10 blob" 
          animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-40 px-6">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-primary/50" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary">Masa Depan RSVP Acara</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12">
            BASWARA <br />
            <span className="editorial-heading text-primary/80 block mt-4 ml-[0.1em]">Event Excellence.</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div variants={fadeInUp} className="lg:col-span-6">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
                Tingkatkan prestise acaramu dengan undangan digital premium dan manajemen RSVP yang mulus. Dirancang untuk mereka yang menghargai perpaduan teknologi dan kemewahan.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="lg:col-span-6 flex flex-col sm:flex-row gap-6 lg:justify-end">
              <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "h-16 px-10 text-lg rounded-none bg-primary hover:bg-primary/90 transition-all duration-500 group" })}>
                Mulai Sekarang <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline", className: "h-16 px-10 text-lg rounded-none border-white/10 hover:bg-white/5 transition-all duration-500" })}>
                Jelajahi Fitur
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Refined */}
      <section className="relative z-10 py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
            {[
              { label: "Acara Sukses", value: "10K+" },
              { label: "Data RSVP", value: "1.5M" },
              { label: "Template Desain", value: "48+" },
              { label: "Pengguna Aktif", value: "250K" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">{stat.value}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary mb-6">Kapabilitas Utama</h2>
              <p className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic font-serif">
                Segala hal yang Anda butuhkan untuk momen sempurna.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
            {/* Feature 1: Large Bento */}
            <motion.div 
              className="md:col-span-8 md:row-span-2 glass-card rounded-3xl p-10 flex flex-col justify-between group overflow-hidden"
              whileHover={{ y: -5 }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar size={240} className="text-primary rotate-12" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">Undangan Digital Premium</h3>
                <p className="text-lg text-muted-foreground max-w-md font-light leading-relaxed">
                  Desain halaman acara yang indah dan responsif sesuai identitas brand atau gaya personal Anda. Dari minimalisme pernikahan hingga branding korporat.
                </p>
              </div>
              <div className="relative z-10 flex gap-4">
                <span className="px-4 py-1.5 rounded-full border border-foreground/10 text-xs font-bold uppercase tracking-wider text-foreground/60">Desain Responsif</span>
                <span className="px-4 py-1.5 rounded-full border border-foreground/10 text-xs font-bold uppercase tracking-wider text-foreground/60">Optimasi SEO</span>
              </div>
            </motion.div>

            {/* Feature 2: Square Bento */}
            <motion.div 
              className="md:col-span-4 md:row-span-1 glass-card rounded-3xl p-10 flex flex-col justify-between group"
              whileHover={{ y: -5 }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight">RSVP Cerdas</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Pelacakan tamu otomatis dan konfirmasi dengan analitik real-time.
              </p>
            </motion.div>

            {/* Feature 3: Square Bento */}
            <motion.div 
              className="md:col-span-4 md:row-span-1 glass-card rounded-3xl p-10 flex flex-col justify-between group"
              whileHover={{ y: -5 }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="h-12 w-12 rounded-2xl bg-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Notifikasi Instan</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Dapatkan pemberitahuan via WhatsApp atau Email segera setelah tamu merespons.
              </p>
            </motion.div>

            {/* Feature 4: Medium Bento */}
            <motion.div 
              className="md:col-span-12 md:row-span-1 glass-card rounded-3xl p-10 flex items-center justify-between group overflow-hidden"
              whileHover={{ y: -5 }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">Aman & Privat</h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                  Data acara Anda dilindungi dengan enkripsi kelas enterprise. Kami menghormati privasi Anda dan seluruh tamu undangan Anda.
                </p>
              </div>
              <div className="hidden md:flex h-20 w-20 rounded-full bg-foreground/5 items-center justify-center border border-foreground/10">
                <Shield size={32} className="text-foreground/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - High Editorial */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 text-[20rem] font-serif italic text-primary/5 select-none pointer-events-none"
          >
            &ldquo;
          </motion.div>
          <motion.div 
            className="max-w-4xl mx-auto space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif italic font-light leading-tight tracking-tight text-foreground">
              &ldquo;Baswara telah mengubah cara kami menangani peluncuran korporat. Tingkat kehalusan dan perhatian terhadap detail di platform mereka tidak tertandingi di industri ini.&rdquo;
            </blockquote>
            <div className="space-y-2">
              <div className="text-primary font-bold tracking-widest uppercase text-sm">Alexandra Vane</div>
              <div className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]">Direktur Acara, Lumina Creative</div>
            </div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="fill-primary text-primary" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA / Signup */}
      <section className="relative z-10 py-32 md:py-64 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              SIAP UNTUK <br />
              <span className="editorial-heading text-primary italic font-serif">Melampaui Ekspektasi?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              Bergabunglah dengan 5.000+ penyelenggara yang mempercayakan momen terpenting mereka kepada Baswara. Daftar untuk akses awal fitur premium.
            </p>
            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="flex-1 h-16 px-6 bg-foreground/5 border border-foreground/10 text-lg focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/60"
                />
                <Button className="h-16 px-10 text-lg rounded-none bg-primary hover:bg-primary/90">
                  Gabung Daftar Tunggu
                </Button>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-2">
                <CheckCircle2 size={14} className="text-primary" /> Tanpa kartu kredit. Batalkan kapan saja.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="relative z-10 py-12 border-t border-foreground/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black tracking-tighter">BASWARA</span>
            <span className="h-4 w-[1px] bg-foreground/20 hidden md:block" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">© 2026 Baswara Digital. Seluruh hak cipta dilindungi.</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-primary transition-colors">Hubungi Kami</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
