import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

const steps = ["先进入学习页看图认识形态", "再到练习页做名称识别和填空", "答错后去错题复习继续强化"];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <h1 className="font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
          {PRODUCT_NAME}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
          这是一个帮助你通过看图、识别和填空练习记住K线形态的学习工具。
        </p>

        <p className="mt-1 max-w-2xl text-sm text-zinc-400">
          适合刚开始学K线、看过资料但总记不住形态的人使用。
        </p>

        <div className="mt-5 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">使用步骤</p>
          <ol className="mt-3 space-y-2">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            href="/learn"
            className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            开始学习
          </Link>
          <Link
            href="/practice"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            开始练习
          </Link>
          <Link
            href="/mistakes"
            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
          >
            错题复习
          </Link>
        </div>
      </section>

      <OverviewPanel />
    </div>
  );
}
