"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  onNext: (data: { name: string }) => void;
  initialData: { name: string };
}

export default function WelcomeStep({ onNext, initialData }: WelcomeStepProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onNext({ name: formData.get("name") as string });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#6b1d1d] italic">
          Selamat Datang di Baswara
        </h2>
        <p className="text-[#6b1d1d]/70 max-w-md mx-auto leading-relaxed">
          Kami sangat senang bisa membantu Anda merencanakan momen spesial. Mari kita mulai dengan perkenalan singkat.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#6b1d1d] font-medium ml-1">
            Siapa nama lengkap Anda?
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Masukkan nama Anda..."
            defaultValue={initialData.name}
            required
            autoFocus
            className="bg-white/50 border-[#6b1d1d]/20 focus:border-[#fd5e4b] focus:ring-[#fd5e4b] text-[#6b1d1d] h-12"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#6b1d1d] hover:bg-[#831843] text-[#fedbdf] h-12 text-lg font-medium group transition-all duration-300"
        >
          Lanjutkan
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </motion.div>
  );
}
