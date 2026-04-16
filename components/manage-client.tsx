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
          <div className="rounded-lg bg-[#F7F7F7] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
              图片目录
            </p>
            <p className="mt-2 font-mono text-sm text-[#111111]">public/images/kline/</p>
          </div>
          <div className="rounded-lg bg-[#F7F7F7] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
              数据文件
            </p>
            <p className="mt-2 font-mono text-sm text-[#111111]">data/kline-data.json</p>
          </div>
        </div>
      </SectionCard>

      {/* 操作步骤 */}
      <SectionCard title="新增一条资料的步骤">
        <ol className="space-y-3.5">
          {addSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm text-[#555555]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-[11px] font-semibold text-[#777777]">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      {/* 模板 */}
      <SectionCard title="可直接复制的资料模板">
        <pre className="overflow-x-auto rounded-lg bg-[#111111] p-5 text-sm leading-7 text-[#CCCCCC]">
          {template}
        </pre>
      </SectionCard>

      {/* 字段说明 */}
      <SectionCard title="字段填写说明">
        <div className="divide-y divide-[#F0F0F0]">
          {fieldDocs.map(({ field, desc }) => (
            <div key={field} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
              <code className="shrink-0 rounded bg-[#F7F7F7] px-2 py-0.5 font-mono text-xs text-[#555555] sm:w-64">
                {field}
              </code>
              <p className="text-sm text-[#666666]">{desc}</p>
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
              <tr className="border-b border-[#F0F0F0]">
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
                  标题
                </th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
                  图片路径
                </th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
                  特征
                </th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
                  备注
                </th>
              </tr>
            </thead>
            <tbody>
              {allKlineItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#F7F7F7] align-top transition-colors hover:bg-[#FAFAFA]"
                >
                  <td className="px-3 py-3 font-medium text-[#111111]">{item.title}</td>
                  <td className="px-3 py-3 font-mono text-xs text-[#AAAAAA]">{item.image}</td>
                  <td className="px-3 py-3 text-[#666666]">{item.feature.length}</td>
                  <td className="px-3 py-3 text-[#666666]">{item.note.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
