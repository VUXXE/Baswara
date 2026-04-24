"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Heart, Briefcase, PartyPopper, Star } from "lucide-react";

interface RoleStepProps {
  onNext: (data: { role: string }) => void;
  onBack: () => void;
  initialData: { role: string };
}

const roles = [
  { id: 'wedding', label: 'Pernikahan', icon: Heart, description: 'Wujudkan pernikahan impian dengan RSVP terorganisir.' },
  { id: 'corporate', label: 'Perusahaan', icon: Briefcase, description: 'Kelola seminar, workshop, atau gathering kantor.' },
  { id: 'private', label: 'Pesta Privat', icon: PartyPopper, description: 'Ulang tahun, arisan, atau perayaan keluarga.' },
  { id: 'other', label: 'Lainnya', icon: Star, description: 'Apapun acaranya, kami siap membantu Anda.' },
];

export default function RoleStep({ onNext, onBack, initialData }: RoleStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#6b1d1d] italic">
          Apa peran Anda?
        </h2>
        <p className="text-[#6b1d1d]/70 max-w-md mx-auto leading-relaxed">
          Pilih kategori yang paling sesuai dengan rencana acara Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onNext({ role: role.id })}
              className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 group
                ${initialData.role === role.id 
                  ? 'border-[#fd5e4b] bg-white shadow-lg scale-[1.02]' 
                  : 'border-[#6b1d1d]/10 bg-white/30 hover:border-[#6b1d1d]/30 hover:bg-white/50'
                }`}
            >
              <div className={`p-3 rounded-xl inline-block mb-4 transition-colors
                ${initialData.role === role.id ? 'bg-[#fd5e4b] text-white' : 'bg-[#6b1d1d]/10 text-[#6b1d1d]'}
              `}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6b1d1d] mb-1">{role.label}</h3>
              <p className="text-sm text-[#6b1d1d]/60 leading-snug">
                {role.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
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
