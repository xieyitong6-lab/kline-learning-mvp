import { MistakesClient } from "@/components/mistakes-client";

export default function MistakesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Review</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">错题复习</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          错题页会自动聚合未完全掌握的形态，帮助你把注意力放在最需要复习的地方。
        </p>
      </div>
      <MistakesClient />
    </div>
  );
}
