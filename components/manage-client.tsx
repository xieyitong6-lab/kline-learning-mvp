import { SectionCard } from "@/components/section-card";
import { allKlineItems } from "@/lib/summary";

const template = `{
  "id": "t-001",
  "title": "T字",
  "image": "/images/kline/T字.png",
  "feature": [
    "开盘价、收盘价、最高价相同，最低价与之有较大距离"
  ],
  "note": [
    "下影线越长，力度越大，信号越可靠"
  ],
  "practice": {
    "fillBlankQuestion": {
      "sourceType": "feature",
      "sourceIndexes": [0],
      "template": "[1]，最低价与之有较大距离",
      "blanks": [
        {
          "id": 1,
          "label": "第 1 空",
          "type": "text",
          "answer": ["开盘价、收盘价、最高价相同"]
        }
      ],
      "explanation": "开盘价、收盘价、最高价相同，最低价与之有较大距离"
    }
  }
}`;

const addSteps = [
  "把图片放进 public/images/kline/",
  "打开 data/kline-data.json",
  "复制下方模板并修改字段",
  "保存后刷新网页查看效果",
];

const fieldDocs = [
  { field: "title", desc: "形态名称，会显示在学习页和练习页。" },
  { field: "image", desc: "图片路径，必须对应 public/images/kline/ 里的真实文件。" },
  { field: "feature", desc: '必须填写资料里的"特征"原文，不要改写。' },
  { field: "note", desc: '必须填写"备注"原文，没有可留空数组 []。' },
  {
    field: "fillBlankQuestion.template",
    desc: "必须基于该条资料的 feature 原文挖空，不要另写新句子。",
  },
  { field: "blanks.answer", desc: "被挖空的正确答案，必须和原文一致。" },
];

export function ManageClient() {
  return (
    <div className="space-y-5">
      {/* 路径说明 */}
      <SectionCard title="你需要修改的两个位置">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-[#EBF4F1] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
              图片目录
            </p>
            <p className="mt-2 font-mono text-sm text-[#2D5A4E]">public/images/kline/</p>
          </div>
          <div className="rounded-xl bg-[#EBF4F1] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
              数据文件
            </p>
            <p className="mt-2 font-mono text-sm text-[#2D5A4E]">data/kline-data.json</p>
          </div>
        </div>
      </SectionCard>

      {/* 操作步骤 */}
      <SectionCard title="新增一条资料的步骤">
        <ol className="space-y-3.5">
          {addSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm text-[#4A5568]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBF4F1] text-[11px] font-semibold text-[#5B9080]">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      {/* 模板 */}
      <SectionCard title="可直接复制的资料模板">
        <pre className="overflow-x-auto rounded-xl bg-[#1A2E28] p-5 text-sm leading-7 text-[#A8D5C8]">
          {template}
        </pre>
      </SectionCard>

      {/* 字段说明 */}
      <SectionCard title="字段填写说明">
        <div className="divide-y divide-[#EBF4F1]">
          {fieldDocs.map(({ field, desc }) => (
            <div key={field} className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-start sm:gap-6">
              <code className="shrink-0 rounded-lg bg-[#EBF4F1] px-2.5 py-1 font-mono text-xs text-[#3D6B5E] sm:w-60">
                {field}
              </code>
              <p className="text-sm text-[#4A5568]">{desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 资料列表 */}
      <SectionCard
        title="当前资料列表"
        description={`当前共有 ${allKlineItems.length} 条资料。`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EBF4F1]">
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                  标题
                </th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                  图片路径
                </th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                  特征
                </th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87B5AC]">
                  备注
                </th>
              </tr>
            </thead>
            <tbody>
              {allKlineItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#F0F6F4] align-top transition-colors hover:bg-[#F8FAF9]"
                >
                  <td className="px-3 py-3 font-medium text-[#1A1A1A]">{item.title}</td>
                  <td className="px-3 py-3 font-mono text-xs text-[#87B5AC]">{item.image}</td>
                  <td className="px-3 py-3 text-[#4A5568]">{item.feature.length}</td>
                  <td className="px-3 py-3 text-[#4A5568]">{item.note.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
