import PyPDF2
import sys
import os

def read_pdf(pdf_path):
    """读取PDF文件内容"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)
            print(f"PDF总页数: {num_pages}")
            print("="*50)
            
            # 读取所有页面内容
            full_text = ""
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                full_text += f"\n--- 第 {page_num + 1} 页 ---\n{text}\n"
            
            return full_text
    except Exception as e:
        return f"读取PDF出错: {str(e)}"

if __name__ == "__main__":
    pdf_dir = "c:/Users/ryuub/WorkBuddy/Claw/obtstar.com"
    
    # 列出所有PDF文件
    pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf_file)
        print(f"\n{'='*60}")
        print(f"文件: {pdf_file}")
        print(f"{'='*60}")
        content = read_pdf(pdf_path)
        # 只打印前5000字符以避免输出过长
        print(content[:5000])
        print("\n[内容已截断...]")
