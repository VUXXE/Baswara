"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Loader2, Upload, X } from "lucide-react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
}

export default function ImageUpload({ onUpload, value }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `user-uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (error: any) {
      alert("Error uploading: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <button 
            onClick={() => onUpload("")} 
            className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer group">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
            {uploading ? <Loader2 className="animate-spin text-primary" size={20} /> : <Upload className="text-primary" size={20} />}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider">Upload Image</p>
            <p className="text-[10px] text-muted-foreground">JPG, PNG up to 5MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
