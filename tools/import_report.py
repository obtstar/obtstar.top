#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ObtStar 自定义报告导入脚本

将一份"自作报告"JSON 转换为站点数据并注册到报告库：
  1. 生成 docs/data/reports-content/<id>/chunk-N.js   （正文分块）
  2. 生成 docs/data/reports-content/<id>/manifest.json（分块清单）
  3. 把报告条目写入 docs/data/reports.js 的 REPORTS 数组

用法:
  python3 tools/import_report.py <report.json> [--chunk-size N] [--dry-run] [--force]

参数:
  --chunk-size N   每个 chunk 包含的 section 数（默认 5，与阅读器分页匹配）
  --dry-run        只预览将生成的内容，不写文件
  --force          报告 id 已存在时仍覆盖重写

报告 JSON 模板: tools/report_template.json
  （运行本脚本前，先复制模板并填充字段）

注意:
  - 运行后需重启本地服务器（数据有进程内缓存）
  - 若 docs/data/reports.js 解析失败，api/index.js 会回退到内置数据，
    需手动在 api/index.js 的 getFallbackReports() 中同步追加该报告
"""

import argparse
import json
import os
import re
import sys
import io

# 强制 UTF-8 输出
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ─────────────────────────────────────────────
# 路径定位
# ─────────────────────────────────────────────
ROOT = os.path.dirname(os.path.abspath(__file__)) and os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
DOCS = os.path.join(ROOT, "docs")
OUTPUT_BASE = os.path.join(DOCS, "data", "reports-content")
REPORTS_JS = os.path.join(DOCS, "data", "reports.js")

# 报告 id 校验（与 api/index.js 一致）
ID_PATTERN = re.compile(r"^[a-z0-9-]+$")

# ─────────────────────────────────────────────
# 辅助函数
# ─────────────────────────────────────────────


def esc_single(text):
    """转义 JS 单引号字符串"""
    return str(text).replace("\\", "\\\\").replace("'", "\\'")


def esc_backtick(text):
    """转义 JS 模板字符串（反引号与 ${）"""
    return str(text).replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def js_value(value, indent):
    """将 Python 值格式化为 JS 字面量（单引号风格，与 reports.js 一致）"""
    pad = " " * indent
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, str):
        return f"'{esc_single(value)}'"
    if isinstance(value, dict):
        if not value:
            return "{}"
        inner = ",\n".join(
            f"{pad}  {k}: {js_value(v, indent + 2)}" for k, v in value.items()
        )
        return "{\n" + inner + "\n" + pad + "}"
    if isinstance(value, (list, tuple)):
        if not value:
            return "[]"
        if all(isinstance(x, (str, int, float, bool)) for x in value):
            return "[" + ", ".join(js_value(x, indent) for x in value) + "]"
        inner = ",\n".join(f"{pad}  {js_value(x, indent + 2)}" for x in value)
        return "[\n" + inner + "\n" + pad + "]"
    return "'" + esc_single(str(value)) + "'"


def build_report_js(report):
    """把报告元数据（不含 content）格式化为 reports.js 中的对象字面量"""
    lines = ["  {"]
    for key, value in report.items():
        if key == "content":
            continue
        lines.append(f"    {key}: {js_value(value, 6)},")
    lines.append("  },")
    return "\n".join(lines)


def build_chunk_js(report_id, chunk_index, page_range_str, sections):
    """生成 chunk-N.js 文件内容（含可选 i18n 字段）"""
    report_id_js = report_id.replace("-", "_")

    sec_parts = []
    for sec in sections:
        parts = []
        parts.append(f"      title: '{esc_single(sec.get('title', ''))}',")
        parts.append(f"      level: {int(sec.get('level', 1))},")
        # 可选多语言字段
        if sec.get("title_i18n"):
            parts.append(f"      title_i18n: {js_value(sec['title_i18n'], 6)},")
        if sec.get("content_i18n"):
            parts.append(f"      content_i18n: {js_value(sec['content_i18n'], 6)},")
        parts.append(
            f"      content: `{esc_backtick(sec.get('html', sec.get('text', '')))}`"
        )
        sec_parts.append("{\n" + "\n".join(parts) + "\n    }")

    sections_str = ",\n".join(sec_parts)

    return f"""// 报告: {report_id} - 第{chunk_index}块
// 章节: {page_range_str}

window.REPORT_CHUNK_{report_id_js}_{chunk_index} = {{
  reportId: "{report_id}",
  chunkIndex: {chunk_index},
  pageRange: "{page_range_str}",
  sections: [
    {sections_str}
  ]
}};
"""


def load_categories():
    """从 reports.js 中解析分类 id 列表（用于校验）"""
    try:
        content = open(REPORTS_JS, encoding="utf-8").read()
        m = re.search(r"const\s+CATEGORIES\s*=\s*\[(.*?)\];", content, re.S)
        if m:
            return re.findall(r"id:\s*'([^']+)'", m.group(1))
    except OSError:
        pass
    return []


def load_existing_ids():
    """从 reports.js 中解析已有报告 id"""
    try:
        content = open(REPORTS_JS, encoding="utf-8").read()
        m = re.search(r"const\s+REPORTS\s*=\s*\[(.*?)\];", content, re.S)
        if m:
            return re.findall(r"id:\s*'([^']+)'", m.group(1))
    except OSError:
        pass
    return []


def insert_into_reports_js(report_js):
    """把报告对象插入 REPORTS 数组（在 '在此追加新报告' 注释前）"""
    with open(REPORTS_JS, encoding="utf-8") as f:
        content = f.read()

    anchor = "  // ↓ 在此追加新报告 ↓"
    if anchor in content:
        new_content = content.replace(anchor, report_js + "\n" + anchor, 1)
    else:
        # 兜底：插到 REPORTS 数组闭合 '];' 之前
        m = re.search(r"(const REPORTS = \[.*?)\n\];", content, re.S)
        if not m:
            raise RuntimeError("无法在 reports.js 中找到 REPORTS 数组")
        new_content = (
            content[: m.end(1)] + "\n" + report_js + "\n];" + content[m.end() :]
        )

    with open(REPORTS_JS, "w", encoding="utf-8") as f:
        f.write(new_content)


# ─────────────────────────────────────────────
# 主流程
# ─────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description="导入自定义报告到 ObtStar")
    parser.add_argument("report_json", help="报告定义 JSON 文件路径")
    parser.add_argument(
        "--chunk-size", type=int, default=5, help="每个 chunk 的 section 数（默认 5）"
    )
    parser.add_argument("--dry-run", action="store_true", help="只预览，不写入文件")
    parser.add_argument("--force", action="store_true", help="报告 id 已存在时强制覆盖")
    args = parser.parse_args()

    # 1. 读取并校验
    if not os.path.isfile(args.report_json):
        sys.exit(f"✗ 文件不存在: {args.report_json}")
    with open(args.report_json, encoding="utf-8") as f:
        report = json.load(f)

    report_id = report.get("id")
    required = ["id", "title", "category", "date", "summary", "content"]
    missing = [k for k in required if not report.get(k)]
    if missing:
        sys.exit(f"✗ 缺少必填字段: {', '.join(missing)}")

    if not ID_PATTERN.match(report_id) or len(report_id) > 64:
        sys.exit("✗ 报告 id 只能包含小写字母、数字、连字符，且长度 ≤ 64")
    if not isinstance(report["content"], list) or not report["content"]:
        sys.exit("✗ content 必须是非空数组")

    categories = load_categories()
    if categories and report["category"] not in categories:
        print(f'⚠  分类 "{report["category"]}" 不在 CATEGORIES 中，现有: {categories}')

    existing = load_existing_ids()
    if report_id in existing and not args.force:
        sys.exit(f'✗ 报告 id "{report_id}" 已存在，使用 --force 覆盖')

    content = report["content"]
    chunk_size = max(1, args.chunk_size)
    chunks = [content[i : i + chunk_size] for i in range(0, len(content), chunk_size)]

    pages = int(report.get("pages") or len(content))

    # 2. 预览
    print(f"📄 报告: {report['title']} (id: {report_id})")
    print(f"   章节: {len(content)} 个, 分块: {len(chunks)} 个, 页数: {pages}")
    for ci, chunk in enumerate(chunks):
        secs = " | ".join(s.get("title", "")[:24] for s in chunk)
        print(f"   chunk-{ci}.js  [{len(chunk)} sections]: {secs}")

    if args.dry_run:
        print("\n[DRY-RUN] 未写入任何文件。")
        return

    # 3. 写入 chunk + manifest
    output_dir = os.path.join(OUTPUT_BASE, report_id)
    os.makedirs(output_dir, exist_ok=True)

    manifest_chunks = []
    section_offset = 1
    for ci, chunk in enumerate(chunks):
        start, end = section_offset, section_offset + len(chunk) - 1
        page_range = f"{start}-{end}" if start != end else str(start)
        chunk_js = build_chunk_js(report_id, ci, page_range, chunk)
        chunk_file = os.path.join(output_dir, f"chunk-{ci}.js")
        with open(chunk_file, "w", encoding="utf-8") as f:
            f.write(chunk_js)
        size_kb = os.path.getsize(chunk_file) // 1024

        manifest_chunks.append(
            {
                "index": ci,
                "file": f"chunk-{ci}.js",
                "sections": [s.get("title", "") for s in chunk],
                "pageRange": page_range,
                "size": f"约{size_kb}KB",
            }
        )
        section_offset += len(chunk)
        print(f"   ✅ 写入 {os.path.relpath(chunk_file, ROOT)} ({size_kb}KB)")

    manifest = {
        "id": report_id,
        "title": report.get("title"),
        "totalPages": pages,
        "totalChunks": len(chunks),
        "chunks": manifest_chunks,
    }
    manifest_file = os.path.join(output_dir, "manifest.json")
    with open(manifest_file, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"   ✅ 写入 {os.path.relpath(manifest_file, ROOT)}")

    # 4. 更新 reports.js
    report_js = build_report_js(report)
    insert_into_reports_js(report_js)
    print(
        f"   ✅ 已更新 {os.path.relpath(REPORTS_JS, ROOT)}（REPORTS 数组新增 {report_id}）"
    )

    print("\n✅ 导入完成！")
    print("  · 本地验证: python3 tools/validate_chunks.py")
    print("  · 数据有进程内缓存，需重启 node server.js 才能生效")
    print(
        "  · 若 api/index.js 的 getFallbackReports() 解析失败，需在其中同步追加该报告"
    )


if __name__ == "__main__":
    main()
