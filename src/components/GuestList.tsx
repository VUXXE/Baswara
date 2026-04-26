"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RSVP } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, UserCheck, UserX, Clock, MessageSquare, Phone } from "lucide-react";

export default function GuestList({ weddingId }: { weddingId: string }) {
  const [guests, setGuests] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuests();
  }, [weddingId]);

  async function fetchGuests() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('wedding_id', weddingId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuests(data || []);
    } catch (err: any) {
      console.error("Error fetching guests:", err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: RSVP['status']) {
    const { error } = await supabase
      .from('rsvps')
      .update({ status })
      .eq('id', id);
    
    if (!error) fetchGuests();
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total RSVP" value={guests.length} icon={<Clock size={16}/>} />
        <StatCard label="Hadir" value={guests.filter(g => g.status === 'hadir').length} icon={<UserCheck className="text-emerald-500" size={16}/>} />
        <StatCard label="Berhalangan" value={guests.filter(g => g.status === 'berhalangan').length} icon={<UserX className="text-destructive" size={16}/>} />
      </div>

      <div className="grid gap-4">
        {guests.map((guest) => (
          <Card key={guest.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{guest.name}</h3>
                    <StatusBadge status={guest.status} />
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Phone size={12}/> {guest.phone_number || "No Phone"}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={12}/> {guest.message ? "Has message" : "No message"}
                    </div>
                  </div>

                  {guest.message && (
                    <p className="text-sm italic text-muted-foreground bg-muted/50 p-3 rounded-lg border-l-4 border-primary/30">
                      "{guest.message}"
                    </p>
                  )}
                </div>

                <div className="bg-muted/30 p-6 flex flex-col items-center justify-center border-l border-t md:border-t-0 gap-3 min-w-[180px]">
                  <div className="bg-white p-2 rounded-lg shadow-sm border">
                    <QRCodeSVG 
                      value={`baswara-checkin://${guest.qr_token}`} 
                      size={80}
                      level="H"
                    />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Guest QR Token</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
      <div className="p-3 bg-muted rounded-xl">{icon}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: RSVP['status'] }) {
  const styles = {
    hadir: "bg-emerald-100 text-emerald-700 border-emerald-200",
    berhalangan: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200"
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
}
