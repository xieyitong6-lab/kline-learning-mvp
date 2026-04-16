import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

const steps = ["先进入学习页看图认识形态", "再到练习页做名称识别和填空", "答错后去错题复习继续强化"];

export default function HomePage() {
  return (
    <div className="space-y-5">
      {/* Hero — 最强玻璃，最有氛围感 */}
      <section className="rounded-2xl border border-white/55 bg-white/62 px-8 py-8 shadow-[0_8px_48px_rgba(45,90,60,0.10)] backdrop-blur-lg md:py-10">
        <h1 className="font-display text-2xl font-semibold text-[#1A2C1E] sm:text-3xl">
          {PRODUCT_NAME}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[#3D5A46]">
          这是一个帮助你通过看图、识别和填空练习记住K线形态的学习工具。
        </p>

        <p className="mt-1 text-sm text-[#6A9A7A]">
          适合刚开始学K线、看过资料但总记不住形态的人使用。
        </p>

        {/* 步骤 — 半透明内嵌面板 */}
        <div className="mt-6 rounded-xl border border-white/50 bg-white/40 px-5 py-5 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6AB88A]">
            使用步骤
          </p>
          <ol className="mt-3.5 space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm text-[#2D4A36]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/80 text-[11px] font-semibold text-[#4A8C6A] shadow-[0_1px_4px_rgba(74,140,106,0.20)]">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* 按钮 */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link
            href="/learn"
            className="rounded-lg bg-[#4A8C6A] px-5 py-2.5 text-sm font-medium text-white shadow-[0_2px_12px_rgba(74,140,106,0.35)] transition-all hover:bg-[#3D7A5A] hover:shadow-[0_4px_16px_rgba(74,140,106,0.40)]"
          >
            开始学习
          </Link>
          <Link
            href="/practice"
            className="rounded-lg border border-white/60 bg-white/50 px-5 py-2.5 text-sm font-medium text-[#2D5A40] backdrop-blur-sm transition-colors hover:bg-white/68"
          >
            开始练习
          </Link>
          <Link
            href="/mistakes"
            className="rounded-lg border border-white/60 bg-white/50 px-5 py-2.5 text-sm font-medium text-[#2D5A40] backdrop-blur-sm transition-colors hover:bg-white/68"
          >
            错题复习
          </Link>
        </div>
      </section>

      <OverviewPanel />
    </div>
  );
}
