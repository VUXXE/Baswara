"use client";

import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function NavIcon({ icon, active, onClick, label }: { icon: React.ReactNode, active: boolean, onClick: () => void, label?: string }) {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-full py-2 transition-all relative group",
        active ? "text-primary" : "text-zinc-400 hover:text-zinc-900"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-all",
        active ? "bg-primary/10" : "group-hover:bg-zinc-100"
      )}>
        {icon}
      </div>
      {label && <span className="text-[9px] font-bold uppercase tracking-tighter hidden sm:block">{label}</span>}
      {active && <motion.div layoutId="rail-indicator" className="absolute left-0 w-1 h-8 bg-primary rounded-r-full hidden sm:block" />}
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

export function VisibilityToggle({ label, active, onChange }: { label: string, active: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#fafafa] rounded-2xl border border-zinc-100 group hover:border-zinc-200 transition-all">
       <div className="flex items-center gap-3">
          <div className={cn("p-1.5 rounded-lg transition-colors", active ? "bg-primary/10 text-primary" : "bg-zinc-100 text-zinc-300")}>
            <Check size={12}/>
          </div>
          <span className={cn("text-[11px] font-bold transition-colors", active ? "text-zinc-900" : "text-zinc-400")}>{label}</span>
       </div>
       <button 
         onClick={() => onChange(!active)}
         className={cn(
           "w-10 h-5 rounded-full relative transition-all duration-300 px-1",
           active ? "bg-primary" : "bg-zinc-200"
         )}
       >
          <div className={cn(
            "w-3 h-3 bg-white rounded-full transition-all duration-300 transform",
            active ? "translate-x-5" : "translate-x-0"
          )} />
       </button>
    </div>
  );
}
