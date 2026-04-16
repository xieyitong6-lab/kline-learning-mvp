"use client";

import Image from "next/image";
import { useState } from "react";

import { Pill } from "@/components/pill";
import { SectionCard } from "@/components/section-card";
import { allKlineItems } from "@/lib/summary";

export function LearnClient() {
  const [index, setIndex] = useState(0);
  const item = allKlineItems[index];

  const goPrev = () =>
    setIndex((current) => (current === 0 ? allKlineItems.length - 1 : current - 1));
  const goNext = () =>
    setIndex((current) => (current === allKlineItems.length - 1 ? 0 : current + 1));
  const goRandom = () => setIndex(Math.floor(Math.random() * allKlineItems.length));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-600">
        <span>当前第 {index + 1} / {allKlineItems.length} 条</span>
        {item.difficulty && <Pill tone="warning">{item.difficulty}</Pill>}
      </div>

      <SectionCard className="p-5 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
          <div className="rounded-[28px] border border-slate-100 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-4">
            <div className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-inner">
              <Image
                src={item.image}
                alt={item.title}
                width={720}
                height={420}
                className="h-auto w-full rounded-2xl border border-slate-100"
                priority
              />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>{item.category ?? "形态资料"}</Pill>
                {(item.tags ?? []).slice(0, 2).map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">{item.title}</h2>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">特征</p>
              <div className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                {(item.feature ?? []).map((point) => (
                  <p key={point}>• {point}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">备注</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.note ?? "暂无备注。"}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={goPrev}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          上一条
        </button>
        <button
          onClick={goRandom}
          className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
        >
          随机查看
        </button>
        <button
          onClick={goNext}
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          下一条
        </button>
      </div>
    </div>
  );
}
