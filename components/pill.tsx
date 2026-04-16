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
        tone === "default" && "border-[#C5DDD7] bg-[#EBF4F1] text-[#3D6B5E]",
        tone === "success" && "border-[#B8D8D0] bg-[#EBF4F1] text-[#2D5A4E]",
        tone === "warning" && "border-amber-200 bg-amber-50 text-amber-700",
        tone === "danger" && "border-rose-200 bg-rose-50 text-rose-600",
      )}
    >
      {children}
    </span>
  );
}
