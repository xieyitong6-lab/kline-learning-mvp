import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

const steps = ["先进入学习页看图认识形态", "再到练习页做名称识别和填空", "答错后去错题复习继续强化"];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <h1 className="font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
          {PRODUCT_NAME}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          这是一个帮助你通过看图、识别和填空练习记住K线形态的学习工具。
        </p>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
          适合刚开始学K线、看过资料但总记不住形态的人使用。
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5">
          <p className="text-sm font-semibold text-slate-900">怎么使用</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
            {steps.map((step, index) => (
              <p key={step}>
                {index + 1}. {step}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            开始学习
          </Link>
          <Link
            href="/practice"
            className="rounded-2xl border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
          >
            开始练习
          </Link>
          <Link
            href="/mistakes"
            className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
          >
            错题复习
          </Link>
        </div>
      </section>

      <OverviewPanel />
    </div>
  );
}
