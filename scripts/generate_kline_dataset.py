from __future__ import annotations

import json
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parents[1]
IMAGE_DIR = WORKSPACE / "public" / "images" / "kline"
OUTPUT_FILE = WORKSPACE / "data" / "kline-data.json"


BULLISH_BOTTOM = {
    "早晨十字星",
    "早晨之星",
    "好友反攻",
    "曙光初现",
    "旭日东升",
    "锤头线",
    "倒锤头线",
    "平底钳子线",
    "塔形底",
    "圆底",
    "跳空下降三颗星",
    "连续跳空三阴线",
}

BULLISH_CONTINUATION = {
    "低位并排阳线",
    "低档五阳线",
    "红三兵",
    "冉冉上升形",
    "徐缓上升形",
    "稳步上升形",
    "上升三部曲",
    "多方尖兵",
    "下探上升形",
    "上升两颗星",
    "升势鹤鸦缺口",
    "高位并排阳线",
    "上升抵抗形",
    "弧形线",
}

BEARISH_TOP = {
    "黄昏十字星",
    "黄昏之星",
    "淡友反攻",
    "乌云盖顶",
    "倾盆大雨",
    "三只乌鸦",
    "高档五阴线",
    "下降覆盖线",
    "平顶钳子线",
    "塔形顶",
    "圆顶",
    "双飞乌鸦",
    "高开出逃形",
}

BEARISH_CONTINUATION = {
    "下降抵抗形",
    "下跌三颗星",
    "低档盘旋形",
    "黑三兵",
    "绵绵阴跌形",
    "徐缓下降形",
    "下跌不止形",
    "上升受阻形",
    "上升停顿形",
    "阳线跛脚",
    "下降三部曲",
    "空方尖兵",
    "倒三阳",
    "连续跳空三阳线",
    "连续三阴线",
}

SPECIAL_DESCRIPTIONS = {
    "大阳线": "实体较长的单根阳线，可出现在上涨、整理或止跌后的启动阶段，通常代表买方力量较强。",
    "大阴线": "实体较长的单根阴线，可出现在下跌启动、跌势延续或上涨后的转弱阶段，通常代表卖方力量较强。",
    "小阳线": "实体较小的阳线，单独出现时信号有限，更适合结合前后K线位置和组合关系一起判断。",
    "小阴线": "实体较小的阴线，常出现在整理或趋势中的短暂回撤阶段，需要结合整体走势判断强弱。",
    "十字": "开盘价与收盘价接近，代表多空短暂平衡，出现在不同位置时可能对应不同方向的转折。",
    "长十字": "长十字通常意味着震荡放大、分歧增强，若出现在趋势末端，常被视为转折观察点。",
    "螺旋桨": "实体很小而上下影线很长，表示盘中多空激烈争夺，位置决定其偏多还是偏空。",
    "一字": "开盘、收盘、最高、最低几乎重合，通常意味着价格被强力锁定，常见于极端强弱状态。",
    "T字": "T字线下影明显、收盘回到高位附近，若出现在跌势末端，通常有止跌观察价值。",
    "倒T字": "倒T字线上影明显、收盘回到低位附近，若出现在涨势末端，往往提示上方抛压。",
    "身怀六甲": "长实体包住小实体的经典孕线结构，常出现在趋势运行中，提示原有趋势可能放缓或反转。",
    "穿头破脚": "后一根K线实体完全包住前一根实体，是典型吞没结构，放在趋势末端时信号更强。",
    "揉搓线": "一正一反两根T字线组合，重点看长影线切换方向，常用于观察市场是否出现换手和转折。",
    "镊子线": "两根或多根K线在高点或低点接近同一水平，常被用来确认阶段性阻力或支撑。",
    "尽头线": "大K线后跟随很小的实体，常出现在趋势尾声，提示原趋势动能衰减。",
    "加速度线": "价格运行速度明显加快，往往意味着趋势进入末端冲刺或恐慌阶段，需要警惕反向波动。",
}

SPECIAL_HINTS = {
    "早晨十字星": "先看三根K线结构，再看中间那根十字线是否出现在跌势末端。",
    "黄昏十字星": "和早晨十字星相反，重点观察涨势末端的十字线与后续阴线。",
    "早晨之星": "先阴后小实体再阳线，是典型底部反转三段式。",
    "黄昏之星": "先阳后小实体再阴线，是顶部反转三段式。",
    "锤头线": "先记住小实体加长下影，再判断它是否出现在跌势末端。",
    "倒锤头线": "重点区分长上影和小实体，位置在跌势末端时更有参考价值。",
    "乌云盖顶": "看第二根阴线是否深入前一根阳线实体内部。",
    "曙光初现": "重点看阳线收盘是否深入前一根阴线实体的一半以上。",
    "红三兵": "记忆点是三根连续创新高的小阳线。",
    "三只乌鸦": "记忆点是三根连续走低的阴线，多出现在涨后转弱阶段。",
}


def get_signal_and_category(title: str) -> tuple[str, str, list[str]]:
    if title in BULLISH_BOTTOM:
        return "bullish", "上升和见底", ["看涨信号", "见底信号", "反转形态"]
    if title in BULLISH_CONTINUATION:
        return "bullish", "上升和见底", ["看涨信号", "持续形态"]
    if title in BEARISH_TOP:
        return "bearish", "下跌和滞涨", ["看跌信号", "见顶信号", "反转形态"]
    if title in BEARISH_CONTINUATION:
        return "bearish", "下跌和滞涨", ["看跌信号", "持续形态"]
    return "neutral", "整理", ["整理形态"]


def infer_keywords(title: str, tags: list[str]) -> list[str]:
    keywords: list[str] = list(tags[:2])

    if any(token in title for token in ["阳", "红三兵", "旭日", "曙光", "早晨", "多方"]):
        keywords.append("阳线")
    if any(token in title for token in ["阴", "乌鸦", "乌云", "黄昏", "淡友", "空方"]):
        keywords.append("阴线")
    if "十字" in title or title in {"T字", "倒T字"}:
        keywords.append("十字星")
    if any(token in title for token in ["跳空", "缺口", "并排"]):
        keywords.append("跳空缺口")
    if any(token in title for token in ["反攻", "之星", "盖顶", "锤头", "倒锤头", "穿头破脚", "身怀六甲", "镊子", "塔形", "圆顶", "圆底"]):
        keywords.append("反转形态")
    if any(token in title for token in ["三", "乌鸦", "三兵", "三部曲", "三颗星"]):
        keywords.append("三K线")
    if any(token in title for token in ["并排", "反攻", "镊子", "盖顶", "破脚", "六甲"]):
        keywords.append("双K线")
    if any(token in title for token in ["盘旋", "步曲", "部曲", "冉冉", "徐缓", "稳步", "不止", "弧形", "连续", "加速度"]):
        keywords.append("多K线")
    if any(token in title for token in ["锤头", "T字"]):
        keywords.append("长下影")
    if any(token in title for token in ["倒锤", "倒T", "上升抵抗", "上升受阻", "尽头"]):
        keywords.append("长上影")
    if any(token in title for token in ["盘旋", "十字", "螺旋桨", "小阳", "小阴", "一字"]):
        keywords.append("盘整")
    if "加速度" in title:
        keywords.append("加速")

    deduped: list[str] = []
    for keyword in keywords:
        if keyword not in deduped:
            deduped.append(keyword)

    return deduped[:4] if deduped else ["整理形态"]


def infer_description(title: str, signal: str, category: str, tags: list[str]) -> str:
    if title in SPECIAL_DESCRIPTIONS:
        return SPECIAL_DESCRIPTIONS[title]

    if signal == "bullish":
        if "反转形态" in tags:
            return f"{title}被原始资料归入“{category}”类，常见于下跌末端、止跌区域或上涨初期，用于观察见底或后市转强的概率。"
        return f"{title}被原始资料归入“{category}”类，更多出现在上涨过程中的整理或续涨阶段，通常用于观察后市继续看涨的概率。"

    if signal == "bearish":
        if "见顶信号" in tags:
            return f"{title}被原始资料归入“{category}”类，常见于涨势末端或高位滞涨区域，通常提示见顶或后市转弱。"
        return f"{title}被原始资料归入“{category}”类，更多出现在下跌延续或涨后转弱阶段，用于判断后市继续看跌的概率。"

    return f"{title}被原始资料归入“{category}”类，方向需要结合出现位置、前后K线和趋势环境一起判断。"


def infer_hint(title: str, tags: list[str]) -> str:
    if title in SPECIAL_HINTS:
        return SPECIAL_HINTS[title]

    keywords = infer_keywords(title, tags)
    if "三K线" in keywords:
        return "先数清楚K线根数，再看中间过渡K线和最后确认K线。"
    if "双K线" in keywords:
        return "先比较两根K线的实体包容、并列或反包关系。"
    if "十字星" in keywords:
        return "核心不是方向，而是开收接近与影线长短。"
    if "多K线" in keywords:
        return "先抓整体排列方向，再看是否有跳空、盘旋或加速。"
    return "先看它出现的位置，再结合实体、影线和前后K线关系记忆。"


def infer_difficulty(title: str) -> str:
    if title in {"大阳线", "大阴线", "小阳线", "小阴线", "十字", "长十字", "T字", "倒T字", "锤头线", "倒锤头线", "一字", "螺旋桨"}:
        return "easy"
    if any(token in title for token in ["三部曲", "盘旋", "抵抗", "不止", "加速度", "跛脚", "并排", "身怀六甲", "穿头破脚", "尽头", "弧形"]):
        return "hard"
    return "medium"


def main() -> None:
    records = []

    for image_path in sorted(IMAGE_DIR.glob("*.png"), key=lambda item: item.stem):
        title = image_path.stem
        signal, category, tags = get_signal_and_category(title)
        records.append(
            {
                "id": title,
                "title": title,
                "image": f"/images/kline/{image_path.name}",
                "description": infer_description(title, signal, category, tags),
                "keywords": infer_keywords(title, tags),
                "tags": tags,
                "difficulty": infer_difficulty(title),
                "hint": infer_hint(title, tags),
                "category": category,
                "createdAt": "2026-04-16",
                "updatedAt": "2026-04-16",
            }
        )

    OUTPUT_FILE.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(records)} records -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
