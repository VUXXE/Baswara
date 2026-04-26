"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User } from "lucide-react";

interface WelcomeStepProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export default function WelcomeStep({ value, onChange, onNext }: WelcomeStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10"
    >
      <div className="space-y-4">
        <img src="/Main-logo.svg" alt="Baswara" className="h-10 w-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-none">
          Hi, we're <br /><span className="text-[#fd5e4b]">Baswara</span>.
        </h2>
        <p className="text-muted-foreground font-medium text-lg leading-relaxed">
          Let's create something extraordinary together. To start, what should we call you?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Your Name / Organization</Label>
          <div className="relative group">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#fd5e4b] transition-colors" />
            <Input 
              placeholder="Enter your name..."
              className="h-14 pl-12 rounded-2xl bg-[#fafafa] border-2 border-zinc-100 focus-visible:ring-0 focus-visible:border-[#fd5e4b] text-lg font-bold transition-all"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              autoFocus
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={!value.trim()}
          className="w-full bg-zinc-900 hover:bg-[#6b1d1d] text-white h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-zinc-900/10 group disabled:opacity-50"
        >
          START CREATING
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
        </Button>
      </form>
    </motion.div>
  );
}
