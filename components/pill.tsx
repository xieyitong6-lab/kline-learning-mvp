import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PillProps {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
}

export function Pill({ children, tone = "default" }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "default" && "border-[#A8D5B8]/60 bg-white/60 text-[#3D6B5E]",
        tone === "success" && "border-[#A8D5B8]/60 bg-[#4A8C6A]/10 text-[#2D5A40]",
        tone === "warning" && "border-amber-200/70 bg-amber-50/80 text-amber-700",
        tone === "danger" && "border-rose-200/70 bg-rose-50/80 text-rose-600",
      )}
    >
      {children}
    </span>
  );
}
