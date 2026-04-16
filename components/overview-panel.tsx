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
          <div key={metric.key} className="glass-inner px-4 py-4">
            <p className="label-tag">{metric.label}</p>
            <p className="mt-2.5 font-mono text-2xl font-semibold text-[#1a2c1e]">
              {progress[metric.key]}
            </p>
          </div>
        ))}

        {/* 正确率：实心绿，唯一强调色 */}
        <div
          className="rounded-xl px-4 py-4"
          style={{
            background: "linear-gradient(145deg, #52996e 0%, #3a7352 100%)",
            boxShadow:
              "0 4px 20px rgba(74,140,106,0.32), inset 0 1px 0 rgba(255,255,255,0.22)",
          }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: "rgba(200,240,220,0.85)" }}
          >
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
