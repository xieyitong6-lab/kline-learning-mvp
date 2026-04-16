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
    <section className={cn("card p-6", className)}>
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-[15px] font-semibold text-[#111210]">{title}</h2>
          )}
          {description && (
            <p className="mt-1.5 text-[13px] text-[#8a8a82]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
