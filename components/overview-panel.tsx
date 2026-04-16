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
    progress.attempted === 0 ? 0 : Math.round((progress.correct / progress.attempted) * 100);

  return (
    <SectionCard title="今日学习概览">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {metricLabels.map((metric) => (
          <div
            key={metric.key}
            className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4"
          >
            <p className="text-xs text-zinc-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">
              {progress[metric.key]}
            </p>
          </div>
        ))}
        <div className="rounded-lg bg-zinc-900 px-4 py-4">
          <p className="text-xs text-zinc-400">正确率</p>
          <p className="mt-2 text-2xl font-semibold text-white">{accuracy}%</p>
        </div>
      </div>
    </SectionCard>
  );
}
