import { SectionCard } from "@/components/section-card";
import { allKlineItems } from "@/lib/summary";

export function ManageClient() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="资料管理"
        description="MVP 阶段采用本地 JSON + public 图片目录的轻量方案，便于快速扩展和部署。"
      >
        <div className="space-y-3 text-sm leading-7 text-slate-600">
          <p>1. 资料文件位于 `data/kline-data.json`。</p>
          <p>2. 图片文件位于 `public/images/kline/`。</p>
          <p>3. 新增资料时，先放图片，再在 JSON 中补一条记录，`image` 字段填站内路径。</p>
          <p>4. 建议保持 `id` 唯一，关键词使用数组，方便练习和错题逻辑复用。</p>
        </div>
      </SectionCard>

      <SectionCard title="字段结构示例">
        <pre className="overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
{`{
  "id": "hammer",
  "title": "锤头线",
  "image": "/images/kline/hammer.svg",
  "description": "形态说明...",
  "keywords": ["小阳线", "下影线"],
  "tags": ["反转", "多头信号"],
  "difficulty": "medium",
  "hint": "长下影线是第一识别点",
  "category": "反转形态",
  "createdAt": "2026-04-01",
  "updatedAt": "2026-04-10"
}`}
        </pre>
      </SectionCard>

      <SectionCard title="当前资料列表" description={`共 ${allKlineItems.length} 条，可直接作为 MVP 演示数据。`}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">标题</th>
                <th className="px-3 py-3">分类</th>
                <th className="px-3 py-3">关键词</th>
                <th className="px-3 py-3">图片</th>
              </tr>
            </thead>
            <tbody>
              {allKlineItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-4 font-mono text-xs text-slate-500">{item.id}</td>
                  <td className="px-3 py-4 font-medium text-slate-900">{item.title}</td>
                  <td className="px-3 py-4 text-slate-600">{item.category}</td>
                  <td className="px-3 py-4 text-slate-600">{item.keywords.join("、")}</td>
                  <td className="px-3 py-4 font-mono text-xs text-slate-500">{item.image}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
