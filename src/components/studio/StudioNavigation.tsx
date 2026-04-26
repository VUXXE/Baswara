"use client";

import React from "react";
import { 
  Layout as LayoutIcon, Globe, Users, Calendar, ImageIcon, Palette, Layers, BookOpen, Music, Gift 
} from "lucide-react";
import { NavIcon } from "./UI";

interface StudioNavigationProps {
  editorTab: string;
  setEditorTab: (tab: any) => void;
}

export function StudioNavigation({ editorTab, setEditorTab }: StudioNavigationProps) {
  return (
    <aside className="fixed bottom-0 left-0 right-0 h-16 sm:static sm:h-auto sm:w-[72px] border-t sm:border-t-0 sm:border-r bg-white flex flex-row sm:flex-col items-center justify-around sm:justify-start py-0 sm:py-6 gap-0 sm:gap-2 z-[90] overflow-x-auto sm:overflow-x-hidden scrollbar-hide">
      <NavIcon icon={<LayoutIcon size={20}/>} label="Design" active={editorTab === "templates"} onClick={() => setEditorTab("templates")} />
      <NavIcon icon={<Layers size={20}/>} label="Layout" active={editorTab === "layout"} onClick={() => setEditorTab("layout")} />
      <div className="hidden sm:block h-px w-8 bg-zinc-100 my-2" />

      <NavIcon icon={<Globe size={18}/>} label="General" active={editorTab === "general"} onClick={() => setEditorTab("general")} />
      <NavIcon icon={<Users size={18}/>} label="Hosts" active={editorTab === "organizers"} onClick={() => setEditorTab("organizers")} />
      <NavIcon icon={<Calendar size={18}/>} label="Events" active={editorTab === "events"} onClick={() => setEditorTab("events")} />
      <NavIcon icon={<BookOpen size={18}/>} label="Story" active={editorTab === "story"} onClick={() => setEditorTab("story")} />
      <NavIcon icon={<Palette size={18}/>} label="Style" active={editorTab === "dresscode"} onClick={() => setEditorTab("dresscode")} />
      <NavIcon icon={<ImageIcon size={18}/>} label="Gallery" active={editorTab === "gallery"} onClick={() => setEditorTab("gallery")} />
      <NavIcon icon={<Music size={18}/>} label="Music" active={editorTab === "music"} onClick={() => setEditorTab("music")} />
      <NavIcon icon={<Gift size={18}/>} label="Gift" active={editorTab === "gift"} onClick={() => setEditorTab("gift")} />
      <NavIcon icon={<Palette size={18}/>} label="Theme" active={editorTab === "theme"} onClick={() => setEditorTab("theme")} />
    </aside>
  );
}
