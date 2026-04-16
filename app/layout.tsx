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
        {/* 光源氛围层 */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(120,190,148,0.55)_0%,transparent_65%)]" />
          <div className="absolute -right-24 -top-24 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(215,198,88,0.48)_0%,transparent_62%)]" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(160,220,185,0.30)_0%,transparent_60%)]" />
        </div>

        {/* 导航 */}
        <header className="sticky top-0 z-20 border-b border-white/40 bg-white/55 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-display text-sm font-semibold tracking-tight text-[#2D5A40]"
            >
              {PRODUCT_NAME}
            </Link>
            <nav className="flex flex-wrap items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-[#4A7A5A] transition-colors hover:bg-white/50 hover:text-[#2D5A40]"
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
