import PyPDF2
import os
import io
import sys

# 设置UTF-8输出
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def extract_pdf_content(pdf_path, max_chars=25000):
    """提取PDF内容，限制字符数"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)
            
            full_text = ""
            for page_num in range(min(num_pages, 15)):  # 最多读取15页
                try:
                    page = pdf_reader.pages[page_num]
                    text = page.extract_text()
                    if text:
                        full_text += text + "\n"
                    if len(full_text) > max_chars:
                        break
                except:
                    continue
            
            return full_text[:max_chars], num_pages
    except Exception as e:
        return f"Error: {str(e)}", 0

def text_to_html(text):
    """将文本转换为HTML格式"""
    lines = text.split('\n')
    html_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # 跳过页眉页脚
        if '小艺深度研究' in line and len(line) < 20:
            continue
        if line.isdigit() and len(line) < 3:
            continue
        # 处理标题
        if line.startswith('第') and '章' in line[:10]:
            html_lines.append(f'<h2>{line}</h2>')
        elif len(line) > 3 and line[0].isdigit() and '.' in line[:5]:
            html_lines.append(f'<h3>{line}</h3>')
        elif '.....' in line or '....' in line:  # 目录行
            continue
        elif '目录' in line and len(line) < 10:
            continue
        elif '摘要' in line and len(line) < 10:
            html_lines.append(f'<h2>{line}</h2>')
        elif len(line) > 5:
            # 清理特殊字符
            clean_line = line.replace('\uf0b7', '-').replace('\uf0a7', '-')
            html_lines.append(f'<p>{clean_line}</p>')
    
    return '\n'.join(html_lines)

# PDF文件映射
pdf_mapping = {
    'ai-fact-check-2026': '小艺深度研究报告-AI时代的信息质量保障：2026年系统性事实核查与风险管理体系研究@xiaoyi.huawei.com_20260331082108.pdf',
}

pdf_dir = "c:/Users/ryuub/WorkBuddy/Claw/obtstar.com"

output = []
output.append("const REPORT_CONTENTS = {")

for report_id, pdf_name in pdf_mapping.items():
    pdf_path = os.path.join(pdf_dir, pdf_name)
    if os.path.exists(pdf_path):
        output.append(f'  "{report_id}": {{')
        output.append(f'    id: "{report_id}",')
        output.append(f'    title: "AI时代的信息质量保障",')
        
        content, total_pages = extract_pdf_content(pdf_path)
        output.append(f'    totalPages: {total_pages},')
        output.append(f'    sections: [')
        output.append(f'      {{')
        output.append(f'        title: "完整内容",')
        output.append(f'        level: 1,')
        
        html_content = text_to_html(content)
        # 转义反引号
        html_content = html_content.replace('`', '\\`')
        output.append(f'        content: `{html_content}`')
        output.append(f'      }}')
        output.append(f'    ]')
        output.append(f'  }},')

# 添加其他报告的基础内容
other_reports = [
    ('digital-transform-2024-2030', '个人与小微企业数字化转型', 34),
    ('knowledge-memory-arch', '超大规模知识记忆存储架构', 22),
    ('data-stream-micro-light', '数据洪流与微光', 45),
    ('ai-coding-tools-growth', 'AI编程工具成长路径', 68),
    ('prompt-engineering-guide', '提示工程完全指南', 42),
]

for report_id, title, pages in other_reports:
    output.append(f'  "{report_id}": {{')
    output.append(f'    id: "{report_id}",')
    output.append(f'    title: "{title}",')
    output.append(f'    totalPages: {pages},')
    output.append(f'    sections: [')
    output.append(f'      {{')
    output.append(f'        title: "摘要",')
    output.append(f'        level: 1,')
    output.append(f'        content: `<p>本报告《{title}》的完整内容正在整理中，敬请期待。</p>`')
    output.append(f'      }}')
    output.append(f'    ]')
    output.append(f'  }},')

output.append("};")
output.append("")
output.append("// 导出数据供页面使用")
output.append("if (typeof module !== 'undefined' && module.exports) {")
output.append("  module.exports = { REPORT_CONTENTS };")
output.append("}")

# 写入文件（输出到 <repo>/docs/data/）
output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs', 'data', 'report-contents.js')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("report-contents.js 已更新")
