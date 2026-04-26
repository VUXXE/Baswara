"use client";

import { useState, useRef, useMemo } from "react";
import HeroSection from "./sections/HeroSection";
import CoupleSection from "./sections/CoupleSection";
import CountdownSection from "./sections/CountdownSection";
import EventDetailsSection from "./sections/EventDetailsSection";
import DresscodeSection from "./sections/DresscodeSection";
import GallerySection from "./sections/GallerySection";
import StorySection from "./sections/StorySection";
import GiftSection from "./sections/GiftSection";
import RSVPSection from "./sections/RSVPSection";
import MusicPlayer from "./sections/MusicPlayer";
import { WeddingData } from "@/lib/types";
import "./invite.css";

// Mock data — in production this would come from your API/db
export const DEFAULT_WEDDING_DATA: WeddingData = {
  id: "evt-001",
  templateId: "classic",
  hashtag: "#BaswaraWedding",
  greeting: "Kepada Yth. Bapak/Ibu/Saudara/i",
  guestName: "Tamu Undangan",
  couple: {
    groom: {
      name: "Adrian",
      fullName: "Adrian Ramadhan Putra",
      parents: "Putra dari Bpk. Hendra & Ibu Sari",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      instagram: "@adrianrmd",
    },
    bride: {
      name: "Ariana",
      fullName: "Ariana Dewi Lestari",
      parents: "Putri dari Bpk. Budi & Ibu Wati",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      instagram: "@arianadewi",
    },
  },
  events: [
    {
      name: "Akad Nikah",
      date: "Sabtu, 14 Juni 2026",
      time: "08:00 – 10:00 WIB",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Sudirman No. 12, Jakarta Pusat",
      mapsUrl: "https://maps.google.com",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.46654763131!2d106.8202573!3d-6.2020294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fe26390977%3A0x69680a65345717!2sMasjid%20Jami&#39;%20Al-Ikhlas!5e0!3m2!1sid!2sid!4v1711123456789!5m2!1sid!2sid"
    },
    {
      name: "Resepsi",
      date: "Sabtu, 14 Juni 2026",
      time: "11:00 – 14:00 WIB",
      location: "Grand Ballroom Hotel Mulia",
      address: "Jl. Asia Afrika No. 8, Jakarta Selatan",
      mapsUrl: "https://maps.google.com",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3066329745424!2d106.7972442!3d-6.2232538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d3096d17b%3A0x10368a15993708e5!2sHotel%20Mulia%20Senayan!5e0!3m2!1sid!2sid!4v1711123456790!5m2!1sid!2sid"
    },
  ],
  weddingDate: "2026-06-14T08:00:00",
  dresscode: {
    theme: "Garden Party / Formal",
    palette: ["#D4A5A5", "#A8C5B5", "#E8DCC8", "#B8A9C9"],
    note: "Mohon hindari warna putih & hitam pekat",
  },
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?w=600&h=400&fit=crop",
  ],
  story: [
    { year: "2019", title: "Pertama Bertemu", desc: "Kami bertemu di sebuah acara kampus dan langsung merasa ada yang spesial." },
    { year: "2020", title: "Mulai Bersama", desc: "Setelah setahun berteman, kami memutuskan untuk menjalin hubungan yang lebih serius." },
    { year: "2023", title: "Lamaran", desc: "Di tepi pantai saat matahari terbenam, Adrian melamar Ariana dengan cincin keluarga." },
    { year: "2026", title: "Hari Pernikahan", desc: "Hari yang kami nantikan akhirnya tiba. Bersatu selamanya." },
  ],
  gift: {
    banks: [
      { bank: "BCA", accountName: "Adrian Ramadhan", accountNumber: "1234567890" },
      { bank: "Mandiri", accountName: "Ariana Dewi", accountNumber: "0987654321" },
    ],
    address: "Jl. Melati No. 7, Kemang, Jakarta Selatan 12730",
  },
  theme: {
    primaryColor: "#c17a6f",
    secondaryColor: "#8fad9e",
    tertiaryColor: "#b89a6a",
    backgroundColor: "#faf7f2",
    textColor: "#3a2e2a",
    fontHeading: {
      family: "'Cormorant Garamond', serif",
      size: "2.8rem",
      weight: "400",
      lineHeight: "1.2",
      letterSpacing: "0em",
      transform: "none",
    },
    fontBody: {
      family: "'DM Sans', sans-serif",
      size: "0.9rem",
      weight: "400",
      lineHeight: "1.6",
      letterSpacing: "0.02em",
      transform: "none",
    }
  }
};

export default function WeddingInviteClient({ 
  id, 
  initialData, 
  forceOpen = false,
  viewMode = "desktop",
  orientation = "portrait",
  dbId
}: { 
  id: string, 
  initialData?: WeddingData, 
  forceOpen?: boolean,
  viewMode?: "mobile" | "tablet" | "desktop",
  orientation?: "portrait" | "landscape",
  dbId?: string
}) {
  const [opened, setOpened] = useState(forceOpen);
  
  const data = useMemo(() => {
    if (!initialData) return DEFAULT_WEDDING_DATA;
    
    // Deep merge to ensure nested objects exist
    return {
      ...DEFAULT_WEDDING_DATA,
      ...initialData,
      couple: {
        groom: { ...DEFAULT_WEDDING_DATA.couple.groom, ...initialData.couple?.groom },
        bride: { ...DEFAULT_WEDDING_DATA.couple.bride, ...initialData.couple?.bride },
      },
      theme: {
        ...DEFAULT_WEDDING_DATA.theme,
        ...initialData.theme,
        fontHeading: { ...DEFAULT_WEDDING_DATA.theme.fontHeading, ...initialData.theme?.fontHeading },
        fontBody: { ...DEFAULT_WEDDING_DATA.theme.fontBody, ...initialData.theme?.fontBody },
      },
      gift: {
        ...DEFAULT_WEDDING_DATA.gift,
        ...initialData.gift,
        banks: initialData.gift?.banks || DEFAULT_WEDDING_DATA.gift.banks,
      }
    };
  }, [initialData]);

  const rightPanelRef = useRef<HTMLDivElement>(null);

  const themeStyles = {
    "--inv-primary": data.theme.primaryColor,
    "--inv-accent": data.theme.secondaryColor,
    "--inv-gold": data.theme.tertiaryColor,
    "--inv-surface": data.theme.backgroundColor,
    "--inv-text": data.theme.textColor,
    
    "--inv-font-heading": data.theme.fontHeading.family,
    "--inv-heading-size": data.theme.fontHeading.size,
    "--inv-heading-weight": data.theme.fontHeading.weight,
    "--inv-heading-line-height": data.theme.fontHeading.lineHeight || "1.2",
    "--inv-heading-letter-spacing": data.theme.fontHeading.letterSpacing || "0em",
    "--inv-heading-transform": data.theme.fontHeading.transform,
    
    "--inv-font-body": data.theme.fontBody.family,
    "--inv-body-size": data.theme.fontBody.size,
    "--inv-body-weight": data.theme.fontBody.weight,
    "--inv-body-line-height": data.theme.fontBody.lineHeight || "1.6",
    "--inv-body-letter-spacing": data.theme.fontBody.letterSpacing || "0.02em",
    "--inv-body-transform": data.theme.fontBody.transform,
  } as React.CSSProperties;

  const currentTemplate = data.templateId || "classic";

  return (
    <div className={`invite-root view-${viewMode} orient-${orientation} tpl-${currentTemplate}`} style={themeStyles}>
      <aside className="invite-left">
        <div className="invite-left-bg" style={{ backgroundImage: `url(${data.gallery[0] || DEFAULT_WEDDING_DATA.gallery[0]})` }} />
        <div className="invite-left-overlay">
          <div className="invite-left-content">
            <p className="invite-left-tag">Wedding Invitation</p>
            <h2 className="invite-left-names">
              {data.couple.groom.name}
              <span className="invite-left-amp">&</span>
              {data.couple.bride.name}
            </h2>
            <p className="invite-left-date">
              {data.events[0]?.date || "14 · 06 · 2026"}
            </p>
            <p className="invite-left-hashtag">{data.hashtag}</p>
          </div>
        </div>
      </aside>

      <main className="invite-right" ref={rightPanelRef}>
        {!opened ? (
          <div className="invite-envelope" onClick={() => setOpened(true)}>
            <div className="envelope-icon">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="12" width="60" height="40" rx="4" fill="#fff" stroke="var(--inv-primary)" strokeWidth="2"/>
                <path d="M2 16l30 22L62 16" stroke="var(--inv-primary)" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <p className="envelope-greeting">{data.greeting}</p>
            <p className="envelope-name">{data.guestName}</p>
            <button className="envelope-btn">Buka Undangan ✦</button>
            <p className="envelope-sub">Klik untuk membuka undangan</p>
          </div>
        ) : (
          <div className="invite-content">
            <HeroSection data={data} />
            <CoupleSection data={data} />
            <CountdownSection data={data} />
            <EventDetailsSection data={data} />
            <DresscodeSection data={data} />
            <GallerySection data={data} />
            <StorySection data={data} />
            <GiftSection data={data} />
            <RSVPSection data={data} weddingId={dbId} />
            <footer className="invite-footer">
              <p>Made with ♥ by <strong>Baswara</strong></p>
              <p className="invite-footer-sub">Platform Undangan Digital Terbaik di Indonesia</p>
            </footer>
          </div>
        )}
      </main>

      {opened && <MusicPlayer />}
    </div>
  );
}
