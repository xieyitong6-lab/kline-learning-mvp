import { LearnClient } from "@/components/learn-client";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Learn</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">看图学习</h1>
      </div>
      <LearnClient />
    </div>
  );
}
