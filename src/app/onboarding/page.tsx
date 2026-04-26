"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import AccountStep from "@/components/onboarding/AccountStep";
import RoleStep from "@/components/onboarding/RoleStep";
import PreferenceStep from "@/components/onboarding/PreferenceStep";
import SuccessStep from "@/components/onboarding/SuccessStep";
import { supabase } from "@/lib/supabase";
import { DEFAULT_WEDDING_DATA } from "../invite/[id]/WeddingInviteClient";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    theme: "classic",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        email: session.user.email || "",
      }));
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const totalSteps = 5;

  const handleNext = (data: Partial<typeof formData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 5) setStep(step - 1);
  };

  const handleComplete = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 1. Update Profile
      await supabase.from('profiles').upsert({
        id: session.user.id,
        full_name: formData.name,
        updated_at: new Date().toISOString(),
      });

      // 2. Create initial Wedding
      const slug = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-wedding-${Math.floor(Math.random() * 1000)}`;
      
      const weddingData = {
        ...DEFAULT_WEDDING_DATA,
        hashtag: `#${formData.name.replace(/\s+/g, '')}Wedding`,
        theme: {
          ...DEFAULT_WEDDING_DATA.theme,
          primaryColor: formData.theme === 'modern' ? '#3b82f6' : 
                        formData.theme === 'elegant' ? '#1e1b4b' : '#c17a6f'
        }
      };

      const { error } = await supabase.from('weddings').insert({
        user_id: session.user.id,
        slug: slug,
        hashtag: weddingData.hashtag,
        preset_design: formData.theme,
        data: weddingData,
      });

      if (error) throw error;
      router.push("/dashboard");
    } catch (error: any) {
      alert("Error completing onboarding: " + error.message);
    }
  };

  if (loading) return null;

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 py-12 bg-[#fedbdf] overflow-hidden font-sans">
      {/* Texture Overlay (Dots) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#6b1d1d 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Noise Overlay */}
      <div className="noise-overlay opacity-[0.06]" />
      
      {/* Decorative blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed -top-20 -right-20 w-96 h-96 bg-[#fd5e4b]/5 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed -bottom-20 -left-20 w-96 h-96 bg-[#6b1d1d]/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="w-full max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {step < 5 && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProgressIndicator currentStep={step} totalSteps={totalSteps} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <WelcomeStep key="step1" onNext={handleNext} initialData={formData} />
            )}
            {step === 2 && (
              <AccountStep key="step2" onNext={handleNext} onBack={handleBack} initialData={formData} />
            )}
            {step === 3 && (
              <RoleStep key="step3" onNext={handleNext} onBack={handleBack} initialData={formData} />
            )}
            {step === 4 && (
              <PreferenceStep key="step4" onNext={handleNext} onBack={handleBack} initialData={formData} />
            )}
            {step === 5 && (
              <SuccessStep key="step5" onComplete={handleComplete} data={formData} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
