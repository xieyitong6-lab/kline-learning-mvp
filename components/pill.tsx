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
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        tone === "default" && "bg-[#f0ede8] text-[#5a5a55]",
        tone === "success" && "bg-[#f0fdf4] text-[#15803d]",
        tone === "warning" && "bg-[#fffbeb] text-[#92400e]",
        tone === "danger" && "bg-[#fef2f2] text-[#dc2626]",
      )}
    >
      {children}
    </span>
  );
}
