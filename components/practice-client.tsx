"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Pill } from "@/components/pill";
import { SectionCard } from "@/components/section-card";
import { recordPracticeAttempt } from "@/lib/storage";
import { allKlineItems, buildTitleOptions, getKlineById } from "@/lib/summary";
import type { KlineItem } from "@/types/kline";

type BlankFeedback = {
  id: number;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

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
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [titleChecked, setTitleChecked] = useState(false);
  const [titleCorrect, setTitleCorrect] = useState(false);
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [blankFeedback, setBlankFeedback] = useState<BlankFeedback[]>([]);

  const titleOptions = useMemo(
    () => question.practice?.nameQuestion.options ?? buildTitleOptions(question.id),
    [question.id, question.practice],
  );
  const blanks = question.practice?.fillBlankQuestion.blanks ?? [];

  const resetForQuestion = (nextQuestion: KlineItem) => {
    setQuestion(nextQuestion);
    setStep(1);
    setSelectedTitle("");
    setTitleChecked(false);
    setTitleCorrect(false);
    setBlankAnswers({});
    setSubmitted(false);
    setBlankFeedback([]);
  };

  const submitTitleStep = () => {
    const correct = selectedTitle === question.title;
    setTitleChecked(true);
    setTitleCorrect(correct);
    setStep(2);
  };

  const submitBlankStep = () => {
    const feedback = blanks.map((blank) => {
      const userAnswer = (blankAnswers[blank.id] ?? "").trim();
      const acceptedAnswers = blank.answer.map((answer) => answer.trim());
      const correctAnswer = acceptedAnswers[0] ?? "";
      return {
        id: blank.id,
        prompt: blank.prompt,
        userAnswer,
        correctAnswer,
        correct: acceptedAnswers.includes(userAnswer),
      };
    });

    const blanksAllCorrect = feedback.every((item) => item.correct);
    setBlankFeedback(feedback);
    setSubmitted(true);

    recordPracticeAttempt(
      {
        id: question.id,
        title: question.title,
        attemptedAt: new Date().toISOString(),
        titleCorrect,
        keywordStatus: blanksAllCorrect ? "correct" : feedback.some((item) => item.correct) ? "partial" : "wrong",
        selectedKeywords: feedback.map((item) => item.userAnswer).filter(Boolean),
      },
      titleCorrect && blanksAllCorrect,
    );
  };

  const handleNextQuestion = () => {
    resetForQuestion(getNextQuestion(null));
  };

  const resultLabel = !submitted
    ? ""
    : blankFeedback.every((item) => item.correct)
      ? "正确"
      : blankFeedback.some((item) => item.correct)
        ? "部分正确"
        : "错误";

  return (
    <div className="space-y-5">
      <SectionCard className="p-5 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(340px,0.95fr)_minmax(360px,1.05fr)] lg:items-start">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Pill>{question.category ?? "练习题"}</Pill>
              {question.difficulty && <Pill tone="warning">{question.difficulty}</Pill>}
              <Pill>{step === 1 ? "步骤一" : "步骤二"}</Pill>
            </div>
            <div className="rounded-[28px] border border-slate-100 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-4">
              <div className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-inner">
                <Image
                  src={question.image}
                  alt={question.title}
                  width={720}
                  height={420}
                  className="h-auto w-full rounded-2xl border border-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {step === 1 && (
              <SectionCard
                title="第一步：看图识别形态名称"
                description="先只做名称识别，不混入其他辅助模块。"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {titleOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedTitle(option)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        selectedTitle === option
                          ? "border-slate-900 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={submitTitleStep}
                  disabled={!selectedTitle}
                  className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  提交名称答案
                </button>
              </SectionCard>
            )}

            {step === 2 && (
              <SectionCard
                title="第二步：结构化描述填空"
                description="根据图形与资料内容完成字段填空，辅助记忆形态结构。"
              >
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  名称判断：
                  {titleChecked
                    ? titleCorrect
                      ? "正确"
                      : `错误，正确答案是「${question.title}」`
                    : "未提交"}
                </div>

                <div className="mt-4 space-y-4">
                    {question.practice?.fillBlankQuestion.intro && (
                      <p className="text-sm leading-7 text-slate-600">
                        {question.practice.fillBlankQuestion.intro}
                      </p>
                    )}

                  {blanks.map((blank) => (
                    <label key={blank.id} className="block">
                      <p className="text-sm leading-7 text-slate-700">{blank.prompt}</p>
                      <input
                        value={blankAnswers[blank.id] ?? ""}
                        onChange={(event) =>
                          setBlankAnswers((current) => ({
                            ...current,
                            [blank.id]: event.target.value,
                          }))
                        }
                        disabled={submitted}
                        placeholder={blank.placeholder ?? "请输入"}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={submitBlankStep}
                    disabled={submitted}
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    提交填空答案
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    下一题
                  </button>
                  <Link
                    href="/mistakes"
                    className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                  >
                    错题本
                  </Link>
                </div>
              </SectionCard>
            )}

            {submitted && (
              <SectionCard title="答题反馈" description="只保留名称判断和填空判定结果。">
                <div className="space-y-4 text-sm leading-7 text-slate-700">
                  <p>
                    名称判断：
                    {titleCorrect ? "正确" : `错误，正确答案是「${question.title}」`}
                  </p>
                  <p>填空结果：{resultLabel}</p>
                  <p>解析：{question.practice?.fillBlankQuestion.explanation ?? "暂无解析。"}</p>

                  <div className="space-y-3">
                    {blankFeedback.map((item, index) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-medium text-slate-900">第 {index + 1} 空</p>
                        <p className="mt-2 text-slate-700">{item.prompt}</p>
                        <p className="mt-2">你的答案：{item.userAnswer || "未填写"}</p>
                        <p>正确答案：{item.correctAnswer}</p>
                        <p className={item.correct ? "text-emerald-700" : "text-rose-700"}>
                          判定：{item.correct ? "正确" : "错误"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionCard>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
