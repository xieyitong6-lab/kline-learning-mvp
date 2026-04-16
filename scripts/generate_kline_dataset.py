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


EXACT_KEYWORDS = {
    "大阳线": ["大阳线"],
    "大阴线": ["大阴线"],
    "小阳线": ["小阳线"],
    "小阴线": ["小阴线"],
    "十字": ["十字线"],
    "长十字": ["十字线", "上影线", "下影线"],
    "T字": ["十字线", "下影线", "长下影"],
    "倒T字": ["十字线", "上影线", "长上影"],
    "一字": ["十字线"],
    "螺旋桨": ["十字线", "上影线", "下影线"],
    "早晨十字星": ["大阴线", "十字线", "大阳线", "三K线"],
    "早晨之星": ["大阴线", "小阴线", "大阳线", "三K线"],
    "好友反攻": ["大阴线", "大阳线", "双K线"],
    "曙光初现": ["大阴线", "大阳线", "双K线"],
    "旭日东升": ["大阴线", "大阳线", "双K线"],
    "锤头线": ["小阳线", "下影线", "长下影"],
    "倒锤头线": ["小阳线", "上影线", "长上影"],
    "平底钳子线": ["双K线", "并列", "下影线"],
    "塔形底": ["大阴线", "小阳线", "大阳线", "多K线"],
    "圆底": ["小阳线", "小阴线", "多K线"],
    "红三兵": ["小阳线", "三K线"],
    "三只乌鸦": ["大阴线", "三K线"],
    "黄昏十字星": ["大阳线", "十字线", "大阴线", "三K线"],
    "黄昏之星": ["大阳线", "小阳线", "大阴线", "三K线"],
    "淡友反攻": ["大阳线", "大阴线", "双K线"],
    "乌云盖顶": ["大阳线", "大阴线", "双K线"],
    "倾盆大雨": ["大阳线", "大阴线", "双K线"],
    "下降覆盖线": ["大阳线", "大阴线", "多K线"],
    "平顶钳子线": ["双K线", "并列", "上影线"],
    "塔形顶": ["大阳线", "小阴线", "大阴线", "多K线"],
    "圆顶": ["小阳线", "小阴线", "多K线"],
    "身怀六甲": ["双K线", "包容", "小阳线"],
    "穿头破脚": ["双K线", "包容", "大阳线", "大阴线"],
}


EXACT_FEATURES = {
    "早晨十字星": [
        "出现在下跌途中。",
        "由3根K线组成，第一根为阴线，第二根为十字线，第三根为阳线。",
        "第三根K线实体深入到第一根K线实体之内。",
    ],
    "早晨之星": [
        "出现在下跌途中。",
        "由3根K线组成，第一根为阴线，第二根为小阴线或小阳线，第三根为阳线。",
        "第三根K线实体深入到第一根K线实体之内。",
    ],
    "好友反攻": [
        "出现在下跌行情中。",
        "由一阴一阳两根K线组成。",
        "先是一根大阴线，接着跳低开盘，结果收了一根中阳线或大阳线，收盘在前一根K线收盘价相同或相近的位置上。",
    ],
    "曙光初现": [
        "出现在下跌趋势中。",
        "由一阴一阳两根K线组成。",
        "先是一根大阴线或中阴线，接着出现一根大阳线或中阳线，阳线实体深入到阴线实体的二分之一以上处。",
    ],
    "旭日东升": [
        "出现在下跌趋势中。",
        "由一阴一阳两根K线组成。",
        "先是一根大阴线或中阴线，接着出现一根高开的大阳线或中阳线，阳线收盘价已高于前一根阴线的开盘价。",
    ],
    "锤头线": [
        "出现在下跌途中。",
        "阳线或阴线实体很小，下影线大于或等于实体的两倍。",
        "一般无上影线，少数略有一点上影线。",
    ],
    "倒锤头线": [
        "出现在下跌途中。",
        "阳线或阴线实体很小，上影线大于或等于实体的两倍。",
        "一般无下影线，少数会有一点。",
    ],
    "平底钳子线": [
        "在下跌趋势中出现。",
        "由两根或两根以上K线组成。",
        "最低价处在同一水平位置上。",
    ],
    "塔形底": [
        "出现在下跌途中。",
        "先是一根大阴线或中阴线，后为一连串的小阴小阳线。",
        "最后出现一根大阳线或中阳线。",
    ],
    "圆底": [
        "在跌势中出现。",
        "股价形成一个圆弧底。",
        "圆弧内的K线多为小阴小阳线，最后以向上跳空缺口确认。",
    ],
    "黄昏十字星": [
        "出现在涨势中。",
        "由三根K线组成，第一根为阳线，第二根为十字线，第三根为阴线。",
        "第三根K线实体深入到第一根K线实体之内。",
    ],
    "黄昏之星": [
        "出现在涨势中。",
        "与黄昏十字星相似，区别在于第二根K线是小阴线或小阳线。",
        "第三根K线实体深入到第一根K线实体之内。",
    ],
    "淡友反攻": [
        "出现在涨势中。",
        "由一阳一阴两根K线组成。",
        "先出现一根大阳线，接着跳高开盘，拉出一根中阴线或大阴线，其收盘价与前者相同或相近。",
    ],
    "乌云盖顶": [
        "出现在涨势中。",
        "由一根中阳线或大阳线和一根中阴线或大阴线组成。",
        "阴线已深入到阳线实体二分之一以下处。",
    ],
    "倾盆大雨": [
        "出现在涨势中。",
        "先是一根大阳线或中阳线，接着出现一根低开的大阴线或中阴线。",
        "收盘价低于阳线开盘价。",
    ],
    "三只乌鸦": [
        "出现在涨势中。",
        "由三根阴线组成，阴线多为大阴线或中阴线。",
        "每次均以跳高开盘，最后以下跌收盘。",
    ],
    "下降覆盖线": [
        "在上涨行情中出现。",
        "由四根K线组成，前两根K线构成一个穿头破脚形态。",
        "之后又出现一根中阴线或小阴线，阴线实体已深入到前一根阳线实体之中。",
    ],
    "平顶钳子线": [
        "在上涨趋势中出现。",
        "由两根或两根以上的K线组成。",
        "最高价处于同一水平位置。",
    ],
    "塔形顶": [
        "出现在上涨趋势中。",
        "先是一根大阳线或中阳线，后为一连串的小阳线或小阴线。",
        "最后出现一根大阴线或中阴线。",
    ],
    "圆顶": [
        "在上涨趋势中出现。",
        "股价形成一个圆弧顶。",
        "圆弧内的K线多为小阳线或小阴线，最后以向下跳空缺口确认。",
    ],
}


EXACT_NOTES = {
    "早晨十字星": "又称希望十字星。",
    "早晨之星": "又称希望之星，信号不如早晨十字星强。",
    "好友反攻": "转势信号不如曙光初现强。",
    "曙光初现": "阳线实体深入到阴线实体的部分越多，转势信号越强。",
    "旭日东升": "信号强于曙光初现；阳线实体高出阴线实体部分越多，转势信号越强。",
    "锤头线": "实体与下影线的比例越悬殊，越有参考价值。如与早晨之星同时出现，见底信号更加可靠。",
    "倒锤头线": "实体与上影线比例越悬殊，信号越强。如与早晨之星同时出现，见底信号更加可靠。",
    "平底钳子线": "需要后续阳线确认，支撑意义才更可靠。",
    "塔形底": "中间整理越充分，末端阳线越强，底部信号越可靠。",
    "圆底": "与形态理论圆形底有区别。",
    "黄昏十字星": "信号不如黄昏十字星弱这一类说法不适用，关键看第二根十字线是否独立。",
    "黄昏之星": "信号不如黄昏十字星强。",
    "淡友反攻": "转势信号不如乌云盖顶强。",
    "乌云盖顶": "阴线深入阳线实体部分越多，转势信号越强。",
    "倾盆大雨": "强于乌云盖顶；实体低于阳线越多，信号越强。",
    "三只乌鸦": "又称暴跌三杰。",
    "下降覆盖线": "见顶信号强于穿头破脚。",
    "平顶钳子线": "若叠加前高压力位，参考价值更强。",
    "塔形顶": "中间小K线越多、末端阴线越强，顶部信号越可靠。",
    "圆顶": "与形态理论圆形顶有一定区别。",
}


EXACT_BLANKS = {
    "早晨十字星": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "3"},
            {"id": "second", "prompt": "第二根K线为 [ ]。", "answer": "十字线"},
            {"id": "third", "prompt": "第三根K线为 [ ]。", "answer": "阳线"},
        ],
    },
    "早晨之星": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "3"},
            {"id": "first", "prompt": "第一根K线为 [ ]。", "answer": "阴线"},
            {"id": "second", "prompt": "第二根K线通常为 [ ]。", "answer": "小阴线或小阳线"},
            {"id": "third", "prompt": "第三根K线为 [ ]。", "answer": "阳线"},
        ],
    },
    "曙光初现": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "2"},
            {"id": "first", "prompt": "第一根K线通常为 [ ]。", "answer": "大阴线或中阴线"},
            {"id": "second", "prompt": "第二根K线通常为 [ ]。", "answer": "大阳线或中阳线"},
            {"id": "depth", "prompt": "阳线实体深入阴线实体的 [ ] 以上。", "answer": "二分之一"},
        ],
    },
    "乌云盖顶": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "2"},
            {"id": "first", "prompt": "第一根K线通常为 [ ]。", "answer": "大阳线或中阳线"},
            {"id": "second", "prompt": "第二根K线通常为 [ ]。", "answer": "大阴线或中阴线"},
            {"id": "depth", "prompt": "阴线实体深入阳线实体 [ ] 以下。", "answer": "二分之一"},
        ],
    },
    "黄昏十字星": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "3"},
            {"id": "second", "prompt": "第二根K线为 [ ]。", "answer": "十字线"},
            {"id": "third", "prompt": "第三根K线为 [ ]。", "answer": "阴线"},
        ],
    },
    "黄昏之星": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "3"},
            {"id": "first", "prompt": "第一根K线为 [ ]。", "answer": "阳线"},
            {"id": "second", "prompt": "第二根K线通常为 [ ]。", "answer": "小阴线或小阳线"},
            {"id": "third", "prompt": "第三根K线为 [ ]。", "answer": "阴线"},
        ],
    },
    "锤头线": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "body", "prompt": "该形态的实体较 [ ]。", "answer": "小"},
            {"id": "shadow", "prompt": "该形态重点观察 [ ]。", "answer": "下影线"},
            {"id": "ratio", "prompt": "下影线通常 [ ] 实体的两倍。", "answer": "大于或等于"},
        ],
    },
    "倒锤头线": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "body", "prompt": "该形态的实体较 [ ]。", "answer": "小"},
            {"id": "shadow", "prompt": "该形态重点观察 [ ]。", "answer": "上影线"},
            {"id": "ratio", "prompt": "上影线通常 [ ] 实体的两倍。", "answer": "大于或等于"},
        ],
    },
    "三只乌鸦": {
        "template": "按图形完成结构化描述填空。",
        "blanks": [
            {"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "3"},
            {"id": "type", "prompt": "这三根K线多为 [ ]。", "answer": "阴线"},
            {"id": "open", "prompt": "每次通常以 [ ] 开盘。", "answer": "跳高"},
        ],
    },
}


def get_signal_and_category(title: str) -> tuple[str, str]:
    if title in BULLISH_BOTTOM or title in BULLISH_CONTINUATION:
        return "bullish", "上升和见底"
    if title in BEARISH_TOP or title in BEARISH_CONTINUATION:
        return "bearish", "下跌和滞涨"
    return "neutral", "整理"


def infer_description(title: str, signal: str, category: str) -> str:
    if signal == "bullish":
        return f"{title}归入“{category}”类。"
    if signal == "bearish":
        return f"{title}归入“{category}”类。"
    return f"{title}归入“{category}”类。"


def infer_feature(title: str) -> list[str]:
    if title in EXACT_FEATURES:
        return EXACT_FEATURES[title]

    keywords = infer_keywords(title)
    features: list[str] = []

    if "三K线" in keywords:
        features.append("由三根K线组成。")
    elif "双K线" in keywords:
        features.append("由两根K线组成。")
    elif "多K线" in keywords:
        features.append("由多根K线组成。")
    else:
        features.append("可单独出现，也可与前后K线构成组合。")

    if "大阳线" in keywords:
        features.append("结构中包含较长阳线。")
    if "大阴线" in keywords:
        features.append("结构中包含较长阴线。")
    if "十字线" in keywords:
        features.append("结构中包含十字线。")
    if "上影线" in keywords or "长上影" in keywords:
        features.append("图形重点在上影线。")
    if "下影线" in keywords or "长下影" in keywords:
        features.append("图形重点在下影线。")
    if "跳空缺口" in keywords:
        features.append("结构中带有跳空缺口。")

    return features[:3]


def infer_note(title: str) -> str:
    if title in EXACT_NOTES:
        return EXACT_NOTES[title]
    return "请结合出现位置和前后K线一起判断。"


def infer_keywords(title: str) -> list[str]:
    if title in EXACT_KEYWORDS:
        return EXACT_KEYWORDS[title]

    keywords: list[str] = []
    if "阳" in title:
        keywords.append("小阳线")
    if "阴" in title:
        keywords.append("小阴线")
    if "十字" in title:
        keywords.append("十字线")
    if "锤头" in title:
        keywords.extend(["下影线", "长下影"])
    if "倒锤" in title:
        keywords.extend(["上影线", "长上影"])
    if any(token in title for token in ["三", "乌鸦", "三兵", "三部曲", "三颗星"]):
        keywords.append("三K线")
    if any(token in title for token in ["并排", "反攻", "镊子", "盖顶", "破脚", "六甲"]):
        keywords.append("双K线")
    if any(token in title for token in ["盘旋", "步曲", "部曲", "冉冉", "徐缓", "稳步", "不止", "弧形", "连续", "加速度", "圆底", "圆顶", "塔形"]):
        keywords.append("多K线")
    if any(token in title for token in ["跳空", "缺口"]):
        keywords.append("跳空缺口")
    if any(token in title for token in ["并排", "镊子"]):
        keywords.append("并列")
    if any(token in title for token in ["六甲", "破脚"]):
        keywords.append("包容")

    deduped: list[str] = []
    for keyword in keywords:
        if keyword not in deduped:
            deduped.append(keyword)
    return deduped[:4] if deduped else ["多K线"]


def infer_difficulty(title: str) -> str:
    if title in {"大阳线", "大阴线", "小阳线", "小阴线", "十字", "长十字", "T字", "倒T字", "锤头线", "倒锤头线", "一字", "螺旋桨"}:
        return "easy"
    if any(token in title for token in ["三部曲", "盘旋", "抵抗", "不止", "加速度", "跛脚", "并排", "身怀六甲", "穿头破脚", "弧形", "塔形", "圆底", "圆顶"]):
        return "hard"
    return "medium"


def infer_tags(title: str, signal: str) -> list[str]:
    tags: list[str] = []
    if signal == "bullish":
        tags.append("看涨")
    elif signal == "bearish":
        tags.append("看跌")
    else:
        tags.append("整理")

    if title in BULLISH_BOTTOM:
        tags.append("见底")
    if title in BEARISH_TOP:
        tags.append("见顶")
    return tags


def infer_practice(title: str, feature: list[str], keywords: list[str]) -> tuple[str, list[dict[str, str]]]:
    if title in EXACT_BLANKS:
        item = EXACT_BLANKS[title]
        return item["template"], item["blanks"]

    prompts: list[dict[str, str]] = []
    if "三K线" in keywords:
        prompts.append({"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "3"})
    elif "双K线" in keywords:
        prompts.append({"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "2"})
    elif "多K线" in keywords:
        prompts.append({"id": "count", "prompt": "该形态由 [ ] 根K线组成。", "answer": "多"})

    if any(keyword in keywords for keyword in ["大阳线", "中阳线", "小阳线"]):
        prompts.append({"id": "yang", "prompt": "该形态结构中包含 [ ]。", "answer": next(keyword for keyword in ["大阳线", "中阳线", "小阳线"] if keyword in keywords)})
    if any(keyword in keywords for keyword in ["大阴线", "中阴线", "小阴线"]):
        prompts.append({"id": "yin", "prompt": "该形态结构中包含 [ ]。", "answer": next(keyword for keyword in ["大阴线", "中阴线", "小阴线"] if keyword in keywords)})
    if "十字线" in keywords:
        prompts.append({"id": "cross", "prompt": "该形态结构中包含 [ ]。", "answer": "十字线"})
    if "上影线" in keywords or "长上影" in keywords:
        prompts.append({"id": "upper", "prompt": "图形重点观察 [ ]。", "answer": "上影线"})
    if "下影线" in keywords or "长下影" in keywords:
        prompts.append({"id": "lower", "prompt": "图形重点观察 [ ]。", "answer": "下影线"})

    if not prompts:
        prompts.append({"id": "feature", "prompt": "该形态的结构记忆点是 [ ]。", "answer": feature[0].replace("。", "")})

    return "按图形完成结构化描述填空。", prompts[:4]


def main() -> None:
    records = []

    for image_path in sorted(IMAGE_DIR.glob("*.png"), key=lambda item: item.stem):
        title = image_path.stem
        signal, category = get_signal_and_category(title)
        feature = infer_feature(title)
        keywords = infer_keywords(title)
        practice_template, blanks = infer_practice(title, feature, keywords)

        records.append(
            {
                "id": title,
                "title": title,
                "image": f"/images/kline/{image_path.name}",
                "description": infer_description(title, signal, category),
                "feature": feature,
                "note": infer_note(title),
                "meaning": "",
                "keywords": keywords,
                "practiceTemplate": practice_template,
                "blanks": blanks,
                "tags": infer_tags(title, signal),
                "difficulty": infer_difficulty(title),
                "hint": "",
                "category": category,
                "createdAt": "2026-04-16",
                "updatedAt": "2026-04-16",
            }
        )

    OUTPUT_FILE.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(records)} records -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
