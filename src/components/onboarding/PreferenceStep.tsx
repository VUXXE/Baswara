"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, Heart, PartyPopper, Briefcase, Calendar } from "lucide-react";
import { EventType } from "@/lib/types";

interface PreferenceStepProps {
  onNext: () => void;
  onPrev: () => void;
  data: {
    eventType: EventType;
    theme: string;
    title: string;
    date: string;
  };
  onChange: (updates: any) => void;
}

const themes = [
  { id: 'classic', label: 'Klasik & Elegan', color: 'bg-[#6b1d1d]', preview: 'Serif, warna pastel, dekorasi floral.' },
  { id: 'modern', label: 'Modern Minimalis', color: 'bg-[#fd5e4b]', preview: 'Sans-serif, clean lines, bold colors.' },
  { id: 'playful', label: 'Ceria & Warna-warni', color: 'bg-yellow-400', preview: 'Ilustrasi, font unik, penuh energi.' },
  { id: 'vintage', label: 'Vintage Retro', color: 'bg-amber-800', preview: 'Tekstur kertas, font klasik, warna hangat.' },
];

const eventTypes = [
  { id: 'wedding', label: 'Pernikahan', icon: <Heart size={20}/> },
  { id: 'birthday', label: 'Ulang Tahun', icon: <PartyPopper size={20}/> },
  { id: 'seminar', label: 'Seminar', icon: <Briefcase size={20}/> },
  { id: 'party', label: 'Pesta / Lainnya', icon: <Calendar size={20}/> },
];

export default function PreferenceStep({ onNext, onPrev, data, onChange }: PreferenceStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#6b1d1d] italic">
          Detail Acara
        </h2>
        <p className="text-[#6b1d1d]/70 max-w-md mx-auto leading-relaxed">
          Beri tahu kami jenis acara apa yang sedang Anda rencanakan.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Event Type Selection */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/40 ml-1">Jenis Acara</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {eventTypes.map(type => (
               <button 
                 key={type.id}
                 onClick={() => onChange({ eventType: type.id as EventType })}
                 className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${data.eventType === type.id ? 'border-[#fd5e4b] bg-white shadow-md text-[#fd5e4b]' : 'border-[#6b1d1d]/5 bg-white/30 text-[#6b1d1d]/40 hover:border-[#6b1d1d]/20'}`}
               >
                 {type.icon}
                 <span className="text-[10px] font-bold uppercase tracking-tight">{type.label}</span>
               </button>
             ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/40 ml-1">Nama Acara</Label>
              <Input 
                placeholder="Contoh: Adrian & Ariana Wedding" 
                className="rounded-xl border-2 border-[#6b1d1d]/5 focus:border-[#fd5e4b] focus:ring-0 h-11"
                value={data.title}
                onChange={e => onChange({ title: e.target.value })}
              />
           </div>
           <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/40 ml-1">Tanggal Utama</Label>
              <Input 
                type="date"
                className="rounded-xl border-2 border-[#6b1d1d]/5 focus:border-[#fd5e4b] focus:ring-0 h-11"
                value={data.date}
                onChange={e => onChange({ date: e.target.value })}
              />
           </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/40 ml-1">Pilih Nuansa Desain</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onChange({ theme: theme.id })}
                className={`relative overflow-hidden text-left p-5 rounded-2xl border-2 transition-all duration-300
                  ${data.theme === theme.id 
                    ? 'border-[#fd5e4b] bg-white shadow-lg' 
                    : 'border-[#6b1d1d]/5 bg-white/30 hover:border-[#6b1d1d]/20'
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#6b1d1d]">{theme.label}</h3>
                  {data.theme === theme.id && <div className="bg-[#fd5e4b] p-1 rounded-full text-white"><Check className="w-3 h-3" /></div>}
                </div>
                <p className="text-[11px] text-[#6b1d1d]/60 leading-snug">{theme.preview}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 pt-4">
        <Button 
          onClick={onNext}
          disabled={!data.title || !data.date}
          className="w-full max-w-sm bg-[#6b1d1d] hover:bg-[#831843] text-[#fedbdf] h-12 text-lg font-medium rounded-xl shadow-lg shadow-[#6b1d1d]/20"
        >
          Lanjutkan Setup
        </Button>
        <button 
          onClick={onPrev}
          className="flex items-center text-[#6b1d1d]/60 hover:text-[#6b1d1d] transition-colors font-medium text-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Kembali
        </button>
      </div>
    </motion.div>
  );
}
