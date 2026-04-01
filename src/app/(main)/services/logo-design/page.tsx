"use client";

import { useState } from "react";
import { ArrowLeft, Check, Palette, Type, Sparkles, Wand2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Step = 1 | 2 | 3 | 4;

export default function LogoDesignPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  // Form State
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [brandName, setBrandName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const styles = [
    { id: "minimalist", name: "Minimalist", icon: <Wand2 size={24} /> },
    { id: "3d", name: "3D App Logo", icon: <Image src="/icon-graphic.png" alt="3d" width={24} height={24} className="mix-blend-screen" /> },
    { id: "vintage", name: "Vintage", icon: <Sparkles size={24} /> },
    { id: "signature", name: "Signature", icon: <Type size={24} /> },
  ];

  const colors = [
    { id: "monochrome", name: "Monochrome", hex: "bg-zinc-500" },
    { id: "warm", name: "Warm", hex: "bg-orange-500" },
    { id: "cool", name: "Cool", hex: "bg-blue-500" },
    { id: "vibrant", name: "Vibrant", hex: "bg-pink-500" },
    { id: "earthy", name: "Earthy", hex: "bg-emerald-500" }
  ];

  const handleNext = () => {
    if (step < 4) setStep((prev) => (prev + 1) as Step);
    else {
      // Find Designers logic -> Route to search with params
      router.push(`/search/logo-design?style=${selectedStyle}&colors=${selectedColors.join(",")}`);
    }
  };

  const isStepValid = () => {
    if (step === 1) return selectedStyle !== "";
    if (step === 2) return brandName.trim() !== "";
    if (step === 3) return selectedColors.length > 0;
    return true;
  };

  return (
    <div className="relative p-6 pt-12 pb-32 min-h-screen bg-[#141417] overflow-hidden">
      {/* Background Effect */}
      <motion.div 
        animate={{ scale: [1.05, 1.15, 1.05] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => step === 1 ? router.back() : setStep((prev) => (prev - 1) as Step)} 
            className="p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="text-white" size={22} />
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "w-8 bg-pink-500" : "w-4 bg-white/20"}`} />
            ))}
          </div>
        </div>

        {/* Wizard Content */}
        <div className="flex-1 mt-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Logo Style</h1>
                  <p className="text-zinc-400">Select the visual direction that fits your brand.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative p-6 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 border ${
                        selectedStyle === style.id 
                          ? "bg-pink-500/20 border-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
                          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                      }`}
                    >
                      {selectedStyle === style.id && (
                        <div className="absolute top-3 right-3 text-pink-500">
                          <Check size={16} />
                        </div>
                      )}
                      <div className={`p-3 rounded-2xl ${selectedStyle === style.id ? 'bg-pink-500/20' : 'bg-white/5'}`}>
                        {style.icon}
                      </div>
                      <span className="font-bold text-sm text-center">{style.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Brand Details</h1>
                  <p className="text-zinc-400">Tell us what text will appear on your logo.</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Brand Name</label>
                    <input 
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. LisBran Marketplace"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 focus:bg-pink-500/5 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Slogan (Optional)</label>
                    <input 
                      type="text"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      placeholder="e.g. Elevating Brands"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 focus:bg-pink-500/5 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Color Palette</h1>
                  <p className="text-zinc-400">Select up to 2 color palettes you prefer.</p>
                </div>

                <div className="space-y-3">
                  {colors.map((color) => {
                    const isSelected = selectedColors.includes(color.id);
                    return (
                      <button
                        key={color.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedColors(prev => prev.filter(c => c !== color.id));
                          } else if (selectedColors.length < 2) {
                            setSelectedColors(prev => [...prev, color.id]);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                          isSelected 
                            ? "bg-pink-500/10 border-pink-500 text-white" 
                            : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full shadow-inner ${color.hex}`} />
                          <span className="font-bold">{color.name}</span>
                        </div>
                        {isSelected && <Check className="text-pink-500" size={20} />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex flex-col items-center justify-center text-center mt-12"
              >
                <div className="relative w-32 h-32">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-pink-500/50"
                  />
                  <div className="absolute inset-2 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.5)]">
                    <Palette size={40} className="text-white drop-shadow-lg" />
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-black text-white mb-3">Brief Ready!</h1>
                  <p className="text-zinc-400 max-w-xs mx-auto">
                    We'll match your <span className="text-white font-bold">{styles.find(s => s.id === selectedStyle)?.name}</span> logo brief for <span className="text-white font-bold">"{brandName}"</span> with top-tier LisBran designers.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="group relative w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-all overflow-hidden"
          >
            <span className="relative z-10">{step === 4 ? "Find Designers" : "Continue"}</span>
            {step < 4 && (
              <motion.div 
                className="relative z-10"
                whileHover={{ x: 5 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
