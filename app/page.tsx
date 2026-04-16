import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

const steps = ["先进入学习页看图认识形态", "再到练习页做名称识别和填空", "答错后去错题复习继续强化"];

export default function HomePage() {
  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="glass-card px-8 py-8 md:py-10">
        <h1 className="font-display text-2xl font-semibold text-[#1a2c1e] sm:text-3xl">
          {PRODUCT_NAME}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[#3d5a46]">
          这是一个帮助你通过看图、识别和填空练习记住K线形态的学习工具。
        </p>

        <p className="mt-1 text-sm text-[#6a9a7a]">
          适合刚开始学K线、看过资料但总记不住形态的人使用。
        </p>

        {/* 步骤 */}
        <div className="glass-inner mt-6 px-5 py-5">
          <p className="label-tag">使用步骤</p>
          <ol className="mt-3.5 space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm text-[#2d4a36]">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{
                    background: "linear-gradient(145deg, #52996e, #3a7352)",
                    boxShadow: "0 1px 6px rgba(74,140,106,0.35)",
                  }}
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* 按钮 */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link href="/learn" className="btn-primary rounded-lg px-5 py-2.5 text-sm font-medium">
            开始学习
          </Link>
          <Link href="/practice" className="btn-ghost rounded-lg px-5 py-2.5 text-sm font-medium">
            开始练习
          </Link>
          <Link href="/mistakes" className="btn-ghost rounded-lg px-5 py-2.5 text-sm font-medium">
            错题复习
          </Link>
        </div>
      </section>

      <OverviewPanel />
    </div>
  );
}
