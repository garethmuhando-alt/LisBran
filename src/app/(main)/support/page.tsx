"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Bot, User, Sparkles, Image as ImageIcon, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AISupportPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am the LisBran AI Copilot. Are you a new user looking for help navigating the platform, or a Vendor needing assistance setting up an elite portfolio?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "I can definitely help with that! Is there anything specific you need me to clarify about LisBran's ecosystem?";
      
      const lower = input.toLowerCase();
      if (lower.includes("portfolio") || lower.includes("seller") || lower.includes("vendor")) {
        responseText = "Setting up a top-tier vendor portfolio is key! Here are the best practices on LisBran:\n\n1. **High-Res Media**: Always upload at least 3 crisp images or a background video showing your work. Videos perform 300% better on our platform!\n2. **Clear Pricing & Bio**: Ensure you select the correct Budget tracking tag ($ vs $$$) and write a Bio that directly pitches your value to corporate clients.\n3. **Socials**: Link your Instagram or Github so clients can cross-reference your external reputation.\n\nYou can head back to the Profile tab and tap 'Become a Seller' to launch the Onboarding wizard. Need me to clarify formats?";
      } else if (lower.includes("format") || lower.includes("document") || lower.includes("video") || lower.includes("image")) {
        responseText = "For media uploads, our system currently supports standard Image formats (.PNG, .JPEG, .WEBP) and Videos (.MP4, .MOV). Make sure your files are under 50MB for seamless streaming inside the public client grid without buffering.\n\nBe sure to use 1:1 or 16:9 ratios for the best visual layouts!";
      } else if (lower.includes("navigate") || lower.includes("ui") || lower.includes("where")) {
        responseText = "The UI is split logically to keep you fast:\n\nThe **Home Page** is your main dashboard for finding services.\nThe **Search Engine** helps you filter specific vendors natively across categories.\nThe **Profile Space** accesses your Seller commands, tokens, and active support string hubs.\n\nCan I guide you to a specific service or page?";
      } else if (lower.includes("hi") || lower.includes("hello")) {
        responseText = "Hi there! How can I assist your LisBran journey today? I can teach you our UI layout or give you exact templates for a successful seller profile.";
      }

      const aiMessage = { id: (Date.now() + 1).toString(), sender: "ai", text: responseText };
      setMessages(prev => [...prev, aiMessage]);
    }, 1200);
  };

  return (
    <div className="relative h-screen bg-[#0a0a0a] flex flex-col font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 bg-black/40 backdrop-blur-md border-b border-white/5 relative z-10 w-full md:max-w-2xl md:mx-auto">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white bg-white/5 border border-white/10">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="text-white font-bold flex items-center gap-2">LisBran Copilot <Sparkles className="text-blue-400" size={12}/></h1>
              <p className="text-[10px] text-blue-300/70 tracking-widest uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> System operations online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b border-white/5 relative z-10 w-full md:max-w-2xl md:mx-auto">
        <button onClick={() => setInput("How do I format my portfolio?")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 whitespace-nowrap transition-colors">
          <ImageIcon size={14} className="text-purple-400"/> Formatting Portfolios
        </button>
        <button onClick={() => setInput("How do I navigate the App UI?")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 whitespace-nowrap transition-colors">
          <Sparkles size={14} className="text-blue-400"/> UI Navigation
        </button>
        <button onClick={() => setInput("I want to become a verified seller.")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 whitespace-nowrap transition-colors">
          <Briefcase size={14} className="text-orange-400"/> Vendor Setup
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10 pb-[100px] w-full md:max-w-2xl md:mx-auto">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 w-full max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${msg.sender === 'user' ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-blue-900/30 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]'}`}>
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            
            <div className={`p-4 text-[13px] leading-relaxed rounded-2xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-zinc-800 text-white rounded-tr-sm shadow-xl' : 'bg-blue-500/10 border border-blue-500/20 text-zinc-200 rounded-tl-sm shadow-[0_0_15px_rgba(59,130,246,0.05)]'}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 w-full max-w-[85%]">
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border bg-blue-900/30 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <Bot size={14} />
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-12">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-4 z-20 md:max-w-2xl md:mx-auto md:left-1/2 md:-translate-x-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <div className="bg-[#1a1a1f] border border-white/10 rounded-3xl p-2 flex items-center shadow-2xl">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI about navigation, portfolios..."
            className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none placeholder-zinc-500 text-sm font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-blue-500 rounded-2xl text-white disabled:opacity-50 hover:bg-blue-400 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
