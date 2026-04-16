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
    <div className="space-y-6">
      <SectionCard title="你需要修改的两个位置">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5">
            <p className="text-sm text-slate-500">图片目录</p>
            <p className="mt-2 font-mono text-sm text-slate-900">public/images/kline/</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5">
            <p className="text-sm text-slate-500">数据文件</p>
            <p className="mt-2 font-mono text-sm text-slate-900">data/kline-data.json</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="新增一条资料的步骤">
        <div className="space-y-3 text-sm leading-7 text-slate-700">
          <p>第一步：把图片放进 `public/images/kline/`</p>
          <p>第二步：打开 `data/kline-data.json`</p>
          <p>第三步：复制一条模板并修改字段</p>
          <p>第四步：保存后刷新网页查看效果</p>
        </div>
      </SectionCard>

      <SectionCard title="可直接复制的资料模板">
        <pre className="overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
          {template}
        </pre>
      </SectionCard>

      <SectionCard title="字段填写说明">
        <div className="space-y-3 text-sm leading-7 text-slate-700">
          <p>`title` 是形态名称。</p>
          <p>`image` 是图片路径，要对应 `public/images/kline/` 里的真实文件。</p>
          <p>`feature` 必须填写你资料里的“特征”原文，不要改写。</p>
          <p>`note` 必须填写你资料里的“备注”原文，没有可留空数组 `[]`。</p>
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
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-3">标题</th>
                <th className="px-3 py-3">图片路径</th>
                <th className="px-3 py-3">特征条数</th>
                <th className="px-3 py-3">备注条数</th>
              </tr>
            </thead>
            <tbody>
              {allKlineItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-4 font-medium text-slate-900">{item.title}</td>
                  <td className="px-3 py-4 font-mono text-xs text-slate-500">{item.image}</td>
                  <td className="px-3 py-4 text-slate-600">{item.feature.length}</td>
                  <td className="px-3 py-4 text-slate-600">{item.note.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
