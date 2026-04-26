"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Mail, Lock, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountStepProps {
  onNext: (data: { email: string, password?: string, mode: 'signup' | 'login' }) => void;
  onBack: () => void;
  data: {
    userName: string;
  };
}

export default function AccountStep({ onNext, onBack, data }: AccountStepProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onNext({ email, password, mode: isLogin ? 'login' : 'signup' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">
          {isLogin ? "Welcome back" : "Create Account"}
        </h2>
        <p className="text-muted-foreground font-medium">
          {isLogin 
            ? "Log in to continue your progress." 
            : `Nice to meet you, ${data.userName.split(' ')[0]}. Let's secure your work.`
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</Label>
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
               <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Password</Label>
               {isLogin && <button type="button" className="text-[10px] font-black text-[#fd5e4b] hover:underline">Forgot?</button>}
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

        <div className="flex flex-col items-center gap-6 pt-4">
          <Button 
            type="submit" 
            disabled={loading || !email || !password}
            className="w-full bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#fd5e4b]/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? "SIGN IN" : "CREATE ACCOUNT")}
          </Button>

          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-medium text-zinc-500">
               {isLogin ? "New to Baswara?" : "Already have an account?"}{" "}
               <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#fd5e4b] font-black hover:underline">
                  {isLogin ? "Create one here" : "Sign in here"}
               </button>
            </p>
            <button type="button" onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-900 transition-colors">
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
