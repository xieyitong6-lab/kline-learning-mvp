import { ManageClient } from "@/components/manage-client";

export default function ManagePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Manage</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">资料管理</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          这里不做复杂后台，而是把当前 JSON 资料结构、图片路径和维护方式清楚展示，方便你后续直接扩充题库。
        </p>
      </div>
      <ManageClient />
    </div>
  );
}
