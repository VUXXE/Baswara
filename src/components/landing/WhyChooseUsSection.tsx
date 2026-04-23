"use client";

import { Sparkles, Zap, Heart } from 'lucide-react';

const items = [
  { title: "Desain Berkelas", desc: "Kami menciptakan karya seni digital yang mencerminkan prestise acara Anda.", icon: <Sparkles size={32} /> },
  { title: "Teknologi Handal", desc: "Sistem RSVP kami dirancang untuk menangani ribuan tamu tanpa hambatan.", icon: <Zap size={32} /> },
  { title: "Dukungan Personal", desc: "Tim ahli kami mendampingi setiap langkah Anda untuk kesempurnaan acara.", icon: <Heart size={32} /> }
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative z-10 py-32 md:py-48 px-6 bg-[#fedbdf]/20 border-y border-[#6b1d1d]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-xs font-black tracking-[0.5em] uppercase text-[#fd5e4b]">Keunggulan Kami</h2>
          <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#6b1d1d]">Mengapa <span className="editorial-heading text-[#fd5e4b]">Baswara?</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-12 bg-white rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 border border-[#6b1d1d]/5">
              <div className="text-[#fd5e4b] mb-8">{item.icon}</div>
              <h3 className="text-2xl font-black tracking-tighter text-[#6b1d1d] uppercase mb-4">{item.title}</h3>
              <p className="text-lg text-[#6b1d1d]/60 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
