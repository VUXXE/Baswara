"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import WeddingInviteClient, { DEFAULT_WEDDING_DATA } from "../[id]/WeddingInviteClient";
import { WeddingData } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Loader2, Plus, Trash2, Image as ImageIcon, Heart, Calendar, 
  BookOpen, Gift, Palette, Settings, ChevronRight, Save, Globe,
  Layout, Type, Music, X, MapPin, Clock, Banknote, Monitor, Tablet, Smartphone, RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type EditorTab = "general" | "couple" | "events" | "gallery" | "story" | "gift" | "theme";
type Device = "mobile" | "tablet" | "desktop";
type Orientation = "portrait" | "landscape";

function EditorContent() {
  const [data, setData] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [editorTab, setEditorTab] = useState<EditorTab>("general");
  const [device, setDevice] = useState<Device>("mobile");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [scale, setScale] = useState(1);
  const [slug, setSlug] = useState("my-wedding");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  // Handle scaling to fit viewport
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const padding = 80;
      const availableWidth = container.clientWidth - padding;
      const availableHeight = container.clientHeight - (padding + 64); // Account for toolbar
      
      let targetWidth = device === "mobile" ? (orientation === "portrait" ? 375 : 812) : 
                        device === "tablet" ? (orientation === "portrait" ? 768 : 1024) : 1280;
      let targetHeight = device === "mobile" ? (orientation === "portrait" ? 812 : 375) : 
                         device === "tablet" ? (orientation === "portrait" ? 1024 : 768) : 800;

      const scaleX = availableWidth / targetWidth;
      const scaleY = availableHeight / targetHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    handleResize();
    const timeout = setTimeout(handleResize, 100); // Delayed check for better accuracy
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [device, orientation]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      if (editId) {
        const { data: wedding, error } = await supabase
          .from('weddings')
          .select('*')
          .eq('id', editId)
          .single();
        
        if (wedding && !error) {
          setData(wedding.data);
          setSlug(wedding.slug);
        }
      }
    };
    checkAuthAndFetch();
  }, [router, editId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error("You must be logged in to save an invitation.");
      }

      const { error } = await supabase
        .from('weddings')
        .upsert({
          ...(editId ? { id: editId } : {}),
          slug: slug,
          user_id: session.user.id,
          hashtag: data.hashtag,
          data: data,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'slug' });

      if (error) throw error;
      setLastSaved(new Date());
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateData = (path: string, value: any) => {
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current: any = newData;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  const addItem = (path: string, newItem: any) => {
    const currentList = getNestedValue(data, path) || [];
    updateData(path, [...currentList, newItem]);
  };

  const removeItem = (path: string, index: number) => {
    const currentList = getNestedValue(data, path) || [];
    updateData(path, currentList.filter((_: any, i: number) => i !== index));
  };

  const updateListItem = (path: string, index: number, value: any) => {
    const currentList = [...(getNestedValue(data, path) || [])];
    currentList[index] = value;
    updateData(path, currentList);
  };

  function getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
  }

  const deviceWidth = device === "mobile" ? (orientation === "portrait" ? 375 : 812) : 
                     device === "tablet" ? (orientation === "portrait" ? 768 : 1024) : 1280;
  const deviceHeight = device === "mobile" ? (orientation === "portrait" ? 812 : 375) : 
                      device === "tablet" ? (orientation === "portrait" ? 1024 : 768) : 800;

  return (
    <div className="flex flex-col h-screen bg-[#fafafa] font-sans selection:bg-primary/10">
      <header className="h-16 border-b px-8 bg-white flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-xl" onClick={() => router.push('/dashboard')} style={{cursor: 'pointer'}}>
            <Heart className="text-primary fill-primary" size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-[#6b1d1d]">Baswara Studio</h1>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Professional Invitation Editor</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {lastSaved && (
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              Tersimpan {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <div className="h-8 w-[1px] bg-border mx-2" />
          <div className="flex gap-2 bg-muted p-1 rounded-lg">
            <Button variant={activeTab === "edit" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("edit")} className="h-7 text-xs shadow-none">Editor</Button>
            <Button variant={activeTab === "preview" ? "secondary" : "ghost"} size="sm" onClick={() => setActiveTab("preview")} className="h-7 text-xs shadow-none">Preview</Button>
          </div>
          <Button onClick={handleSave} disabled={isSaving} size="sm" className="rounded-full px-6 font-bold text-xs h-9 shadow-lg shadow-primary/20">
            {isSaving ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Save className="mr-2 h-3 w-3" />}
            PUBLISH
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-20 border-r bg-white flex flex-col items-center py-8 gap-8">
          <NavIcon icon={<Globe size={20}/>} active={editorTab === "general"} onClick={() => setEditorTab("general")} />
          <NavIcon icon={<Heart size={20}/>} active={editorTab === "couple"} onClick={() => setEditorTab("couple")} />
          <NavIcon icon={<Calendar size={20}/>} active={editorTab === "events"} onClick={() => setEditorTab("events")} />
          <NavIcon icon={<ImageIcon size={20}/>} active={editorTab === "gallery"} onClick={() => setEditorTab("gallery")} />
          <NavIcon icon={<BookOpen size={20}/>} active={editorTab === "story"} onClick={() => setEditorTab("story")} />
          <NavIcon icon={<Gift size={20}/>} active={editorTab === "gift"} onClick={() => setEditorTab("gift")} />
          <NavIcon icon={<Palette size={20}/>} active={editorTab === "theme"} onClick={() => setEditorTab("theme")} />
        </aside>

        <div className={`${activeTab === "edit" ? "flex" : "hidden"} md:flex flex-1 overflow-hidden bg-white`}>
          <aside className="w-[450px] border-r overflow-y-auto px-8 py-10 scrollbar-hide">
            <AnimatePresence mode="wait">
              <motion.div key={editorTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="space-y-10">
                {editorTab === "general" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <SectionTitle title="General Settings" subtitle="Setup your invitation identity and link." />
                    <SectionCard title="Identity">
                      <Field label="URL Slug" sublabel="Your unique web link">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">baswara.com/</span>
                          <Input className="h-8 text-xs font-mono" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                        </div>
                      </Field>
                      <Field label="Hashtag" value={data.hashtag} onChange={v => updateData('hashtag', v)} />
                      <Field label="Opening Greeting" value={data.greeting} onChange={v => updateData('greeting', v)} />
                    </SectionCard>
                  </div>
                )}

                {editorTab === "couple" && (
                  <div className="space-y-8">
                    <SectionTitle title="Mempelai" subtitle="Profile data for the bride and groom." />
                    <SectionCard title="Groom">
                       <Field label="Nick Name" value={data.couple.groom.name} onChange={v => updateData('couple.groom.name', v)} />
                       <ImageUpload value={data.couple.groom.photo} onUpload={url => updateData('couple.groom.photo', url)} />
                    </SectionCard>
                    <SectionCard title="Bride">
                       <Field label="Nick Name" value={data.couple.bride.name} onChange={v => updateData('couple.bride.name', v)} />
                       <ImageUpload value={data.couple.bride.photo} onUpload={url => updateData('couple.bride.photo', url)} />
                    </SectionCard>
                  </div>
                )}

                {editorTab === "events" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex justify-between items-end">
                      <SectionTitle title="Rangkaian Acara" subtitle="Manage your wedding event schedule." />
                      <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase tracking-wider" onClick={() => addItem('events', { name: "New Event", date: "Sabtu, 14 Juni 2026", time: "10:00 - Selesai", location: "Venue Name", address: "Full Address", mapsUrl: "" })}>
                        <Plus size={14} className="mr-1" /> Add Event
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {data.events.map((ev, i) => (
                        <Card key={i} className="group relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                          <CardHeader className="py-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-bold uppercase tracking-tight">{ev.name}</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => removeItem('events', i)} className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"><Trash2 size={14}/></Button>
                          </CardHeader>
                          <CardContent className="grid gap-4 pb-6">
                            <Field label="Event Name" value={ev.name} onChange={v => updateListItem('events', i, { ...ev, name: v })} />
                            <Field label="Venue" value={ev.location} onChange={v => updateListItem('events', i, { ...ev, location: v })} />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {editorTab === "theme" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <SectionTitle title="Visual Theme" subtitle="Personalize colors and typography live." />
                    <SectionCard title="Color Palette">
                      <div className="grid grid-cols-1 gap-6">
                        <ColorField label="Primary" sub="Main dominant color" value={data.theme.primaryColor} onChange={v => updateData('theme.primaryColor', v)} />
                        <ColorField label="Secondary" sub="Accent color" value={data.theme.secondaryColor} onChange={v => updateData('theme.secondaryColor', v)} />
                        <ColorField label="Tertiary" sub="Detail color" value={data.theme.tertiaryColor} onChange={v => updateData('theme.tertiaryColor', v)} />
                        <div className="h-px bg-border my-2" />
                        <ColorField label="Background" sub="Page surface" value={data.theme.backgroundColor} onChange={v => updateData('theme.backgroundColor', v)} />
                        <ColorField label="Text Color" sub="Body and titles" value={data.theme.textColor} onChange={v => updateData('theme.textColor', v)} />
                      </div>
                    </SectionCard>
                    <SectionCard title="Heading Typography">
                      <Field label="Font Family" value={data.theme.fontHeading.family} onChange={v => updateData('theme.fontHeading.family', v)} />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Font Size" value={data.theme.fontHeading.size} onChange={v => updateData('theme.fontHeading.size', v)} />
                        <Field label="Weight" value={data.theme.fontHeading.weight} onChange={v => updateData('theme.fontHeading.weight', v)} />
                      </div>
                    </SectionCard>
                  </div>
                )}
                
                {/* Fallback for basic view on other tabs */}
                {(editorTab === "gallery" || editorTab === "story" || editorTab === "gift") && (
                   <div className="p-12 text-center bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                      <Settings className="mx-auto text-muted-foreground mb-4 opacity-50" size={32} />
                      <p className="text-xs font-medium text-muted-foreground mb-4">Advance Editing for {editorTab} is available.</p>
                      <Button variant="outline" size="sm" onClick={() => setEditorTab("general")} className="text-[10px] h-7">Back to Dashboard</Button>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>

          {/* REAL-TIME PREVIEW HUB */}
          <main className="flex-1 bg-[#1a1a1a] relative flex flex-col overflow-hidden" ref={containerRef}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            {/* Device Toolbar */}
            <div className="h-16 flex items-center justify-center border-b border-white/10 bg-white/5 backdrop-blur-xl z-50">
               <div className="flex gap-2 p-1 bg-black/20 rounded-2xl border border-white/5">
                  <DeviceBtn active={device === "desktop"} onClick={() => {setDevice("desktop"); setOrientation("landscape")}} icon={<Monitor size={14}/>} label="Desktop" />
                  <DeviceBtn active={device === "tablet"} onClick={() => setDevice("tablet")} icon={<Tablet size={14}/>} label="Tablet" />
                  <DeviceBtn active={device === "mobile"} onClick={() => setDevice("mobile")} icon={<Smartphone size={14}/>} label="Mobile" />
                  <div className="w-px bg-white/10 mx-1" />
                  <button 
                    onClick={() => setOrientation(o => o === "portrait" ? "landscape" : "portrait")} 
                    disabled={device === "desktop"}
                    className={cn(
                      "p-2 rounded-xl transition-all",
                      device === "desktop" ? "opacity-20 cursor-not-allowed" : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <RotateCcw size={14} className={cn("transition-transform duration-500", orientation === "landscape" ? "rotate-90" : "")} />
                  </button>
               </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
               <motion.div animate={{ scale }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="relative origin-center">
                 <div 
                   className="bg-[#000] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative transition-all duration-500 border-[12px] border-[#222]"
                   style={{ width: `${deviceWidth}px`, height: `${deviceHeight}px`, borderRadius: device === "desktop" ? "0" : "3.5rem" }}
                 >
                   <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
                     <WeddingInviteClient id="preview" initialData={data} forceOpen={true} />
                   </div>
                 </div>
                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] whitespace-nowrap">
                    {device.toUpperCase()} View — {Math.round(scale * 100)}% ZOOM
                 </div>
               </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#fafafa]"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <EditorContent />
    </Suspense>
  );
}

function NavIcon({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-2xl transition-all relative ${active ? 'bg-primary text-white shadow-lg scale-110' : 'text-muted-foreground hover:bg-muted'}`}>
      {icon}
      {active && <motion.div layoutId="nav-glow" className="absolute -inset-1 bg-primary/20 blur-md -z-10 rounded-2xl" />}
    </button>
  );
}

function SectionTitle({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl font-black text-[#6b1d1d] uppercase tracking-tight">{title}</h2>
      <p className="text-[11px] text-muted-foreground font-medium">{subtitle}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" /> {title}
      </h3>
      <div className="grid gap-5">{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  sublabel?: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (v: string) => void;
}

function Field({ label, sublabel, children, value, onChange }: FieldProps) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-end px-0.5">
        <Label className="text-[11px] font-bold">{label}</Label>
        {sublabel && <span className="text-[9px] text-muted-foreground font-medium">{sublabel}</span>}
      </div>
      {children || <Input className="h-9 text-xs border-zinc-200" value={value} onChange={e => onChange?.(e.target.value)} />}
    </div>
  );
}

function ColorField({ label, sub, value, onChange }: { label: string, sub: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between group">
      <div>
        <Label className="text-[11px] font-bold block mb-0.5">{label}</Label>
        <span className="text-[9px] text-muted-foreground">{sub}</span>
      </div>
      <div className="flex gap-2">
         <input type="color" className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent" value={value} onChange={e => onChange(e.target.value)} />
         <Input className="h-8 w-20 text-[10px] font-mono uppercase" value={value} onChange={e => onChange(e.target.value)} />
      </div>
    </div>
  );
}

function DeviceBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-xl flex items-center gap-2 transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
