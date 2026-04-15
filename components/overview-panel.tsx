"use client";

import { useEffect, useState } from "react";

import { SectionCard } from "@/components/section-card";
import { loadProgress } from "@/lib/storage";

const metricLabels = [
  { key: "attempted", label: "今日题数" },
  { key: "correct", label: "答对题数" },
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
    <SectionCard
      title="今日学习概览"
      description="MVP 阶段使用 localStorage 保存统计、最近记录与错题集合。"
    >
      <div className="grid gap-4 md:grid-cols-4">
        {metricLabels.map((metric) => (
          <div
            key={metric.key}
            className="rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-5"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {progress[metric.key]}
            </p>
          </div>
        ))}
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-5">
          <p className="text-sm text-amber-700">正确率</p>
          <p className="mt-3 text-3xl font-semibold text-amber-900">{accuracy}%</p>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-slate-100">
        最近活动会出现在练习页与错题页；你也可以直接修改 JSON 资料库扩展内容。
      </div>
    </SectionCard>
  );
}
