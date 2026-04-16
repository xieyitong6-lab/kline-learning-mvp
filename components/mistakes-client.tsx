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
            className="btn-danger rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            清空错题
          </button>
          <Link
            href="/practice"
            className="btn-primary rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            继续练习
          </Link>
        </div>
      </SectionCard>

      {mistakeItems.length === 0 ? (
        <SectionCard className="py-14 text-center">
          <p className="font-display text-sm font-semibold text-[#1a2c1e]">当前没有错题</p>
          <p className="mt-2 text-sm text-[#6a9a7a]">
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
                  <div className="glass-surface overflow-hidden">
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
                      <h2 className="font-display text-lg font-semibold text-[#1a2c1e]">
                        {item.title}
                      </h2>
                      <Pill tone="danger">待复习</Pill>
                    </div>
                    <p className="mt-2.5 text-sm leading-7 text-[#3d5a46]">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.keywords.map((keyword) => (
                        <Pill key={keyword}>{keyword}</Pill>
                      ))}
                    </div>
                    {lastAttempt && (
                      <div className="glass-inner mt-4 space-y-0.5 px-4 py-3 text-sm text-[#6a9a7a]">
                        <p>最近作答：{formatDateTime(lastAttempt.attemptedAt)}</p>
                        <p>名称判断：{lastAttempt.titleCorrect ? "正确" : "错误"}</p>
                        <p>关键词结果：{lastAttempt.keywordStatus}</p>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <Link
                        href={`/practice?id=${item.id}`}
                        className="btn-primary rounded-lg px-4 py-2.5 text-sm font-medium"
                      >
                        重新练习
                      </Link>
                      <button
                        onClick={() => setProgress(markMistakeMastered(item.id))}
                        className="btn-ghost rounded-lg px-4 py-2.5 text-sm font-medium"
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
