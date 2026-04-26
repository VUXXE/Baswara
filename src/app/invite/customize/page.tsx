"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import EventInvitationClient, { DEFAULT_EVENT_DATA } from "../[id]/EventInvitationClient";
import { EventInvitationData, EventType } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Loader2, Plus, Trash2, Image as ImageIcon, Heart, Calendar, 
  BookOpen, Gift, Palette, Settings, ChevronRight, Save, Globe,
  Layout as LayoutIcon, Type, Music, X, MapPin, Clock, Banknote, Monitor, Tablet, Smartphone, RotateCcw, Check, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type EditorTab = "templates" | "general" | "organizers" | "events" | "gallery" | "story" | "gift" | "theme";
type Device = "mobile" | "tablet" | "desktop";
type Orientation = "portrait" | "landscape";

function EditorContent() {
  const [data, setData] = useState<EventInvitationData>(DEFAULT_EVENT_DATA);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [editorTab, setEditorTab] = useState<EditorTab>("templates");
  const [device, setDevice] = useState<Device>("mobile");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [scale, setScale] = useState(1);
  const [slug, setSlug] = useState("my-event");
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
      const availableHeight = container.clientHeight - (padding + 64);
      
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device, orientation]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      if (editId) {
        const { data: invite, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('id', editId)
          .single();
        
        if (invite && !error) {
          setData(invite.data);
          setSlug(invite.slug);
        }
      }
    };
    checkAuthAndFetch();
  }, [router, editId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("You must be logged in.");

      const { error } = await supabase
        .from('invitations')
        .upsert({
          ...(editId ? { id: editId } : {}),
          slug: slug,
          user_id: session.user.id,
          event_type: data.eventType,
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

  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    setData(prev => ({
      ...prev,
      templateId: templateId,
      theme: { ...prev.theme, ...template.defaultData.theme }
    }));
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
    <div className="flex flex-col h-screen bg-[#fafafa] font-sans selection:bg-primary/10 text-zinc-900">
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
      </header>

      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden relative">
        <aside className="fixed bottom-0 left-0 right-0 h-16 sm:static sm:h-auto sm:w-20 border-t sm:border-t-0 sm:border-r bg-white flex flex-row sm:flex-col items-center justify-around sm:justify-start py-0 sm:py-8 gap-0 sm:gap-6 z-[90]">
          <NavIcon icon={<LayoutIcon size={20}/>} active={editorTab === "templates"} onClick={() => setEditorTab("templates")} />
          <div className="hidden sm:block h-px w-8 bg-zinc-100 my-2" />
          <NavIcon icon={<Globe size={18}/>} active={editorTab === "general"} onClick={() => setEditorTab("general")} />
          <NavIcon icon={<Users size={18}/>} active={editorTab === "organizers"} onClick={() => setEditorTab("organizers")} />
          <NavIcon icon={<Calendar size={18}/>} active={editorTab === "events"} onClick={() => setEditorTab("events")} />
          <NavIcon icon={<ImageIcon size={18}/>} active={editorTab === "gallery"} onClick={() => setEditorTab("gallery")} />
          <NavIcon icon={<Palette size={18}/>} active={editorTab === "theme"} onClick={() => setEditorTab("theme")} />
        </aside>

        <div className="flex-1 flex overflow-hidden pb-16 sm:pb-0">
          <aside className={`${activeTab === "edit" ? "flex" : "hidden"} md:flex w-full md:w-[450px] border-r overflow-y-auto px-6 sm:px-8 py-8 sm:py-10 scrollbar-hide bg-white z-10`}>
            <AnimatePresence mode="wait">
              <motion.div key={editorTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="space-y-10 w-full pb-10">
                
                {editorTab === "templates" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <SectionTitle title="Choose Template" subtitle="Select a design foundation for your invitation." />
                    <div className="grid gap-4">
                       {TEMPLATES.map(tpl => (
                         <button 
                           key={tpl.id} 
                           onClick={() => applyTemplate(tpl.id)}
                           className={cn(
                             "group text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden",
                             data.templateId === tpl.id ? "border-primary bg-primary/5 shadow-md" : "border-zinc-100 hover:border-zinc-200 bg-white"
                           )}
                         >
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-sm uppercase tracking-tight">{tpl.name}</h4>
                             {data.templateId === tpl.id && <div className="bg-primary text-white p-1 rounded-full"><Check size={10}/></div>}
                           </div>
                           <p className="text-[10px] text-muted-foreground leading-relaxed pr-8">{tpl.description}</p>
                           <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-zinc-100 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center text-zinc-300">
                              <LayoutIcon size={24} />
                           </div>
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {editorTab === "general" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <SectionTitle title="General Settings" subtitle="Setup your invitation identity and link." />
                    <SectionCard title="Event Identity">
                      <Field label="URL Slug" sublabel="Your unique web link">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">baswara.com/</span>
                          <Input className="h-8 text-xs font-mono" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                        </div>
                      </Field>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-bold text-zinc-700">Event Type</Label>
                        <select 
                          className="w-full h-9 text-xs rounded-xl border border-zinc-200 bg-white px-3 outline-none focus:ring-1 focus:ring-primary"
                          value={data.eventType}
                          onChange={(e) => updateData('eventType', e.target.value)}
                        >
                          <option value="wedding">Wedding</option>
                          <option value="birthday">Birthday</option>
                          <option value="seminar">Seminar/Workshop</option>
                          <option value="party">Party</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <Field label="Hashtag" value={data.hashtag} onChange={(v: string) => updateData('hashtag', v)} />
                      <Field label="Main Title" value={data.title} onChange={(v: string) => updateData('title', v)} />
                      <Field label="Sub Title" value={data.subTitle} onChange={(v: string) => updateData('subTitle', v)} />
                      <Field label="Opening Greeting" value={data.greeting} onChange={(v: string) => updateData('greeting', v)} />
                    </SectionCard>
                  </div>
                )}

                {editorTab === "organizers" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex justify-between items-center">
                      <SectionTitle title="Organizers / Hosts" subtitle="Manage the people hosting the event." />
                      <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold rounded-xl" onClick={() => addItem('organizers', { name: "New Person", fullName: "", role: "Host" })}>
                        <Plus size={12} className="mr-1" /> ADD HOST
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {(data.organizers || []).map((person, idx) => (
                        <SectionCard key={idx} title={person.name || `Host ${idx + 1}`}>
                          <div className="flex flex-col gap-4">
                            <Field label="Display Name" value={person.name} onChange={(v: string) => updateListItem('organizers', idx, { ...person, name: v })} />
                            <Field label="Full Name" value={person.fullName} onChange={(v: string) => updateListItem('organizers', idx, { ...person, fullName: v })} />
                            <Field label="Role" sublabel="e.g. Groom, Birthday Girl" value={person.role} onChange={(v: string) => updateListItem('organizers', idx, { ...person, role: v })} />
                            <Field label="Sub Text" sublabel="e.g. Parents info" value={person.subText} onChange={(v: string) => updateListItem('organizers', idx, { ...person, subText: v })} />
                            <ImageUpload value={person.photo} onUpload={url => updateListItem('organizers', idx, { ...person, photo: url })} />
                            <Button variant="ghost" size="sm" className="self-end text-red-500 h-8 text-[10px] font-bold" onClick={() => removeItem('organizers', idx)}>
                              <Trash2 size={12} className="mr-1" /> REMOVE
                            </Button>
                          </div>
                        </SectionCard>
                      ))}
                    </div>
                  </div>
                )}

                {editorTab === "events" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex justify-between items-center">
                      <SectionTitle title="Event Schedule" subtitle="Manage dates and locations." />
                      <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold rounded-xl" onClick={() => addItem('events', {
                        name: "New Event",
                        date: "Saturday, 14 June 2026",
                        time: "08:00 – 10:00 WIB",
                        location: "Venue Name",
                        address: "Street Address",
                        mapsUrl: "https://maps.google.com",
                        googleMapsEmbedUrl: ""
                      })}>
                        <Plus size={12} className="mr-1" /> ADD EVENT
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {data.events.map((event, idx) => (
                        <SectionCard key={idx} title={event.name || `Event ${idx + 1}`}>
                          <div className="flex flex-col gap-4">
                            <Field label="Event Name" value={event.name} onChange={(v: string) => updateListItem('events', idx, { ...event, name: v })} />
                            <div className="grid grid-cols-2 gap-4">
                              <Field label="Date" value={event.date} onChange={(v: string) => updateListItem('events', idx, { ...event, date: v })} />
                              <Field label="Time" value={event.time} onChange={(v: string) => updateListItem('events', idx, { ...event, time: v })} />
                            </div>
                            <Field label="Location Name" value={event.location} onChange={(v: string) => updateListItem('events', idx, { ...event, location: v })} />
                            <Field label="Full Address" value={event.address} onChange={(v: string) => updateListItem('events', idx, { ...event, address: v })} />
                            <Field label="Google Maps Link" value={event.mapsUrl} onChange={(v: string) => updateListItem('events', idx, { ...event, mapsUrl: v })} />
                            <Field label="Map Embed URL (src)" sublabel="From Google Maps iframe src" value={event.googleMapsEmbedUrl} onChange={(v: string) => updateListItem('events', idx, { ...event, googleMapsEmbedUrl: v })} />
                            
                            <Button variant="ghost" size="sm" className="self-end text-red-500 hover:text-red-600 hover:bg-red-50 h-8 text-[10px] font-bold" onClick={() => removeItem('events', idx)}>
                              <Trash2 size={12} className="mr-1" /> REMOVE EVENT
                            </Button>
                          </div>
                        </SectionCard>
                      ))}
                    </div>
                  </div>
                )}

                {editorTab === "gallery" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <SectionTitle title="Photo Gallery" subtitle="Upload your event photos." />
                    
                    <div className="grid grid-cols-2 gap-4">
                      {(data.gallery || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-zinc-100 group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => removeItem('gallery', idx)}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      <div className="aspect-square">
                        <ImageUpload onUpload={(url) => addItem('gallery', url)} />
                      </div>
                    </div>
                  </div>
                )}

                {editorTab === "theme" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <SectionTitle title="Visual Theme" subtitle="Personalize colors and typography live." />
                    <SectionCard title="Color Palette">
                      <div className="grid grid-cols-1 gap-6">
                        <ColorField label="Primary" sub="Main dominant color" value={data.theme.primaryColor} onChange={(v: string) => updateData('theme.primaryColor', v)} />
                        <ColorField label="Secondary" sub="Accent color" value={data.theme.secondaryColor} onChange={(v: string) => updateData('theme.secondaryColor', v)} />
                        <div className="h-px bg-border my-2" />
                        <ColorField label="Background" sub="Page surface" value={data.theme.backgroundColor} onChange={(v: string) => updateData('theme.backgroundColor', v)} />
                        <ColorField label="Text Color" sub="Body and titles" value={data.theme.textColor} onChange={(v: string) => updateData('theme.textColor', v)} />
                      </div>
                    </SectionCard>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>

          {/* REAL-TIME PREVIEW HUB */}
          <main className={`${activeTab === "preview" ? "flex" : "hidden"} sm:flex flex-1 bg-[#1a1a1a] relative flex-col overflow-hidden`} ref={containerRef}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="h-16 flex items-center justify-center border-b border-white/10 bg-white/5 backdrop-blur-xl z-50">
               <div className="flex gap-2 p-1 bg-black/20 rounded-2xl border border-white/5">
                  <DeviceBtn active={device === "desktop"} onClick={() => {setDevice("desktop"); setOrientation("landscape")}} icon={<Monitor size={14}/>} label="Desktop" />
                  <DeviceBtn active={device === "tablet"} onClick={() => setDevice("tablet")} icon={<Tablet size={14}/>} label="Tablet" />
                  <DeviceBtn active={device === "mobile"} onClick={() => setDevice("mobile")} icon={<Smartphone size={14}/>} label="Mobile" />
               </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
               <motion.div animate={{ scale }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="relative origin-center">
                 <div 
                   className="bg-[#000] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative transition-all duration-500 border-[12px] border-[#222]"
                   style={{ width: `${deviceWidth}px`, height: `${deviceHeight}px`, borderRadius: device === "desktop" ? "0" : "3.5rem" }}
                 >
                   <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
                     <EventInvitationClient 
                       id="preview" 
                       initialData={data} 
                       forceOpen={true} 
                       viewMode={device}
                       orientation={orientation}
                     />
                   </div>
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
    <button onClick={onClick} className={`p-3 rounded-2xl transition-all relative ${active ? 'bg-primary text-white shadow-lg scale-110' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900'}`}>
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
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" /> {title}
      </h3>
      <div className="grid gap-5">{children}</div>
    </div>
  );
}

function Field({ label, sublabel, children, value, onChange }: any) {
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

function ColorField({ label, sub, value, onChange }: any) {
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

function DeviceBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-xl flex items-center gap-2 transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
