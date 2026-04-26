"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Heart, PartyPopper, Briefcase, Calendar, Star } from "lucide-react";
import { EventType } from "@/lib/types";

interface EventTypeStepProps {
  value: EventType;
  onChange: (v: EventType) => void;
  onNext: () => void;
  onBack: () => void;
}

const eventTypes = [
  { id: 'wedding', label: 'Wedding', icon: <Heart size={24}/>, desc: 'Elegance for your big day.' },
  { id: 'birthday', label: 'Birthday', icon: <PartyPopper size={24}/>, desc: 'Celebrate another year.' },
  { id: 'seminar', label: 'Seminar', icon: <Briefcase size={24}/>, desc: 'Professional gatherings.' },
  { id: 'party', label: 'Other Party', icon: <Star size={24}/>, desc: 'Private or public events.' },
];

export default function EventTypeStep({ value, onChange, onNext, onBack }: EventTypeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">What's the occasion?</h2>
        <p className="text-muted-foreground font-medium">Select the type of event you're organizing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id as EventType)}
            className={`flex items-start gap-4 p-6 rounded-[2rem] border-2 text-left transition-all duration-300 group
              ${value === type.id 
                ? 'border-[#fd5e4b] bg-white shadow-xl shadow-[#fd5e4b]/10' 
                : 'border-zinc-100 bg-[#fafafa] hover:border-zinc-200'
              }`}
          >
            <div className={`p-3 rounded-2xl transition-colors ${value === type.id ? 'bg-[#fd5e4b] text-white' : 'bg-white text-zinc-400 group-hover:text-zinc-600 shadow-sm'}`}>
              {type.icon}
            </div>
            <div className="flex-1 pt-1">
               <h3 className="font-bold text-lg text-zinc-900 leading-tight">{type.label}</h3>
               <p className="text-xs text-muted-foreground mt-1 font-medium">{type.desc}</p>
            </div>
            {value === type.id && (
              <div className="bg-[#fd5e4b] p-1 rounded-full text-white mt-1">
                <Check className="w-3 h-3" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 pt-6">
        <Button 
          onClick={onNext}
          className="w-full bg-zinc-900 hover:bg-[#6b1d1d] text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-zinc-900/10"
        >
          CONTINUE
        </Button>
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-zinc-900 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
      </div>
    </motion.div>
  );
}
