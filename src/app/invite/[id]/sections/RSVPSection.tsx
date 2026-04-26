"use client";
import { useState, useEffect } from "react";
import { EventInvitationData } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function RSVPSection({ data, invitationId }: { data: any, invitationId?: string }) {
  const [wishes, setWishes] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", attend: "hadir", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [lastGuestToken, setLastGuestToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const eventType = (data as EventInvitationData).eventType || 'event';
  const isWedding = eventType === 'wedding';

  useEffect(() => {
    if (invitationId) {
      fetchRSVPs();
    }
  }, [invitationId]);

  async function fetchRSVPs() {
    const { data: rsvps, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false });
    
    if (!error && rsvps) {
      setWishes(rsvps);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.msg || !invitationId) return;
    
    setLoading(true);
    const qrToken = Math.random().toString(36).substring(2, 15);
    
    const { error } = await supabase
      .from('rsvps')
      .insert({
        invitation_id: invitationId,
        name: form.name,
        phone_number: form.phone,
        status: form.attend,
        message: form.msg,
        qr_token: qrToken
      });

    if (!error) {
      setLastGuestToken(qrToken);
      setForm({ name: "", phone: "", attend: "hadir", msg: "" });
      setSubmitted(true);
      fetchRSVPs();
    } else {
      alert("Error submitting RSVP: " + error.message);
    }
    setLoading(false);
  }

  return (
    <section className="inv-section">
      <p className="inv-section-label">RSVP &amp; Ucapan</p>
      <h2 className="inv-section-title">Konfirmasi &amp; <em>Pesan</em></h2>
      
      {submitted && lastGuestToken && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-8 p-8 bg-white rounded-[2rem] border-2 border-primary/20 shadow-xl text-center space-y-6"
        >
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <QRCodeSVG value={`baswara-checkin://${lastGuestToken}`} size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">Terima Kasih!</h3>
            <p className="text-sm text-muted-foreground">Konfirmasi kehadiran Anda telah kami terima.</p>
          </div>
          
          <div className="bg-muted/30 p-6 rounded-2xl border-2 border-dashed border-muted flex flex-col items-center gap-4">
            <QRCodeSVG value={`baswara-checkin://${lastGuestToken}`} size={160} level="H" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Scan QR ini saat tiba di lokasi</p>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => {
            setSubmitted(false);
            setLastGuestToken(null);
          }} className="rounded-full">Kirim Ucapan Lagi</Button>
        </motion.div>
      )}

      {!submitted && (
        <>
          <p className="inv-section-sub">Kirimkan konfirmasi kehadiran dan pesan terbaik Anda untuk kami</p>

          <form className="inv-rsvp-form" onSubmit={handleSubmit}>
            <div className="inv-form-group">
              <label className="inv-form-label" htmlFor="rsvp-name">Nama Lengkap *</label>
              <input id="rsvp-name" className="inv-form-input" placeholder="Masukkan nama Anda" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>

            <div className="inv-form-group">
              <label className="inv-form-label" htmlFor="rsvp-phone">Nomor WhatsApp</label>
              <input id="rsvp-phone" className="inv-form-input" placeholder="0812xxxx" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>

            <div className="inv-form-group">
              <label className="inv-form-label">Konfirmasi Kehadiran *</label>
              <div className="inv-rsvp-radio">
                {[{ val: "hadir", label: "✓ Hadir" }, { val: "berhalangan", label: "✗ Berhalangan" }].map(opt => (
                  <label className="inv-rsvp-radio-opt" key={opt.val}>
                    <input type="radio" name="attend" value={opt.val} checked={form.attend === opt.val} onChange={() => setForm(f => ({ ...f, attend: opt.val }))} />
                    <span className="inv-rsvp-radio-face">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="inv-form-group">
              <label className="inv-form-label" htmlFor="rsvp-msg">Pesan &amp; Ucapan *</label>
              <textarea id="rsvp-msg" className="inv-form-textarea" placeholder={isWedding ? "Tuliskan ucapan selamat dan doa untuk mempelai..." : "Tuliskan pesan atau ucapan Anda..."} value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} required />
            </div>

            <button type="submit" className="inv-submit-btn" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Pesan ✦"}
            </button>
          </form>
        </>
      )}

      {/* Wishes list */}
      <div style={{ marginTop: 40 }}>
        <p style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--inv-primary)", marginBottom: 12, fontWeight: 600 }}>
          {wishes.length} Ucapan / Pesan
        </p>
        <div className="inv-wishes-list">
          {wishes.map((w, i) => (
            <div className="inv-wish-item" key={i}>
              <div className="inv-wish-header">
                <span className="inv-wish-name">{w.name}</span>
                <span className={`inv-wish-status ${w.status}`}>{w.status === "hadir" ? "Hadir" : "Berhalangan"}</span>
              </div>
              <p className="inv-wish-msg">&ldquo;{w.message || w.msg}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
