"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Pill } from "@/components/pill";
import { SectionCard } from "@/components/section-card";
import { clearMistakes, loadProgress, markMistakeMastered } from "@/lib/storage";
import { allKlineItems } from "@/lib/summary";
import { formatDateTime } from "@/lib/utils";

export function MistakesClient() {
  const [progress, setProgress] = useState(loadProgress);
  const mistakeItems = allKlineItems.filter((item) => progress.mistakes.includes(item.id));

  return (
    <div className="space-y-4">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#111210]">错题本</h1>
          <p className="mt-1 text-[13px] text-[#8a8a82]">
            {mistakeItems.length > 0
              ? `共 ${mistakeItems.length} 条待复习`
              : "当前没有错题"}
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => setProgress(clearMistakes())}
            className="btn-danger px-4 py-2 text-[13px]"
          >
            清空错题
          </button>
          <Link href="/practice" className="btn-primary px-4 py-2 text-[13px]">
            继续练习
          </Link>
        </div>
      </div>

      {/* 空状态 */}
      {mistakeItems.length === 0 ? (
        <div className="card py-16 text-center">
          <p className="text-[15px] font-semibold text-[#3d3d3a]">暂无错题</p>
          <p className="mt-2 text-[13px] text-[#9a9690]">
            完成几轮练习后，这里会自动记录需要复习的形态。
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {mistakeItems.map((item) => {
            const lastAttempt = progress.recentAttempts.find((e) => e.id === item.id);

            return (
              <div key={item.id} className="card overflow-hidden">
                <div className="grid lg:grid-cols-[200px_1fr]">
                  {/* 图片 */}
                  <div className="flex items-center justify-center border-b border-[#ede9e2] bg-[#f7f5f0] p-4 lg:border-b-0 lg:border-r">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={140}
                      className="h-auto w-full rounded-md"
                    />
                  </div>

                  {/* 内容 */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-display text-[22px] font-bold text-[#111210]">
                        {item.title}
                      </h2>
                      <Pill tone="danger">待复习</Pill>
                    </div>

                    {item.keywords && item.keywords.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.keywords.map((kw) => (
                          <Pill key={kw}>{kw}</Pill>
                        ))}
                      </div>
                    )}

                    {lastAttempt && (
                      <div className="inset mt-4 px-4 py-3">
                        <p className="text-[12px] text-[#9a9690]">
                          最近作答：{formatDateTime(lastAttempt.attemptedAt)}
                        </p>
                        <p className="text-[12px] text-[#9a9690]">
                          名称判断：{lastAttempt.titleCorrect ? "正确" : "错误"} ·
                          关键词：{lastAttempt.keywordStatus}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2.5">
                      <Link
                        href={`/practice?id=${item.id}`}
                        className="btn-primary px-5 py-2.5 text-[13px]"
                      >
                        重新练习
                      </Link>
                      <button
                        onClick={() => setProgress(markMistakeMastered(item.id))}
                        className="btn-secondary px-5 py-2.5 text-[13px]"
                      >
                        标记已掌握
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
