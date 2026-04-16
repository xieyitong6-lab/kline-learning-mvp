import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import "./globals.css";
import { PRODUCT_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: PRODUCT_NAME,
  description:
    "一个面向 K 线初学者的学习训练工具，支持看图学习、识别练习、关键词辅助记忆、错题复习与进度追踪。",
};

const navItems = [
  { href: "/", label: "首页" },
  { href: "/learn", label: "学习页" },
  { href: "/practice", label: "练习页" },
  { href: "/mistakes", label: "错题本" },
  { href: "/manage", label: "资料管理" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* 环境光球层 —— 模拟从左上绿光、右上金光、下方冷绿散射 */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* 左上：主绿光源 */}
          <div
            className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(100,188,140,0.52) 0%, rgba(100,188,140,0.15) 45%, transparent 70%)",
            }}
          />
          {/* 右上：金黄暖光 */}
          <div
            className="absolute -right-28 -top-28 h-[480px] w-[480px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(220,195,80,0.48) 0%, rgba(220,195,80,0.12) 42%, transparent 66%)",
            }}
          />
          {/* 底部：淡绿收光 */}
          <div
            className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(140,210,175,0.28) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* 导航 */}
        <header
          className="sticky top-0 z-20"
          style={{
            background: "rgba(210,240,225,0.55)",
            backdropFilter: "blur(18px) saturate(1.4)",
            WebkitBackdropFilter: "blur(18px) saturate(1.4)",
            borderBottom: "1px solid rgba(255,255,255,0.48)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.55), 0 2px 16px rgba(45,90,60,0.07)",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-display text-sm font-semibold tracking-tight text-[#1a2c1e]"
            >
              {PRODUCT_NAME}
            </Link>
            <nav className="flex flex-wrap items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-[#3d5a46] transition-colors hover:bg-[rgba(255,255,255,0.45)] hover:text-[#1a2c1e]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 lg:px-8">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
