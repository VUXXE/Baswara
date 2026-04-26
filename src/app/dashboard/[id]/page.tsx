"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import GuestList from "@/components/GuestList";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader2, Scan } from "lucide-react";
import Link from "next/link";

export default function WeddingDashboardPage() {
  const { id } = useParams();
  const router = useRouter();
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!wedding) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <Link 
          href="/dashboard"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 -ml-3")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        
        <div className="mb-8 border-b pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {wedding.data.couple.groom.name} & {wedding.data.couple.bride.name}'s Wedding
            </h1>
            <p className="text-muted-foreground">Manage your guest list and RSVPs</p>
          </div>
          <Link 
            href={`/dashboard/${id}/checkin`}
            className={cn(buttonVariants(), "rounded-full px-8 h-12 font-black uppercase tracking-wider shadow-lg shadow-primary/20")}
          >
            <Scan className="w-4 h-4 mr-2" /> Check-in Guest
          </Link>
        </div>

        <GuestList weddingId={wedding.id} />
      </div>
    </div>
  );
}
