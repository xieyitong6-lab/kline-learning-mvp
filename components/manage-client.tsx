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
          <div className="glass-inner px-4 py-4">
            <p className="label-tag">图片目录</p>
            <p className="mt-2 font-mono text-sm text-[#2d5a40]">public/images/kline/</p>
          </div>
          <div className="glass-inner px-4 py-4">
            <p className="label-tag">数据文件</p>
            <p className="mt-2 font-mono text-sm text-[#2d5a40]">data/kline-data.json</p>
          </div>
        </div>
      </SectionCard>

      {/* 操作步骤 */}
      <SectionCard title="新增一条资料的步骤">
        <ol className="space-y-3.5">
          {addSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm text-[#3d5a46]">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{
                  background: "linear-gradient(145deg, #52996e, #3a7352)",
                  boxShadow: "0 1px 4px rgba(74,140,106,0.30)",
                }}
              >
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      {/* 模板 */}
      <SectionCard title="可直接复制的资料模板">
        <pre
          className="overflow-x-auto rounded-xl p-5 text-sm leading-7"
          style={{
            background:
              "linear-gradient(145deg, rgba(20,42,32,0.95) 0%, rgba(16,36,26,0.98) 100%)",
            color: "#9dd5c0",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {template}
        </pre>
      </SectionCard>

      {/* 字段说明 */}
      <SectionCard title="字段填写说明">
        <div className="divide-y divide-[rgba(255,255,255,0.30)]">
          {fieldDocs.map(({ field, desc }) => (
            <div
              key={field}
              className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-start sm:gap-6"
            >
              <code
                className="shrink-0 rounded-lg px-2.5 py-1 font-mono text-xs text-[#2d5a40] sm:w-60"
                style={{
                  background: "rgba(255,255,255,0.42)",
                  border: "1px solid rgba(255,255,255,0.55)",
                }}
              >
                {field}
              </code>
              <p className="text-sm text-[#3d5a46]">{desc}</p>
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
              <tr className="border-b border-[rgba(255,255,255,0.30)]">
                {["标题", "图片路径", "特征", "备注"].map((h) => (
                  <th key={h} className="px-3 py-2.5">
                    <span className="label-tag">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allKlineItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[rgba(255,255,255,0.22)] align-top transition-colors hover:bg-[rgba(255,255,255,0.18)]"
                >
                  <td className="px-3 py-3 font-medium text-[#1a2c1e]">{item.title}</td>
                  <td className="px-3 py-3 font-mono text-xs text-[#5a9e78]">{item.image}</td>
                  <td className="px-3 py-3 text-[#3d5a46]">{item.feature.length}</td>
                  <td className="px-3 py-3 text-[#3d5a46]">{item.note.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
