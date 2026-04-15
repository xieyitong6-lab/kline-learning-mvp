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
    <div className="space-y-6">
      <SectionCard
        title="错题本"
        description="自动记录未完全答对的题目，你可以重新练习、标记已掌握，或直接清空错题集合。"
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setProgress(clearMistakes())}
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            清空错题
          </button>
          <Link
            href="/practice"
            className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            继续练习
          </Link>
        </div>
      </SectionCard>

      {mistakeItems.length === 0 ? (
        <SectionCard className="text-center">
          <p className="text-lg font-semibold text-slate-900">当前没有错题</p>
          <p className="mt-2 text-sm text-slate-600">完成几轮练习后，这里会自动沉淀需要复习的形态。</p>
        </SectionCard>
      ) : (
        <div className="grid gap-5">
          {mistakeItems.map((item) => {
            const lastAttempt = progress.recentAttempts.find((entry) => entry.id === item.id);

            return (
              <SectionCard key={item.id}>
                <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={240}
                    height={140}
                    className="h-auto w-full rounded-3xl border border-slate-100 bg-slate-50"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
                      <Pill tone="danger">待复习</Pill>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.keywords.map((keyword) => (
                        <Pill key={keyword}>{keyword}</Pill>
                      ))}
                    </div>
                    {lastAttempt && (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                        <p>最近作答：{formatDateTime(lastAttempt.attemptedAt)}</p>
                        <p>名称判断：{lastAttempt.titleCorrect ? "正确" : "错误"}</p>
                        <p>关键词结果：{lastAttempt.keywordStatus}</p>
                      </div>
                    )}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`/practice?id=${item.id}`}
                        className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        重新练习
                      </Link>
                      <button
                        onClick={() => setProgress(markMistakeMastered(item.id))}
                        className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
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
