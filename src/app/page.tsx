"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-16 pb-24 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary blob" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-secondary blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[800px] bg-[#8b5cf6] blob" style={{ animationDelay: '4s' }} />

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 glass text-sm font-medium text-white/80">
          ✨ Era Baru Manajemen Acara Digital
        </motion.div>
        
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6 text-foreground">
          Solusi <span className="text-gradient">Terbaik</span> <br className="hidden md:block"/> untuk Setiap Acara.
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 font-light">
          Rencanakan konferensi, peluncuran produk, hingga pesta dengan Event Planner Digital, Undangan Website bergaya premium, dan Sistem RSVP terintegrasi.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] transition-all" })}>
            Buat Acara Sekarang
          </Link>
          <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline", className: "h-14 px-8 text-lg rounded-full glass border-white/20 hover:bg-white/10" })}>
            Pelajari Fitur
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center glass-card p-10 rounded-3xl">
          <div>
            <h2 className="text-5xl font-black text-white mb-2">9.7K+</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Acara Sukses</p>
          </div>
          <div className="md:border-x border-white/10">
            <h2 className="text-5xl font-black text-white mb-2">1.2M+</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">RSVP Tercatat</p>
          </div>
          <div>
            <h2 className="text-5xl font-black text-white mb-2">3.5K+</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Event Organizer</p>
          </div>
        </div>
      </motion.div>

      {/* Services/Features Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-40 space-y-40" id="features">
        
        {/* Feature 1 */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-16"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex-1 space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold uppercase tracking-wider">Halaman Acara</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Sebar undangan digital dengan gaya premium.</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">Buat dan sebar informasi acaramu dengan Halaman Acara khusus. Sesuaikan desain undangan dan informasi acara dari mana saja, kapan saja.</p>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex items-start gap-4"><div className="p-2 bg-white/5 rounded-lg border border-white/10">✨</div> <span className="text-lg"><strong className="text-white">Kustomisasi Penuh:</strong> Sesuaikan warna dan detail acara.</span></li>
              <li className="flex items-start gap-4"><div className="p-2 bg-white/5 rounded-lg border border-white/10">📱</div> <span className="text-lg"><strong className="text-white">Sebar Mudah:</strong> Bagikan link melalui WhatsApp atau Email.</span></li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex-1 w-full aspect-square max-h-[500px] rounded-[2.5rem] glass-card flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 text-white/50 font-medium text-xl">Ilustrasi Halaman Acara</div>
          </motion.div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex-1 space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-sm font-bold uppercase tracking-wider">Manajemen Tamu</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Pantau RSVP secara real-time.</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">Kelola daftar tamu dan RSVP dengan modern. Dapatkan data kehadiran yang akurat untuk memastikan kelancaran acaramu.</p>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex items-start gap-4"><div className="p-2 bg-white/5 rounded-lg border border-white/10">🔒</div> <span className="text-lg"><strong className="text-white">Registrasi Aman:</strong> Kontrol siapa saja yang bisa mendaftar.</span></li>
              <li className="flex items-start gap-4"><div className="p-2 bg-white/5 rounded-lg border border-white/10">📝</div> <span className="text-lg"><strong className="text-white">Data Akurat:</strong> Informasi diet dan kehadiran tercatat.</span></li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex-1 w-full aspect-square max-h-[500px] rounded-[2.5rem] glass-card flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 to-primary/20 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 text-white/50 font-medium text-xl">Ilustrasi Manajemen Tamu</div>
          </motion.div>
        </motion.div>

      </div>

      {/* Why Choose Us */}
      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-40 text-center"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight mb-6">Kenapa Memilih Baswara?</motion.h2>
        <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16 font-light">Dirancang untuk skala apa pun—dari kumpul keluarga hingga konferensi nasional—kami memastikan acaramu berjalan tanpa hambatan.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { icon: "🎯", title: "Skalabilitas Tinggi", desc: "Dari 10 orang hingga festival ribuan peserta." },
            { icon: "🛡️", title: "Andal & Aman", desc: "Dipercaya oleh event organizer profesional." },
            { icon: "⭐", title: "Premium Design", desc: "Tingkatkan citra acaramu dengan UI berkelas." },
            { icon: "⚡", title: "Super Cepat", desc: "Sistem yang dioptimasi untuk kecepatan tinggi." }
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="glass-card h-full bg-card/10">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-40 mb-20"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
      >
        <div className="relative rounded-[3rem] p-1 overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#8b5cf6] to-secondary animate-pulse" />
          
          <div className="relative bg-background/90 backdrop-blur-3xl p-12 md:p-20 rounded-[2.9rem] text-center border border-white/10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Siap menyelenggarakan acara terbaikmu?</h2>
            <p className="text-xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto">Mulai gunakan platform kami sekarang atau hubungi tim kami untuk konsultasi skala enterprise.</p>
            <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "h-14 px-10 text-lg rounded-full shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transition-all" })}>
              Mulai Gratis Sekarang
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
