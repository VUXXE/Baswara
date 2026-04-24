"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import RoleStep from "@/components/onboarding/RoleStep";
import PreferenceStep from "@/components/onboarding/PreferenceStep";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    theme: "",
  });

  const totalSteps = 3;

  const handleNext = (data: Partial<typeof formData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final submission
      console.log("Onboarding Complete:", updatedData);
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

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
        <ProgressIndicator currentStep={step} totalSteps={totalSteps} />
        
        <div className="min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <WelcomeStep key="step1" onNext={handleNext} initialData={formData} />
            )}
            {step === 2 && (
              <RoleStep key="step2" onNext={handleNext} onBack={handleBack} initialData={formData} />
            )}
            {step === 3 && (
              <PreferenceStep key="step3" onNext={handleNext} onBack={handleBack} initialData={formData} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
