"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Mail, Lock } from "lucide-react";

interface AccountStepProps {
  onNext: (data: { email: string, password?: string, mode: 'signup' | 'login' }) => void;
  onBack: () => void;
  initialData: { email: string };
}

export default function AccountStep({ onNext, onBack, initialData }: AccountStepProps) {
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onNext({ 
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      mode: isLogin ? 'login' : 'signup'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 w-full max-w-sm mx-auto"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#6b1d1d] italic">
          {isLogin ? "Selamat Datang Kembali" : "Buat Akun Anda"}
        </h2>
        <p className="text-[#6b1d1d]/70 leading-relaxed max-w-xs mx-auto">
          {isLogin ? "Masuk untuk melanjutkan rencana acara Anda." : "Mulai perjalanan Anda bersama Baswara hari ini."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Social Options */}
        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-2 h-12 border border-[#6b1d1d]/10 bg-white/50 rounded-xl hover:bg-white transition-colors text-xs font-bold text-[#6b1d1d] uppercase tracking-wider">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 h-12 border border-[#6b1d1d]/10 bg-white/50 rounded-xl hover:bg-white transition-colors text-xs font-bold text-[#6b1d1d] uppercase tracking-wider">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#6b1d1d]/10"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#fedbdf] px-2 text-[#6b1d1d]/40 font-black tracking-[0.2em]">Atau {isLogin ? "masuk" : "daftar"} dengan email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6b1d1d]/60 ml-1 flex items-center gap-2">
                <Mail size={12} className="text-[#fd5e4b]" /> Alamat Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@contoh.com"
                defaultValue={initialData.email}
                required
                className="bg-white/60 border-none h-14 rounded-2xl focus:ring-2 focus:ring-[#fd5e4b]/20 text-[#6b1d1d] shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6b1d1d]/60 flex items-center gap-2">
                  <Lock size={12} className="text-[#fd5e4b]" /> Kata Sandi
                </Label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-bold text-[#fd5e4b] hover:underline uppercase tracking-wider">Lupa?</button>
                )}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/60 border-none h-14 rounded-2xl focus:ring-2 focus:ring-[#fd5e4b]/20 text-[#6b1d1d] shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 pt-2">
            <Button 
              type="submit" 
              className="w-full bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white h-14 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-[#fd5e4b]/20 transition-all duration-300"
            >
              {isLogin ? "Masuk Sekarang" : "Daftar Sekarang"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs text-[#6b1d1d]/60 font-medium">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"} {" "}
                <button 
                  type="button" 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#fd5e4b] font-bold hover:underline"
                >
                  {isLogin ? "Daftar di sini" : "Masuk di sini"}
                </button>
              </p>
              
              <button 
                type="button"
                onClick={onBack}
                className="flex items-center justify-center text-[#6b1d1d]/40 hover:text-[#6b1d1d] transition-colors font-black text-[10px] uppercase tracking-[0.2em]"
              >
                <ArrowLeft className="mr-2 w-3 h-3" />
                Kembali
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
