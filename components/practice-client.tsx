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
    if (matched) return matched;
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
          className="mx-0.5 inline-flex min-w-[2rem] items-center justify-center rounded border-b-2 border-[#1a3828] px-1 py-0.5 text-[12px] font-semibold text-[#1a3828]"
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

  const resetQuestion = (next: KlineItem) => {
    setQuestion(next);
    setStep("name");
    setSelectedTitle("");
    setBlankAnswers({});
    setTitleCorrect(false);
    setBlankFeedback([]);
  };

  const handleSubmit = () => {
    const isTitleCorrect = selectedTitle === question.title;
    const feedback = blanks.map((blank) => {
      const userAnswer = normalizeAnswer(blankAnswers[blank.id] ?? "");
      const correctAnswers = blank.answer.map(normalizeAnswer);
      return { id: blank.id, label: blank.label, userAnswer, correctAnswers, correct: correctAnswers.includes(userAnswer) };
    });

    const allBlankCorrect = feedback.every((f) => f.correct);
    setTitleCorrect(isTitleCorrect);
    setBlankFeedback(feedback);
    setStep("result");

    recordPracticeAttempt(
      {
        id: question.id,
        title: question.title,
        attemptedAt: new Date().toISOString(),
        titleCorrect: isTitleCorrect,
        keywordStatus: allBlankCorrect ? "correct" : feedback.some((f) => f.correct) ? "partial" : "wrong",
        selectedKeywords: feedback.map((f) => f.userAnswer).filter(Boolean),
      },
      isTitleCorrect && allBlankCorrect,
    );
  };

  const handleNextQuestion = () => {
    setQuestionNumber((n) => n + 1);
    resetQuestion(getRandomQuestion(null));
  };

  return (
    <div className="space-y-4">
      {/* 顶部 */}
      <div className="flex items-center justify-between">
        <Link href="/" className="btn-secondary px-4 py-2 text-[13px]">
          ← 返回
        </Link>
        <p className="text-[13px] font-medium text-[#111210]">第 {questionNumber} 题</p>
        <p className="text-[13px] text-[#9a9690]">{questionNumber} / {allKlineItems.length}</p>
      </div>

      {/* 主体 */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-start">

        {/* 左：图片 */}
        <div className="card flex items-center justify-center bg-[#f7f5f0] p-6">
          <Image
            src={question.image}
            alt={question.title}
            width={480}
            height={400}
            priority
            className="h-auto w-full max-w-sm rounded-lg"
          />
        </div>

        {/* 右：题目 */}
        <SectionCard className="p-6">
          <div className="min-h-[380px]">

            {/* ── 步骤一：名称识别 ── */}
            {step === "name" && (
              <div className="space-y-6">
                <div>
                  <p className="label">题目一 · 名称识别</p>
                  <p className="mt-2 text-[18px] font-semibold text-[#111210]">
                    这是什么K线形态？
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {titleOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedTitle(option)}
                      className={`option-btn${selectedTitle === option ? " selected" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep("fill")}
                  disabled={!selectedTitle}
                  className="btn-primary w-full py-3 text-[14px]"
                >
                  下一步
                </button>
              </div>
            )}

            {/* ── 步骤二：填空 ── */}
            {step === "fill" && (
              <div className="space-y-5">
                <div>
                  <p className="label">题目二 · 特征填空</p>
                  <p className="mt-2 text-[18px] font-semibold text-[#111210]">
                    根据特征原文完成填空
                  </p>
                  <p className="mt-1 text-[13px] text-[#8a8a82]">
                    {fillBlankQuestion?.intro ?? "请根据该形态资料中的特征原文完成填空。"}
                  </p>
                </div>

                {/* 模板句 */}
                <div className="inset px-4 py-3.5 text-[14px] leading-8 text-[#3d3d3a]">
                  {fillBlankQuestion?.template
                    ? renderTemplate(fillBlankQuestion.template)
                    : "当前资料尚未录入填空模板。"}
                </div>

                {/* 输入框 */}
                <div className="space-y-3">
                  {blanks.length > 0 ? (
                    blanks.map((blank) => (
                      <label key={blank.id} className="block">
                        <p className="mb-1.5 text-[12px] text-[#8a8a82]">{blank.label}</p>
                        <input
                          value={blankAnswers[blank.id] ?? ""}
                          onChange={(e) =>
                            setBlankAnswers((cur) => ({ ...cur, [blank.id]: e.target.value }))
                          }
                          placeholder={blank.placeholder ?? `请输入${blank.label}`}
                          className="text-input"
                        />
                      </label>
                    ))
                  ) : (
                    <p className="text-[14px] text-[#b8b4ac]">当前资料尚未生成填空题。</p>
                  )}
                </div>

                <button onClick={handleSubmit} className="btn-primary w-full py-3 text-[14px]">
                  提交答案
                </button>
              </div>
            )}

            {/* ── 步骤三：结果 ── */}
            {step === "result" && (
              <div className="space-y-5">
                {/* 名称判断 */}
                <div>
                  <p className="label">名称识别结果</p>
                  <p className={`mt-2 text-[15px] font-semibold ${titleCorrect ? "text-[#15803d]" : "text-[#dc2626]"}`}>
                    {titleCorrect ? "✓ 回答正确" : "✗ 回答错误"}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#8a8a82]">
                    正确答案：{question.title}
                  </p>
                </div>

                <div className="divider" />

                {/* 填空反馈 */}
                <div>
                  <p className="label">填空反馈</p>
                  <div className="mt-3 space-y-2">
                    {blankFeedback.length > 0 ? (
                      blankFeedback.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-lg border p-3.5 ${
                            item.correct
                              ? "border-[#bbf7d0] bg-[#f0fdf4]"
                              : "border-[#fecaca] bg-[#fef2f2]"
                          }`}
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9a9690]">
                            {item.label}
                          </p>
                          <p className="mt-1.5 text-[13px] text-[#3d3d3a]">
                            你的答案：{item.userAnswer || "（未填写）"}
                          </p>
                          <p className="text-[13px] text-[#3d3d3a]">
                            正确答案：{item.correctAnswers.join(" / ")}
                          </p>
                          <p className={`mt-1 text-[12px] font-semibold ${item.correct ? "text-[#15803d]" : "text-[#dc2626]"}`}>
                            {item.correct ? "正确" : "错误"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[14px] text-[#b8b4ac]">当前题目没有填空反馈。</p>
                    )}
                  </div>
                </div>

                {/* 解析 */}
                {fillBlankQuestion?.explanation && (
                  <>
                    <div className="divider" />
                    <div>
                      <p className="label">解析</p>
                      <p className="mt-2 whitespace-pre-line text-[14px] leading-7 text-[#3d3d3a]">
                        {fillBlankQuestion.explanation}
                      </p>
                    </div>
                  </>
                )}

                <button onClick={handleNextQuestion} className="btn-primary w-full py-3 text-[14px]">
                  下一题 →
                </button>
              </div>
            )}

          </div>
        </SectionCard>
      </div>
    </div>
  );
}
