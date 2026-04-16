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
      <body className="min-h-screen bg-[#F7F7F7] text-[#111111] antialiased">
        <header className="sticky top-0 z-20 border-b border-[#EBEBEB] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-display text-sm font-semibold tracking-tight text-[#111111]"
            >
              {PRODUCT_NAME}
            </Link>
            <nav className="flex flex-wrap items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-sm text-[#888888] transition-colors hover:bg-[#F7F7F7] hover:text-[#111111]"
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
