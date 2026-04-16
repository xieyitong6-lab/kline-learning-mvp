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
          className="mx-0.5 inline-flex min-w-8 items-center justify-center rounded border-b-2 border-zinc-400 px-1.5 py-0.5 text-xs font-medium text-zinc-500"
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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
        <Link
          href="/"
          className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
        >
          返回
        </Link>
        <p className="text-sm font-semibold text-zinc-900">第 {questionNumber} 题</p>
        <p className="text-sm text-zinc-400">
          进度 {questionNumber} / {allKlineItems.length}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
        <SectionCard className="p-4 md:p-5">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <Image
              src={question.image}
              alt={question.title}
              width={760}
              height={560}
              priority
              className="h-auto w-full rounded-lg"
            />
          </div>
        </SectionCard>

        <SectionCard className="p-4 md:p-5">
          <div className="min-h-[360px] md:min-h-[420px]">
            {step === "name" && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">题目一：这是什么形态？</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {titleOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedTitle(option)}
                        className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                          selectedTitle === option
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
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
                  className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  下一步
                </button>
              </div>
            )}

            {step === "fill" && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">题目二：根据特征填空</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    {fillBlankQuestion?.intro ?? "请根据该形态资料中的特征原文完成填空。"}
                  </p>

                  <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-8 text-zinc-700">
                    {fillBlankQuestion?.template
                      ? renderTemplate(fillBlankQuestion.template)
                      : "当前资料尚未录入可用的填空模板。"}
                  </div>

                  <div className="mt-4 space-y-3">
                    {blanks.length > 0 ? (
                      blanks.map((blank) => (
                        <label key={blank.id} className="block">
                          <p className="text-sm text-zinc-600">{blank.label}</p>
                          <input
                            value={blankAnswers[blank.id] ?? ""}
                            onChange={(event) =>
                              setBlankAnswers((current) => ({
                                ...current,
                                [blank.id]: event.target.value,
                              }))
                            }
                            placeholder={blank.placeholder ?? `请输入${blank.label}`}
                            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                          />
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-400">当前资料尚未生成填空题。</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  提交
                </button>
              </div>
            )}

            {step === "result" && (
              <div className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">名称识别</p>
                    <p className={`mt-1.5 text-sm font-medium ${titleCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                      {titleCorrect ? "✓ 回答正确" : "✗ 回答错误"}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">正确答案：{question.title}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">填空反馈</p>
                    <div className="mt-2 space-y-2">
                      {blankFeedback.length > 0 ? (
                        blankFeedback.map((item) => (
                          <div
                            key={item.id}
                            className={`rounded-lg border p-3.5 ${
                              item.correct
                                ? "border-emerald-200 bg-emerald-50"
                                : "border-rose-200 bg-rose-50"
                            }`}
                          >
                            <p className="text-xs font-medium text-zinc-700">{item.label}</p>
                            <p className="mt-1.5 text-sm text-zinc-600">
                              你的答案：{item.userAnswer || "未填写"}
                            </p>
                            <p className="mt-0.5 text-sm text-zinc-600">
                              正确答案：{item.correctAnswers.join(" / ")}
                            </p>
                            <p
                              className={`mt-1 text-xs font-medium ${item.correct ? "text-emerald-700" : "text-rose-700"}`}
                            >
                              {item.correct ? "判定：正确" : "判定：错误"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-zinc-400">当前题目没有填空反馈。</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">解析</p>
                    <p className="mt-1.5 whitespace-pre-line text-sm leading-7 text-zinc-600">
                      {fillBlankQuestion?.explanation || "当前资料没有解析原文。"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
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
