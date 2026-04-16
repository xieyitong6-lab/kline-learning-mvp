import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

const steps = [
  "进入学习页，看图认识形态特征",
  "到练习页做名称识别和填空练习",
  "答错后去错题本复习，继续强化",
];

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <section className="card px-8 py-10 md:py-12">
        {/* 产品名称 — 页面视觉锚点 */}
        <h1 className="font-display text-[44px] font-bold leading-tight tracking-tight text-[#111210] sm:text-[52px]">
          {PRODUCT_NAME}
        </h1>

        {/* 副标题 */}
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#6b6b65]">
          把蜡烛图形态从「看过」变成「记住」
        </p>

        {/* 主要行动按钮 */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/learn" className="btn-primary px-7 py-3 text-[14px]">
            开始学习
          </Link>
          <Link href="/practice" className="btn-secondary px-7 py-3 text-[14px]">
            开始练习
          </Link>
          <Link href="/mistakes" className="btn-secondary px-7 py-3 text-[14px]">
            错题复习
          </Link>
        </div>

        {/* 步骤 — 内嵌次要信息 */}
        <div className="inset mt-8 px-6 py-5">
          <p className="label">使用步骤</p>
          <ol className="mt-4 space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a3828] text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-[14px] leading-6 text-[#4a4a45]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 今日概览 */}
      <OverviewPanel />
    </div>
  );
}
