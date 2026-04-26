"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Heart, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
        // If sign up is successful, we send them to onboarding
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
      {/* Left Pane: Branding & Info (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#6b1d1d] relative overflow-hidden flex-col p-16 justify-between">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#fd5e4b] rounded-full blur-[120px] opacity-20" 
        />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-[#fd5e4b] p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Heart className="text-white fill-white" size={24} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">BASWARA</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8"
          >
            CREATE <br />
            <span className="text-[#fd5e4b]">MOMENTS</span> <br />
            THAT LAST.
          </motion.h2>
          <p className="text-white/60 text-lg font-medium leading-relaxed">
            Join 250,000+ couples who trust Baswara to manage their special day with elegance and ease.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-[#fd5e4b] text-[#fd5e4b]" />)}
            </div>
            <p className="text-white font-bold text-sm">Top Rated on AppStore</p>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">4.9/5 Average Rating</p>
          </div>
          <div className="space-y-2">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#6b1d1d] bg-gradient-to-br from-[#fd5e4b] to-[#6b1d1d] flex items-center justify-center text-[8px] text-white font-black">U{i}</div>
              ))}
            </div>
            <p className="text-white font-bold text-sm">Secure Guest Data</p>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">End-to-End Encrypted</p>
          </div>
        </div>
      </div>

      {/* Right Pane: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-[#fedbdf]/10 relative">
        <div className="lg:hidden absolute top-8 left-8">
            <Link href="/" className="flex items-center gap-2">
                <Heart className="text-[#fd5e4b] fill-[#fd5e4b]" size={20} />
                <span className="font-black text-[#6b1d1d] tracking-tighter">BASWARA</span>
            </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-4xl font-black text-[#6b1d1d] tracking-tighter mb-2">
              {isSignUp ? "Join the family." : "Welcome back."}
            </h3>
            <p className="text-muted-foreground font-medium">
              {isSignUp ? "Start creating your dream invitation today." : "Continue managing your events and guests."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isSignUp ? "signup" : "signin"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/60 ml-1">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    className="h-12 bg-white border-zinc-200 focus-visible:ring-[#fd5e4b]/20 rounded-xl"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-[#6b1d1d]/60">Password</Label>
                    {!isSignUp && <button type="button" className="text-[10px] font-bold text-[#fd5e4b]">Forgot Password?</button>}
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="h-12 bg-white border-zinc-200 focus-visible:ring-[#fd5e4b]/20 rounded-xl"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <Button 
              type="submit" 
              className="w-full h-14 bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#fd5e4b]/20 group"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In Now"}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em] bg-transparent">
                <span className="px-4 bg-transparent backdrop-blur-sm">Protected by SSL</span>
              </div>
            </div>

            <p className="text-center text-sm font-medium text-muted-foreground">
              {isSignUp ? "Already a member?" : "New to Baswara?"}{" "}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#fd5e4b] font-black hover:underline underline-offset-4"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </p>
          </form>

          <div className="mt-12 flex items-center justify-center gap-6 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Safe & Secure Payment</span>
            <CheckCircle2 size={16} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
