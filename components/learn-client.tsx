"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
        <Link
          href="/"
          className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          返回
        </Link>
        <h1 className="text-lg font-semibold text-slate-950 md:text-xl">学习页</h1>
        <p className="text-sm text-slate-500">
          当前第 {index + 1} / {allKlineItems.length} 条
        </p>
      </div>

      <SectionCard className="p-5 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-[24px] bg-white p-4 shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                width={720}
                height={480}
                priority
                className="h-auto w-full rounded-2xl border border-slate-100"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">形态名称</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">{item.title}</h2>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">特征</p>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                {item.feature.length > 0 ? (
                  item.feature.map((point, pointIndex) => (
                    <p key={`${item.id}-feature-${pointIndex}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-slate-400">当前资料未录入特征原文。</p>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">备注</p>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                {item.note.length > 0 ? (
                  item.note.map((point, pointIndex) => (
                    <p key={`${item.id}-note-${pointIndex}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-slate-400">当前资料没有备注原文。</p>
                )}
              </div>
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
