"use client";

import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NavIcon({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-2xl transition-all relative ${active ? 'bg-primary text-white shadow-lg scale-110' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900'}`}>
      {icon}
      {active && <motion.div layoutId="nav-glow" className="absolute -inset-1 bg-primary/20 blur-md -z-10 rounded-2xl" />}
    </button>
  );
}

export function SectionTitle({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl font-black text-[#6b1d1d] uppercase tracking-tight">{title}</h2>
      <p className="text-[11px] text-muted-foreground font-medium">{subtitle}</p>
    </div>
  );
}

export function SectionCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" /> {title}
      </h3>
      <div className="grid gap-5">{children}</div>
    </div>
  );
}

export function Field({ label, sublabel, children, value, onChange }: any) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-end px-0.5">
        <Label className="text-[11px] font-bold text-zinc-700">{label}</Label>
        {sublabel && <span className="text-[9px] text-muted-foreground font-medium">{sublabel}</span>}
      </div>
      {children || <Input className="h-9 text-xs border-zinc-200" value={value} onChange={e => onChange?.(e.target.value)} />}
    </div>
  );
}

export function ColorField({ label, sub, value, onChange }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div>
        <Label className="text-[11px] font-bold block mb-0.5 text-zinc-700">{label}</Label>
        <span className="text-[9px] text-muted-foreground">{sub}</span>
      </div>
      <div className="flex gap-2">
         <input type="color" className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent" value={value} onChange={e => onChange(e.target.value)} />
         <Input className="h-8 w-20 text-[10px] font-mono uppercase" value={value} onChange={e => onChange(e.target.value)} />
      </div>
    </div>
  );
}

export function DeviceBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-xl flex items-center gap-2 transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
