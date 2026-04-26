"use client";
import { useEffect, useState } from "react";
import { WeddingData } from "@/lib/types";

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownSection({ data }: { data: WeddingData }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(data.weddingDate));
    const t = setInterval(() => setTime(getTimeLeft(data.weddingDate)), 1000);
    return () => clearInterval(t);
  }, [data.weddingDate]);

  const units = [
    { num: time.days, label: "Hari" },
    { num: time.hours, label: "Jam" },
    { num: time.minutes, label: "Menit" },
    { num: time.seconds, label: "Detik" },
  ];

  const formattedDate = (data.weddingDate || "2026-06-14T08:00:00").replace(/[-:]/g, "").split(".")[0];
  const calUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(`Pernikahan ${data.couple.groom.name} & ${data.couple.bride.name}`)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(data.hashtag)}`;

  return (
    <section className="inv-section" style={{ textAlign: "center" }}>
      <p className="inv-section-label">Hitung Mundur</p>
      <h2 className="inv-section-title">Menuju Hari <em>Bahagia</em></h2>

      <div className="inv-countdown-grid">
        {units.map(({ num, label }) => (
          <div className="inv-countdown-unit" key={label}>
            <span className="inv-countdown-num">{String(num).padStart(2, "0")}</span>
            <span className="inv-countdown-label">{label}</span>
          </div>
        ))}
      </div>

      <a className="inv-cal-btn" href={calUrl} target="_blank" rel="noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Tambah ke Kalender
      </a>
    </section>
  );
}
