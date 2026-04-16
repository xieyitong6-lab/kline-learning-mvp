"use client";

import { useEffect, useState } from "react";

import { SectionCard } from "@/components/section-card";
import { loadProgress } from "@/lib/storage";

const metrics = [
  { key: "attempted", label: "今日练习" },
  { key: "correct", label: "回答正确" },
  { key: "incorrect", label: "回答错误" },
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
    <SectionCard title="今日概览">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.key} className="inset px-4 py-4">
            <p className="label">{m.label}</p>
            <p className="mt-2 font-mono text-[32px] font-bold leading-none text-[#111210]">
              {progress[m.key]}
            </p>
          </div>
        ))}

        {/* 正确率：唯一强调色 */}
        <div className="rounded-[10px] bg-[#1a3828] px-4 py-4">
          <p className="label text-[#6aad8a]">正确率</p>
          <p className="mt-2 font-mono text-[32px] font-bold leading-none text-white">
            {accuracy}%
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
