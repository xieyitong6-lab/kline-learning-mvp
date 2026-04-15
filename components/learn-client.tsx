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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_360px]">
      <SectionCard className="overflow-hidden p-0">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <Pill>{item.category ?? "单根K线"}</Pill>
            <Pill tone="warning">{item.difficulty ?? "easy"}</Pill>
            {item.tags?.map((tag) => <Pill key={tag}>{tag}</Pill>)}
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">{item.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{item.description}</p>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.18),_transparent_55%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-5">
            <div className="rounded-[24px] border border-white/80 bg-white p-4 shadow-inner">
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
          <div className="space-y-4">
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">关键词拆解</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <Pill key={keyword} tone="success">
                    {keyword}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-800">记忆提示</p>
              <p className="mt-3 text-sm leading-7 text-amber-900">
                {item.hint ?? "从实体大小和影线特征开始记忆。"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={goPrev}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                上一条
              </button>
              <button
                onClick={goRandom}
                className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800 transition hover:bg-teal-100"
              >
                随机查看
              </button>
              <button
                onClick={goNext}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                下一条
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="学习进度"
        description={`当前第 ${index + 1} / ${allKlineItems.length} 条，建议先顺序看一遍，再使用随机模式强化。`}
      >
        <div className="space-y-4">
          {allKlineItems.map((entry, entryIndex) => (
            <button
              key={entry.id}
              onClick={() => setIndex(entryIndex)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                entryIndex === index
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <p className="font-medium">{entry.title}</p>
              <p className={`mt-1 text-xs ${entryIndex === index ? "text-slate-300" : "text-slate-500"}`}>
                {entry.category}
              </p>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
