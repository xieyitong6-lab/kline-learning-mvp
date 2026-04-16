"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Pill } from "@/components/pill";
import { SectionCard } from "@/components/section-card";
import { DEFAULT_KEYWORD_POOL } from "@/lib/constants";
import { evaluateKeywords } from "@/lib/keyword-evaluator";
import { recordPracticeAttempt } from "@/lib/storage";
import { allKlineItems, buildTitleOptions, getKlineById } from "@/lib/summary";
import type { KlineItem, KeywordEvaluationResult } from "@/types/kline";

function getNextQuestion(forcedId?: string | null): KlineItem {
  if (forcedId) {
    const matched = getKlineById(forcedId);
    if (matched) return matched;
  }
  return allKlineItems[Math.floor(Math.random() * allKlineItems.length)];
}

export function PracticeClient() {
  const searchParams = useSearchParams();
  const presetId = searchParams.get("id");

  const [question, setQuestion] = useState<KlineItem>(() => getNextQuestion(presetId));
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [extraKeywordInput, setExtraKeywordInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleCorrect, setTitleCorrect] = useState(false);
  const [keywordResult, setKeywordResult] = useState<KeywordEvaluationResult | null>(null);

  const titleOptions = useMemo(() => buildTitleOptions(question.id), [question.id]);

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((current) =>
      current.includes(keyword)
        ? current.filter((item) => item !== keyword)
        : [...current, keyword],
    );
  };

  const handleSubmit = () => {
    const inputKeywords = extraKeywordInput
      .split(/[,，]/)
      .map((item) => item.trim())
      .filter(Boolean);
    const combinedKeywords = Array.from(new Set([...selectedKeywords, ...inputKeywords]));
    const result = evaluateKeywords(combinedKeywords, question.keywords);
    const isTitleCorrect = selectedTitle === question.title;
    const isFullyCorrect = isTitleCorrect && result.status === "correct";

    setSubmitted(true);
    setTitleCorrect(isTitleCorrect);
    setKeywordResult(result);

    recordPracticeAttempt(
      {
        id: question.id,
        title: question.title,
        attemptedAt: new Date().toISOString(),
        titleCorrect: isTitleCorrect,
        keywordStatus: result.status,
        selectedKeywords: combinedKeywords,
      },
      isFullyCorrect,
    );
  };

  const handleNextQuestion = () => {
    setQuestion(getNextQuestion(null));
    setSelectedTitle("");
    setSelectedKeywords([]);
    setExtraKeywordInput("");
    setSubmitted(false);
    setTitleCorrect(false);
    setKeywordResult(null);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
      <SectionCard className="overflow-hidden p-0">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <Pill>{question.category ?? "单根K线"}</Pill>
            <Pill tone="warning">{question.difficulty ?? "easy"}</Pill>
            <Pill>随机练习</Pill>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">看图识别 + 关键词记忆</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            先判断形态名称，再选择或补充关键词。只有“名称正确且关键词全部命中”才记为答对。
          </p>
        </div>
        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className="rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.16),_transparent_55%),linear-gradient(180deg,#fff7ed_0%,#f8fafc_100%)] p-5">
              <div className="rounded-[24px] border border-white/80 bg-white p-4 shadow-inner">
                <Image
                  src={question.image}
                  alt={question.title}
                  width={720}
                  height={420}
                  className="h-auto w-full rounded-2xl border border-slate-100"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">题型 1：识别形态名称</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {titleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedTitle(option)}
                    disabled={submitted}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selectedTitle === option
                        ? "border-slate-900 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    } ${submitted ? "cursor-default opacity-90" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">题型 2：关键词辅助记忆</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {DEFAULT_KEYWORD_POOL.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordToggle(keyword)}
                    disabled={submitted}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedKeywords.includes(keyword)
                        ? "border-teal-700 bg-teal-700 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
              <label className="mt-4 block text-sm text-slate-500">
                补充填写关键词（可选，支持中英文逗号）
                <input
                  value={extraKeywordInput}
                  onChange={(event) => setExtraKeywordInput(event.target.value)}
                  disabled={submitted}
                  placeholder="例如：大阳线，下影线"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-400"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <SectionCard
              title="答题操作"
              description="提交后会立即反馈，并自动写入今日统计和错题本。"
              className="bg-slate-950 text-white"
            >
              <button
                onClick={handleSubmit}
                disabled={submitted || !selectedTitle}
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                提交答案
              </button>
              <button
                onClick={handleNextQuestion}
                className="mt-3 w-full rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-900"
              >
                下一题
              </button>
              <Link
                href="/mistakes"
                className="mt-3 block rounded-2xl border border-slate-700 px-4 py-3 text-center text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                打开错题本
              </Link>
            </SectionCard>

            {submitted && keywordResult && (
              <SectionCard
                title={titleCorrect && keywordResult.status === "correct" ? "回答正确" : "答题反馈"}
                description="反馈包含名称判断和关键词匹配结果。"
              >
                <div className="space-y-4 text-sm leading-7 text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">名称判断</p>
                    <p>{titleCorrect ? "名称识别正确。" : `名称识别错误，正确答案是「${question.title}」。`}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">关键词判定</p>
                    <p>
                      当前结果：
                      {keywordResult.status === "correct"
                        ? "全部命中"
                        : keywordResult.status === "partial"
                          ? "部分正确"
                          : "错误"}
                    </p>
                    <p>你选中了：{keywordResult.selected.join("、") || "未选择"}</p>
                    <p>正确答案：{keywordResult.correct.join("、") || "无"}</p>
                    <p>漏掉关键词：{keywordResult.missed.join("、") || "无"}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">解析说明</p>
                    <p className="mt-2">{question.description}</p>
                    {question.feature && question.feature.length > 0 && (
                      <div className="mt-3 space-y-1 text-slate-700">
                        {question.feature.map((point) => (
                          <p key={point}>• {point}</p>
                        ))}
                      </div>
                    )}
                    <p className="mt-3 text-slate-800">
                      技术含义：{question.meaning ?? "请结合前序趋势与后续确认K线综合判断。"}
                    </p>
                    <p className="mt-2 text-amber-800">
                      记忆提示：{question.hint ?? "从实体与影线开始拆解。"}
                    </p>
                    <p className="mt-2 text-slate-600">
                      备注：{question.note ?? "单独记住名字不够，最好把位置和确认方式一起记住。"}
                    </p>
                  </div>
                </div>
              </SectionCard>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="练习说明"
        description="MVP 规则保持简单透明，方便后续扩展到更多题型。"
      >
        <div className="space-y-4 text-sm leading-7 text-slate-600">
          <p>1. 每道题固定围绕一条 K 线资料展开。</p>
          <p>2. 识别题使用选择题，关键词题使用点选为主、输入为辅。</p>
          <p>3. 关键词仅做精确匹配，输入内容会自动 trim、按逗号拆分并去重。</p>
          <p>4. 全部命中判定为正确；部分命中判定为部分正确；完全未命中判定为错误。</p>
        </div>
      </SectionCard>
    </div>
  );
}
