"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

interface PreferenceStepProps {
  onNext: (data: { theme: string }) => void;
  onBack: () => void;
  initialData: { theme: string };
}

const themes = [
  { id: 'classic', label: 'Klasik & Elegan', color: 'bg-[#6b1d1d]', preview: 'Serif, warna pastel, dekorasi floral.' },
  { id: 'modern', label: 'Modern Minimalis', color: 'bg-[#fd5e4b]', preview: 'Sans-serif, clean lines, bold colors.' },
  { id: 'playful', label: 'Ceria & Warna-warni', color: 'bg-yellow-400', preview: 'Ilustrasi, font unik, penuh energi.' },
  { id: 'vintage', label: 'Vintage Retro', color: 'bg-amber-800', preview: 'Tekstur kertas, font klasik, warna hangat.' },
];

export default function PreferenceStep({ onNext, onBack, initialData }: PreferenceStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#6b1d1d] italic">
          Pilih Nuansa Acara
        </h2>
        <p className="text-[#6b1d1d]/70 max-w-md mx-auto leading-relaxed">
          Ini akan membantu kami menyesuaikan desain undangan dan dasbor Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onNext({ theme: theme.id })}
            className={`relative overflow-hidden text-left p-6 rounded-2xl border-2 transition-all duration-300
              ${initialData.theme === theme.id 
                ? 'border-[#fd5e4b] bg-white shadow-lg' 
                : 'border-[#6b1d1d]/10 bg-white/30 hover:border-[#6b1d1d]/30'
              }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 translate-x-12 -translate-y-12 rounded-full opacity-10 ${theme.color}`} />
            
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-[#6b1d1d]">{theme.label}</h3>
              {initialData.theme === theme.id && (
                <div className="bg-[#fd5e4b] p-1 rounded-full text-white">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
            <p className="text-sm text-[#6b1d1d]/60 leading-snug relative z-10">
              {theme.preview}
            </p>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-4 pt-4">
        <Button 
          onClick={() => onNext({ theme: initialData.theme || 'classic' })}
          disabled={!initialData.theme}
          className="w-full max-w-sm bg-[#6b1d1d] hover:bg-[#831843] text-[#fedbdf] h-12 text-lg font-medium"
        >
          Selesaikan Setup
        </Button>
        <button 
          onClick={onBack}
          className="flex items-center text-[#6b1d1d]/60 hover:text-[#6b1d1d] transition-colors font-medium"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Kembali
        </button>
      </div>
    </motion.div>
  );
}
