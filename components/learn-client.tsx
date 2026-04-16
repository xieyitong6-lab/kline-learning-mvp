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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
        <Link
          href="/"
          className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          返回
        </Link>
        <h1 className="text-sm font-semibold text-zinc-900 md:text-base">学习页</h1>
        <p className="text-sm text-zinc-400">
          {index + 1} / {allKlineItems.length}
        </p>
      </div>

      <SectionCard className="p-5 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <Image
              src={item.image}
              alt={item.title}
              width={720}
              height={480}
              priority
              className="h-auto w-full rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">形态名称</p>
              <h2 className="mt-1.5 text-2xl font-semibold text-zinc-900">{item.title}</h2>
            </div>

            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">特征</p>
              <div className="mt-2.5 space-y-2 text-sm leading-7 text-zinc-600">
                {item.feature.length > 0 ? (
                  item.feature.map((point, pointIndex) => (
                    <p key={`${item.id}-feature-${pointIndex}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-zinc-400">当前资料未录入特征原文。</p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">备注</p>
              <div className="mt-2.5 space-y-2 text-sm leading-7 text-zinc-600">
                {item.note.length > 0 ? (
                  item.note.map((point, pointIndex) => (
                    <p key={`${item.id}-note-${pointIndex}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-zinc-400">当前资料没有备注原文。</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={goPrev}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          上一条
        </button>
        <button
          onClick={goRandom}
          className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
        >
          随机查看
        </button>
        <button
          onClick={goNext}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          下一条
        </button>
      </div>
    </div>
  );
}
