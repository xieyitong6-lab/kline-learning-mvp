import { ManageClient } from "@/components/manage-client";

export default function ManagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-semibold text-slate-950">资料管理</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          按下面步骤即可新增或修改K线资料。
        </p>
      </div>
      <ManageClient />
    </div>
  );
}
