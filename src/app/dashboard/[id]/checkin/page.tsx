"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2, Scan, CheckCircle2, User, Phone, Users, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckinPage() {
  const { id } = useParams();
  const router = useRouter();
  const [wedding, setWedding] = useState<any>(null);
  const [token, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWedding();
  }, [id]);

  async function fetchWedding() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('weddings')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();

      if (error) throw error;
      setWedding(data);
    } catch (error) {
      console.error(error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!token) return;

    setChecking(true);
    setError(null);
    setResult(null);

    // Clean token if it contains the protocol
    const cleanToken = token.replace('baswara-checkin://', '');

    try {
      const { data: guest, error: fetchError } = await supabase
        .from('rsvps')
        .select('*')
        .eq('wedding_id', id)
        .eq('qr_token', cleanToken)
        .single();

      if (fetchError || !guest) {
        setError("Guest not found or invalid token.");
      } else {
        setResult(guest);
        setSlug(""); // Clear input on success
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-2xl">
        <Link 
          href={`/dashboard/${id}`}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 -ml-3")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Guest List
        </Link>

        <div className="text-center mb-10 space-y-2">
          <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Scan size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#6b1d1d]">EVENT CHECK-IN</h1>
          <p className="text-muted-foreground font-medium">Scan guest QR code or enter token manually</p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-xl border-none bg-white rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleCheckin} className="flex gap-3">
                <Input 
                  placeholder="Enter QR Token..." 
                  className="h-14 rounded-2xl bg-muted/50 border-zinc-100 focus-visible:ring-primary/20 text-lg font-mono px-6"
                  value={token}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <Button type="submit" disabled={checking} className="h-14 w-14 rounded-2xl shadow-lg shadow-primary/20">
                  {checking ? <Loader2 className="animate-spin" /> : <ChevronRight />}
                </Button>
              </form>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-4 text-red-600"
              >
                <div className="bg-red-100 p-3 rounded-full"><AlertCircle size={24}/></div>
                <div>
                  <p className="font-black text-sm uppercase tracking-widest">Check-in Failed</p>
                  <p className="text-xs font-medium opacity-80">{error}</p>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-emerald-100 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 space-y-8"
              >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                        <User size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#6b1d1d]">{result.name}</h2>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 size={12}/> Verified Guest
                        </p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Guest Count</p>
                      <p className="text-3xl font-black text-primary flex items-center justify-end gap-1">
                         <Users size={20}/> {result.guest_count}
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-muted/30 p-4 rounded-2xl space-y-1">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">WhatsApp</p>
                      <p className="text-sm font-bold flex items-center gap-2"><Phone size={14} className="text-primary"/> {result.phone_number || "-"}</p>
                   </div>
                   <div className="bg-muted/30 p-4 rounded-2xl space-y-1">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Status</p>
                      <p className="text-sm font-bold capitalize">{result.status}</p>
                   </div>
                </div>

                {result.message && (
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 italic text-sm text-[#6b1d1d]/70 leading-relaxed">
                     "{result.message}"
                  </div>
                )}

                <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20" onClick={() => setResult(null)}>
                  COMPLETE CHECK-IN
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
