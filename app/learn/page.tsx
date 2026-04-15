import { LearnClient } from "@/components/learn-client";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Learn</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">看图学习</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          按卡片浏览每条 K 线资料，重点看图片、解析、关键词和记忆提示。建议先顺序浏览，再切换到随机查看。
        </p>
      </div>
      <LearnClient />
    </div>
  );
}
