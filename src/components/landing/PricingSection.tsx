"use client";

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  { name: "Starter Plan", price: "Rp 500k", color: "bg-[#6b1d1d]", textColor: "text-white" },
  { name: "Pro Plan", price: "Rp 1.5M", color: "bg-[#fd5e4b]", textColor: "text-white" },
  { name: "Premium Plan", price: "Rp 3.0M", color: "bg-[#fecf00]", textColor: "text-[#6b1d1d]" }
];

const getFeatures = (idx: number) => [
  "Premium Digital Invitation",
  "Real-time RSVP Tracking",
  "Up to " + (idx === 0 ? "500" : idx === 1 ? "2,000" : "Unlimited") + " Guests",
  idx >= 1 ? "WhatsApp Reminders" : "Email Notifications",
  idx === 2 ? "Dedicated Event Manager" : "Standard Support"
];

export default function PricingSection() {
  return (
    <section className="relative z-10 py-32 md:py-48 px-6 bg-[#fedbdf]/20 border-y border-[#6b1d1d]/5 text-[#6b1d1d]">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#6b1d1d]">Select a Plan <br/>According to Your Need</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div key={idx} className={`rounded-[2.5rem] bg-white border ${idx === 1 ? 'border-[#fd5e4b]/30 shadow-2xl scale-[1.02]' : 'border-[#6b1d1d]/5 shadow-xl'} overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-500 relative`}>
              {idx === 1 && <div className="absolute top-4 right-4 z-10 bg-[#fecf00] text-[#6b1d1d] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Popular</div>}
              <div className={`${plan.color} ${plan.textColor} p-8 lg:p-10`}>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Baswara Experience</p>
                <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl lg:text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-sm font-bold opacity-80 pb-2">/ event</span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex-1 flex flex-col gap-8">
                <ul className="space-y-4 flex-1">
                  {getFeatures(idx).map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-[#6b1d1d]/70">
                      <CheckCircle2 size={18} className="text-[#fd5e4b]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-14 rounded-full bg-[#6b1d1d] hover:bg-[#fd5e4b] text-white border-none font-bold transition-all text-sm uppercase tracking-widest shadow-lg">Get Started</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
