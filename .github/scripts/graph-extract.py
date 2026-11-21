"""把 www/index.html 內嵌的 JavaScript 抽出成 graphify-src/index.inline.js，讓 graphify 能分析主程式。"""
import os, re
h = open('www/index.html', encoding='utf-8').read()
blocks = re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', h, re.S | re.I)
os.makedirs('graphify-src', exist_ok=True)
open('graphify-src/index.inline.js', 'w', encoding='utf-8').write('\n\n'.join(blocks))
print(f'extracted {len(blocks)} script block(s)')
