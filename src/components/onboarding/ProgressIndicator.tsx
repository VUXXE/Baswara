"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <div className="flex justify-between mb-3 text-xs uppercase tracking-widest font-medium opacity-60 text-[#6b1d1d]">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="h-1.5 w-full bg-[#6b1d1d]/10 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-[#fd5e4b]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
        
        {/* Decorative markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 pointer-events-none">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full mt-0.5 ${i < currentStep ? 'bg-white/50' : 'bg-[#6b1d1d]/20'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
