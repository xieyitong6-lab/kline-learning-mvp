"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { SectionCard } from "@/components/section-card";
import { recordPracticeAttempt } from "@/lib/storage";
import { allKlineItems, buildTitleOptions, getKlineById } from "@/lib/summary";
import type { KlineItem, PracticeBlank } from "@/types/kline";

type Step = "name" | "fill" | "result";

type BlankFeedback = {
  id: number;
  label: string;
  userAnswer: string;
  correctAnswers: string[];
  correct: boolean;
};

function getRandomQuestion(forcedId?: string | null): KlineItem {
  if (forcedId) {
    const matched = getKlineById(forcedId);
    if (matched) {
      return matched;
    }
  }

  return allKlineItems[Math.floor(Math.random() * allKlineItems.length)];
}

function normalizeAnswer(value: string) {
  return value.trim().replace(/，/g, ",");
}

function renderTemplate(template: string) {
  return template.split(/(\[\d+\])/g).map((part, index) => {
    if (/^\[\d+\]$/.test(part)) {
      return (
        <span
          key={`${part}-${index}`}
          className="mx-0.5 inline-flex min-w-8 items-center justify-center rounded border-b-2 border-[#6AB88A] px-1.5 py-0.5 text-xs font-medium text-[#4A8C6A]"
        >
          {part}
        </span>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function PracticeClient() {
  const searchParams = useSearchParams();
  const presetId = searchParams.get("id");

  const [question, setQuestion] = useState<KlineItem>(() => getRandomQuestion(presetId));
  const [questionNumber, setQuestionNumber] = useState(1);
  const [step, setStep] = useState<Step>("name");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({});
  const [titleCorrect, setTitleCorrect] = useState(false);
  const [blankFeedback, setBlankFeedback] = useState<BlankFeedback[]>([]);

  const nameQuestion = question.practice?.nameQuestion;
  const fillBlankQuestion = question.practice?.fillBlankQuestion;
  const titleOptions = nameQuestion?.options ?? buildTitleOptions(question.id);
  const blanks: PracticeBlank[] = fillBlankQuestion?.blanks ?? [];

  const resetQuestion = (nextQuestion: KlineItem) => {
    setQuestion(nextQuestion);
    setStep("name");
    setSelectedTitle("");
    setBlankAnswers({});
    setTitleCorrect(false);
    setBlankFeedback([]);
  };

  const handleNextStep = () => {
    setStep("fill");
  };

  const handleSubmit = () => {
    const isTitleCorrect = selectedTitle === question.title;
    const feedback = blanks.map((blank) => {
      const userAnswer = normalizeAnswer(blankAnswers[blank.id] ?? "");
      const correctAnswers = blank.answer.map(normalizeAnswer);

      return {
        id: blank.id,
        label: blank.label,
        userAnswer,
        correctAnswers,
        correct: correctAnswers.includes(userAnswer),
      };
    });

    const allBlankCorrect = feedback.every((item) => item.correct);

    setTitleCorrect(isTitleCorrect);
    setBlankFeedback(feedback);
    setStep("result");

    recordPracticeAttempt(
      {
        id: question.id,
        title: question.title,
        attemptedAt: new Date().toISOString(),
        titleCorrect: isTitleCorrect,
        keywordStatus: allBlankCorrect
          ? "correct"
          : feedback.some((item) => item.correct)
            ? "partial"
            : "wrong",
        selectedKeywords: feedback.map((item) => item.userAnswer).filter(Boolean),
      },
      isTitleCorrect && allBlankCorrect,
    );
  };

  const handleNextQuestion = () => {
    setQuestionNumber((current) => current + 1);
    resetQuestion(getRandomQuestion(null));
  };

  return (
    <div className="space-y-4">
      {/* 顶部栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/55 bg-white/65 px-5 py-3 shadow-[0_2px_16px_rgba(45,90,60,0.07)] backdrop-blur">
        <Link
          href="/"
          className="rounded-lg border border-white/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-[#2D5A40] backdrop-blur-sm transition-colors hover:bg-white/68"
        >
          ← 返回
        </Link>
        <p className="text-sm font-semibold text-[#1A2C1E]">第 {questionNumber} 题</p>
        <p className="text-xs text-[#6A9A7A]">
          {questionNumber} / {allKlineItems.length}
        </p>
      </div>

      {/* 主内容区 */}
      <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
        {/* 左：图片 */}
        <div className="overflow-hidden rounded-2xl border border-white/55 bg-white/80 shadow-[0_4px_24px_rgba(45,90,60,0.08)] backdrop-blur-sm">
          <Image
            src={question.image}
            alt={question.title}
            width={760}
            height={560}
            priority
            className="h-auto w-full"
          />
        </div>

        {/* 右：题目 */}
        <SectionCard className="p-6">
          <div className="min-h-[360px] md:min-h-[420px]">
            {step === "name" && (
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
                    题目一
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-[#1A2C1E]">这是什么形态？</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {titleOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedTitle(option)}
                        className={`rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                          selectedTitle === option
                            ? "border-[#4A8C6A] bg-[#4A8C6A] text-white shadow-[0_2px_10px_rgba(74,140,106,0.30)]"
                            : "border-white/60 bg-white/60 text-[#3D5A46] hover:border-[#A8D5B8] hover:bg-white/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={!selectedTitle}
                  className="rounded-lg bg-[#4A8C6A] px-5 py-2.5 text-sm font-medium text-white shadow-[0_2px_12px_rgba(74,140,106,0.35)] transition-all hover:bg-[#3D7A5A] hover:shadow-[0_4px_16px_rgba(74,140,106,0.40)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  下一步
                </button>
              </div>
            )}

            {step === "fill" && (
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
                    题目二
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-[#1A2C1E]">根据特征填空</p>
                  <p className="mt-2 text-sm leading-6 text-[#6A9A7A]">
                    {fillBlankQuestion?.intro ?? "请根据该形态资料中的特征原文完成填空。"}
                  </p>

                  <div className="mt-3 rounded-xl border border-white/50 bg-white/40 px-4 py-3.5 text-sm leading-8 text-[#3D5A46] backdrop-blur-sm">
                    {fillBlankQuestion?.template
                      ? renderTemplate(fillBlankQuestion.template)
                      : "当前资料尚未录入可用的填空模板。"}
                  </div>

                  <div className="mt-4 space-y-3">
                    {blanks.length > 0 ? (
                      blanks.map((blank) => (
                        <label key={blank.id} className="block">
                          <p className="text-xs text-[#6A9A7A]">{blank.label}</p>
                          <input
                            value={blankAnswers[blank.id] ?? ""}
                            onChange={(event) =>
                              setBlankAnswers((current) => ({
                                ...current,
                                [blank.id]: event.target.value,
                              }))
                            }
                            placeholder={blank.placeholder ?? `请输入${blank.label}`}
                            className="mt-1.5 w-full rounded-lg border border-white/60 bg-white/90 px-3.5 py-2.5 text-sm text-[#1A2C1E] outline-none transition focus:border-[#4A8C6A] focus:bg-white focus:ring-2 focus:ring-[#4A8C6A]/12 placeholder:text-[#A8C8B4]"
                          />
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-[#8ABCA0]">当前资料尚未生成填空题。</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-[#4A8C6A] px-5 py-2.5 text-sm font-medium text-white shadow-[0_2px_12px_rgba(74,140,106,0.35)] transition-all hover:bg-[#3D7A5A] hover:shadow-[0_4px_16px_rgba(74,140,106,0.40)]"
                >
                  提交
                </button>
              </div>
            )}

            {step === "result" && (
              <div className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
                      名称识别
                    </p>
                    <p
                      className={`mt-1.5 text-sm font-medium ${
                        titleCorrect ? "text-[#2D5A40]" : "text-rose-600"
                      }`}
                    >
                      {titleCorrect ? "✓ 回答正确" : "✗ 回答错误"}
                    </p>
                    <p className="mt-0.5 text-sm text-[#6A9A7A]">正确答案：{question.title}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
                      填空反馈
                    </p>
                    <div className="mt-2 space-y-2">
                      {blankFeedback.length > 0 ? (
                        blankFeedback.map((item) => (
                          <div
                            key={item.id}
                            className={`rounded-xl border p-3.5 ${
                              item.correct
                                ? "border-[#A8D5B8]/60 bg-white/50"
                                : "border-rose-200/70 bg-rose-50/70"
                            }`}
                          >
                            <p className="text-xs font-medium text-[#3D5A46]">{item.label}</p>
                            <p className="mt-1.5 text-sm text-[#3D5A46]">
                              你的答案：{item.userAnswer || "未填写"}
                            </p>
                            <p className="mt-0.5 text-sm text-[#3D5A46]">
                              正确答案：{item.correctAnswers.join(" / ")}
                            </p>
                            <p
                              className={`mt-1 text-xs font-medium ${
                                item.correct ? "text-[#2D5A40]" : "text-rose-700"
                              }`}
                            >
                              {item.correct ? "判定：正确" : "判定：错误"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[#8ABCA0]">当前题目没有填空反馈。</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
                      解析
                    </p>
                    <p className="mt-1.5 whitespace-pre-line text-sm leading-7 text-[#3D5A46]">
                      {fillBlankQuestion?.explanation || "当前资料没有解析原文。"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="rounded-lg bg-[#4A8C6A] px-5 py-2.5 text-sm font-medium text-white shadow-[0_2px_12px_rgba(74,140,106,0.35)] transition-all hover:bg-[#3D7A5A] hover:shadow-[0_4px_16px_rgba(74,140,106,0.40)]"
                >
                  下一题
                </button>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
