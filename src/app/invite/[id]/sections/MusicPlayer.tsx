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
      <button className="inv-music-btn" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} title={playing ? "Pause musik" : "Putar musik"}>
        <div className={`inv-music-vinyl${playing ? " playing" : ""}`} />
      </button>
    </div>
  );
}
