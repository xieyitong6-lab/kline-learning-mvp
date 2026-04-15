import type { KeywordEvaluationResult } from "@/types/kline";

function normalizeKeywords(keywords: string[]) {
  return Array.from(
    new Set(
      keywords
        .flatMap((keyword) => keyword.split(/[,，]/))
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  );
}

export function evaluateKeywords(
  selectedKeywords: string[],
  correctKeywords: string[],
): KeywordEvaluationResult {
  const selected = normalizeKeywords(selectedKeywords);
  const correct = normalizeKeywords(correctKeywords);
  const matched = selected.filter((keyword) => correct.includes(keyword));
  const missed = correct.filter((keyword) => !selected.includes(keyword));

  let status: KeywordEvaluationResult["status"] = "wrong";

  if (matched.length === correct.length && correct.length > 0) {
    status = "correct";
  } else if (matched.length > 0) {
    status = "partial";
  }

  return {
    status,
    selected,
    correct,
    matched,
    missed,
  };
}
