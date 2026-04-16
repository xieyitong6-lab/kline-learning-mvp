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
        "rounded-xl border border-zinc-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && <h2 className="text-base font-semibold text-zinc-900">{title}</h2>}
          {description && <p className="mt-1.5 text-sm text-zinc-500">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
