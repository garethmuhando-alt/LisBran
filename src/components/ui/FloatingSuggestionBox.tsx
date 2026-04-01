"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Star, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingSuggestionBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(236,72,153,0.5)] z-50 cursor-pointer border border-white/20"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Suggestion Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-40 right-6 w-80 bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-50 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Rate a Vendor</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-zinc-400 text-sm">How was your recent service? Your feedback directly impacts vendor tiers.</p>
            
            {/* Interactive Stars */}
            <div className="flex gap-2 justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                >
                  <Star 
                    size={28} 
                    className={cn(
                      "transition-colors", 
                      rating >= star ? "fill-yellow-500 text-yellow-500" : "text-zinc-600"
                    )} 
                  />
                </motion.button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                placeholder="Leave a suggestion or comment..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 min-h-[80px]"
              />
              <button 
                className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
                onClick={() => {
                  setIsOpen(false);
                  setRating(0); // reset
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
