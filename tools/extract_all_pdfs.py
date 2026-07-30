import PyPDF2
import os
import io
import sys

# 设置UTF-8输出
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def extract_pdf_content(pdf_path, max_chars=20000):
    """提取PDF内容，限制字符数"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)
            
            full_text = ""
            for page_num in range(min(num_pages, 12)):  # 最多读取12页
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

def text_to_html(text, skip_header=None):
    """将文本转换为HTML格式"""
    lines = text.split('\n')
    html_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # 跳过页眉页脚
        if skip_header and skip_header in line and len(line) < 30:
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
            clean_line = line.replace('\uf0b7', '-').replace('\uf0a7', '-').replace('\u2022', '-')
            html_lines.append(f'<p>{clean_line}</p>')
    
    return '\n'.join(html_lines)

pdf_dir = "c:/Users/ryuub/WorkBuddy/Claw/obtstar.com"

# 读取每个PDF文件，识别内容
pdf_files = [
    'Prompt Engineering_v7.pdf',
    '小艺深度研究报告-AI时代的信息质量保障：2026年系统性事实核查与风险管理体系研究@xiaoyi.huawei.com_20260331082108.pdf',
    'kimi_artifact_1775001069220.pdf',
    'kimi_artifact_1775001027284.pdf',
    'kimi_artifact_1775000977359.pdf',
    'kimi_artifact_1775000838752.pdf'
]

for pdf_name in pdf_files:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    if os.path.exists(pdf_path):
        print(f"\n{'='*60}")
        print(f"文件: {pdf_name}")
        print(f"{'='*60}")
        content, total_pages = extract_pdf_content(pdf_path, 3000)
        print(f"页数: {total_pages}")
        print("前3000字符预览:")
        print(content)
    else:
        print(f"文件不存在: {pdf_name}")
