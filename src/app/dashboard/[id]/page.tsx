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

export default function EventDashboardPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [invitation, setInvitation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!invitation) return null;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link 
          href="/dashboard"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 -ml-3 text-muted-foreground hover:text-zinc-900")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        
        <div className="mb-10 border-b pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                 {invitation.event_type}
               </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">
              {invitation.data.title}
            </h1>
            <p className="text-muted-foreground text-sm font-medium mt-1">Manage guest list, RSVPs, and digital check-in for your event.</p>
          </div>
          <Link 
            href={`/dashboard/${id}/checkin`}
            className={cn(buttonVariants(), "rounded-xl px-8 h-12 font-bold uppercase tracking-wider shadow-xl shadow-primary/20")}
          >
            <Scan className="w-4 h-4 mr-2" /> Check-in Guest
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 overflow-hidden">
           <GuestList invitationId={invitation.id} />
        </div>
      </div>
    </div>
  );
}
