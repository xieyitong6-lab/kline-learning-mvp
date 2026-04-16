export type Difficulty = "easy" | "medium" | "hard";

export type KeywordMatchStatus = "correct" | "partial" | "wrong";

export interface KlineItem {
  id: string;
  title: string;
  image: string;
  description: string;
  feature?: string[];
  meaning?: string;
  note?: string;
  keywords: string[];
  practiceTemplate?: string;
  blanks?: PracticeBlank[];
  tags?: string[];
  difficulty?: Difficulty;
  hint?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PracticeBlank {
  id: string;
  prompt: string;
  answer: string;
  placeholder?: string;
}

export interface PracticeRecord {
  id: string;
  title: string;
  attemptedAt: string;
  titleCorrect: boolean;
  keywordStatus: KeywordMatchStatus;
  selectedKeywords: string[];
}

export interface LearningProgress {
  today: string;
  attempted: number;
  correct: number;
  incorrect: number;
  recentAttempts: PracticeRecord[];
  mistakes: string[];
  mastered: string[];
}

export interface KeywordEvaluationResult {
  status: KeywordMatchStatus;
  selected: string[];
  correct: string[];
  missed: string[];
  matched: string[];
}
