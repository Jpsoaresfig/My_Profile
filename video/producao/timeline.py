# -*- coding: utf-8 -*-
"""Monta a linha do tempo a partir das durações reais da narração, compõe a trilha
original (pad ambiente + pulso discreto), mixa com a voz (ducking) e exporta SRT ES/EN."""
import json, os, sys, wave
import numpy as np
from roteiro import SEGMENTS, LEAD_IN

LANG = sys.argv[1] if len(sys.argv) > 1 else "es"
HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "build", LANG)
NARR = os.path.join(BUILD, "narr")
SR = 48000


def read_wav(path):
    with wave.open(path) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    # remove silêncio inicial/final da voz sintética
    idx = np.where(np.abs(a) > 0.01)[0]
    return a[max(idx[0] - 600, 0): idx[-1] + 2400] if len(idx) else a


def build_timeline():
    t = LEAD_IN
    segs = []
    for s in SEGMENTS:
        audio = read_wav(os.path.join(NARR, s["id"] + ".wav"))
        dur = len(audio) / SR
        segs.append(dict(s, start=round(t, 3), end=round(t + dur, 3)))
        t += dur + s["pause"]
    return segs, t


# ------------------------------------------------------------------ música
def note(f, t):
    out = np.zeros_like(t)
    for k, amp in ((1, 1.0), (2, 0.35), (3, 0.16), (4, 0.07)):
        out += amp * np.sin(2 * np.pi * f * k * t)
    return out


def smooth(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def music(total, segs):
    n = int(total * SR)
    t = np.arange(n) / SR
    L = np.zeros(n, np.float32)
    R = np.zeros(n, np.float32)
    A3, C4, E4, F3, G3, B3, D4, G4, A2, F2, C3, G2 = 220.0, 261.63, 329.63, 174.61, 196.0, 246.94, 293.66, 392.0, 110.0, 87.31, 130.81, 98.0
    chords = [((A3, C4, E4), A2), ((F3, A3, C4, E4), F2), ((C4, E4, G4), C3), ((G3, B3, D4), G2)]
    block = 8.0
    i = 0
    s = 0.0
    while s < total:
        notes, bass = chords[i % 4]
        a, b = int(s * SR), min(int((s + block + 2.5) * SR), n)
        tt = t[a:b] - s
        env = smooth(tt / 2.0) * smooth((block + 2.5 - tt) / 2.5)
        for j, f in enumerate(notes):
            L[a:b] += 0.05 * env * note(f * 1.0015, t[a:b] + j * 0.01)
            R[a:b] += 0.05 * env * note(f * 0.9985, t[a:b] + j * 0.013)
        sub = 0.07 * env * np.sin(2 * np.pi * bass * t[a:b])
        L[a:b] += sub
        R[a:b] += sub
        s += block
        i += 1

    # pulso/arpejo discreto: entra na cena 4, sai antes da cena 8
    def scene_start(k):
        return next(x["start"] for x in segs if x["scene"] == k)
    p0, p1 = scene_start(4) - 1.0, scene_start(8) - 0.5
    step = 0.5
    k = 0
    tp = p0
    while tp < p1:
        notes, _ = chords[int(tp // block) % 4]
        f = notes[k % len(notes)] * 2
        a = int(tp * SR)
        ln = int(0.45 * SR)
        b = min(a + ln, n)
        tt = np.arange(b - a) / SR
        ramp = smooth((tp - p0) / 6.0) * smooth((p1 - tp) / 4.0)
        pl = 0.035 * ramp * np.exp(-tt * 9) * np.sin(2 * np.pi * f * tt) * (1 + 0.3 * np.sin(2 * np.pi * 2 * f * tt))
        pan = 0.5 + 0.35 * np.sin(k * 1.7)
        L[a:b] += pl * (1 - pan) * 2
        R[a:b] += pl * pan * 2
        k += 1
        tp += step

    # acentos graves suaves nas métricas
    for sid in ("imp2", "imp5", "imp6", "pj3"):
        st = next(x["start"] for x in segs if x["id"] == sid)
        a = int((st + 0.2) * SR)
        b = min(a + int(1.4 * SR), n)
        tt = np.arange(b - a) / SR
        hit = 0.16 * np.exp(-tt * 3.2) * np.sin(2 * np.pi * (55 + 30 * np.exp(-tt * 20)) * tt)
        L[a:b] += hit
        R[a:b] += hit

    # fade in/out geral
    fade = smooth(t / 3.0) * smooth((total - t) / 6.0)
    return L * fade, R * fade


def mix(segs, total):
    n = int(total * SR)
    voice = np.zeros(n, np.float32)
    for s in segs:
        a = read_wav(os.path.join(NARR, s["id"] + ".wav"))
        i = int(s["start"] * SR)
        voice[i:i + len(a)] += a[: n - i]
    voice *= 0.89 / max(np.abs(voice).max(), 1e-6)

    # ducking: reduz a música enquanto há voz (envelope suavizado)
    active = np.zeros(n, np.float32)
    for s in segs:
        active[int(s["start"] * SR): int(s["end"] * SR)] = 1
    k = int(0.35 * SR)
    for _ in range(2):  # média móvel dupla (≈ janela triangular) via soma cumulativa
        c = np.concatenate([[0], np.cumsum(active, dtype=np.float64)])
        lo = np.clip(np.arange(n) - k, 0, n)
        hi = np.clip(np.arange(n) + k, 0, n)
        active = ((c[hi] - c[lo]) / (hi - lo)).astype(np.float32)
    gain = 1.0 - 0.5 * active

    L, R = music(total, segs)
    L *= gain * 1.15
    R *= gain * 1.15
    out = np.stack([voice + L, voice + R], axis=1)
    peak = np.abs(out).max()
    if peak > 0.98:
        out *= 0.98 / peak
    with wave.open(os.path.join(BUILD, "audio_mix.wav"), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((out * 32767).astype(np.int16).tobytes())


# ------------------------------------------------------------------ legendas
def chunks(text, maxlen=84):
    words = text.split()
    parts, cur = [], ""
    for w in words:
        cand = (cur + " " + w).strip()
        if len(cand) > maxlen and cur:
            parts.append(cur)
            cur = w
        else:
            cur = cand
        if cur.endswith((".", ":", "?", ";")) and len(cur) > maxlen * 0.45:
            parts.append(cur)
            cur = ""
    if cur:
        parts.append(cur)
    return parts


def wrap2(text, width=46):
    if len(text) <= width:
        return text
    mid = len(text) // 2
    best = min((i for i, c in enumerate(text) if c == " "), key=lambda i: abs(i - mid))
    return text[:best] + "\n" + text[best + 1:]


def ts(x):
    ms = int(round(x * 1000))
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"


def write_srt(segs, key, path):
    lines, n = [], 1
    for s in segs:
        parts = chunks(s[key])
        total_chars = sum(len(p) for p in parts)
        t = s["start"]
        span = s["end"] - s["start"]
        for p in parts:
            d = span * len(p) / total_chars
            end = t + d if p is not parts[-1] else s["end"] + min(0.6, s["pause"])
            lines.append(f"{n}\n{ts(t)} --> {ts(end)}\n{wrap2(p)}\n")
            n += 1
            t += d
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    segs, total = build_timeline()
    total = round(total, 2)
    with open(os.path.join(BUILD, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump(dict(total=total, segments=segs), f, ensure_ascii=False, indent=1)
    mix(segs, total)
    for key in sorted({LANG, "en"}):
        write_srt(segs, key, os.path.join(BUILD, f"legendas_{key}.srt"))
    print(LANG, "total", total, "s")
    for s in segs:
        print(f'{s["scene"]} {s["id"]:6} {s["start"]:7.2f} {s["end"]:7.2f}')
