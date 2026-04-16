from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


WORKSPACE = Path(__file__).resolve().parents[1]
IMAGE_DIR = WORKSPACE / "public" / "images" / "kline"
OUTPUT_FILE = WORKSPACE / "data" / "kline-data.json"
PDF_PATH = Path(
    r"D:\xwechat_files\wxid_c1ssdwjccvq822_a098\msg\file\2026-03\75K线组合名称表(彩版)(共12页)(4).pdf"
)


SOURCE_TITLES = [
    "早晨十字星",
    "早晨之星",
    "好友反攻",
    "曙光初现",
    "旭日东升",
    "倒锤头线",
    "锤头线",
    "平底钳子底",
    "塔形底",
    "圆底",
    "低位并排阳线",
    "低档五阳线",
    "连续跳空三阴线",
    "红三兵",
    "冉冉上升形",
    "徐缓上升形",
    "稳步上涨形",
    "上升抵抗形",
    "弧形线",
    "下探上涨形",
    "上涨二颗星",
    "跳空上扬形",
    "高位并排阳线",
    "跳空下跌三颗星",
    "上升三步曲",
    "多方尖兵",
    "两阳夹一阴",
    "黄昏十字星",
    "黄昏之星",
    "淡友反攻",
    "乌云盖顶",
    "倾盆大雨",
    "射击之星流星",
    "上吊线绞刑线",
    "平顶钳子顶",
    "塔形顶",
    "圆顶",
    "双飞乌鸦",
    "三乌鸦",
    "高档五阴线",
    "下降覆盖线",
    "低档盘旋形",
    "黑三兵",
    "绵绵阴跌形",
    "徐缓下跌形",
    "下跌不止形",
    "下降抵抗形",
    "高开出逃形",
    "下跌三颗星",
    "下降三步曲",
    "空方尖兵",
    "倒三阳",
    "连续跳空三阳线",
    "升势受阻",
    "升势停顿",
    "阳线跛脚",
    "两阴夹一阳",
    "大阳线",
    "大阴线",
    "小阳线",
    "小阴线",
    "十字线",
    "长十字线",
    "螺旋桨",
    "一字线",
    "T字线",
    "倒T字线",
    "搓揉线",
    "尽头线",
    "穿头破脚",
    "身怀六甲",
    "镊子线",
    "上档盘旋形",
    "加速度线",
    "下跌三连阴",
]


IMAGE_TO_SOURCE_TITLE = {
    "十字": "十字线",
    "长十字": "长十字线",
    "一字": "一字线",
    "T字": "T字线",
    "倒T字": "倒T字线",
    "平底钳子线": "平底钳子底",
    "平顶钳子线": "平顶钳子顶",
    "三只乌鸦": "三乌鸦",
    "稳步上升形": "稳步上涨形",
    "上升停顿形": "升势停顿",
    "上升受阻形": "升势受阻",
    "上升两颗星": "上涨二颗星",
    "上升三部曲": "上升三步曲",
    "下探上升形": "下探上涨形",
    "徐缓下降形": "徐缓下跌形",
    "下降三部曲": "下降三步曲",
    "跳空下降三颗星": "跳空下跌三颗星",
    "升势鹤鸦缺口": "跳空上扬形",
    "多方炮": "两阳夹一阴",
    "空方炮": "两阴夹一阳",
    "高档盘旋形": "上档盘旋形",
    "连续三阴线": "下跌三连阴",
    "揉搓线": "搓揉线",
}


ROW_OVERRIDES = {
    "T字线": {
        "feature": ["开盘价、收盘价、最高价相同，最低价与之有较大距离"],
        "note": ["下影线越长，力度越大，信号越可靠"],
    },
    "倒T字线": {
        "feature": ["开盘价、收盘价、最低价相同，最高价与之有较大距离"],
        "note": ["上影线越长，信号越可靠。"],
    },
    "十字线": {
        "feature": ["（1）既可出现在涨势中，也可出现在跌势中", "（2）开盘价和收盘价相同，上下影线较短"],
        "note": ["信号可靠性不强。应结合其他K线一起分析"],
    },
    "长十字线": {
        "feature": ["（1）既可出现在涨势中，也可出现在跌势中", "（2）开盘价和收盘价相同，上下影线较长"],
        "note": ["可靠程度高于十字线"],
    },
    "高位并排阳线": {
        "feature": [
            "（1）出现在涨势中",
            "（2）由两根阳线组成",
            "（3）第一根阳线跳空向上，其收盘时在前一根K线上方留下一个缺口。第二根阳线与之并排，开盘价与第一根阳线的开盘价基本相同",
        ],
        "note": ["缺口，这个缺口对日后股价走势有较强的支撑作用，但若日后股价跌破缺口则走势转弱"],
    },
    "两阳夹一阴": {
        "note": [],
    },
    "两阴夹一阳": {
        "note": [],
    },
    "旭日东升": {
        "note": ["信号强于曙光初现；阳线实体高出阴线实体部分越多，转势信号越强"],
    },
    "红三兵": {
        "note": ["若阳线收于最高或接近最高点时为三白武士，信号更强"],
    },
    "黄昏之星": {
        "note": ["信号不如黄昏十字星强"],
    },
    "圆顶": {
        "note": ["与形态理论圆形顶有一定的区别"],
    },
    "倒三阳": {
        "note": ["下跌概率极大，投资者应趁早离场"],
    },
    "镊子线": {
        "note": [],
    },
    "大阴线": {
        "note": [],
    },
    "跳空上扬形": {
        "note": ["又称升势鹤鸦缺口"],
    },
}


MEANING_MARKERS = [
    "涨势中出现是见顶信号；跌势中出现，继续看跌",
    "涨势中出现，卖出信号；跌势中出现，买进信号",
    "涨势中，见顶信号；跌势中，见底信号",
    "上涨时出现为头部信号，下跌时出现为底部信号",
    "上档盘旋时间在5－14天之内，多数看涨；超过14天，多数看跌",
    "涨势末端出现，卖出信号；跌势末端出现，买进信号；上涨途中出现，继续看涨；下跌途中出现，继续看跌",
    "涨势末端出现，卖出信号；跌势末端出现，买进信号；上涨途中出现，继续看涨；下跌途中出现，继续看跌",
    "涨势中出现，买进信号；跌势中出现，卖出信号",
    "涨势末端出现，见顶信号；下跌末端出现，见底信号；上涨途中出现，继续看涨；下跌途中出现，继续看跌",
    "涨势中出现，后市看跌；下跌途中出现，继续看跌；连续加速下跌行情中出现，有见底回升之意",
    "上涨初期出现，后市看涨；上涨途中出现，继续看涨；连续加速行情中出现，见顶信号。连续下跌中出现，有见底回升之意",
    "下跌初期出现，后市看跌；下跌途中出现，继续看跌；连续加速下跌中行情出现，有空头陷阱之嫌疑",
    "涨势中出现，继续看涨；上涨末端出现，见顶信号",
    "上涨途中出现，继续看涨；上涨末端出现，见顶信号",
    "上涨时出现，后市看跌；下跌时出现，后市看涨",
    "涨势中出现，卖出信号；跌势中出现，买进信号",
    "涨势中出现，继续看涨；跌势中出现，见底信号",
    "涨势中出现，卖出信号；跌势中出现，买进信号",
    "涨势中出现，见顶信号；跌势中出现，买进信号",
    "见底信号，后市看涨",
    "见顶信号，后市看跌",
    "买进信号，后市看涨",
    "卖出信号，后市看跌",
    "继续看涨",
    "继续看跌",
    "滞涨信号，后市看跌",
]


BLANK_PHRASES = [
    "开盘价、收盘价、最高价、最低价几乎相同",
    "开盘价、收盘价、最高价相同",
    "开盘价、收盘价、最低价相同",
    "开盘价和收盘价相同",
    "连续跳空三阴线",
    "连续跳空三阳线",
    "第三根K线实体深入到第一根K线实体之内",
    "阳线实体深入到阴线实体的二分之一以上处",
    "阴线已深入到阳线实体二分之一以下处",
    "由三根K线组成",
    "由两根K线组成",
    "由五根K线组成",
    "由一阴一阳两根K线组成",
    "由一阳一阴两根K线组成",
    "由一大一小两根K线组成",
    "由三根阴线组成",
    "由三根阳线组成",
    "由两根阳线组成",
    "由五根阴线组成",
    "上下影线较长",
    "上下影线较短",
    "上影线很长",
    "下影线很长",
    "上影线较长",
    "下影线较长",
    "上影线大于或等于实体的两倍",
    "下影线大于或等于实体的两倍",
    "实体较长",
    "实体很小",
    "大阳线",
    "中阳线",
    "小阳线",
    "大阴线",
    "中阴线",
    "小阴线",
    "十字线",
    "阳线",
    "阴线",
    "上影线",
    "下影线",
    "最高价",
    "最低价",
    "同一水平位置",
    "跳空缺口",
]


def compact_text(text: str) -> str:
    return re.sub(r"\s+", "", text).replace("•", "")


def split_feature_lines(feature_text: str) -> list[str]:
    feature_text = feature_text.strip("；。")
    if not feature_text:
        return []

    parts = re.split(r"(?=（\d+）)", feature_text)
    cleaned = [part.strip("；。") for part in parts if part.strip("；。")]
    return cleaned if cleaned else [feature_text]


def clean_note_text(note_text: str) -> str:
    return (
        note_text.replace("精品资料........................................", "")
        .replace("内容总结（1）K线组合名称表(彩版)", "")
        .strip("；。")
    )


def parse_source_rows() -> dict[str, dict[str, list[str]]]:
    reader = PdfReader(str(PDF_PATH))
    content = "".join(page.extract_text() or "" for page in reader.pages[1:])
    compacted = compact_text(content)
    markers = [f"{index}{title}" for index, title in enumerate(SOURCE_TITLES, start=1)]

    spans: list[tuple[str, int, int]] = []
    for marker, title in zip(markers, SOURCE_TITLES):
        start = compacted.find(marker)
        if start == -1:
            continue
        spans.append((title, start, start + len(marker)))

    spans.sort(key=lambda item: item[1])
    rows: dict[str, dict[str, list[str]]] = {}

    for index, (title, _start, content_start) in enumerate(spans):
        block_end = spans[index + 1][1] if index + 1 < len(spans) else len(compacted)
        block = compacted[content_start:block_end]

        marker_positions = [(block.find(marker), marker) for marker in MEANING_MARKERS if block.find(marker) != -1]
        if not marker_positions:
            feature_lines = split_feature_lines(block)
            rows[title] = {"feature": feature_lines, "note": []}
            continue

        meaning_index, meaning_marker = min(marker_positions, key=lambda item: item[0])
        feature_text = block[:meaning_index]
        note_text = block[meaning_index + len(meaning_marker) :]

        cleaned_note = clean_note_text(note_text)
        rows[title] = {
            "feature": split_feature_lines(feature_text),
            "note": [cleaned_note] if cleaned_note else [],
        }

    for title, override in ROW_OVERRIDES.items():
        base = rows.get(title, {"feature": [], "note": []})
        rows[title] = {
            "feature": override.get("feature", base["feature"]),
            "note": override.get("note", base["note"]),
        }

    return rows


def pick_blank_targets(feature_lines: list[str]) -> list[tuple[int, str]]:
    targets: list[tuple[int, str]] = []
    for line_index, line in enumerate(feature_lines):
        for phrase in BLANK_PHRASES:
            if phrase in line and (line_index, phrase) not in targets:
                targets.append((line_index, phrase))
            if len(targets) >= 3:
                return targets

    if not targets and feature_lines:
        fallback = re.split(r"[；，。]", feature_lines[0])[0]
        if fallback:
            targets.append((0, fallback))

    return targets


def build_fill_blank_question(feature_lines: list[str]) -> dict:
    if not feature_lines:
        return {
            "sourceType": "feature",
            "sourceIndexes": [],
            "intro": "请根据该形态资料中的特征原文完成填空。",
            "template": "",
            "blanks": [],
            "explanation": "",
        }

    targets = pick_blank_targets(feature_lines)
    target_map: dict[tuple[int, str], int] = {}
    blanks = []

    for blank_id, (line_index, phrase) in enumerate(targets, start=1):
        target_map[(line_index, phrase)] = blank_id
        blanks.append(
            {
                "id": blank_id,
                "label": f"第 {blank_id} 空",
                "type": "text",
                "answer": [phrase],
                "placeholder": f"填写第 {blank_id} 空答案",
            }
        )

    template_lines = []
    used_indexes: list[int] = []
    for line_index, line in enumerate(feature_lines):
        current = line
        replaced = False
        for phrase in BLANK_PHRASES:
            key = (line_index, phrase)
            if key in target_map and phrase in current:
                current = current.replace(phrase, f"[{target_map[key]}]", 1)
                replaced = True
        if not replaced and (line_index, line) in target_map:
            current = current.replace(line, f"[{target_map[(line_index, line)]}]", 1)
            replaced = True
        if replaced:
            used_indexes.append(line_index)
        template_lines.append(current)

    return {
        "sourceType": "feature",
        "sourceIndexes": used_indexes,
        "intro": "请根据该形态资料中的特征原文完成填空。",
        "template": "\n".join(template_lines),
        "blanks": blanks,
        "explanation": "\n".join(feature_lines),
    }


def infer_difficulty(title: str) -> str:
    if title in {"T字", "倒T字", "十字", "长十字", "一字", "锤头线", "倒锤头线", "大阳线", "大阴线", "小阳线", "小阴线"}:
        return "easy"
    if title in {"早晨十字星", "早晨之星", "曙光初现", "乌云盖顶", "黄昏十字星", "黄昏之星", "穿头破脚", "身怀六甲"}:
        return "medium"
    return "hard"


def build_title_options(title: str, all_titles: list[str]) -> list[str]:
    options = [title]
    for candidate in all_titles:
        if candidate == title:
            continue
        options.append(candidate)
        if len(options) == 4:
            break
    return options


def main() -> None:
    source_rows = parse_source_rows()
    image_paths = sorted(IMAGE_DIR.glob("*.png"), key=lambda item: item.stem)
    all_titles = [path.stem for path in image_paths]
    records = []

    for image_path in image_paths:
        title = image_path.stem
        source_title = IMAGE_TO_SOURCE_TITLE.get(title, title)
        source = source_rows.get(source_title, {"feature": [], "note": []})
        feature = source["feature"]
        note = source["note"]

        records.append(
            {
                "id": title,
                "title": title,
                "image": f"/images/kline/{image_path.name}",
                "description": "",
                "feature": feature,
                "note": note,
                "meaning": "",
                "keywords": [],
                "practice": {
                    "nameQuestion": {
                        "type": "single_choice",
                        "options": build_title_options(title, all_titles),
                        "answer": title,
                    },
                    "fillBlankQuestion": build_fill_blank_question(feature),
                },
                "tags": [],
                "difficulty": infer_difficulty(title),
                "hint": "",
                "category": "",
                "createdAt": "2026-04-16",
                "updatedAt": "2026-04-16",
            }
        )

    OUTPUT_FILE.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(records)} records -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
