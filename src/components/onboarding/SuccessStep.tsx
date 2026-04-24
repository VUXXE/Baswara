"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, LayoutDashboard, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

interface SuccessStepProps {
  onComplete: () => void;
  data: {
    name: string;
    role: string;
    theme: string;
  };
}

export default function SuccessStep({ onComplete, data }: SuccessStepProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Simulate "Setting up"
    const timer = setTimeout(() => setIsReady(true), 2500);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-12 max-w-lg mx-auto"
    >
      {!isReady ? (
        <div className="space-y-8 py-12">
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-[#fd5e4b]/20 border-t-[#fd5e4b] rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-[#fd5e4b] animate-pulse" size={32} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-[#6b1d1d] italic">Menyiapkan Ruang Anda...</h2>
            <p className="text-[#6b1d1d]/60 text-sm animate-pulse">Menyesuaikan tema {data.theme} untuk Anda</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-[#fd5e4b] rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-[#fd5e4b]/40"
            >
              <Check className="text-white" size={48} strokeWidth={3} />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-[#6b1d1d] italic">
                Semua Siap, {data.name.split(' ')[0]}!
              </h2>
              <p className="text-[#6b1d1d]/70 leading-relaxed">
                Akun Anda telah berhasil dikonfigurasi. Sekarang Anda dapat mulai membuat momen tak terlupakan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/40 p-4 rounded-2xl border border-white/20 backdrop-blur-sm text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/40 mb-1">Peran</p>
              <p className="font-bold text-[#6b1d1d] flex items-center gap-2">
                <PartyPopper size={14} className="text-[#fd5e4b]" />
                {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
              </p>
            </div>
            <div className="bg-white/40 p-4 rounded-2xl border border-white/20 backdrop-blur-sm text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/40 mb-1">Tema</p>
              <p className="font-bold text-[#6b1d1d] flex items-center gap-2">
                <Sparkles size={14} className="text-[#fd5e4b]" />
                {data.theme.charAt(0).toUpperCase() + data.theme.slice(1)}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onComplete}
              className="w-full bg-[#6b1d1d] hover:bg-[#fd5e4b] text-[#fedbdf] h-16 rounded-2xl text-lg font-black uppercase tracking-widest transition-all shadow-xl group"
            >
              Masuk ke Dashboard
              <LayoutDashboard className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
