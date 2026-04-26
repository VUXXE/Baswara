"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./sections/HeroSection";
import OrganizersSection from "./sections/OrganizersSection";
import CountdownSection from "./sections/CountdownSection";
import EventDetailsSection from "./sections/EventDetailsSection";
import DresscodeSection from "./sections/DresscodeSection";
import GallerySection from "./sections/GallerySection";
import StorySection from "./sections/StorySection";
import GiftSection from "./sections/GiftSection";
import RSVPSection from "./sections/RSVPSection";
import MusicPlayer from "./sections/MusicPlayer";
import { EventInvitationData, EventType } from "@/lib/types";
import { cn } from "@/lib/utils";
import "./invite.css";

export const DEFAULT_EVENT_DATA: EventInvitationData = {
  id: "evt-001",
  eventType: "wedding",
  templateId: "classic",
  hashtag: "#BaswaraEvent",
  greeting: "Kami mengundang Anda",
  guestName: "Tamu Kehormatan",
  title: "Nama Acara Anda",
  subTitle: "Special Invitation",
  organizers: [
    {
      name: "Penyelenggara 1",
      fullName: "Nama Lengkap Penyelenggara",
      role: "Host",
      subText: "Selamat datang di acara kami"
    }
  ],
  layout: {
    showOrganizers: true,
    showCountdown: true,
    showEvents: true,
    showDresscode: true,
    showGallery: true,
    showStory: true,
    showGift: true,
    showRSVP: true,
  },
  events: [
    {
      name: "Akad Nikah",
      date: "Sabtu, 14 Juni 2026",
      time: "08:00 – 10:00 WIB",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Sudirman No. 12, Jakarta Pusat",
      mapsUrl: "https://maps.google.com",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.46654763131!2d106.8202573!3d-6.2020294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fe26390977%3A0x69680a65345717!2sMasjid%20Jami&#39;%20Al-Ikhlas!5e0!3m2!1id!2sid!4v1711123456789!5m2!1id!2sid"
    },
    {
      name: "Resepsi",
      date: "Sabtu, 14 Juni 2026",
      time: "11:00 – 14:00 WIB",
      location: "Grand Ballroom Hotel Mulia",
      address: "Jl. Asia Afrika No. 8, Jakarta Selatan",
      mapsUrl: "https://maps.google.com",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3066329745424!2d106.7972442!3d-6.2232538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d3096d17b%3A0x10368a15993708e5!2sHotel%20Mulia%20Senayan!5e0!3m2!1id!2sid!4v1711123456790!5m2!1id!2sid"
    },
  ],
  mainDate: "2026-06-14T08:00:00",
  dresscode: {
    theme: "Garden Party / Formal",
    palette: ["#D4A5A5", "#A8C5B5", "#E8DCC8", "#B8A9C9"],
    note: "Mohon hindari warna putih & hitam pekat",
  },
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
  ],
  story: [
    { year: "2019", title: "Pertama Bertemu", desc: "Kami bertemu di sebuah acara kampus dan langsung merasa ada yang spesial." },
  ],
  gift: {
    banks: [
      { bank: "BCA", accountName: "Adrian Ramadhan", accountNumber: "1234567890" },
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

export default function EventInvitationClient({ 
  id, 
  initialData, 
  forceOpen = false,
  viewMode = "desktop",
  orientation = "portrait",
  dbId,
  onSectionSelect,
  selectedSection
}: { 
  id: string, 
  initialData?: EventInvitationData, 
  forceOpen?: boolean,
  viewMode?: "mobile" | "tablet" | "desktop",
  orientation?: "portrait" | "landscape",
  dbId?: string,
  onSectionSelect?: (section: any) => void,
  selectedSection?: string
}) {
  const [opened, setOpened] = useState(forceOpen);
  const [isOpening, setIsOpening] = useState(false);
  
  const data = useMemo(() => {
    if (!initialData) return DEFAULT_EVENT_DATA;
    
    // Deep merge core objects to ensure fallbacks work even for partially edited events
    return {
      ...DEFAULT_EVENT_DATA,
      ...initialData,
      theme: {
        ...DEFAULT_EVENT_DATA.theme,
        ...initialData.theme,
        fontHeading: { ...DEFAULT_EVENT_DATA.theme.fontHeading, ...initialData.theme?.fontHeading },
        fontBody: { ...DEFAULT_EVENT_DATA.theme.fontBody, ...initialData.theme?.fontBody },
      },
      organizers: initialData.organizers || DEFAULT_EVENT_DATA.organizers,
      events: initialData.events || DEFAULT_EVENT_DATA.events,
      gallery: initialData.gallery || DEFAULT_EVENT_DATA.gallery,
      story: initialData.story || DEFAULT_EVENT_DATA.story,
      gift: {
        ...DEFAULT_EVENT_DATA.gift,
        ...initialData.gift,
        banks: initialData.gift?.banks || DEFAULT_EVENT_DATA.gift?.banks,
      },
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

  const handleOpen = () => {
    if (onSectionSelect) {
      onSectionSelect('general');
    } else {
      setIsOpening(true);
      setTimeout(() => {
        setOpened(true);
        setIsOpening(false);
      }, 1500); // Animation duration
    }
  };

  return (
    <div 
      className={`invite-root view-${viewMode} orient-${orientation} tpl-${currentTemplate} type-${data.eventType}`} 
      style={{
        ...themeStyles,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <aside className="invite-left">
        <div className="invite-left-bg" style={{ backgroundImage: `url(${data.sideImage || data.gallery?.[0] || DEFAULT_EVENT_DATA.gallery?.[0]})` }} />
        <div className="invite-left-overlay">
          <div className="invite-left-content" onClick={() => onSectionSelect?.('general')} style={{ cursor: onSectionSelect ? 'pointer' : 'default' }}>
            <p className="invite-left-tag">{data.eventType.toUpperCase()} INVITATION</p>
            <h2 className="invite-left-names">
              {data.title}
            </h2>
            <p className="invite-left-date">
              {data.events[0]?.date || "Event Date"}
            </p>
            {data.hashtag && <p className="invite-left-hashtag">{data.hashtag}</p>}
          </div>
        </div>
      </aside>

      <main className="invite-right" ref={rightPanelRef}>
        {!opened ? (
          <div 
            className="invite-envelope" 
            style={{
              backgroundImage: data.envelopeImage ? `linear-gradient(rgba(250,247,242,0.8), rgba(250,247,242,0.8)), url(${data.envelopeImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Animated Envelope Wrapper */}
            <div className="env-wrapper">
               {/* Subtle Glow */}
               <motion.div 
                 className="env-glow"
                 animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
                 transition={{ duration: 4, repeat: Infinity }}
               />

               {/* Flap */}
               <motion.div 
                 className="env-flap"
                 animate={isOpening ? { rotateX: 160, zIndex: 1, filter: "brightness(0.95)" } : { rotateX: 0, zIndex: 4 }}
                 transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
               />
               
               {/* Card (Slides Up with floating effect) */}
               <motion.div 
                 className="env-card"
                 animate={isOpening ? { y: -160, x: 2, rotate: -1, scale: 1.02 } : { y: 0, x: 0, rotate: 0, scale: 1 }}
                 transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               >
                  <img src="/Main-logo.svg" alt="" className="env-card-logo" />
                  <p className="env-card-names">{data.title}</p>
               </motion.div>

               {/* Envelope Body */}
               <div className="env-body" />
            </div>

            <div className="z-10 text-center space-y-6">
              <div className="space-y-1">
                <p className="envelope-greeting">{data.greeting}</p>
                <p className="envelope-name">{data.guestName}</p>
              </div>
              
              <button 
                className={cn(
                  "envelope-btn transition-all duration-700",
                  isOpening && "opacity-0 translate-y-4 pointer-events-none"
                )}
                onClick={handleOpen}
              >
                Buka Undangan
              </button>
              
              <p className={cn("envelope-sub transition-opacity duration-700", isOpening && "opacity-0")}>
                Momen spesial segera dimulai
              </p>
            </div>
          </div>
        ) : (
          <motion.div 
            className="invite-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <SectionWrapper id="general" active={selectedSection === 'general'} onClick={onSectionSelect}>
               <HeroSection data={data as any} />
            </SectionWrapper>

            {data.layout?.showOrganizers && data.organizers && data.organizers.length > 0 && (
               <SectionWrapper id="organizers" active={selectedSection === 'organizers'} onClick={onSectionSelect}>
                  <OrganizersSection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showCountdown && (
               <SectionWrapper id="layout" active={selectedSection === 'layout'} onClick={onSectionSelect}>
                  <CountdownSection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showEvents && (
               <SectionWrapper id="events" active={selectedSection === 'events'} onClick={onSectionSelect}>
                  <EventDetailsSection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showDresscode && data.dresscode && (
               <SectionWrapper id="dresscode" active={selectedSection === 'dresscode'} onClick={onSectionSelect}>
                  <DresscodeSection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showGallery && data.gallery && data.gallery.length > 0 && (
               <SectionWrapper id="gallery" active={selectedSection === 'gallery'} onClick={onSectionSelect}>
                  <GallerySection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showStory && data.story && data.story.length > 0 && (
               <SectionWrapper id="story" active={selectedSection === 'story'} onClick={onSectionSelect}>
                  <StorySection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showGift && data.gift && (
               <SectionWrapper id="gift" active={selectedSection === 'gift'} onClick={onSectionSelect}>
                  <GiftSection data={data as any} />
               </SectionWrapper>
            )}

            {data.layout?.showRSVP !== false && (
               <SectionWrapper id="general" active={selectedSection === 'general'} onClick={onSectionSelect}>
                  <RSVPSection data={data as any} invitationId={dbId} />
               </SectionWrapper>
            )}
            
            <footer className="invite-footer" onClick={() => onSectionSelect?.('theme')} style={{ cursor: onSectionSelect ? 'pointer' : 'default' }}>
              <p>Made with ♥ by <strong>Baswara</strong></p>
              <p className="invite-footer-sub">Platform Undangan Digital Terbaik di Indonesia</p>
            </footer>
          </div>
        )}
      </main>

      {opened && (
        <div onClick={() => onSectionSelect?.('music')} style={{ cursor: onSectionSelect ? 'pointer' : 'default' }}>
           <MusicPlayer data={data as any} />
        </div>
      )}
    </div>
  );
}

function SectionWrapper({ id, active, onClick, children }: any) {
  if (!onClick) return <>{children}</>;
  return (
    <div 
      onClick={() => onClick(id)}
      className={cn(
        "relative transition-all duration-300 cursor-pointer group",
        active ? "ring-2 ring-primary ring-inset z-10" : "hover:ring-1 hover:ring-primary/30"
      )}
    >
      {active && (
        <div className="absolute top-2 right-2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full z-20 uppercase tracking-widest shadow-lg">
          Editing {id}
        </div>
      )}
      {children}
    </div>
  );
}
