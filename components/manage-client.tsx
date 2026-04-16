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

export function ManageClient() {
  return (
    <div className="space-y-5">
      <SectionCard title="你需要修改的两个位置">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
            <p className="text-xs text-zinc-400">图片目录</p>
            <p className="mt-1.5 font-mono text-sm text-zinc-900">public/images/kline/</p>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
            <p className="text-xs text-zinc-400">数据文件</p>
            <p className="mt-1.5 font-mono text-sm text-zinc-900">data/kline-data.json</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="新增一条资料的步骤">
        <ol className="space-y-2">
          {[
            "把图片放进 `public/images/kline/`",
            "打开 `data/kline-data.json`",
            "复制一条模板并修改字段",
            "保存后刷新网页查看效果",
          ].map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm text-zinc-600">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-500">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="可直接复制的资料模板">
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm leading-7 text-zinc-100">
          {template}
        </pre>
      </SectionCard>

      <SectionCard title="字段填写说明">
        <div className="space-y-2 text-sm leading-7 text-zinc-600">
          <p>`title` 是形态名称。</p>
          <p>`image` 是图片路径，要对应 `public/images/kline/` 里的真实文件。</p>
          <p>`feature` 必须填写你资料里的"特征"原文，不要改写。</p>
          <p>`note` 必须填写你资料里的"备注"原文，没有可留空数组 `[]`。</p>
          <p>`fillBlankQuestion.template` 必须基于该条资料的 `feature` 原文挖空，不要另写新句子。</p>
          <p>`blanks.answer` 是被挖空的正确答案，必须和原文一致。</p>
        </div>
      </SectionCard>

      <SectionCard
        title="当前资料列表"
        description={`当前共有 ${allKlineItems.length} 条资料。`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">标题</th>
                <th className="px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">图片路径</th>
                <th className="px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">特征条数</th>
                <th className="px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">备注条数</th>
              </tr>
            </thead>
            <tbody>
              {allKlineItems.map((item) => (
                <tr key={item.id} className="border-b border-zinc-100 align-top hover:bg-zinc-50">
                  <td className="px-3 py-3 font-medium text-zinc-900">{item.title}</td>
                  <td className="px-3 py-3 font-mono text-xs text-zinc-400">{item.image}</td>
                  <td className="px-3 py-3 text-zinc-600">{item.feature.length}</td>
                  <td className="px-3 py-3 text-zinc-600">{item.note.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
