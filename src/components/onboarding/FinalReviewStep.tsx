"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Layout, Loader2, Sparkles, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinalReviewStepProps {
  data: {
    userName: string;
    eventType: string;
    title: string;
    date: string;
    theme: string;
  };
  onComplete: () => void;
  onBack: () => void;
  isCompleting: boolean;
}

export default function FinalReviewStep({ data, onComplete, onBack, isCompleting }: FinalReviewStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-10"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Summary</h2>
        <p className="text-muted-foreground font-medium">Ready to create your masterpiece, {data.userName}?</p>
      </div>

      <div className="grid gap-4 bg-[#fafafa] p-6 rounded-[2.5rem] border border-zinc-100">
         <ReviewItem icon={<User size={16}/>} label="Organizer" value={data.userName} />
         <ReviewItem icon={<Tag size={16}/>} label="Event Type" value={data.eventType.toUpperCase()} />
         <ReviewItem icon={<Layout size={16}/>} label="Invitation Title" value={data.title} />
         <ReviewItem icon={<Calendar size={16}/>} label="Main Date" value={new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
         <ReviewItem icon={<Sparkles size={16}/>} label="Design Style" value={data.theme.toUpperCase()} />
      </div>

      <div className="flex flex-col items-center gap-4 pt-6">
        <Button 
          onClick={onComplete}
          disabled={isCompleting}
          className="w-full bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white h-16 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-[#fd5e4b]/30"
        >
          {isCompleting ? <Loader2 className="animate-spin" size={24} /> : "LAUNCH INVITATION 🚀"}
        </Button>
        <button onClick={onBack} disabled={isCompleting} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-zinc-900 transition-colors">
          <ArrowLeft size={14} /> Re-edit details
        </button>
      </div>
    </motion.div>
  );
}

function ReviewItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm text-zinc-400 group-hover:text-primary transition-colors border border-zinc-100">{icon}</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</span>
       </div>
       <span className="text-sm font-bold text-zinc-900">{value}</span>
    </div>
  );
}
