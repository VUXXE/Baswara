"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Zap, Shield, Star, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { useRef } from 'react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

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
      
      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              className="space-y-12 relative z-20"
            >
              <div className="flex items-center gap-3">
                <Heart className="text-[#fd5e4b] fill-[#fd5e4b]" size={18} />
                <span className="text-xs font-black tracking-[0.3em] uppercase text-[#fd5e4b]">The New Standard of RSVP</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] text-[#fd5e4b]">
                BASWARA <br />
                <span className="editorial-heading text-[#6b1d1d] block mt-6">Event Joy.</span>
              </h1>
              
              <div className="space-y-10">
                <p className="text-xl md:text-2xl text-[#6b1d1d]/80 leading-relaxed font-medium max-w-xl tracking-tight italic font-serif">
                  Rencanakan momen spesialmu dengan palet kebahagiaan. Undangan digital yang vibran dan manajemen RSVP yang seru.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "h-16 px-10 text-lg rounded-full bg-[#fd5e4b] hover:bg-[#6b1d1d] transition-all duration-300 text-white border-none shadow-xl shadow-[#fd5e4b]/20 font-black uppercase tracking-widest" })}>
                    Buat Acara
                  </Link>
                  <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline", className: "h-16 px-10 text-lg rounded-full border-2 border-[#6b1d1d] text-[#6b1d1d] hover:bg-[#6b1d1d]/5 transition-all duration-300 font-bold" })}>
                    Pelajari Fitur
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Image Content */}
            <div className="relative flex justify-end">
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 w-[95%] max-w-[620px] lg:translate-x-8 translate-y-4"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-[#fd5e4b]/10 rounded-full -z-10" />
                <div className="absolute top-0 right-[-5%] w-80 h-80 bg-[#fecf00]/15 blur-[100px] -z-10 rounded-full" />
                <div className="relative z-10 drop-shadow-[-30px_50px_100px_rgba(107,29,29,0.15)]">
                  <Image src="/Phone.png" alt="Baswara App Preview" width={1200} height={1400} className="w-full h-auto object-contain" priority />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-[#6b1d1d]/10 blur-3xl rounded-[100%] -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Asymmetrical Stacking */}
      <section className="relative z-10 py-48 bg-[#fedbdf]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
              <h2 className="text-xs font-black tracking-[0.4em] uppercase text-[#fd5e4b]">Impact</h2>
              <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#6b1d1d] leading-none">
                Angka yang <br />
                <span className="editorial-heading text-[#fd5e4b]">Bicara.</span>
              </p>
              <p className="text-lg text-[#6b1d1d]/60 font-medium max-w-sm">
                Setiap statistik mencerminkan dedikasi kami terhadap kesempurnaan acara Anda.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {[
                { label: "Momen Tercipta", value: "10K+", icon: <Sparkles size={40} />, color: "from-[#fd5e4b] to-[#fd8391]", tilt: "md:-rotate-2 md:translate-y-8" },
                { label: "Tamu Bahagia", value: "1.5M", icon: <Users size={40} />, color: "from-[#fecf00] to-[#fddf98]", tilt: "md:rotate-2" },
                { label: "Desain Ceria", value: "48+", icon: <Calendar size={40} />, color: "from-[#6b1d1d] to-[#4d2a0a]", tilt: "md:rotate-1 md:translate-y-12" },
                { label: "Organizer Aktif", value: "250K", icon: <Zap size={40} />, color: "from-[#fd8391] to-[#fedbdf]", tilt: "md:-rotate-1" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group relative p-12 bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(107,29,29,0.1)] hover:shadow-[0_60px_120px_-20px_rgba(107,29,29,0.2)] transition-all duration-700 ${stat.tilt}`}
                >
                  <div className="relative z-10 space-y-8">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-6xl font-black tracking-tighter text-[#6b1d1d]">{stat.value}</h3>
                      <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#6b1d1d]/40">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Artisan Gallery Card System */}
      <section id="features" className="relative z-10 py-32 md:py-64 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-xs font-black tracking-[0.5em] uppercase text-[#fd5e4b]">Gallery</h2>
            <p className="text-5xl md:text-8xl font-black tracking-tighter text-[#6b1d1d]">
              Fitur <span className="editorial-heading text-[#fd5e4b]">Luar Biasa.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Feature 1: Large Artisan Card (Digital Invitation) */}
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

      {/* Why Choose Us */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-[#fedbdf]/20 border-y border-[#6b1d1d]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black tracking-[0.5em] uppercase text-[#fd5e4b]">Keunggulan Kami</h2>
            <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#6b1d1d]">Mengapa <span className="editorial-heading text-[#fd5e4b]">Baswara?</span></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Desain Berkelas", desc: "Kami menciptakan karya seni digital yang mencerminkan prestise acara Anda.", icon: <Sparkles size={32} /> },
              { title: "Teknologi Handal", desc: "Sistem RSVP kami dirancang untuk menangani ribuan tamu tanpa hambatan.", icon: <Zap size={32} /> },
              { title: "Dukungan Personal", desc: "Tim ahli kami mendampingi setiap langkah Anda untuk kesempurnaan acara.", icon: <Heart size={32} /> }
            ].map((item, idx) => (
              <div key={idx} className="p-12 bg-white rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 border border-[#6b1d1d]/5">
                <div className="text-[#fd5e4b] mb-8">{item.icon}</div>
                <h3 className="text-2xl font-black tracking-tighter text-[#6b1d1d] uppercase mb-4">{item.title}</h3>
                <p className="text-lg text-[#6b1d1d]/60 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xs font-black tracking-[0.5em] uppercase text-[#fd5e4b]">Suara Pelanggan</h2>
              <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#6b1d1d]">Ulasan <span className="editorial-heading text-[#fd5e4b]">Terpercaya.</span></p>
            </div>
            <div className="flex items-center gap-4 pb-4">
              <div className="flex gap-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} className="fill-[#fecf00] text-[#fecf00]" />)}</div>
              <span className="text-sm font-bold text-[#6b1d1d]">4.9/5 Rating Global</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#6b1d1d]/10 border border-[#6b1d1d]/10">
            {[
              { text: "Baswara mendefinisikan ulang kemewahan digital dalam manajemen acara korporat kami.", name: "Alexandra Vane", role: "Director of Events", avatar: "AV" },
              { text: "Undangan digital paling estetik yang pernah saya gunakan. Tamu-tamu kami sangat terkesan.", name: "Budi Santoso", role: "Wedding Specialist", avatar: "BS" },
              { text: "Sistem RSVP yang sangat handal. Notifikasi instannya sangat membantu koordinasi tim.", name: "Siska Amelia", role: "Marketing Manager", avatar: "SA" }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-12 space-y-8 hover:bg-[#fedbdf]/20 transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fedbdf] flex items-center justify-center text-[#fd5e4b] font-black text-xs border border-[#fd5e4b]/10">{review.avatar}</div>
                  <div className="flex gap-1 pt-4">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} className="fill-[#fecf00] text-[#fecf00]" />)}</div>
                </div>
                <blockquote className="text-xl md:text-2xl font-serif italic font-light leading-relaxed text-[#6b1d1d]">&ldquo;{review.text}&rdquo;</blockquote>
                <div className="space-y-1 pt-8 border-t border-[#6b1d1d]/5">
                  <div className="text-[#fd5e4b] font-black tracking-widest uppercase text-[10px]">{review.name}</div>
                  <div className="text-[#6b1d1d]/40 text-[9px] font-bold uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-[#fedbdf]/20 border-y border-[#6b1d1d]/5 text-[#6b1d1d]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-black text-[#6b1d1d]">Select a Plan <br/>According to Your Need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { name: "Starter Plan", price: "Rp 500k", color: "bg-[#6b1d1d]", textColor: "text-white" },
               { name: "Pro Plan", price: "Rp 1.5M", color: "bg-[#fd5e4b]", textColor: "text-white" },
               { name: "Premium Plan", price: "Rp 3.0M", color: "bg-[#fecf00]", textColor: "text-[#6b1d1d]" }
            ].map((plan, idx) => (
                <div key={idx} className="rounded-[2.5rem] bg-white border border-[#6b1d1d]/5 shadow-xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-500">
                   <div className={`${plan.color} ${plan.textColor} p-8 lg:p-10`}>
                       <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Baswara Experience</p>
                       <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                       <div className="flex items-end gap-2">
                          <span className="text-4xl lg:text-5xl font-black tracking-tighter">{plan.price}</span>
                          <span className="text-sm font-bold opacity-80 pb-2">/ event</span>
                       </div>
                   </div>
                   <div className="p-8 lg:p-10 flex-1 flex flex-col gap-8">
                       <ul className="space-y-4 flex-1">
                          {[
                            "Premium Digital Invitation",
                            "Real-time RSVP Tracking",
                            "Up to " + (idx === 0 ? "500" : idx === 1 ? "2,000" : "Unlimited") + " Guests",
                            idx >= 1 ? "WhatsApp Reminders" : "Email Notifications",
                            idx === 2 ? "Dedicated Event Manager" : "Standard Support"
                          ].map((feature, i) => (
                              <li key={i} className="flex items-center gap-4 text-sm font-medium text-[#6b1d1d]/70">
                                  <CheckCircle2 size={18} className="text-[#fd5e4b]" />
                                  {feature}
                              </li>
                          ))}
                       </ul>
                       <Button className="w-full h-14 rounded-full bg-[#6b1d1d] hover:bg-[#fd5e4b] text-white border-none font-bold transition-all text-sm uppercase tracking-widest shadow-lg">Get Started</Button>
                   </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 md:py-64 px-6 bg-[#fd5e4b] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8]">READY TO <br /><span className="editorial-heading text-[#fecf00] italic font-serif">EXCEL?</span></h2>
          <div className="flex flex-col items-center gap-12">
            <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Masukkan email Anda" className="flex-1 h-20 px-8 rounded-full bg-white text-[#6b1d1d] text-xl focus:outline-none font-bold" />
              <Button className="h-20 px-12 text-lg rounded-full bg-[#fecf00] text-[#6b1d1d] hover:bg-white transition-all font-black uppercase border-none">Gabung</Button>
            </div>
            <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.4em] flex items-center gap-3"><CheckCircle2 size={16} className="text-[#fecf00]" /> Join the Baswara Excellence</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 bg-[#fedbdf]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-6">
            <Image src="/Main-logo.svg" alt="Baswara Logo" width={140} height={40} className="h-10 w-auto" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#6b1d1d] opacity-40">© 2026 Crafted with Passion.</span>
          </div>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-[#6b1d1d] opacity-60">
            <Link href="#" className="hover:text-[#fd5e4b] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#fd5e4b] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#fd5e4b] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
