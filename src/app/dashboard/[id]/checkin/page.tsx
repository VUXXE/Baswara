"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader2, CheckCircle2, XCircle, User, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckInPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [invitation, setInvitation] = useState<any>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ success: boolean; guest?: any; message: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetchInvitation();
    }
  }, [id]);

  async function fetchInvitation() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();

      if (error) throw error;
      setInvitation(data);
    } catch (error) {
      console.error(error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  const handleCheckIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!token) return;

    setChecking(true);
    setResult(null);

    try {
      // 1. Find guest by token for THIS invitation
      const { data: guest, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('invitation_id', id)
        .eq('qr_token', token.replace('baswara-checkin://', ''))
        .single();

      if (error || !guest) {
        setResult({ success: false, message: "Guest token not found or invalid for this event." });
      } else if (guest.status !== 'hadir') {
        setResult({ success: false, guest, message: `Guest registered as: ${guest.status.toUpperCase()}` });
      } else {
        setResult({ success: true, guest, message: "Check-in successful! Welcome." });
      }
    } catch (error) {
      setResult({ success: false, message: "An error occurred during check-in." });
    } finally {
      setChecking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 py-12">
        <Link 
          href={`/dashboard/${id}`}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 -ml-3 text-muted-foreground")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Event
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                <Calendar size={32} />
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Digital Check-in</h1>
              <p className="text-sm text-muted-foreground font-medium mt-1">{invitation?.data.title}</p>
            </div>

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Guest Token / Scan Data</label>
                <input 
                  autoFocus
                  className="w-full h-14 bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 text-sm font-mono focus:border-primary outline-none transition-all"
                  placeholder="Paste token or scan QR..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <Button 
                className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20" 
                disabled={checking || !token}
              >
                {checking ? <Loader2 className="animate-spin h-4 w-4" /> : "VERIFY GUEST"}
              </Button>
            </form>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={cn(
                  "border-t p-8 md:p-12",
                  result.success ? "bg-emerald-50/50" : "bg-red-50/50"
                )}
              >
                <div className="flex flex-col items-center text-center">
                  {result.success ? (
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mb-4" />
                  )}
                  
                  <h2 className={cn(
                    "text-xl font-black uppercase tracking-tight mb-2",
                    result.success ? "text-emerald-700" : "text-red-700"
                  )}>
                    {result.success ? "Verified!" : "Check-in Failed"}
                  </h2>
                  <p className="text-sm font-medium text-zinc-600 mb-6">{result.message}</p>

                  {result.guest && (
                    <div className="w-full bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm space-y-4">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Guest Name</p>
                          <p className="text-lg font-bold text-zinc-900">{result.guest.name}</p>
                        </div>
                      </div>
                      <div className="h-px bg-zinc-50" />
                      <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-zinc-400" />
                          <span className="text-xs font-bold text-zinc-600">{result.guest.guest_count} Person(s)</span>
                        </div>
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                          result.guest.status === 'hadir' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                        )}>
                          {result.guest.status}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="mt-8 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-emerald-500/20" onClick={() => {
                    setResult(null);
                    setToken("");
                  }}>
                    NEXT CHECK-IN
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
