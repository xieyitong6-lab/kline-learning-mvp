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


EXACT_FEATURES = {
    "T字": [
        "开盘价、收盘价、最高价相同。",
        "最低价与之有较大距离。",
    ],
    "倒T字": [
        "开盘价、收盘价、最低价相同。",
        "最高价与之有较大距离。",
    ],
    "十字": [
        "开盘价和收盘价相同。",
        "上下影线较短。",
    ],
    "长十字": [
        "开盘价和收盘价相同。",
        "上下影线较长。",
    ],
    "一字": [
        "开盘价、收盘价、最高价、最低价几乎相同。",
    ],
    "锤头线": [
        "出现在下跌途中。",
        "阳线或阴线实体很小，下影线大于或等于实体的两倍。",
        "一般无上影线，少数会略有一点上影线。",
    ],
    "倒锤头线": [
        "出现在下跌途中。",
        "阳线或阴线实体很小，上影线大于或等于实体的两倍。",
        "一般无下影线，少数会有一点。",
    ],
    "早晨十字星": [
        "出现在下跌途中。",
        "由3根K线组成，第一根K线是阴线，第二根K线是十字线，第三根K线是阳线。",
        "第三根K线实体深入到第一根K线实体之内。",
    ],
    "早晨之星": [
        "出现在下跌途中。",
        "由3根K线组成，第一根K线是阴线，第二根K线是小阴线或小阳线，第三根K线是阳线。",
        "第三根K线实体深入到第一根K线实体之内。",
    ],
    "好友反攻": [
        "出现在下跌行情中。",
        "由一阴一阳两根K线组成。",
        "先是一根大阴线，接着跳低开盘，结果收了一根中阳线或大阳线，并且收在前一根K线收盘价相同或相近的位置上。",
    ],
    "曙光初现": [
        "出现在下跌趋势中。",
        "由一阴一阳两根K线组成。",
        "先是出现一根大阴线或中阴线，接着出现一根大阳线或中阳线。阳线的实体深入到阴线实体的二分之一以上处。",
    ],
    "旭日东升": [
        "出现在下跌趋势中。",
        "由一阴一阳两根K线组成。",
        "先是一根大阴线或中阴线，接着出现一根高开的大阳线或中阳线。阳线的收盘价已高于前一根阴线的开盘价。",
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
    "平底钳子线": [
        "在下跌趋势中出现。",
        "由两根或两根以上的K线组成。",
        "最低价处在同一水平位置上。",
    ],
    "平顶钳子线": [
        "在上涨趋势中出现。",
        "由两根或两根以上的K线组成。",
        "最高价处于同一水平位置。",
    ],
}


EXACT_NOTES = {
    "早晨十字星": ["又称希望十字星。"],
    "早晨之星": ["又称希望之星，信号不如早晨十字星强。"],
    "好友反攻": ["转势信号不如曙光初现强。"],
    "曙光初现": ["阳线实体深入到阴线实体的部分越多，转势信号越强。"],
    "旭日东升": ["信号强于曙光初现；阳线实体高出阴线实体部分越多，转势信号越强。"],
    "锤头线": ["实体与下影线的比例越悬殊，越有参考价值。如与早晨之星同时出现，见底信号更加可靠。"],
    "倒锤头线": ["实体与上影线比例越悬殊，信号越强。如与早晨之星同时出现，见底信号更加可靠。"],
    "黄昏之星": ["信号不如黄昏十字星强。"],
    "乌云盖顶": ["阴线深入阳线实体部分越多，转势信号越强。"],
    "倾盆大雨": ["强于乌云盖顶；实体低于阳线越多，信号越强。"],
    "三只乌鸦": ["又称暴跌三杰。"],
}


PRACTICE_OVERRIDES = {
    "T字": {
        "template": "请根据图形和记忆内容完成填空。",
        "blanks": [
            {"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线构成。", "type": "text", "answer": ["1"]},
            {"id": 2, "label": "线型", "prompt": "该形态属于 [ ]。", "type": "text", "answer": ["十字线"]},
            {"id": 3, "label": "重点", "prompt": "该形态重点观察 [ ]。", "type": "text", "answer": ["下影线"]},
        ],
        "explanation": "T字的核心不是方向词，而是结构词：单根K线、十字线、下影线明显。",
    },
    "倒T字": {
        "template": "请根据图形和记忆内容完成填空。",
        "blanks": [
            {"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线构成。", "type": "text", "answer": ["1"]},
            {"id": 2, "label": "线型", "prompt": "该形态属于 [ ]。", "type": "text", "answer": ["十字线"]},
            {"id": 3, "label": "重点", "prompt": "该形态重点观察 [ ]。", "type": "text", "answer": ["上影线"]},
        ],
        "explanation": "倒T字和T字的关键差异在影线方向，记忆重点应放在上影线而不是结果判断。",
    },
    "早晨十字星": {
        "template": "请根据图形和结构特征完成填空。",
        "blanks": [
            {"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线组成。", "type": "text", "answer": ["3"]},
            {"id": 2, "label": "第一根", "prompt": "第一根K线为 [ ]。", "type": "text", "answer": ["阴线"]},
            {"id": 3, "label": "第二根", "prompt": "第二根K线为 [ ]。", "type": "text", "answer": ["十字线"]},
            {"id": 4, "label": "第三根", "prompt": "第三根K线为 [ ]。", "type": "text", "answer": ["阳线"]},
        ],
        "explanation": "早晨十字星的训练重点是三根K线结构：阴线、十字线、阳线。",
    },
    "曙光初现": {
        "template": "请根据图形和结构特征完成填空。",
        "blanks": [
            {"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线组成。", "type": "text", "answer": ["2"]},
            {"id": 2, "label": "第一根", "prompt": "第一根K线通常为 [ ]。", "type": "text", "answer": ["大阴线或中阴线"]},
            {"id": 3, "label": "第二根", "prompt": "第二根K线通常为 [ ]。", "type": "text", "answer": ["大阳线或中阳线"]},
            {"id": 4, "label": "深入程度", "prompt": "阳线实体深入阴线实体的 [ ] 以上。", "type": "text", "answer": ["二分之一"]},
        ],
        "explanation": "曙光初现不是关键词点选题，而是典型双K线结构填空题。",
    },
    "乌云盖顶": {
        "template": "请根据图形和结构特征完成填空。",
        "blanks": [
            {"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线组成。", "type": "text", "answer": ["2"]},
            {"id": 2, "label": "第一根", "prompt": "第一根K线通常为 [ ]。", "type": "text", "answer": ["中阳线或大阳线"]},
            {"id": 3, "label": "第二根", "prompt": "第二根K线通常为 [ ]。", "type": "text", "answer": ["中阴线或大阴线"]},
            {"id": 4, "label": "深入程度", "prompt": "阴线深入阳线实体 [ ] 以下。", "type": "text", "answer": ["二分之一"]},
        ],
        "explanation": "乌云盖顶的训练重点是两根K线的先后关系和阴线深入程度。",
    },
}


def build_keywords(title: str) -> list[str]:
    mappings = {
        "T字": ["十字线", "下影线"],
        "倒T字": ["十字线", "上影线"],
        "十字": ["十字线"],
        "长十字": ["十字线", "上影线", "下影线"],
        "一字": ["十字线"],
        "锤头线": ["小阳线", "下影线"],
        "倒锤头线": ["小阳线", "上影线"],
        "早晨十字星": ["大阴线", "十字线", "大阳线", "三K线"],
        "早晨之星": ["大阴线", "小阴线", "大阳线", "三K线"],
        "好友反攻": ["大阴线", "大阳线", "双K线"],
        "曙光初现": ["大阴线", "大阳线", "双K线"],
        "旭日东升": ["大阴线", "大阳线", "双K线"],
        "黄昏十字星": ["大阳线", "十字线", "大阴线", "三K线"],
        "黄昏之星": ["大阳线", "小阳线", "大阴线", "三K线"],
        "淡友反攻": ["大阳线", "大阴线", "双K线"],
        "乌云盖顶": ["大阳线", "大阴线", "双K线"],
        "倾盆大雨": ["大阳线", "大阴线", "双K线"],
        "三只乌鸦": ["大阴线", "三K线"],
        "平底钳子线": ["双K线", "并列", "下影线"],
        "平顶钳子线": ["双K线", "并列", "上影线"],
    }
    return mappings.get(title, ["多K线"])


def build_feature(title: str) -> list[str]:
    return EXACT_FEATURES.get(title, ["请根据原始资料补充该形态的特征。"])


def build_note(title: str) -> list[str]:
    return EXACT_NOTES.get(title, ["请根据原始资料补充该形态的备注。"])


def build_name_options(title: str, all_titles: list[str]) -> list[str]:
    base = {
        "T字": ["T字", "一字", "倒T字", "十字"],
        "倒T字": ["倒T字", "T字", "十字", "长十字"],
        "锤头线": ["锤头线", "倒锤头线", "T字", "十字"],
        "倒锤头线": ["倒锤头线", "锤头线", "倒T字", "十字"],
        "早晨十字星": ["早晨十字星", "早晨之星", "黄昏十字星", "曙光初现"],
        "黄昏十字星": ["黄昏十字星", "黄昏之星", "早晨十字星", "乌云盖顶"],
        "曙光初现": ["曙光初现", "旭日东升", "好友反攻", "乌云盖顶"],
        "乌云盖顶": ["乌云盖顶", "倾盆大雨", "淡友反攻", "曙光初现"],
    }
    if title in base:
        return base[title]
    options = [title]
    for candidate in all_titles:
        if candidate != title:
            options.append(candidate)
        if len(options) == 4:
            break
    return options


def build_practice(title: str, all_titles: list[str], feature: list[str]) -> dict:
    if title in PRACTICE_OVERRIDES:
        preset = PRACTICE_OVERRIDES[title]
        return {
            "nameQuestion": {
                "type": "single_choice",
                "options": build_name_options(title, all_titles),
                "answer": title,
            },
            "fillBlankQuestion": {
                "intro": preset["template"],
                "template": preset["template"],
                "blanks": preset["blanks"],
                "explanation": preset["explanation"],
            },
        }

    keywords = build_keywords(title)
    blanks = []
    if "三K线" in keywords:
        blanks.append({"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线组成。", "type": "text", "answer": ["3"]})
    elif "双K线" in keywords:
        blanks.append({"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线组成。", "type": "text", "answer": ["2"]})
    else:
        blanks.append({"id": 1, "label": "根数", "prompt": "该形态由 [ ] 根K线组成。", "type": "text", "answer": ["1"]})

    if keywords:
        blanks.append({"id": 2, "label": "结构词", "prompt": "该形态的结构关键词是 [ ]。", "type": "text", "answer": [keywords[0]]})
    if len(keywords) > 1:
        blanks.append({"id": 3, "label": "第二结构词", "prompt": "图形还应关注 [ ]。", "type": "text", "answer": [keywords[1]]})

    return {
        "nameQuestion": {
            "type": "single_choice",
            "options": build_name_options(title, all_titles),
            "answer": title,
        },
        "fillBlankQuestion": {
            "intro": "请根据该形态的结构描述完成填空。",
            "template": "请根据该形态的结构描述完成填空。",
            "blanks": blanks,
            "explanation": feature[0] if feature else "请结合该形态的特征完成记忆。",
        },
    }


def infer_category(title: str) -> str:
    if title in BULLISH_BOTTOM or title in BULLISH_CONTINUATION:
        return "上升和见底"
    if title in BEARISH_TOP or title in BEARISH_CONTINUATION:
        return "下跌和滞涨"
    return "整理"


def infer_difficulty(title: str) -> str:
    if title in {"T字", "倒T字", "十字", "长十字", "一字", "锤头线", "倒锤头线"}:
        return "easy"
    if title in {"早晨十字星", "早晨之星", "黄昏十字星", "黄昏之星", "乌云盖顶", "曙光初现"}:
        return "medium"
    return "hard"


def main() -> None:
    image_paths = sorted(IMAGE_DIR.glob("*.png"), key=lambda item: item.stem)
    all_titles = [path.stem for path in image_paths]
    records = []

    for image_path in image_paths:
        title = image_path.stem
        feature = build_feature(title)
        note = build_note(title)
        records.append(
            {
                "id": title,
                "title": title,
                "image": f"/images/kline/{image_path.name}",
                "description": "",
                "feature": feature,
                "note": note,
                "meaning": "",
                "keywords": build_keywords(title),
                "practice": build_practice(title, all_titles, feature),
                "tags": [infer_category(title)],
                "difficulty": infer_difficulty(title),
                "hint": "",
                "category": infer_category(title),
                "createdAt": "2026-04-16",
                "updatedAt": "2026-04-16",
            }
        )

    OUTPUT_FILE.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(records)} records -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
