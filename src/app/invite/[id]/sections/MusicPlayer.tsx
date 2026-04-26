"use client";
import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Free-use background music via ccmixter / free source
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => { audioRef.current?.pause(); };
  }, []);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  }

  return (
    <div className="inv-music">
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
