"use client";

import { Star } from 'lucide-react';

const reviews = [
  { text: "Baswara mendefinisikan ulang kemewahan digital dalam manajemen acara korporat kami.", name: "Alexandra Vane", role: "Director of Events", avatar: "AV" },
  { text: "Undangan digital paling estetik yang pernah saya gunakan. Tamu-tamu kami sangat terkesan.", name: "Budi Santoso", role: "Wedding Specialist", avatar: "BS" },
  { text: "Sistem RSVP yang sangat handal. Notifikasi instannya sangat membantu koordinasi tim.", name: "Siska Amelia", role: "Marketing Manager", avatar: "SA" }
];

export default function TestimonialsSection() {
  return (
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
          {reviews.map((review, idx) => (
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
  );
}
