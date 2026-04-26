"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Type } from "lucide-react";

interface EventDetailsStepProps {
  data: {
    title: string;
    date: string;
    eventType: string;
  };
  onChange: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function EventDetailsStep({ data, onChange, onNext, onBack }: EventDetailsStepProps) {
  const isWedding = data.eventType === 'wedding';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Event Details</h2>
        <p className="text-muted-foreground font-medium">Give your invitation a name and set the date.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Event Title</Label>
          <div className="relative group">
            <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#fd5e4b] transition-colors" />
            <Input 
              placeholder={isWedding ? "e.g. Adrian & Ariana Wedding" : "e.g. 25th Birthday Bash"}
              className="h-14 pl-12 rounded-2xl bg-[#fafafa] border-2 border-zinc-100 focus-visible:ring-0 focus-visible:border-[#fd5e4b] text-lg font-bold transition-all"
              value={data.title}
              onChange={(e) => onChange({ title: e.target.value })}
              autoFocus
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Main Date</Label>
          <div className="relative group">
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#fd5e4b] transition-colors" />
            <Input 
              type="date"
              className="h-14 pl-12 rounded-2xl bg-[#fafafa] border-2 border-zinc-100 focus-visible:ring-0 focus-visible:border-[#fd5e4b] text-lg font-bold transition-all"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-6">
        <Button 
          onClick={onNext}
          disabled={!data.title || !data.date}
          className="w-full bg-zinc-900 hover:bg-[#6b1d1d] text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-zinc-900/10 disabled:opacity-50"
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
