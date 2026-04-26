"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { 
  Layout as LayoutIcon, User, Plus, 
  Settings, LogOut, ChevronDown, Bell 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
      scrolled ? "bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center group transition-transform active:scale-95">
          <Image 
            src="/Main-logo.svg" 
            alt="Baswara" 
            width={140} 
            height={40} 
            className="h-8 sm:h-9 w-auto" 
            priority 
          />
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-6">
          {session ? (
            <>
              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1 bg-zinc-100/50 p-1 rounded-xl border border-zinc-200/50">
                 <NavLink href="/dashboard" icon={<LayoutIcon size={14}/>} label="Studio" />
                 <NavLink href="/dashboard" icon={<Bell size={14}/>} label="Updates" dot />
              </div>

              {/* User Dropdown / Profile */}
              <div className="relative">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center text-white text-xs font-black">
                     {session.user.email?.[0].toUpperCase()}
                  </div>
                  <ChevronDown size={14} className={cn("text-zinc-400 transition-transform duration-300", menuOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-20 py-2"
                      >
                         <div className="px-4 py-3 border-b border-zinc-50 mb-1">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Account</p>
                            <p className="text-xs font-bold text-zinc-900 truncate">{session.user.email}</p>
                         </div>
                         <DropdownLink href="/profile" icon={<User size={14}/>} label="My Profile" />
                         <DropdownLink href="/dashboard" icon={<Settings size={14}/>} label="Settings" />
                         <div className="h-px bg-zinc-50 my-1 mx-2" />
                         <button 
                           onClick={handleLogout}
                           className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                         >
                            <LogOut size={14} /> Log Out
                         </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary Action */}
              <Link 
                href="/onboarding" 
                className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-zinc-900 hover:bg-primary text-white font-black uppercase tracking-widest text-[10px] h-10 px-6 shadow-xl shadow-zinc-900/10 hidden sm:flex")}
              >
                <Plus size={16} className="mr-2" /> NEW EVENT
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors px-2">
                Log in
              </Link>
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "bg-[#fd5e4b] hover:bg-zinc-900 text-white rounded-full px-6 sm:px-10 transition-all duration-500 font-black uppercase tracking-widest text-[10px] sm:text-xs h-10 sm:h-12 shadow-xl shadow-primary/20")}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label, dot }: any) {
  return (
    <Link href={href} className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-white hover:shadow-sm transition-all text-xs font-bold relative group">
       {icon}
       <span className="hidden lg:inline">{label}</span>
       {dot && <span className="absolute top-1.5 right-2 w-1 h-1 bg-primary rounded-full group-hover:animate-ping" />}
    </Link>
  );
}

function DropdownLink({ href, icon, label }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
       {icon} {label}
    </Link>
  );
}
