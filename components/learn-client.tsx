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
      {/* 顶部栏 */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#E2EBE8] bg-white px-5 py-3 shadow-[0_1px_4px_rgba(45,90,78,0.06)]">
        <Link
          href="/"
          className="rounded-lg border border-[#C5DDD7] px-3 py-1.5 text-xs font-medium text-[#3D6B5E] transition-colors hover:bg-[#EBF4F1]"
        >
          ← 返回
        </Link>
        <h1 className="text-sm font-semibold text-[#1A1A1A]">学习页</h1>
        <p className="text-xs text-[#87B5AC]">
          {index + 1} / {allKlineItems.length}
        </p>
      </div>

      {/* 主内容 */}
      <SectionCard className="p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          {/* 左：图片 */}
          <div className="overflow-hidden rounded-xl bg-[#EBF4F1]">
            <Image
              src={item.image}
              alt={item.title}
              width={720}
              height={480}
              priority
              className="h-auto w-full"
            />
          </div>

          {/* 右：信息 */}
          <div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                形态名称
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#1A1A1A]">{item.title}</h2>
            </div>

            <div className="my-5 h-px bg-[#EBF4F1]" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                特征
              </p>
              <div className="mt-2.5 space-y-2 text-sm leading-7 text-[#4A5568]">
                {item.feature.length > 0 ? (
                  item.feature.map((point, pointIndex) => (
                    <p key={`${item.id}-feature-${pointIndex}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-[#B8D8D0]">当前资料未录入特征原文。</p>
                )}
              </div>
            </div>

            <div className="my-5 h-px bg-[#EBF4F1]" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                备注
              </p>
              <div className="mt-2.5 space-y-2 text-sm leading-7 text-[#4A5568]">
                {item.note.length > 0 ? (
                  item.note.map((point, pointIndex) => (
                    <p key={`${item.id}-note-${pointIndex}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-[#B8D8D0]">当前资料没有备注原文。</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 翻页按钮 */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={goPrev}
          className="rounded-lg border border-[#C5DDD7] bg-white px-4 py-2.5 text-sm font-medium text-[#3D6B5E] transition-colors hover:bg-[#EBF4F1]"
        >
          上一条
        </button>
        <button
          onClick={goRandom}
          className="rounded-lg border border-[#C5DDD7] bg-white px-4 py-2.5 text-sm font-medium text-[#3D6B5E] transition-colors hover:bg-[#EBF4F1]"
        >
          随机查看
        </button>
        <button
          onClick={goNext}
          className="rounded-lg bg-[#5B9080] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7A6C]"
        >
          下一条
        </button>
      </div>
    </div>
  );
}
