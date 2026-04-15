import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { Pill } from "@/components/pill";
import { SectionCard } from "@/components/section-card";
import { PRODUCT_NAME } from "@/lib/constants";
import { allKlineItems } from "@/lib/summary";

const features = [
  "看图学习：按卡片浏览形态、解析、关键词与记忆提示",
  "看图识别：随机出题，立即反馈对错",
  "关键词辅助记忆：精确匹配、部分命中、漏选提示一目了然",
  "错题复习：自动沉淀未掌握的形态，支持重新练习",
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_380px]">
        <SectionCard className="overflow-hidden p-0">
          <div className="grid gap-6 p-7 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>学习工具网页</Pill>
                <Pill tone="warning">MVP</Pill>
                <Pill>{allKlineItems.length} 条示例资料</Pill>
              </div>
              <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                {PRODUCT_NAME}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                一个面向股票与交易初学者的轻量化网页学习工具，围绕“看图学习、看图识别、关键词强化、错题复习、进度追踪”构建记忆闭环。
              </p>
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
                <Link
                  href="/manage"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  资料管理
                </Link>
              </div>
            </div>
            <div className="rounded-[32px] bg-slate-950 p-5 text-slate-100">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">核心能力</p>
              <div className="mt-5 space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-sm leading-7">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="适合谁"
          description="尤其适合刚接触 K 线、看过资料却总混淆形态的人。"
        >
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            <p>1. 想通过反复看图建立形态印象的初学者</p>
            <p>2. 需要即时反馈和错题复习的人</p>
            <p>3. 想用“实体 + 影线 + 关键词”拆解式记忆的人</p>
          </div>
        </SectionCard>
      </section>

      <OverviewPanel />

      <section className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="学习路径" description="MVP 先把最短闭环做完整。">
          <div className="space-y-3 text-sm leading-7 text-slate-600">
            <p>1. 先在学习页顺序浏览形态</p>
            <p>2. 再去练习页做看图识别</p>
            <p>3. 用关键词点选强化记忆点</p>
            <p>4. 回到错题本做针对复习</p>
          </div>
        </SectionCard>
        <SectionCard title="资料来源" description="当前项目使用本地 JSON 与静态图片。">
          <div className="space-y-3 text-sm leading-7 text-slate-600">
            <p>`data/kline-data.json` 存放结构化资料。</p>
            <p>`public/images/kline/` 存放示例图片。</p>
            <p>后续可平滑扩展到可视化录入或数据库。</p>
          </div>
        </SectionCard>
        <SectionCard title="进度追踪" description="先用 localStorage 完成无账号 MVP。">
          <div className="space-y-3 text-sm leading-7 text-slate-600">
            <p>记录今日题数、正确数、错题数。</p>
            <p>保存最近练习记录和错题集合。</p>
            <p>无需登录，打开即用，方便先验证产品形态。</p>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
