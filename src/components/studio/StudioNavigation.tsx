"use client";

import React from "react";
import { 
  Layout as LayoutIcon, Globe, Users, Calendar, ImageIcon, Palette 
} from "lucide-react";
import { NavIcon } from "./UI";

interface StudioNavigationProps {
  editorTab: string;
  setEditorTab: (tab: any) => void;
}

export function StudioNavigation({ editorTab, setEditorTab }: StudioNavigationProps) {
  return (
    <aside className="fixed bottom-0 left-0 right-0 h-16 sm:static sm:h-auto sm:w-20 border-t sm:border-t-0 sm:border-r bg-white flex flex-row sm:flex-col items-center justify-around sm:justify-start py-0 sm:py-8 gap-0 sm:gap-6 z-[90]">
      <NavIcon icon={<LayoutIcon size={20}/>} active={editorTab === "templates"} onClick={() => setEditorTab("templates")} />
      <div className="hidden sm:block h-px w-8 bg-zinc-100 my-2" />
      <NavIcon icon={<Globe size={18}/>} active={editorTab === "general"} onClick={() => setEditorTab("general")} />
      <NavIcon icon={<Users size={18}/>} active={editorTab === "organizers"} onClick={() => setEditorTab("organizers")} />
      <NavIcon icon={<Calendar size={18}/>} active={editorTab === "events"} onClick={() => setEditorTab("events")} />
      <NavIcon icon={<ImageIcon size={18}/>} active={editorTab === "gallery"} onClick={() => setEditorTab("gallery")} />
      <NavIcon icon={<Palette size={18}/>} active={editorTab === "theme"} onClick={() => setEditorTab("theme")} />
    </aside>
  );
}
