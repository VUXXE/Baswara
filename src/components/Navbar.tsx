"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Layout as LayoutIcon, User, Plus } from 'lucide-react';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#fedbdf] bg-background/40 backdrop-blur-2xl px-6 lg:px-12 py-4">
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Main-logo.svg" alt="Baswara Logo" width={180} height={50} className="h-10 w-auto" priority />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-xs sm:text-sm font-bold text-[#6b1d1d] hover:opacity-80">
                <span className="hidden xs:inline">Dashboard</span>
                <LayoutIcon size={18} className="xs:hidden" />
              </Link>
              <Link href="/profile" className="text-xs sm:text-sm font-bold text-[#6b1d1d] hover:opacity-80">
                <span className="hidden xs:inline">Profile</span>
                <User size={18} className="xs:hidden" />
              </Link>
              <Link href="/invite/customize" className={buttonVariants({ className: "bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white rounded-full px-4 sm:px-6 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs h-9 sm:h-10" })}>
                <Plus size={14} className="sm:mr-2" />
                <span className="hidden sm:inline">Create Invite</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-[#6b1d1d] hover:opacity-80">
                Log in
              </Link>
              <Link href="/login" className={buttonVariants({ className: "bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white rounded-full px-6 sm:px-8 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs h-9 sm:h-10" })}>
                Mulai Sekarang
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
