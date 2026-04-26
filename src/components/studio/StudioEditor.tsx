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
import { SectionTitle, SectionCard, Field, ColorField, VisibilityToggle } from "./UI";

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
    <aside className="w-full sm:w-[400px] md:w-[450px] border-r overflow-y-auto px-6 sm:px-8 py-8 sm:py-10 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent bg-white z-10">
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

          {editorTab === "layout" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
              <SectionTitle title="Page Layout" subtitle="Show or hide sections of your invitation." />
              <SectionCard title="Section Visibility">
                <div className="space-y-2">
                  <VisibilityToggle label="Organizers / Hosts" active={data.layout?.showOrganizers} onChange={v => updateData('layout.showOrganizers', v)} />
                  <VisibilityToggle label="Countdown Timer" active={data.layout?.showCountdown} onChange={v => updateData('layout.showCountdown', v)} />
                  <VisibilityToggle label="Event Schedule" active={data.layout?.showEvents} onChange={v => updateData('layout.showEvents', v)} />
                  <VisibilityToggle label="Dress Code" active={data.layout?.showDresscode} onChange={v => updateData('layout.showDresscode', v)} />
                  <VisibilityToggle label="Photo Gallery" active={data.layout?.showGallery} onChange={v => updateData('layout.showGallery', v)} />
                  <VisibilityToggle label="Love Story" active={data.layout?.showStory} onChange={v => updateData('layout.showStory', v)} />
                  <VisibilityToggle label="Gift Registry" active={data.layout?.showGift} onChange={v => updateData('layout.showGift', v)} />
                  <VisibilityToggle label="RSVP Form" active={data.layout?.showRSVP} onChange={v => updateData('layout.showRSVP', v)} />
                </div>
              </SectionCard>
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

              <SectionCard title="Visual Assets">
                 <div className="space-y-4">
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Hero Image</Label>
                      <ImageUpload value={data.heroImage} onUpload={url => updateData('heroImage', url)} />
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Side Cover (Left Panel)</Label>
                      <ImageUpload value={data.sideImage} onUpload={url => updateData('sideImage', url)} />
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Envelope Background</Label>
                      <ImageUpload value={data.envelopeImage} onUpload={url => updateData('envelopeImage', url)} />
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Global Background</Label>
                      <ImageUpload value={data.backgroundImage} onUpload={url => updateData('backgroundImage', url)} />
                    </div>
                 </div>
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
                <SectionTitle 
                  title={data.eventType === 'wedding' ? "Event Schedule" : data.eventType === 'seminar' ? "Session Agenda" : "Event Info"} 
                  subtitle="Manage dates and locations." 
                />
                <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold rounded-xl" onClick={() => addItem('events', {
                  name: "New Event",
                  date: "Saturday, 14 June 2026",
                  time: "08:00 – 10:00 WIB",
                  location: "Venue Name",
                  address: "Street Address",
                  mapsUrl: "https://maps.google.com",
                  googleMapsEmbedUrl: "",
                  image: ""
                })}>
                  <Plus size={12} className="mr-1" /> ADD EVENT
                </Button>
              </div>

              <div className="space-y-6">
                {data.events.map((event: any, idx: number) => (
                  <SectionCard key={idx} title={event.name || `Event ${idx + 1}`}>
                    <div className="flex flex-col gap-4">
                      <Field label="Event Name" value={event.name} onChange={(v: string) => updateListItem('events', idx, { ...event, name: v })} />
                      <ImageUpload value={event.image} onUpload={url => updateListItem('events', idx, { ...event, image: url })} />
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

          {editorTab === "dresscode" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
              <SectionTitle title="Dress Code" subtitle="Guide your guests on the event attire." />
              <SectionCard title="Theme & Note">
                 <Field label="Theme Name" value={data.dresscode?.theme} onChange={(v: string) => updateData('dresscode.theme', v)} />
                 <Field label="Note">
                    <textarea 
                      className="w-full min-h-[80px] text-xs p-3 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-primary outline-none"
                      value={data.dresscode?.note}
                      onChange={(e) => updateData('dresscode.note', e.target.value)}
                    />
                 </Field>
              </SectionCard>
              <SectionCard title="Illustration">
                 <ImageUpload value={data.dresscode?.image} onUpload={url => updateData('dresscode.image', url)} />
              </SectionCard>
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

          {editorTab === "music" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
              <SectionTitle title="Background Music" subtitle="Set the mood with the perfect soundtrack." />
              <SectionCard title="Audio Source">
                <Field label="Direct Audio URL" sublabel="Supports .mp3, .wav" value={data.music?.url} onChange={(v: string) => updateData('music.url', v)} />
                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 mt-4">
                   <span className="text-[11px] font-bold text-zinc-700">Auto-play on Open</span>
                   <button 
                     onClick={() => updateData('music.autoPlay', !data.music?.autoPlay)}
                     className={cn("w-10 h-5 rounded-full relative transition-all px-1", data.music?.autoPlay ? "bg-primary" : "bg-zinc-200")}
                   >
                     <div className={cn("w-3 h-3 bg-white rounded-full transition-all", data.music?.autoPlay ? "translate-x-5" : "translate-x-0")} />
                   </button>
                </div>
              </SectionCard>
            </div>
          )}

          {editorTab === "gift" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
              <SectionTitle 
                title={data.eventType === 'wedding' ? "Wedding Gift" : "Gift Registry"} 
                subtitle="Manage digital envelopes and shipping address." 
              />
              
              <SectionCard title="Bank Accounts">
                <div className="space-y-4">
                  {data.gift?.banks?.map((bank: any, idx: number) => (
                    <div key={idx} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Bank Name" value={bank.bank} onChange={(v: string) => {
                          const newBanks = [...data.gift.banks];
                          newBanks[idx] = { ...newBanks[idx], bank: v };
                          updateData('gift.banks', newBanks);
                        }} />
                        <Field label="Account Name" value={bank.accountName} onChange={(v: string) => {
                          const newBanks = [...data.gift.banks];
                          newBanks[idx] = { ...newBanks[idx], accountName: v };
                          updateData('gift.banks', newBanks);
                        }} />
                      </div>
                      <Field label="Account Number" value={bank.accountNumber} onChange={(v: string) => {
                        const newBanks = [...data.gift.banks];
                        newBanks[idx] = { ...newBanks[idx], accountNumber: v };
                        updateData('gift.banks', newBanks);
                      }} />
                      <Button variant="ghost" size="sm" className="w-full text-red-500 text-[10px] font-bold h-8" onClick={() => {
                        const newBanks = data.gift.banks.filter((_: any, i: number) => i !== idx);
                        updateData('gift.banks', newBanks);
                      }}>
                        <Trash2 size={12} className="mr-1" /> REMOVE
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed border-2 rounded-2xl h-12 text-[10px] font-bold" onClick={() => {
                    const currentBanks = data.gift?.banks || [];
                    updateData('gift.banks', [...currentBanks, { bank: "BCA", accountName: "", accountNumber: "" }]);
                  }}>
                    <Plus size={14} className="mr-1" /> ADD BANK ACCOUNT
                  </Button>
                </div>
              </SectionCard>

              <SectionCard title="Shipping Address">
                 <Field label="Address">
                    <textarea 
                      className="w-full min-h-[100px] text-xs p-3 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-primary outline-none"
                      value={data.gift?.address}
                      onChange={(e) => updateData('gift.address', e.target.value)}
                      placeholder="Enter address for physical gifts..."
                    />
                 </Field>
              </SectionCard>
            </div>
          )}

          {editorTab === "story" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex justify-between items-center">
                <SectionTitle title="Love Story" subtitle="Tell the journey of how you both met." />
                <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold rounded-xl" onClick={() => addItem('story', { year: "2024", title: "New Milestone", desc: "Short description..." })}>
                  <Plus size={12} className="mr-1" /> ADD MOMENT
                </Button>
              </div>

              <div className="space-y-6">
                {data.story?.map((item: any, idx: number) => (
                  <SectionCard key={idx} title={`Moment ${idx + 1}`}>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <Field label="Year" value={item.year} onChange={(v: string) => updateListItem('story', idx, { ...item, year: v })} />
                        </div>
                        <div className="col-span-2">
                          <Field label="Title" value={item.title} onChange={(v: string) => updateListItem('story', idx, { ...item, title: v })} />
                        </div>
                      </div>
                      <ImageUpload value={item.image} onUpload={url => updateListItem('story', idx, { ...item, image: url })} />
                      <Field label="Description">
                        <textarea 
                          className="w-full min-h-[80px] text-xs p-3 rounded-xl border border-zinc-200 focus:ring-1 focus:ring-primary outline-none"
                          value={item.desc}
                          onChange={(e) => updateListItem('story', idx, { ...item, desc: e.target.value })}
                        />
                      </Field>
                      <Button variant="ghost" size="sm" className="self-end text-red-500 h-8 text-[10px] font-bold" onClick={() => removeItem('story', idx)}>
                        <Trash2 size={12} className="mr-1" /> DELETE
                      </Button>
                    </div>
                  </SectionCard>
                ))}
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

              <SectionCard title="Typography">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Heading Font</p>
                    <div className="grid gap-4">
                       <Field label="Font Family" value={data.theme.fontHeading.family} onChange={(v: string) => updateData('theme.fontHeading.family', v)} />
                       <div className="grid grid-cols-2 gap-4">
                          <Field label="Base Size" value={data.theme.fontHeading.size} onChange={(v: string) => updateData('theme.fontHeading.size', v)} />
                          <Field label="Weight" value={data.theme.fontHeading.weight} onChange={(v: string) => updateData('theme.fontHeading.weight', v)} />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <Field label="Line Height" value={data.theme.fontHeading.lineHeight} onChange={(v: string) => updateData('theme.fontHeading.lineHeight', v)} />
                          <Field label="Letter Spacing" value={data.theme.fontHeading.letterSpacing} onChange={(v: string) => updateData('theme.fontHeading.letterSpacing', v)} />
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-[11px] font-bold text-zinc-700">Text Transform</Label>
                          <select 
                            className="w-full h-9 text-xs rounded-xl border border-zinc-200 bg-white px-3 outline-none focus:ring-1 focus:ring-primary"
                            value={data.theme.fontHeading.transform}
                            onChange={(e) => updateData('theme.fontHeading.transform', e.target.value)}
                          >
                            <option value="none">None</option>
                            <option value="uppercase">UPPERCASE</option>
                            <option value="lowercase">lowercase</option>
                            <option value="capitalize">Capitalize</option>
                          </select>
                       </div>
                    </div>
                  </div>

                  <div className="h-px bg-zinc-100" />

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Body Font</p>
                    <div className="grid gap-4">
                       <Field label="Font Family" value={data.theme.fontBody.family} onChange={(v: string) => updateData('theme.fontBody.family', v)} />
                       <div className="grid grid-cols-2 gap-4">
                          <Field label="Base Size" value={data.theme.fontBody.size} onChange={(v: string) => updateData('theme.fontBody.size', v)} />
                          <Field label="Weight" value={data.theme.fontBody.weight} onChange={(v: string) => updateData('theme.fontBody.weight', v)} />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <Field label="Line Height" value={data.theme.fontBody.lineHeight} onChange={(v: string) => updateData('theme.fontBody.lineHeight', v)} />
                          <Field label="Letter Spacing" value={data.theme.fontBody.letterSpacing} onChange={(v: string) => updateData('theme.fontBody.letterSpacing', v)} />
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-[11px] font-bold text-zinc-700">Text Transform</Label>
                          <select 
                            className="w-full h-9 text-xs rounded-xl border border-zinc-200 bg-white px-3 outline-none focus:ring-1 focus:ring-primary"
                            value={data.theme.fontBody.transform}
                            onChange={(e) => updateData('theme.fontBody.transform', e.target.value)}
                          >
                            <option value="none">None</option>
                            <option value="uppercase">UPPERCASE</option>
                            <option value="lowercase">lowercase</option>
                            <option value="capitalize">Capitalize</option>
                          </select>
                       </div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
