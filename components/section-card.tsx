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
    <section className={cn("glass-card p-6", className)}>
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="font-display text-base font-semibold text-[#1a2c1e]">{title}</h2>
          )}
          {description && (
            <p className="mt-1.5 text-sm text-[#6a9a7a]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
