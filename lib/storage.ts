"use client";

import { RECENT_ATTEMPT_LIMIT, STORAGE_KEY } from "@/lib/constants";
import { getTodayKey } from "@/lib/utils";
import type { LearningProgress, PracticeRecord } from "@/types/kline";

export function createDefaultProgress(): LearningProgress {
  return {
    today: getTodayKey(),
    attempted: 0,
    correct: 0,
    incorrect: 0,
    recentAttempts: [],
    mistakes: [],
    mastered: [],
  };
}

export function normalizeProgress(progress?: Partial<LearningProgress>): LearningProgress {
  const today = getTodayKey();

  if (!progress || progress.today !== today) {
    return {
      ...createDefaultProgress(),
      mistakes: progress?.mistakes ?? [],
      mastered: progress?.mastered ?? [],
      recentAttempts: progress?.recentAttempts ?? [],
    };
  }

  return {
    ...createDefaultProgress(),
    ...progress,
    today,
    recentAttempts: progress.recentAttempts ?? [],
    mistakes: progress.mistakes ?? [],
    mastered: progress.mastered ?? [],
  };
}

export function loadProgress() {
  if (typeof window === "undefined") {
    return createDefaultProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return normalizeProgress(raw ? JSON.parse(raw) : undefined);
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(progress: LearningProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordPracticeAttempt(record: PracticeRecord, isCorrect: boolean) {
  const current = loadProgress();
  const nextMistakes = isCorrect
    ? current.mistakes.filter((id) => id !== record.id)
    : Array.from(new Set([record.id, ...current.mistakes]));

  const next = normalizeProgress({
    ...current,
    attempted: current.attempted + 1,
    correct: current.correct + (isCorrect ? 1 : 0),
    incorrect: current.incorrect + (isCorrect ? 0 : 1),
    mistakes: nextMistakes,
    recentAttempts: [record, ...current.recentAttempts].slice(0, RECENT_ATTEMPT_LIMIT),
  });

  saveProgress(next);
  return next;
}

export function clearMistakes() {
  const current = loadProgress();
  const next = normalizeProgress({
    ...current,
    mistakes: [],
  });
  saveProgress(next);
  return next;
}

export function markMistakeMastered(id: string) {
  const current = loadProgress();
  const next = normalizeProgress({
    ...current,
    mistakes: current.mistakes.filter((item) => item !== id),
    mastered: Array.from(new Set([id, ...current.mastered])),
  });
  saveProgress(next);
  return next;
}
