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
      <div className="glass-card flex items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="btn-ghost rounded-lg px-3 py-1.5 text-xs font-medium">
          ← 返回
        </Link>
        <h1 className="font-display text-sm font-semibold text-[#1a2c1e]">学习页</h1>
        <p className="text-xs text-[#6a9a7a]">
          {index + 1} / {allKlineItems.length}
        </p>
      </div>

      {/* 主内容 */}
      <SectionCard className="p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          {/* 左：图片 */}
          <div className="glass-surface overflow-hidden">
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
              <p className="label-tag">形态名称</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#1a2c1e]">
                {item.title}
              </h2>
            </div>

            <div className="glass-divider" />

            <div>
              <p className="label-tag">特征</p>
              <div className="mt-2.5 space-y-2 text-sm leading-7 text-[#3d5a46]">
                {item.feature.length > 0 ? (
                  item.feature.map((point, i) => (
                    <p key={`${item.id}-f-${i}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-[#8abca0]">当前资料未录入特征原文。</p>
                )}
              </div>
            </div>

            <div className="glass-divider" />

            <div>
              <p className="label-tag">备注</p>
              <div className="mt-2.5 space-y-2 text-sm leading-7 text-[#3d5a46]">
                {item.note.length > 0 ? (
                  item.note.map((point, i) => (
                    <p key={`${item.id}-n-${i}`}>{point}</p>
                  ))
                ) : (
                  <p className="text-[#8abca0]">当前资料没有备注原文。</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 翻页按钮 */}
      <div className="flex flex-wrap gap-2.5">
        <button onClick={goPrev} className="btn-ghost rounded-lg px-4 py-2.5 text-sm font-medium">
          上一条
        </button>
        <button onClick={goRandom} className="btn-ghost rounded-lg px-4 py-2.5 text-sm font-medium">
          随机查看
        </button>
        <button onClick={goNext} className="btn-primary rounded-lg px-4 py-2.5 text-sm font-medium">
          下一条
        </button>
      </div>
    </div>
  );
}
