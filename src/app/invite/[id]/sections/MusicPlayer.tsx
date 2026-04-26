"use client";
import { useState, useRef, useEffect } from "react";
import { EventInvitationData } from "@/lib/types";

export default function MusicPlayer({ data }: { data: EventInvitationData }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicUrl = data.music?.url;
  const autoPlay = data.music?.autoPlay;

  useEffect(() => {
    if (musicUrl && audioRef.current) {
      audioRef.current.load();
      if (autoPlay) {
        // Autoplay usually requires user interaction first, 
        // so this might be blocked by browsers until first click.
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setPlaying(true)).catch(() => setPlaying(false));
        }
      }
    }
  }, [musicUrl, autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }

  if (!musicUrl) return null;

  return (
    <div className="inv-music">
      <audio ref={audioRef} loop src={musicUrl} />
      <button 
        className={`inv-music-btn${playing ? " playing" : ""}`} 
        onClick={toggle} 
        aria-label={playing ? "Toggle music" : "Play music"}
        title={playing ? "Matikan musik" : "Putar musik"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {playing ? (
            <path d="M9 18V5l12-2v13" />
          ) : (
            <path d="M5 3l14 9-14 9V3z" />
          )}
        </svg>
      </button>
    </div>
  );
}
