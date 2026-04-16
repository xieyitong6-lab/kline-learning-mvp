import { Suspense } from "react";

import { PracticeClient } from "@/components/practice-client";

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Practice</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">看图识别练习</h1>
      </div>
      <Suspense>
        <PracticeClient />
      </Suspense>
    </div>
  );
}
