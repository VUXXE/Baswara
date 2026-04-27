"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative z-10 px-6 lg:px-12 pt-28 md:pt-36">
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
            
            <div>
              <p className="text-xl md:text-2xl text-[#6b1d1d]/80 leading-relaxed font-medium max-w-xl tracking-tight italic font-serif">
                Rencanakan momen spesialmu dengan palet kebahagiaan. Undangan digital yang vibran dan manajemen RSVP yang seru.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link href="/onboarding" className={buttonVariants({ size: "lg", className: "h-16 px-10 text-lg rounded-full bg-[#fd5e4b] hover:bg-[#6b1d1d] transition-all duration-300 text-white border-none shadow-xl shadow-[#fd5e4b]/20 font-black uppercase tracking-widest" })}>
                  Buat Acara
                </Link>
                <Link href="/invite/customize" className={buttonVariants({ size: "lg", variant: "outline", className: "h-16 px-10 text-lg rounded-full border-2 border-[#6b1d1d] text-[#6b1d1d] hover:bg-[#6b1d1d]/5 transition-all duration-300 font-bold" })}>
                  Coba Template
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  {["RS", "AM", "DK", "NF"].map((initials, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#fedbdf] bg-gradient-to-br from-[#fd5e4b] to-[#6b1d1d] flex items-center justify-center text-white text-[10px] font-black">{initials}</div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black text-[#6b1d1d]">250K+ Organizer</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#fecf00] text-[#fecf00]" />)}
                    <span className="text-xs text-[#6b1d1d]/60 font-bold ml-1">4.9/5</span>
                  </div>
                </div>
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
  );
}
