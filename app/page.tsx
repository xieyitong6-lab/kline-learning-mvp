import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

const steps = ["先进入学习页看图认识形态", "再到练习页做名称识别和填空", "答错后去错题复习继续强化"];

export default function HomePage() {
  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[#EBEBEB] bg-white px-8 py-8 shadow-[0_1px_4px_rgba(0,0,0,0.05)] md:py-10">
        <h1 className="font-display text-2xl font-semibold text-[#111111] sm:text-3xl">
          {PRODUCT_NAME}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[#666666]">
          这是一个帮助你通过看图、识别和填空练习记住K线形态的学习工具。
        </p>

        <p className="mt-1 text-sm text-[#AAAAAA]">
          适合刚开始学K线、看过资料但总记不住形态的人使用。
        </p>

        <div className="mt-6 rounded-lg bg-[#F7F7F7] px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">使用步骤</p>
          <ol className="mt-3.5 space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm text-[#555555]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#777777] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link
            href="/learn"
            className="rounded-lg bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
          >
            开始学习
          </Link>
          <Link
            href="/practice"
            className="rounded-lg border border-[#DADADA] bg-white px-4 py-2.5 text-sm font-medium text-[#444444] transition-colors hover:bg-[#F7F7F7]"
          >
            开始练习
          </Link>
          <Link
            href="/mistakes"
            className="rounded-lg border border-[#DADADA] bg-white px-4 py-2.5 text-sm font-medium text-[#444444] transition-colors hover:bg-[#F7F7F7]"
          >
            错题复习
          </Link>
        </div>
      </section>

      <OverviewPanel />
    </div>
  );
}
