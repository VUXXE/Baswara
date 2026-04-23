"use client";

import { motion } from 'framer-motion';
import { Sparkles, Users, Calendar, Zap } from 'lucide-react';

const stats = [
  { label: "Momen Tercipta", value: "10K+", icon: <Sparkles size={40} />, color: "from-[#fd5e4b] to-[#fd8391]", tilt: "md:-rotate-2 md:translate-y-8" },
  { label: "Tamu Bahagia", value: "1.5M", icon: <Users size={40} />, color: "from-[#fecf00] to-[#fddf98]", tilt: "md:rotate-2" },
  { label: "Desain Ceria", value: "48+", icon: <Calendar size={40} />, color: "from-[#6b1d1d] to-[#4d2a0a]", tilt: "md:rotate-1 md:translate-y-12" },
  { label: "Organizer Aktif", value: "250K", icon: <Zap size={40} />, color: "from-[#fd8391] to-[#fedbdf]", tilt: "md:-rotate-1" }
];

export default function StatsSection() {
  return (
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
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
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
  );
}
