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
        "rounded-2xl border border-[#E2EBE8] bg-white p-6 shadow-[0_1px_4px_rgba(45,90,78,0.06)]",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-sm font-semibold text-[#1A1A1A]">{title}</h2>
          )}
          {description && (
            <p className="mt-1.5 text-sm text-[#7A9D95]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
