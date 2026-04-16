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
        "rounded-xl border border-[#EBEBEB] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-sm font-semibold text-[#111111]">{title}</h2>
          )}
          {description && (
            <p className="mt-1.5 text-sm text-[#888888]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
