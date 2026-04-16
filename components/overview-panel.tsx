"use client";

import { useEffect, useState } from "react";

import { SectionCard } from "@/components/section-card";
import { loadProgress } from "@/lib/storage";

const metricLabels = [
  { key: "attempted", label: "今日练习题数" },
  { key: "correct", label: "正确题数" },
  { key: "incorrect", label: "错题数" },
] as const;

export function OverviewPanel() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    const sync = () => setProgress(loadProgress());
    window.addEventListener("storage", sync);
    sync();
    return () => window.removeEventListener("storage", sync);
  }, []);

  const accuracy =
    progress.attempted === 0
      ? 0
      : Math.round((progress.correct / progress.attempted) * 100);

  return (
    <SectionCard title="今日学习概览">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {metricLabels.map((metric) => (
          <div
            key={metric.key}
            className="rounded-xl border border-white/50 bg-white/45 px-4 py-4 backdrop-blur-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
              {metric.label}
            </p>
            <p className="mt-2.5 font-mono text-2xl font-semibold text-[#2D5A40]">
              {progress[metric.key]}
            </p>
          </div>
        ))}
        <div className="rounded-xl bg-[#4A8C6A] px-4 py-4 shadow-[0_2px_12px_rgba(74,140,106,0.30)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A8D5C0]">
            正确率
          </p>
          <p className="mt-2.5 font-mono text-2xl font-semibold text-white">
            {accuracy}%
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
