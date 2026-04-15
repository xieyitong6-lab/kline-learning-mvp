import klineData from "@/data/kline-data.json";
import type { KlineItem } from "@/types/kline";

export const allKlineItems = klineData as KlineItem[];

export function getKlineById(id: string | null) {
  return allKlineItems.find((item) => item.id === id);
}

export function buildTitleOptions(currentId: string) {
  const others = allKlineItems.filter((item) => item.id !== currentId);
  const picked = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  return [...picked, getKlineById(currentId)!]
    .sort(() => Math.random() - 0.5)
    .map((item) => item.title);
}
