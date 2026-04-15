# K线背诵学习小助手

一个基于 Next.js App Router 的轻量化 Web 学习工具 MVP，面向 K 线初学者，支持：

- 看图学习
- 看图识别
- 关键词辅助记忆
- 错题复习
- 学习进度追踪

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- 本地 JSON 数据源
- localStorage 学习记录

## 本地运行

```bash
npm install
npm run dev
```

默认访问：

```bash
http://localhost:3000
```

## 生产构建

```bash
npm run build
npm run start
```

## 资料维护

- 数据文件：`data/kline-data.json`
- 图片目录：`public/images/kline/`
- 默认关键词池：`lib/constants.ts`

每条资料最少包含：

```json
{
  "id": "hammer",
  "title": "锤头线",
  "image": "/images/kline/hammer.svg",
  "description": "形态说明",
  "keywords": ["小阳线", "下影线"]
}
```

## 部署到 Vercel

1. 将仓库推送到 GitHub。
2. 登录 Vercel 并导入仓库。
3. Framework Preset 选择 Next.js。
4. Build Command 保持 `npm run build`。
5. Output 设置保持默认。
6. 部署完成后可直接使用。

注意：

- 图片必须放在 `public/` 下并以 `/images/...` 形式引用。
- 当前 MVP 使用 localStorage，学习记录只保存在用户自己的浏览器里。

## 部署到 Netlify

1. 将仓库推送到 GitHub。
2. 在 Netlify 中新建站点并导入仓库。
3. Build command 使用 `npm run build`。
4. 仓库内已经带有 `netlify.toml` 和 `@netlify/plugin-nextjs`。
5. 导入后按默认设置部署即可，Netlify 会自动处理 Next.js 运行时。

## MVP 说明

- 无需登录即可使用
- 错题本和进度追踪基于 localStorage
- 关键词判定支持精确匹配、部分命中、漏选提示
- 后续可扩展可视化资料录入、题型扩展与云端同步
