"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { allKlineItems } from "@/lib/summary";

export function LearnClient() {
  const [index, setIndex] = useState(0);
  const item = allKlineItems[index];

  const goPrev = () =>
    setIndex((i) => (i === 0 ? allKlineItems.length - 1 : i - 1));
  const goNext = () =>
    setIndex((i) => (i === allKlineItems.length - 1 ? 0 : i + 1));
  const goRandom = () =>
    setIndex(Math.floor(Math.random() * allKlineItems.length));

  return (
    <div className="space-y-4">
      {/* 顶部导航条 */}
      <div className="flex items-center justify-between">
        <Link href="/" className="btn-secondary px-4 py-2 text-[13px]">
          ← 返回
        </Link>
        <p className="text-[13px] text-[#9a9690]">
          {index + 1} / {allKlineItems.length}
        </p>
      </div>

      {/* 主卡片 */}
      <div className="card overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1fr] lg:items-stretch">

          {/* 左：图片区 */}
          <div className="flex items-center justify-center border-b border-[#ede9e2] bg-[#f7f5f0] p-6 lg:border-b-0 lg:border-r">
            <Image
              src={item.image}
              alt={item.title}
              width={480}
              height={360}
              priority
              className="h-auto w-full max-w-sm rounded-lg"
            />
          </div>

          {/* 右：信息区 */}
          <div className="flex flex-col justify-center px-8 py-8">
            {/* 形态名称 — 视觉主角 */}
            <p className="label">形态名称</p>
            <h2 className="font-display mt-2 text-[34px] font-bold leading-tight text-[#111210]">
              {item.title}
            </h2>

            <div className="divider" />

            {/* 特征 */}
            <div>
              <p className="label">特征</p>
              <div className="mt-3 space-y-2">
                {item.feature.length > 0 ? (
                  item.feature.map((point, i) => (
                    <p key={`${item.id}-f-${i}`} className="text-[14px] leading-7 text-[#3d3d3a]">
                      {point}
                    </p>
                  ))
                ) : (
                  <p className="text-[14px] text-[#b8b4ac]">当前资料未录入特征原文。</p>
                )}
              </div>
            </div>

            {item.note.length > 0 && (
              <>
                <div className="divider" />
                <div>
                  <p className="label">备注</p>
                  <div className="mt-3 space-y-2">
                    {item.note.map((point, i) => (
                      <p key={`${item.id}-n-${i}`} className="text-[14px] leading-7 text-[#3d3d3a]">
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 翻页按钮 */}
      <div className="flex gap-2.5">
        <button onClick={goPrev} className="btn-secondary px-5 py-2.5 text-[14px]">
          上一条
        </button>
        <button onClick={goRandom} className="btn-secondary px-5 py-2.5 text-[14px]">
          随机
        </button>
        <button onClick={goNext} className="btn-primary ml-auto px-6 py-2.5 text-[14px]">
          下一条 →
        </button>
      </div>
    </div>
  );
}
