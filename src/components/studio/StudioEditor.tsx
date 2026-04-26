"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Check, Layout as LayoutIcon } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { TEMPLATES } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { SectionTitle, SectionCard, Field, ColorField } from "./UI";

interface StudioEditorProps {
  editorTab: string;
  data: any;
  slug: string;
  setSlug: (slug: string) => void;
  updateData: (path: string, value: any) => void;
  applyTemplate: (id: string) => void;
  addItem: (path: string, item: any) => void;
  removeItem: (path: string, index: number) => void;
  updateListItem: (path: string, index: number, value: any) => void;
}

export function StudioEditor({
  editorTab,
  data,
  slug,
  setSlug,
  updateData,
  applyTemplate,
  addItem,
  removeItem,
  updateListItem
}: StudioEditorProps) {
  return (
    <aside className="w-full md:w-[450px] border-r overflow-y-auto px-6 sm:px-8 py-8 sm:py-10 scrollbar-hide bg-white z-10">
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
                {(data.organizers || []).map((person: any, idx: number) => (
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
                {data.events.map((event: any, idx: number) => (
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
                {(data.gallery || []).map((img: string, idx: number) => (
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
  );
}
