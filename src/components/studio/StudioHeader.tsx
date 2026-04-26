"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface StudioHeaderProps {
  router: any;
  activeTab: "edit" | "preview";
  setActiveTab: (tab: "edit" | "preview") => void;
  lastSaved: Date | null;
  isSaving: boolean;
  handleSave: () => void;
}

export function StudioHeader({ 
  router, 
  activeTab, 
  setActiveTab, 
  lastSaved, 
  isSaving, 
  handleSave 
}: StudioHeaderProps) {
  return (
    <header className="h-16 border-b px-4 sm:px-8 bg-white flex items-center justify-between sticky top-0 z-[100] shadow-sm">
      <div className="flex items-center gap-3">
        <div onClick={() => router.push('/dashboard')} className="cursor-pointer bg-zinc-50 p-1 sm:p-1.5 rounded-lg border border-zinc-100 sm:bg-transparent sm:p-0 sm:rounded-none sm:border-none">
          <img src="/Main-logo.svg" alt="Baswara" className="h-4 sm:h-6 w-auto" />
        </div>
        <div className="hidden xs:block">
          <h1 className="text-xs sm:text-sm font-bold tracking-tight text-zinc-900 uppercase">Studio</h1>
          <p className="hidden sm:block text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Multi-Event Designer</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex bg-muted p-1 rounded-lg sm:hidden">
          <Button variant={activeTab === "edit" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("edit")} className="h-7 text-[10px] px-2 shadow-none">EDIT</Button>
          <Button variant={activeTab === "preview" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("preview")} className="h-7 text-[10px] px-2 shadow-none">VIEW</Button>
        </div>
        
        <div className="hidden sm:flex gap-2 bg-muted p-1 rounded-lg">
          <Button variant={activeTab === "edit" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("edit")} className="h-7 text-xs shadow-none px-4">Editor</Button>
          <Button variant={activeTab === "preview" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("preview")} className="h-7 text-xs shadow-none px-4">Preview</Button>
        </div>

        <Button onClick={handleSave} disabled={isSaving} size="sm" className="rounded-full px-4 sm:px-6 font-bold text-[10px] sm:text-xs h-8 sm:h-9 shadow-lg shadow-primary/20">
          {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="sm:mr-2 h-3 w-3" />}
          <span className="hidden sm:inline">PUBLISH</span>
        </Button>
      </div>

      {lastSaved && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 sm:mt-0 sm:static sm:translate-x-0 hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}
    </header>
  );
}
