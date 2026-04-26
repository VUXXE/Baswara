"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Loader2, ArrowLeft, ArrowRight, Heart, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_EVENT_DATA } from "../invite/[id]/EventInvitationClient";
import { EventType, EventInvitationData } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";
import { cn } from "@/lib/utils";

// New specialized components for the "Better" onboarding
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import EventTypeStep from "@/components/onboarding/EventTypeStep";
import EventDetailsStep from "@/components/onboarding/EventDetailsStep";
import ThemeSelectionStep from "@/components/onboarding/ThemeSelectionStep";
import FinalReviewStep from "@/components/onboarding/FinalReviewStep";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isCompleting, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    eventType: "wedding" as EventType,
    title: "",
    date: "",
    theme: "classic",
    role: "host",
  });
  const router = useRouter();

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleComplete = async () => {
    setIsComplete(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      // 1. Update Profile Name
      await supabase.from('profiles').update({ 
        full_name: formData.userName 
      }).eq('id', session.user.id);

      // 2. Prepare Data based on Template and Input
      const chosenTemplate = TEMPLATES.find(t => t.id === formData.theme) || TEMPLATES[0];
      const slug = `${formData.title.toLowerCase().replace(/\s+/g, '-') || 'event'}-${Math.random().toString(36).substring(2, 7)}`;
      
      const eventData: EventInvitationData = {
        ...DEFAULT_EVENT_DATA,
        ...chosenTemplate.defaultData,
        id: slug,
        eventType: formData.eventType,
        title: formData.title,
        mainDate: formData.date || DEFAULT_EVENT_DATA.mainDate,
        templateId: formData.theme,
        hashtag: `#${formData.title.replace(/\s+/g, '')}`,
        // Customize greeting based on event type
        greeting: formData.eventType === 'wedding' ? "Kepada Yth. Bapak/Ibu/Saudara/i" : 
                  formData.eventType === 'birthday' ? "Halo Teman-teman & Keluarga!" : "Dear Valued Guests,",
        subTitle: formData.eventType === 'wedding' ? "The Wedding of" : 
                  formData.eventType === 'birthday' ? "Celebrating the Birthday of" : "Special Invitation",
        // Reset organizers for non-wedding or update labels
        organizers: formData.eventType === 'wedding' ? DEFAULT_EVENT_DATA.organizers : [
          {
            name: formData.userName.split(' ')[0],
            fullName: formData.userName,
            role: formData.eventType === 'birthday' ? "Birthday Star" : "Host",
            subText: formData.eventType === 'birthday' ? "Turning a year older!" : "Welcome to our event"
          }
        ],
        // Set first event date/time to match main date
        events: [
          {
            ...DEFAULT_EVENT_DATA.events[0],
            date: new Date(formData.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
            name: formData.eventType === 'wedding' ? "Resepsi" : "Main Event"
          }
        ]
      };

      const { error } = await supabase.from('invitations').insert({
        user_id: session.user.id,
        event_type: formData.eventType,
        slug: slug,
        hashtag: eventData.hashtag,
        preset_design: formData.theme,
        data: eventData,
      });

      if (error) throw error;
      
      // Success!
      router.push("/dashboard");
    } catch (err: any) {
      alert("Something went wrong: " + err.message);
      setIsComplete(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row overflow-hidden font-sans text-zinc-900">
      {/* Left Decoration Panel */}
      <div className="hidden lg:flex w-1/3 bg-[#6b1d1d] relative overflow-hidden flex-col p-12 justify-between">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 flex items-center gap-3">
          <img src="/Main-logo.svg" alt="Baswara" className="h-6 w-auto invert brightness-0" />
          <span className="text-lg font-black text-white tracking-tighter uppercase">Studio</span>
        </div>

        <div className="relative z-10">
           <AnimatePresence mode="wait">
             <motion.div 
               key={step}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="space-y-6"
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                   Step 0{step} / 05
                </div>
                <h2 className="text-5xl font-black text-white leading-none tracking-tighter">
                   {step === 1 && <>YOUR <br /><span className="text-[#fd5e4b]">JOURNEY</span> <br />BEGINS.</>}
                   {step === 2 && <>WHAT ARE <br />WE <span className="text-[#fd5e4b]">CELEBRATING</span>?</>}
                   {step === 3 && <>TELL US <br />THE <span className="text-[#fd5e4b]">DETAILS</span>.</>}
                   {step === 4 && <>PICK A <br /><span className="text-[#fd5e4b]">VIBE</span>.</>}
                   {step === 5 && <>ALMOST <br /><span className="text-[#fd5e4b]">READY</span>.</>}
                </h2>
                <p className="text-white/50 font-medium text-sm leading-relaxed max-w-xs">
                   {step === 1 && "Start your professional event management journey with Baswara's premium invitation suite."}
                   {step === 2 && "From elegant weddings to professional seminars, we handle it all with style."}
                   {step === 3 && "Let's set the foundation for your event's digital presence."}
                   {step === 4 && "Choose a curated design preset that matches your event's personality."}
                   {step === 5 && "Review your configuration and let's launch your invitation."}
                </p>
             </motion.div>
           </AnimatePresence>
        </div>

        <div className="relative z-10 flex items-center gap-4">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#6b1d1d] bg-zinc-200" />)}
           </div>
           <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">Join 2k+ creators <br />this month</p>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col relative bg-white lg:rounded-l-[3rem] lg:-ml-[3rem] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-20 overflow-y-auto scrollbar-hide">
        <div className="max-w-2xl mx-auto w-full px-8 py-12 lg:py-24 flex flex-col min-h-full">
           
           {/* Step Progress Bar */}
           <div className="flex gap-2 mb-12">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  step >= i ? "flex-1 bg-[#fd5e4b]" : "w-4 bg-zinc-100"
                )} />
              ))}
           </div>

           <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <WelcomeStep 
                    key="s1" 
                    value={formData.userName} 
                    onChange={v => setFormData(f => ({ ...f, userName: v }))} 
                    onNext={nextStep} 
                  />
                )}
                {step === 2 && (
                  <EventTypeStep 
                    key="s2" 
                    value={formData.eventType} 
                    onChange={v => setFormData(f => ({ ...f, eventType: v }))} 
                    onNext={nextStep} 
                    onBack={prevStep} 
                  />
                )}
                {step === 3 && (
                  <EventDetailsStep 
                    key="s3" 
                    data={formData} 
                    onChange={updates => setFormData(f => ({ ...f, ...updates }))} 
                    onNext={nextStep} 
                    onBack={prevStep} 
                  />
                )}
                {step === 4 && (
                  <ThemeSelectionStep 
                    key="s4" 
                    value={formData.theme} 
                    onChange={v => setFormData(f => ({ ...f, theme: v }))} 
                    onNext={nextStep} 
                    onBack={prevStep} 
                  />
                )}
                {step === 5 && (
                  <FinalReviewStep 
                    key="s5" 
                    data={formData} 
                    onComplete={handleComplete} 
                    onBack={prevStep}
                    isCompleting={isCompleting}
                  />
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
