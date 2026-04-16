"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { SectionCard } from "@/components/section-card";
import { recordPracticeAttempt } from "@/lib/storage";
import { allKlineItems, buildTitleOptions, getKlineById } from "@/lib/summary";
import type { KlineItem, PracticeBlank } from "@/types/kline";

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
          className="mx-1 inline-flex min-w-10 justify-center rounded-md border-b-2 border-slate-400 px-2 py-0.5 text-sm font-medium text-slate-900"
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
  const [selectedTitle, setSelectedTitle] = useState("");
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [titleCorrect, setTitleCorrect] = useState(false);
  const [blankFeedback, setBlankFeedback] = useState<BlankFeedback[]>([]);

  const nameQuestion = question.practice?.nameQuestion;
  const fillBlankQuestion = question.practice?.fillBlankQuestion;
  const titleOptions = nameQuestion?.options ?? buildTitleOptions(question.id);
  const blanks: PracticeBlank[] = fillBlankQuestion?.blanks ?? [];

  const resetQuestion = (nextQuestion: KlineItem) => {
    setQuestion(nextQuestion);
    setSelectedTitle("");
    setBlankAnswers({});
    setSubmitted(false);
    setTitleCorrect(false);
    setBlankFeedback([]);
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

    setSubmitted(true);
    setTitleCorrect(isTitleCorrect);
    setBlankFeedback(feedback);

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
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
        <Link
          href="/"
          className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          返回
        </Link>
        <p className="text-sm text-slate-600">当前题号 {questionNumber}</p>
        <p className="text-sm text-slate-500">
          进度 {questionNumber} / {allKlineItems.length}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
        <SectionCard className="p-5 md:p-6">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-[24px] bg-white p-4 shadow-sm">
              <Image
                src={question.image}
                alt={question.title}
                width={760}
                height={560}
                priority
                className="h-auto w-full rounded-2xl border border-slate-100"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="p-5 md:p-6">
          <div className="space-y-5">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">题目1：这是什么形态？</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {titleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedTitle(option)}
                    disabled={submitted}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      selectedTitle === option
                        ? "border-slate-900 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    } disabled:cursor-not-allowed disabled:opacity-80`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">
                题目2：基于该形态资料中的 feature 原文完成填空
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {fillBlankQuestion?.intro ?? "请根据该形态资料中的特征原文完成填空。"}
              </p>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-8 text-slate-800">
                {fillBlankQuestion?.template
                  ? renderTemplate(fillBlankQuestion.template)
                  : "当前资料尚未录入可用的填空模板。"}
              </div>

              <div className="mt-5 space-y-4">
                {blanks.length > 0 ? (
                  blanks.map((blank) => (
                    <label key={blank.id} className="block">
                      <p className="text-sm text-slate-700">{blank.label}</p>
                      <input
                        value={blankAnswers[blank.id] ?? ""}
                        onChange={(event) =>
                          setBlankAnswers((current) => ({
                            ...current,
                            [blank.id]: event.target.value,
                          }))
                        }
                        disabled={submitted}
                        placeholder={blank.placeholder ?? `请输入${blank.label}`}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 disabled:bg-slate-50"
                      />
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">当前资料尚未生成填空题。</p>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={submitted || !selectedTitle}
                className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                提交答案
              </button>
            </div>

            {submitted && (
              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">反馈</p>
                    <p
                      className={`mt-2 text-sm ${titleCorrect ? "text-emerald-700" : "text-rose-700"}`}
                    >
                      {titleCorrect ? "名称识别正确" : "名称识别错误"}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">正确答案：{question.title}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">每个填空的判定</p>
                    <div className="mt-3 space-y-3">
                      {blankFeedback.length > 0 ? (
                        blankFeedback.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm font-medium text-slate-900">{item.label}</p>
                            <p className="mt-2 text-sm text-slate-600">
                              你的答案：{item.userAnswer || "未填写"}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              正确答案：{item.correctAnswers.join(" / ")}
                            </p>
                            <p
                              className={`mt-1 text-sm ${item.correct ? "text-emerald-700" : "text-rose-700"}`}
                            >
                              {item.correct ? "判定：正确" : "判定：错误"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400">当前题目没有填空反馈。</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">解析</p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">
                      {fillBlankQuestion?.explanation || "当前资料没有解析原文。"}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    下一题
                  </button>
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
