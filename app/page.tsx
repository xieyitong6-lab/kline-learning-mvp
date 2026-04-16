import Link from "next/link";

import { OverviewPanel } from "@/components/overview-panel";
import { PRODUCT_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <h1 className="font-display text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
          {PRODUCT_NAME}
        </h1>

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
