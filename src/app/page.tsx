"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Zap, Shield, Star, CheckCircle2, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fedbdf] text-[#6b1d1d] selection:bg-[#fd5e4b] selection:text-white font-sans">
      {/* Noise Overlay */}
      <div className="noise-overlay opacity-[0.03]" />
      
      {/* Hero Section - Balanced 2-Column Layout (No Overlap) */}
      <section className="relative z-10 pt-40 pb-24 md:pt-56 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-12 relative z-20">
              <div className="flex items-center gap-3">
                <Heart className="text-[#fd5e4b] fill-[#fd5e4b]" size={18} />
                <span className="text-xs font-black tracking-[0.3em] uppercase text-[#fd5e4b]">The New Standard of RSVP</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] text-[#fd5e4b]">
                BASWARA <br />
                <span className="editorial-heading text-[#6b1d1d] block mt-6">Event Joy.</span>
              </h1>
              
              <div className="space-y-10">
                <p className="text-xl md:text-2xl text-[#6b1d1d]/80 leading-relaxed font-medium max-w-xl tracking-tight">
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
            </div>

            {/* Right Image Content (Contained, No Overlap) */}
            <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative z-10 w-full max-w-[550px] lg:max-w-full">
                <div className="relative drop-shadow-[0_20px_50px_rgba(107,29,29,0.1)]">
                  <Image 
                    src="/Phone.png" 
                    alt="Baswara App Preview" 
                    width={1200} 
                    height={1400} 
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                {/* Refined Decorative Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#fd5e4b]/5 blur-[120px] -z-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 bg-[#fd8391] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 text-center">
            {[
              { label: "Momen Tercipta", value: "10K+" },
              { label: "Tamu Bahagia", value: "1.5M" },
              { label: "Desain Ceria", value: "48+" },
              { label: "Organizer Aktif", value: "250K" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-[#fecf00] drop-shadow-md">{stat.value}</h3>
                <p className="text-xs uppercase tracking-[0.3em] font-black text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Editorial Clean List */}
      <section id="features" className="relative z-10 py-32 md:py-64 px-6 bg-[#fedbdf]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black tracking-[0.5em] uppercase text-[#fd5e4b] mb-8">Capabilities</h2>
              <p className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-[#6b1d1d]">
                Kesempurnaan di setiap <span className="italic font-serif text-[#fd5e4b]">detail acara.</span>
              </p>
            </div>
          </div>

          <div className="space-y-0">
            {[
              { title: "Undangan Digital Premium", desc: "Desain halaman acara yang indah dan responsif sesuai identitas brand atau gaya personal Anda.", icon: <Calendar size={32} /> },
              { title: "RSVP Cerdas", desc: "Pelacakan tamu otomatis dan konfirmasi dengan analitik real-time yang presisi.", icon: <Users size={32} /> },
              { title: "Notifikasi Instan", desc: "Pemberitahuan via WhatsApp atau Email segera setelah tamu merespons acaramu.", icon: <Zap size={32} /> },
              { title: "Aman & Privat", desc: "Data acara Anda dilindungi dengan enkripsi kelas enterprise untuk keamanan maksimal.", icon: <Shield size={32} /> }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group py-16 border-b border-[#6b1d1d]/10 flex flex-col md:flex-row gap-12 items-start hover:bg-white/40 transition-all duration-300 px-8"
              >
                <div className="text-[#fd5e4b]">{feature.icon}</div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#6b1d1d]">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-[#6b1d1d]/60 font-medium max-w-3xl leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowRight size={48} className="text-[#fd5e4b]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative z-10 py-32 md:py-64 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={20} className="fill-[#fecf00] text-[#fecf00]" />)}
            </div>
            <blockquote className="text-4xl md:text-7xl font-serif italic font-light leading-tight tracking-tight text-[#6b1d1d]">
              &ldquo;Baswara telah mendefinisikan ulang <span className="not-italic font-black text-[#fd5e4b]">standar kemewahan</span> digital dalam manajemen acara korporat kami.&rdquo;
            </blockquote>
            <div className="space-y-4">
              <div className="text-[#fd5e4b] font-black tracking-[0.5em] uppercase text-sm">Alexandra Vane</div>
              <div className="text-[#6b1d1d]/40 text-xs font-bold uppercase tracking-[0.3em]">Director of Events, Solar Creative</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 md:py-64 px-6 bg-[#fd5e4b] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-16">
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12">
              READY TO <br />
              <span className="editorial-heading text-[#fecf00] italic font-serif">EXCEL?</span>
            </h2>
            <div className="flex flex-col items-center gap-12">
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="flex-1 h-20 px-8 rounded-full bg-white text-[#6b1d1d] text-xl focus:outline-none font-bold placeholder:text-[#6b1d1d]/30"
                />
                <Button className="h-20 px-12 text-lg rounded-full bg-[#fecf00] text-[#6b1d1d] hover:bg-white transition-all font-black uppercase tracking-widest border-none">
                  Gabung
                </Button>
              </div>
              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#fecf00]" /> Join the Baswara Excellence
              </p>
            </div>
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
