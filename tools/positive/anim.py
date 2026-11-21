import sys, os, subprocess, shutil
from playwright.sync_api import sync_playwright
# 先跑 render.py 產生 card.html，再用這支把同一張版面做成動畫
OUT = sys.argv[1] if len(sys.argv) > 1 else 'out.mp4'
FPS, DUR = 30, 12.0
FR = 'frames'
shutil.rmtree(FR, ignore_errors=True); os.makedirs(FR)

SETUP = r"""()=>{
const q=document.querySelector('.q');let fs=72;
const w=()=>Math.max(...[...q.querySelectorAll('span')].map(d=>d.getBoundingClientRect().width));
while(w()>900&&fs>60){fs-=2;document.body.style.setProperty('--fs',fs+'px')}
const qb=q.getBoundingClientRect().bottom,ln=document.querySelector('.ln'),bd=document.querySelector('.body');
ln.style.top=(qb+40)+'px';bd.style.top=(qb+86)+'px';
const st=document.createElement('style');
st.textContent='.arch .sp{transform-box:fill-box;transform-origin:50% 100%}';
document.head.appendChild(st);
const E='cubic-bezier(.22,.61,.36,1)';
const A=(el,kf,delay,dur)=>el.animate(kf,{delay:delay*1000,duration:dur*1000,fill:'both',easing:E});
const fadeUp=(el,d,dur=.8,dy=24,base='')=>A(el,[{opacity:0,transform:base+`translateY(${dy}px)`},{opacity:1,transform:base+'translateY(0)'}],d,dur);
// 外框
document.querySelectorAll('.f1,.f2,.cn').forEach(e=>A(e,[{opacity:0},{opacity:1}],0,.9));
fadeUp(document.querySelector('.date'),.3);
fadeUp(document.querySelector('.wk'),.6);
fadeUp(document.querySelector('.tag'),.9,.8,20,'translateX(-50%) ');
// 拱門與小苗
const svg=document.querySelector('.arch');
const kids=[...svg.children];
kids.slice(0,3).forEach((e,i)=>A(e,[{opacity:0},{opacity:1}],1.3+i*.1,.7));
const seeds=kids.slice(3,7);
seeds.forEach((e,i)=>A(e,[{opacity:0},{opacity:1}],1.9+i*.22,.45));
const stem=kids[7],l1=kids[8],l2=kids[9];
[stem,l1,l2].forEach(e=>e.classList.add('sp'));
A(stem,[{opacity:0,transform:'scaleY(0)'},{opacity:1,transform:'scaleY(1)'}],2.8,.5);
A(l1,[{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1)'}],3.15,.55);
A(l2,[{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1)'}],3.3,.55);
// 金句
A(document.querySelector('.qm'),[{opacity:0},{opacity:1}],3.4,.6);
const ql=[...q.children];
ql.forEach((e,i)=>{const last=i===ql.length-1;
  if(last)A(e,[{opacity:0,transform:'translateY(28px) scale(.94)'},{opacity:1,transform:'translateY(0) scale(1)'}],3.7+i*.6+.15,1.0);
  else fadeUp(e,3.7+i*.6,.8,28);});
const tq=3.7+ql.length*.6+.4;
A(ln,[{transform:'translateX(-50%) scaleX(0)'},{transform:'translateX(-50%) scaleX(1)'}],tq,.6);
[...bd.children].forEach((e,i)=>fadeUp(e,tq+.3+i*.3,.7,16));
const tb=tq+.3+bd.children.length*.3+.3;
A(document.querySelector('.sig'),[{clipPath:'inset(-30% 100% -30% 0)'},{clipPath:'inset(-30% -5% -30% 0)'}],tb,1.1);
A(document.querySelector('.ig'),[{opacity:0},{opacity:1}],tb+.8,.6);
document.getAnimations().forEach(a=>a.pause());
return tb+1.4;}"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    pg.goto('file://' + os.path.abspath('card.html')); pg.wait_for_timeout(800)
    end = pg.evaluate(SETUP)
    print('animation ends at', round(end, 2), 's')
    n = int(FPS * DUR)
    for i in range(n):
        t = i / FPS * 1000
        pg.evaluate(f"()=>document.getAnimations().forEach(a=>a.currentTime={t})")
        pg.screenshot(path=f'{FR}/{i:04d}.png')
    b.close()
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', f'{FR}/%04d.png',
                '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow',
                '-movflags', '+faststart', OUT], check=True)
print('done', OUT, os.path.getsize(OUT))
