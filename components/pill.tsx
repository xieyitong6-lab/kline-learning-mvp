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
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "default" &&
          "border border-[rgba(255,255,255,0.55)] bg-[rgba(255,255,255,0.42)] text-[#2d5a40]",
        tone === "success" &&
          "border border-[rgba(74,140,106,0.25)] bg-[rgba(74,140,106,0.12)] text-[#2d5a40]",
        tone === "warning" &&
          "border border-[rgba(196,168,50,0.35)] bg-[rgba(250,240,180,0.50)] text-[#7a5c10]",
        tone === "danger" &&
          "border border-[rgba(252,165,165,0.50)] bg-[rgba(254,226,226,0.55)] text-rose-700",
      )}
    >
      {children}
    </span>
  );
}
