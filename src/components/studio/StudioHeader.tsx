"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Save, ArrowLeft, CheckCircle2, Globe, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StudioHeaderProps {
  router: any;
  slug: string;
  activeTab: "edit" | "preview";
  setActiveTab: (tab: "edit" | "preview") => void;
  lastSaved: Date | null;
  isSaving: boolean;
  handleSave: () => void;
}

export function StudioHeader({ 
  router, 
  slug,
  activeTab, 
  setActiveTab, 
  lastSaved, 
  isSaving, 
  handleSave 
}: StudioHeaderProps) {
  return (
    <header className="h-[64px] border-b bg-white flex items-center justify-between sticky top-0 z-[100] px-4 sm:px-6">
      {/* Left: Branding & Back */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push('/dashboard')} 
          className="p-2 hover:bg-zinc-50 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900"
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="h-6 w-px bg-zinc-100 hidden xs:block" />
        <div className="flex items-center gap-3">
          <img src="/Main-logo.svg" alt="Baswara" className="h-5 sm:h-6 w-auto" />
          <div className="hidden md:flex flex-col -gap-1">
            <h1 className="text-[11px] font-black tracking-[0.2em] text-zinc-900 uppercase leading-tight">Studio</h1>
            <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest leading-tight">Professional Designer</p>
          </div>
        </div>
        
        <Link href={`/${slug}`} target="_blank" className="hidden lg:flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 rounded-lg text-zinc-400 hover:text-primary transition-all group">
           <Globe size={14} className="group-hover:animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest">View Live</span>
        </Link>
      </div>

      {/* Middle: Save Status (Floating Effect) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
        {lastSaved ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50/50 rounded-full border border-emerald-100/50">
             <CheckCircle2 size={12} className="text-emerald-500" />
             <span className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">
               Autosaved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-full border border-zinc-100">
             <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
             <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Initial Draft</span>
          </div>
        )}
      </div>

      {/* Right: Controls & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Toggle (Editor/Preview) */}
        <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200/50">
          <button 
            onClick={() => setActiveTab("edit")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === "edit" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            Editor
          </button>
          <button 
            onClick={() => setActiveTab("preview")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === "preview" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            Preview
          </button>
        </div>

        <div className="h-6 w-px bg-zinc-100 hidden xs:block" />

        <Button 
          onClick={handleSave} 
          disabled={isSaving} 
          size="sm" 
          className="rounded-xl px-5 sm:px-8 bg-zinc-900 hover:bg-primary text-white font-black text-[10px] tracking-widest h-10 shadow-xl shadow-zinc-900/10 active:scale-95 transition-all"
        >
          {isSaving ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Save className="h-3 w-3 mr-2" />}
          PUBLISH
        </Button>
      </div>
    </header>
  );
}
