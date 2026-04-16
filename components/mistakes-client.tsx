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
    <div className="space-y-5">
      <SectionCard
        title="错题本"
        description="自动记录未完全答对的题目，你可以重新练习、标记已掌握，或直接清空错题集合。"
      >
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setProgress(clearMistakes())}
            className="rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
          >
            清空错题
          </button>
          <Link
            href="/practice"
            className="rounded-lg bg-[#5B9080] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7A6C]"
          >
            继续练习
          </Link>
        </div>
      </SectionCard>

      {mistakeItems.length === 0 ? (
        <SectionCard className="py-14 text-center">
          <p className="text-sm font-semibold text-[#1A1A1A]">当前没有错题</p>
          <p className="mt-2 text-sm text-[#7A9D95]">
            完成几轮练习后，这里会自动沉淀需要复习的形态。
          </p>
        </SectionCard>
      ) : (
        <div className="grid gap-4">
          {mistakeItems.map((item) => {
            const lastAttempt = progress.recentAttempts.find((entry) => entry.id === item.id);

            return (
              <SectionCard key={item.id}>
                <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="overflow-hidden rounded-xl bg-[#EBF4F1]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={240}
                      height={140}
                      className="h-auto w-full"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-lg font-semibold text-[#1A1A1A]">{item.title}</h2>
                      <Pill tone="danger">待复习</Pill>
                    </div>
                    <p className="mt-2.5 text-sm leading-7 text-[#4A5568]">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.keywords.map((keyword) => (
                        <Pill key={keyword}>{keyword}</Pill>
                      ))}
                    </div>
                    {lastAttempt && (
                      <div className="mt-4 space-y-0.5 rounded-xl bg-[#EBF4F1] px-4 py-3 text-sm text-[#7A9D95]">
                        <p>最近作答：{formatDateTime(lastAttempt.attemptedAt)}</p>
                        <p>名称判断：{lastAttempt.titleCorrect ? "正确" : "错误"}</p>
                        <p>关键词结果：{lastAttempt.keywordStatus}</p>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <Link
                        href={`/practice?id=${item.id}`}
                        className="rounded-lg bg-[#5B9080] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7A6C]"
                      >
                        重新练习
                      </Link>
                      <button
                        onClick={() => setProgress(markMistakeMastered(item.id))}
                        className="rounded-lg border border-[#C5DDD7] bg-white px-4 py-2.5 text-sm font-medium text-[#3D6B5E] transition-colors hover:bg-[#EBF4F1]"
                      >
                        标记为已掌握
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
