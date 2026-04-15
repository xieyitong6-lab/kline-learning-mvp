import { Suspense } from "react";

import { PracticeClient } from "@/components/practice-client";

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Practice</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">看图识别练习</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          每道题都围绕一张 K 线图展开，先选形态名称，再做关键词辅助记忆。提交后立即得到对错和漏选提示。
        </p>
      </div>
      <Suspense>
        <PracticeClient />
      </Suspense>
    </div>
  );
}
