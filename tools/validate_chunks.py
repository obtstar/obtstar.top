#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io, os, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

base = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs', 'data', 'reports-content')
reports = ['prompt-engineering-v7', 'digital-transform-2024-2030', 'knowledge-memory-arch', 
           'data-stream-micro-light', 'ai-coding-tools-growth', 'ai-fact-check-2026']

all_ok = True
for report_id in reports:
    report_dir = os.path.join(base, report_id)
    files = sorted(os.listdir(report_dir))
    chunks = sorted([f for f in files if f.startswith('chunk-') and f.endswith('.js')])
    
    print(f'\n=== {report_id} ===')
    
    # Check manifest
    manifest_path = os.path.join(report_dir, 'manifest.json')
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    print(f'  manifest: {manifest["totalPages"]}p, {manifest["totalChunks"]} chunks')
    
    # Check each chunk file
    for chunk_file in chunks:
        chunk_path = os.path.join(report_dir, chunk_file)
        with open(chunk_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        report_id_js = report_id.replace('-', '_')
        chunk_idx = chunk_file.replace('chunk-', '').replace('.js', '')
        expected = f'window.REPORT_CHUNK_{report_id_js}_{chunk_idx}'
        
        if expected in content:
            section_count = content.count("title: '")
            size_kb = len(content) // 1024
            print(f'  {chunk_file}: OK ({section_count} sections, {size_kb}KB)')
        else:
            print(f'  {chunk_file}: ERROR - missing declaration {expected}')
            all_ok = False

if all_ok:
    print('\n[ALL CHECKS PASSED]')
else:
    print('\n[SOME CHECKS FAILED]')
