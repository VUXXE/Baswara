"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSelectionStepProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const themes = [
  { id: 'classic', label: 'Classic Elegance', desc: 'Serif fonts and pastel tones.', preview: 'bg-[#faf7f2] border-[#c17a6f]' },
  { id: 'modern', label: 'Modern Minimal', desc: 'Clean lines and bold contrast.', preview: 'bg-white border-zinc-900' },
  { id: 'floral', label: 'Botanical Bloom', desc: 'Nature-inspired decorations.', preview: 'bg-[#f0f4ef] border-[#8fad9e]' },
  { id: 'vintage', label: 'Warm Vintage', desc: 'Retro vibes and warm textures.', preview: 'bg-[#faf3e0] border-[#b89a6a]' },
];

export default function ThemeSelectionStep({ value, onChange, onNext, onBack }: ThemeSelectionStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 flex items-center gap-3">
          Pick a vibe <Sparkles className="text-amber-400 fill-amber-400" size={24} />
        </h2>
        <p className="text-muted-foreground font-medium">Choose a base design style for your invitation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`group p-6 rounded-[2rem] border-2 text-left transition-all duration-300 relative overflow-hidden
              ${value === theme.id 
                ? 'border-[#fd5e4b] bg-white shadow-xl shadow-[#fd5e4b]/10' 
                : 'border-zinc-100 bg-[#fafafa] hover:border-zinc-200'
              }`}
          >
            <div className="flex items-center justify-between mb-4">
               <div className={cn("w-12 h-12 rounded-xl border-4 transition-transform group-hover:rotate-6", theme.preview)} />
               {value === theme.id && <div className="bg-[#fd5e4b] p-1 rounded-full text-white"><Check size={12}/></div>}
            </div>
            <div>
               <h3 className="font-bold text-lg text-zinc-900 leading-tight">{theme.label}</h3>
               <p className="text-xs text-muted-foreground mt-1 font-medium">{theme.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 pt-6">
        <Button 
          onClick={onNext}
          className="w-full bg-zinc-900 hover:bg-[#6b1d1d] text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-zinc-900/10"
        >
          PREVIEW & FINISH
        </Button>
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-zinc-900 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
      </div>
    </motion.div>
  );
}
