"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Heart, ArrowRight, CheckCircle2, Star, ShieldCheck, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        router.push("/onboarding");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans">
      {/* Visual Brand Side */}
      <div className="hidden lg:flex w-[40%] bg-[#0e0e10] relative overflow-hidden flex-col p-16 justify-between">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
          <div className="flex items-center gap-3">
            <img src="/Main-logo.svg" alt="Baswara" className="h-8 w-auto invert brightness-0" />
            <span className="text-xl font-black text-white tracking-tighter uppercase">Studio</span>
          </div>

        <div className="relative z-10 max-w-sm">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8"
          >
            CREATE <br />
            <span className="text-[#fd5e4b]">LEGACY</span> <br />
            INVITES.
          </motion.h2>
          <p className="text-white/40 text-sm font-medium leading-relaxed uppercase tracking-widest">
            Professional digital invitations <br />for every milestone.
          </p>
        </div>

        <div className="relative z-10 space-y-6 border-t border-white/5 pt-10">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-lg text-[#fd5e4b]"><ShieldCheck size={20}/></div>
              <div>
                 <p className="text-xs font-bold text-white uppercase tracking-wider">End-to-End Secure</p>
                 <p className="text-[10px] text-white/30 font-medium mt-0.5">Your guest data is fully encrypted.</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-lg text-amber-400"><Star size={20}/></div>
              <div>
                 <p className="text-xs font-bold text-white uppercase tracking-wider">Elite Templates</p>
                 <p className="text-[10px] text-white/30 font-medium mt-0.5">Curated by world-class designers.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Auth Interaction Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#fafafa] relative overflow-y-auto">
        <div className="lg:hidden absolute top-8 left-8">
            <Link href="/" className="flex items-center gap-2">
                <img src="/Main-logo.svg" alt="Baswara" className="h-6 w-auto" />
                <span className="font-black text-[#0e0e10] tracking-tighter uppercase">Baswara</span>
            </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px] bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100"
        >
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight mb-2 uppercase">
              {isSignUp ? "Create Account" : "Welcome back"}
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              {isSignUp ? "The journey to your perfect event starts here." : "Enter your credentials to access your studio."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Email Address</Label>
                  <div className="relative group">
                     <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#fd5e4b] transition-colors" />
                     <Input 
                       type="email"
                       placeholder="name@example.com"
                       className="h-14 pl-12 rounded-2xl bg-[#fafafa] border-2 border-zinc-100 focus-visible:ring-0 focus-visible:border-[#fd5e4b] text-lg font-bold transition-all"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                     <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Password</Label>
                     {!isSignUp && <button type="button" className="text-[10px] font-black text-[#fd5e4b] hover:underline">FORGOT?</button>}
                  </div>
                  <div className="relative group">
                     <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#fd5e4b] transition-colors" />
                     <Input 
                       type="password"
                       placeholder="••••••••"
                       className="h-14 pl-12 rounded-2xl bg-[#fafafa] border-2 border-zinc-100 focus-visible:ring-0 focus-visible:border-[#fd5e4b] text-lg font-bold transition-all"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                     />
                  </div>
               </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-[#fd5e4b]/20 group"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isSignUp ? "Get Started" : "Enter Studio"}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100"></span></div>
              <div className="relative flex justify-center text-[9px] uppercase font-black text-zinc-300 tracking-[0.3em] bg-white"><span className="px-4">Secure Gateway</span></div>
            </div>

            <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {isSignUp ? "A member?" : "New here?"}{" "}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#fd5e4b] font-black hover:underline"
              >
                {isSignUp ? "Sign In" : "Register"}
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
