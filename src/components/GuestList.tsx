"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RSVP } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, UserCheck, UserX, Clock, MessageSquare, Phone, Users } from "lucide-react";

export default function GuestList({ invitationId }: { invitationId: string }) {
  const [guests, setGuests] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (invitationId) {
      fetchGuests();
    }
  }, [invitationId]);

  async function fetchGuests() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuests(data || []);
    } catch (err: any) {
      console.error("Error fetching guests:", err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20 bg-white">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  const totalGuestsCount = guests.reduce((acc, curr) => acc + (curr.guest_count || 1), 0);

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Total RSVP" value={guests.length} icon={<Clock size={14}/>} />
        <StatCard label="Total Guests" value={totalGuestsCount} icon={<Users size={14}/>} />
        <StatCard label="Hadir" value={guests.filter(g => g.status === 'hadir').length} icon={<UserCheck className="text-emerald-500" size={14}/>} />
        <StatCard label="Berhalangan" value={guests.filter(g => g.status === 'berhalangan').length} icon={<UserX className="text-destructive" size={14}/>} />
      </div>

      <div className="grid gap-4">
        {guests.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-200">
             <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">No RSVPs yet</p>
          </div>
        ) : (
          guests.map((guest) => (
            <Card key={guest.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all rounded-2xl bg-[#fafafa]">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                         <h3 className="font-bold text-base sm:text-lg text-zinc-900">{guest.name}</h3>
                         <span className="bg-zinc-200 text-zinc-600 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md w-fit">+{guest.guest_count - 1} GUESTS</span>
                      </div>
                      <StatusBadge status={guest.status} />
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-[11px] sm:text-xs font-medium text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center"><Phone size={10}/></div>
                        {guest.phone_number || "No Phone"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center"><MessageSquare size={10}/></div>
                        {guest.message ? "Has message" : "No message"}
                      </div>
                    </div>

                    {guest.message && (
                      <p className="text-sm italic text-muted-foreground bg-white border border-zinc-100 p-4 rounded-xl shadow-sm">
                        &ldquo;{guest.message}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="bg-zinc-100 p-6 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-zinc-200 gap-3 min-w-[180px]">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-200">
                      <QRCodeSVG 
                        value={`baswara-checkin://${guest.qr_token}`} 
                        size={80}
                        level="H"
                      />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Digital Token</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-[#fafafa] p-4 sm:p-6 rounded-xl sm:rounded-[1.5rem] border border-zinc-100 flex items-center justify-between">
      <div>
        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-zinc-400 mb-1">{label}</p>
        <p className="text-xl sm:text-2xl font-black text-zinc-900">{value}</p>
      </div>
      <div className="p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-zinc-100">{icon}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: RSVP['status'] }) {
  const styles = {
    hadir: "bg-emerald-50 text-emerald-600 border-emerald-100",
    berhalangan: "bg-red-50 text-red-600 border-red-100",
    pending: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {status === 'hadir' ? 'CONFIRMED' : status === 'berhalangan' ? 'DECLINED' : 'PENDING'}
    </span>
  );
}
