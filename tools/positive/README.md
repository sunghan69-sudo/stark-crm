# 每日正能量動畫工具（排程使用）
- `anim.py`：讀同目錄的 card.html（先跑 render.py 產生），輸出 12 秒 1080×1920 MP4 動畫。`python3 anim.py out.mp4`
- `music.py`：程式合成原創輕柔鋼琴配樂（無版權問題），種子用日期，每天不同。`python3 music.py 12 bgm.wav 2026-11-21`
- 合成：`ffmpeg -i out.mp4 -i bgm.wav -c:v copy -c:a aac -b:a 128k -shortest -movflags +faststart final.mp4`
