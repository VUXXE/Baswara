"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import EventInvitationClient from "@/app/invite/[id]/EventInvitationClient";
import { DeviceBtn } from "./UI";

interface StudioPreviewProps {
  data: any;
  device: "mobile" | "tablet" | "desktop";
  setDevice: (d: any) => void;
  orientation: "portrait" | "landscape";
  setOrientation: (o: any) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeTab: "edit" | "preview";
  selectedSection?: string;
  onSectionSelect?: (section: string) => void;
}

export function StudioPreview({
  data,
  device,
  setDevice,
  orientation,
  setOrientation,
  containerRef,
  activeTab,
  selectedSection,
  onSectionSelect
}: StudioPreviewProps) {
  const [scale, setScale] = useState(1);

  const deviceWidth = device === "mobile" ? (orientation === "portrait" ? 375 : 812) : 
                     device === "tablet" ? (orientation === "portrait" ? 768 : 1024) : 1280;
  const deviceHeight = device === "mobile" ? (orientation === "portrait" ? 812 : 375) : 
                      device === "tablet" ? (orientation === "portrait" ? 1024 : 768) : 800;

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const padding = 80;
      const availableWidth = container.clientWidth - padding;
      const availableHeight = container.clientHeight - (padding + 64);
      
      const scaleX = availableWidth / deviceWidth;
      const scaleY = availableHeight / deviceHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device, orientation, deviceWidth, deviceHeight, containerRef]);

  return (
    <main className="flex-1 bg-[#1a1a1a] relative flex flex-col overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="h-16 flex items-center justify-center border-b border-white/10 bg-white/5 backdrop-blur-xl z-50">
         <div className="flex gap-2 p-1 bg-black/20 rounded-2xl border border-white/5">
            <DeviceBtn active={device === "desktop"} onClick={() => {setDevice("desktop"); setOrientation("landscape")}} icon={<Monitor size={14}/>} label="Desktop" />
            <DeviceBtn active={device === "tablet"} onClick={() => setDevice("tablet")} icon={<Tablet size={14}/>} label="Tablet" />
            <DeviceBtn active={device === "mobile"} onClick={() => setDevice("mobile")} icon={<Smartphone size={14}/>} label="Mobile" />
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
         <motion.div animate={{ scale }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="relative origin-center">
           <div 
             className="bg-[#000] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative transition-all duration-500 border-[12px] border-[#222]"
             style={{ width: `${deviceWidth}px`, height: `${deviceHeight}px`, borderRadius: device === "desktop" ? "0" : "3.5rem" }}
           >
             <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
               <EventInvitationClient 
                 id="preview" 
                 initialData={data} 
                 forceOpen={true} 
                 viewMode={device}
                 orientation={orientation}
                 onSectionSelect={onSectionSelect}
                 selectedSection={selectedSection}
               />
             </div>
           </div>
         </motion.div>
      </div>
    </main>
  );
}
