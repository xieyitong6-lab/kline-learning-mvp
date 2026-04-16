import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  description,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/55 bg-white/78 p-6 shadow-[0_4px_24px_rgba(45,90,60,0.08)] backdrop-blur",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-sm font-semibold text-[#1A2C1E]">{title}</h2>
          )}
          {description && (
            <p className="mt-1.5 text-sm text-[#6A9A7A]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
