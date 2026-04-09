"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
}

export function Button({ 
  children, 
  variant = "primary", 
  fullWidth = false,
  className,
  onClick,
  disabled,
  type = "button",
  form,
}: ButtonProps) {
  
  const baseStyles = "relative font-semibold rounded-full px-6 py-3 transition-colors overflow-hidden flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-premium text-white shadow-lg shadow-purple-500/25 border border-white/20",
    secondary: "bg-white text-zinc-900 hover:bg-zinc-100",
    outline: "border-2 border-zinc-700 text-white hover:bg-zinc-800",
    ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
}
