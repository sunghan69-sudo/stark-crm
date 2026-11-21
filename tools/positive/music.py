import sys, wave, hashlib
import numpy as np
# 原創輕柔配樂產生器（程式合成，無版權問題）
# 用法：python3 music.py 秒數 輸出.wav 種子字串（建議用日期，每天和弦與旋律會不同）
DUR = float(sys.argv[1]); OUT = sys.argv[2]; SEED = sys.argv[3] if len(sys.argv) > 3 else 'x'
rng = np.random.default_rng(int(hashlib.md5(SEED.encode()).hexdigest()[:8], 16))
SR = 44100; N = int(SR * DUR); t = np.arange(N) / SR
mix = np.zeros((N, 2))
def hz(m): return 440 * 2 ** ((m - 69) / 12)
PROGS = [[0, 7, 9, 5], [0, 9, 5, 7], [9, 5, 0, 7], [0, 4, 9, 5], [5, 7, 0, 9], [0, 5, 9, 7]]
QUAL = {0: [0, 4, 7], 2: [0, 3, 7], 4: [0, 3, 7], 5: [0, 4, 7], 7: [0, 4, 7], 9: [0, 3, 7]}
key = int(rng.choice([0, 2, 3, 5, 7, -2]))
prog = PROGS[int(rng.integers(len(PROGS)))]
bpm = float(rng.uniform(66, 76)); beat = 60 / bpm; bar = beat * 4
def add(m, start, dur, amp, pan=0.0, kind='piano'):
    s = int(start * SR)
    if s >= N: return
    L = min(int((dur + 1.8) * SR), N - s); tt = np.arange(L) / SR; f = hz(m)
    if kind == 'piano':
        env = np.exp(-tt * 2.2) * np.minimum(1, tt / 0.006)
        sig = np.sin(2*np.pi*f*tt) + .32*np.sin(4*np.pi*f*tt)*np.exp(-tt*3) + .12*np.sin(6*np.pi*f*tt)*np.exp(-tt*5)
    else:  # 柔和襯底
        env = np.minimum(1, tt / 0.8) * np.minimum(1, np.maximum(0, (dur + .6 - tt)) / 1.2)
        sig = np.sin(2*np.pi*f*tt) + .5*np.sin(2*np.pi*f*1.003*tt) + .2*np.sin(4*np.pi*f*tt)
    sig = sig * env * amp
    mix[s:s+L, 0] += sig * (1 - pan) / 2 * 2; mix[s:s+L, 1] += sig * (1 + pan) / 2 * 2
nbars = int(np.ceil(DUR / bar)) + 1
scale = [0, 2, 4, 7, 9]  # 五聲音階旋律，溫暖不刺耳
for b in range(nbars):
    r = prog[b % 4] + key; q = QUAL[prog[b % 4] % 12]; t0 = b * bar
    for iv in q: add(48 + r + iv, t0, bar, .045, 0, 'pad')
    add(36 + r, t0, bar, .09, 0)
    arp = [60 + r + q[0], 60 + r + q[1], 60 + r + q[2], 72 + r + q[0]]
    order = [0, 1, 2, 3, 2, 1, 2, 3]
    for k in range(8): add(arp[order[k]], t0 + k * beat / 2, beat, .05, (-.4 if k % 2 else .4))
    if b >= 1:
        for k in range(int(rng.integers(2, 4))):
            pos = int(rng.choice([0, 2, 4, 5, 6])); n = 72 + key + scale[int(rng.integers(5))]
            add(n, t0 + pos * beat / 2, beat * 1.5, .06, .1)
# 簡單殘響
for d, g in [(.11, .28), (.23, .18), (.37, .1)]:
    k = int(d * SR); mix[k:, 0] += mix[:-k, 1] * g; mix[k:, 1] += mix[:-k, 0] * g
fi, fo = int(SR * .6), int(SR * 2.2)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]; mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix = mix / (np.abs(mix).max() + 1e-9) * .6
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('music', OUT, f'key={key} prog={prog} bpm={bpm:.0f}')
