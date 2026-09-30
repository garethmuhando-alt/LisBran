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

const variants = {
  primary: "bg-cord text-cord-ink hover:brightness-110",
  secondary: "bg-ink text-ground hover:bg-cord hover:text-cord-ink",
  outline: "border-[1.5px] border-rod text-ink hover:bg-ink hover:text-ground",
  ghost: "text-ink-2 hover:text-ink hover:bg-surface",
};

export function Button({ children, variant = "primary", fullWidth = false, className, onClick, disabled, type = "button", form }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 font-bold transition disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    >
      {children}
    </button>
  );
}
