# -*- coding: utf-8 -*-
"""Renderiza o vídeo principal (1920x1080, 30 fps) quadro a quadro com Pillow e envia ao ffmpeg.

Uso:
  python render.py es|en|pt                 -> entrega/FROM_PROBLEMS_TO_SOFTWARE_<LANG>.mp4 (+ versão sem legenda)
  python render.py es|en|pt --stills 5 40   -> PNGs de verificação em build/<lang>/stills/
"""
import json, math, os, shutil, subprocess, sys
from functools import lru_cache
from multiprocessing import Pool

import numpy as np
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

from roteiro import BURN_SUBS
from textos_tela import TR

LANG = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("-") else "es"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BUILD = os.path.join(HERE, "build", LANG)
ENTREGA = os.path.join(ROOT, "entrega")
W, H, FPS = 1920, 1080, 30


def L(s):
    """Traduz um texto de tela (chave em espanhol) para o idioma da versão."""
    if LANG == "es" or s not in TR:
        return s
    return TR[s][0 if LANG == "en" else 1]

with open(os.path.join(BUILD, "timeline.json"), encoding="utf-8") as fh:
    TL = json.load(fh)
TOTAL = TL["total"]
S = {s["id"]: s for s in TL["segments"]}


def st(i):
    return S[i]["start"]


def en(i):
    return S[i]["end"]


def du(i):
    return S[i]["end"] - S[i]["start"]


SCENE_START = {}
for s in TL["segments"]:
    SCENE_START.setdefault(s["scene"], s["start"] - 0.7)
SCENE_START[1] = 0.0
SCENE_END = {k: SCENE_START.get(k + 1, TOTAL) for k in SCENE_START}

# ------------------------------------------------------------------ estilo
BG = (11, 13, 17)
PANEL = (19, 23, 29)
LINE = (46, 54, 64)
TEXT = (236, 239, 243)
MUTED = (140, 150, 162)
DIM = (88, 98, 110)
ACC = (77, 163, 255)
ACC_D = (24, 52, 88)


def col(c, a):
    a = max(0.0, min(1.0, a))
    return tuple(int(BG[i] + (c[i] - BG[i]) * a) for i in range(3))


@lru_cache(maxsize=None)
def F(name, size, var=None):
    f = ImageFont.truetype(name, size)
    if var:
        f.set_variation_by_name(var)
    return f


def bahn(size, var="Bold"):
    return F("bahnschrift.ttf", size, var)


def serif(size):
    return F("georgiai.ttf", size)


def sans(size, w="light"):
    return F({"light": "segoeuil.ttf", "regular": "segoeui.ttf", "semi": "seguisb.ttf", "bold": "segoeuib.ttf"}[w], size)


def mono(size):
    return F("consola.ttf", size)


# ------------------------------------------------------------------ animação
def clamp(x):
    return max(0.0, min(1.0, x))


def ease(x):
    x = clamp(x)
    return 1 - (1 - x) ** 3


def ap(t, t0, d=0.6):
    return ease((t - t0) / d)


def win(t, a0, a1, fi=0.5, fo=0.5):
    return min(ap(t, a0, fi), 1 - ap(t, a1 - fo, fo))


# ------------------------------------------------------------------ fundo e imagens
def make_bg():
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    g = 1 - y / H
    base = np.stack([9 + 5 * g, 11 + 5 * g, 15 + 6 * g], -1)
    r = np.sqrt((x - W * 0.18) ** 2 + (y - H * 0.1) ** 2)
    glow = np.exp(-(r / 820) ** 2)[..., None] * np.array([6, 16, 32], np.float32)
    r2 = np.sqrt((x - W * 0.9) ** 2 + (y - H * 1.0) ** 2)
    glow += np.exp(-(r2 / 700) ** 2)[..., None] * np.array([3, 8, 16], np.float32)
    grid = (((x % 64) < 1) | ((y % 64) < 1)).astype(np.float32)
    rr = np.sqrt(((x - W / 2) / (W / 2)) ** 2 + ((y - H / 2) / (H / 2)) ** 2)
    grid *= np.clip(1.15 - rr, 0, 1) * 5
    vig = np.clip(1 - 0.38 * (rr - 0.55), 0.55, 1)[..., None]
    img = (base + glow + grid[..., None]) * vig
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))


BGIMG = make_bg()


def load(name, maxw):
    im = Image.open(os.path.join(ROOT, name)).convert("RGB")
    if im.width > maxw:
        im = im.resize((maxw, int(im.height * maxw / im.width)), Image.LANCZOS)
    return im


IMG = {
    "codigo": load("Codigodavidaweb.png", 1700),
    "ouse": load("Ousepassarweb.png", 1700),
    "shark": load("sharksmokehouseweb.png", 1700),
    "campo": load("testedecampoEPROCON.png", 900),
    "poster": load("tcc 1 apresentacao.jpeg", 1280),
    "sicredi": load("grupoSicredi.png", 900),
}


@lru_cache(maxsize=None)
def rmask(w, h, r=14):
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w - 1, h - 1), r, fill=255)
    return m


def kb(img, w, h, p, z0=1.02, z1=1.12, c0=(0.5, 0.5), c1=(0.5, 0.5)):
    """Ken Burns: recorte com zoom/pan suave."""
    iw, ih = img.size
    s = max(w / iw, h / ih)
    p = clamp(p)
    pe = p * p * (3 - 2 * p)
    z = z0 + (z1 - z0) * pe
    cw, ch = w / (s * z), h / (s * z)
    cx = (c0[0] + (c1[0] - c0[0]) * pe) * iw
    cy = (c0[1] + (c1[1] - c0[1]) * pe) * ih
    cx = min(max(cx, cw / 2), iw - cw / 2)
    cy = min(max(cy, ch / 2), ih - ch / 2)
    # com zoom 1.0 o arredondamento pode deixar o recorte uma fração de pixel fora da imagem
    box = (max(cx - cw / 2, 0), max(cy - ch / 2, 0), min(cx + cw / 2, iw), min(cy + ch / 2, ih))
    return img.resize((w, h), Image.BILINEAR, box=box)


def panel_img(fr, im, x, y, a, caption=None):
    w, h = im.size
    if a <= 0:
        return
    region = fr.crop((x, y, x + w, y + h))
    fr.paste(Image.blend(region, im, clamp(a)), (x, y), rmask(w, h))
    d = ImageDraw.Draw(fr)
    d.rounded_rectangle((x, y, x + w - 1, y + h - 1), 14, outline=col(LINE, a), width=2)
    if caption:
        d.text((x, y + h + 16), L(caption), font=mono(17), fill=col(MUTED, a))


# ------------------------------------------------------------------ primitivas
def tw(s, f):
    return ImageDraw.Draw(BGIMG).textlength(s, font=f)


def text(d, xy, s, f, c, a, anchor="la", track=0):
    if a <= 0.01:
        return
    s = L(s)
    if not track:
        d.text(xy, s, font=f, fill=col(c, a), anchor=anchor)
        return
    total = sum(tw(ch, f) for ch in s) + track * (len(s) - 1)
    x, y = xy
    if anchor[0] == "m":
        x -= total / 2
    elif anchor[0] == "r":
        x -= total
    for ch in s:
        d.text((x, y), ch, font=f, fill=col(c, a), anchor="l" + anchor[1])
        x += tw(ch, f) + track


def wrap(s, f, maxw):
    lines, cur = [], ""
    for w_ in L(s).split():
        cand = (cur + " " + w_).strip()
        if tw(cand, f) > maxw and cur:
            lines.append(cur)
            cur = w_
        else:
            cur = cand
    if cur:
        lines.append(cur)
    return lines


def para(d, x, y, s, f, c, a, maxw, lh=None, anchor="la"):
    lh = lh or int(f.size * 1.3)
    for i, ln in enumerate(wrap(s, f, maxw)):
        text(d, (x, y + i * lh), ln, f, c, a, anchor=anchor)
    return y + len(wrap(s, f, maxw)) * lh


def rise(a, dist=24):
    return (1 - a) * dist


def kicker(d, num, label, a):
    if a <= 0:
        return
    d.line((120, 122, 120 + 40 * a, 122), fill=col(ACC, a), width=2)
    text(d, (176, 122), f"{num}  {L(label)}", mono(20), ACC, a, anchor="lm", track=3)


def chrome(d, a):
    text(d, (120, 52), "JOÃO PEDRO FIGUEIREDO", mono(15), DIM, a, anchor="lm", track=3)
    text(d, (W - 120, 52), "FROM PROBLEMS TO SOFTWARE", mono(15), DIM, a, anchor="rm", track=3)


def box(d, x0, y0, x1, y1, a, hl=0.0, r=14, fill=PANEL):
    if a <= 0:
        return
    oc = tuple(int(LINE[i] + (ACC[i] - LINE[i]) * hl) for i in range(3))
    fc = tuple(int(fill[i] + (ACC_D[i] - fill[i]) * hl * 0.55) for i in range(3))
    d.rounded_rectangle((x0, y0, x1, y1), r, fill=col(fc, a), outline=col(oc, a), width=2)


def node(d, cx, cy, w, h, title, sub, a, hl=0.0, tsize=26):
    if a <= 0:
        return
    y = cy + rise(a, 14)
    box(d, cx - w / 2, y - h / 2, cx + w / 2, y + h / 2, a, hl)
    tc = tuple(int(MUTED[i] + (TEXT[i] - MUTED[i]) * max(hl, 0.55)) for i in range(3))
    if sub:
        text(d, (cx, y - 12), title, sans(tsize, "semi"), tc, a, anchor="mm")
        text(d, (cx, y + 20), sub, mono(16), MUTED, a, anchor="mm")
    else:
        text(d, (cx, y), title, sans(tsize, "semi"), tc, a, anchor="mm")


def chip(d, x, y, label, a, hl=0.0, size=22):
    label = L(label)
    f = sans(size, "regular")
    w = tw(label, f) + 36
    h = size + 22
    if a > 0:
        yy = y + rise(a, 10)
        box(d, x, yy, x + w, yy + h, a, hl, r=h // 2, fill=(16, 19, 24))
        text(d, (x + w / 2, yy + h / 2), label, f, TEXT if hl else (205, 210, 218), a, anchor="mm")
    return w


def seg_line(d, p0, p1, prog, a, c=LINE, width=2):
    if a <= 0 or prog <= 0:
        return
    x = p0[0] + (p1[0] - p0[0]) * clamp(prog)
    y = p0[1] + (p1[1] - p0[1]) * clamp(prog)
    d.line((p0[0], p0[1], x, y), fill=col(c, a), width=width)


def arrow(d, p0, p1, prog, a, c=LINE):
    seg_line(d, p0, p1, prog, a, c)
    if prog >= 0.98 and a > 0:
        ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
        tip = p1
        l = 11
        pts = [tip, (tip[0] - l * math.cos(ang - 0.45), tip[1] - l * math.sin(ang - 0.45)),
               (tip[0] - l * math.cos(ang + 0.45), tip[1] - l * math.sin(ang + 0.45))]
        d.polygon(pts, fill=col(c, a))


def packet(d, p0, p1, u, a, r=5):
    if a <= 0:
        return
    u = u % 1.0
    x = p0[0] + (p1[0] - p0[0]) * u
    y = p0[1] + (p1[1] - p0[1]) * u
    fade = math.sin(math.pi * u)
    d.ellipse((x - r * 2, y - r * 2, x + r * 2, y + r * 2), fill=col(ACC_D, a * fade))
    d.ellipse((x - r, y - r, x + r, y + r), fill=col(ACC, a * fade))


def statement(d, lines, t, t0, a, size=60, y=None, stagger=0.5, color=TEXT):
    f = serif(size)
    lh = int(size * 1.35)
    y = y if y is not None else H / 2 - 60 - (len(lines) - 1) * lh / 2
    for i, ln in enumerate(lines):
        e = ap(t, t0 + i * stagger, 0.9) * a
        text(d, (W / 2, y + i * lh + rise(e, 18)), ln, f, color, e, anchor="mm")


def metric(d, x, y, value, suffix, a, size=260, prefix="≈"):
    if a <= 0:
        return
    f = bahn(size, "Bold")
    pf = sans(int(size * 0.32), "light")  # Bahnschrift não tem o glifo "≈"
    text(d, (x, y - size * 0.08), prefix, pf, MUTED, a, anchor="ls")
    px = x + tw(prefix, pf) + 10
    s = f"{value}"
    text(d, (px, y), s, f, ACC, a, anchor="ls")
    text(d, (px + tw(s, f) + 8, y), suffix, bahn(int(size * 0.45), "SemiBold"), ACC, a, anchor="ls")


def footnote(d, s, a, y=880):
    text(d, (120, y), s, mono(16), DIM, a, anchor="lm")


# ================================================================== CENAS
def scene1(fr, d, t, G):
    tn = en("open2") + 0.7
    A = G * (1 - ap(t, tn - 0.3, 0.7))
    if A > 0:
        statement(d, ["Todo sistema empieza con un problema."], t, st("open1"), A, size=62, y=250, color=TEXT)
        e2 = ap(t, st("open2") + 0.2, 0.9) * A
        text(d, (W / 2, 340 + rise(e2, 14)), "La diferencia está en cómo lo entendemos y en lo que construimos a partir de él.",
             sans(30, "light"), MUTED, e2, anchor="mm")
        labels = [("Problema", "contexto real"), ("Interfaz", "web · móvil"), ("Lógica", "backend · APIs"),
                  ("Datos", "SQL · modelos"), ("Servicios", "pagos · IA"), ("Infraestructura", "VPS · redes")]
        xs = [230 + i * 292 for i in range(6)]
        y = 600
        t0 = st("open1") + 0.9
        step = (en("open2") - t0) / 6.5
        for i, (a_, b_) in enumerate(labels):
            ai = ap(t, t0 + i * step, 0.7) * A
            if i > 0:
                arrow(d, (xs[i - 1] + 118, y), (xs[i] - 118, y), ap(t, t0 + i * step - 0.3, 0.5), A, LINE)
            node(d, xs[i], y, 224, 104, a_, b_, ai, hl=1.0 if i == 0 else 0.15 + 0.5 * ap(t, t0 + 6 * step, 1.0))
        flow = ap(t, t0 + 6 * step, 0.6) * A
        if flow > 0:
            for i in range(5):
                packet(d, (xs[i] + 118, y), (xs[i + 1] - 118, y), (t * 0.7 + i * 0.37), flow)
    B = G * ap(t, tn, 1.0)
    if B > 0:
        text(d, (W / 2, 360), "FROM PROBLEMS TO SOFTWARE", mono(22), ACC, B, anchor="mm", track=8)
        tr = 4 + 26 * (1 - ap(t, tn, 2.6))
        text(d, (W / 2, 492), "JOÃO PEDRO", bahn(176, "Bold"), TEXT, B, anchor="mm", track=tr)
        e3 = ap(t, tn + 0.5, 1.2) * G
        text(d, (W / 2, 612), "SOARES DE FIGUEIREDO", bahn(64, "Light"), TEXT, e3, anchor="mm", track=tr * 0.9 + 6)
        lw = 520 * ap(t, tn + 0.8, 1.4)
        d.line((W / 2 - lw / 2, 680, W / 2 + lw / 2, 680), fill=col(ACC, G), width=2)
        text(d, (W / 2, 728), "FULL STACK SOFTWARE ENGINEER", mono(24), MUTED, ap(t, tn + 1.2, 1.0) * G, anchor="mm", track=6)


def scene2(fr, d, t, G):
    chrome(d, G)
    kicker(d, "01", "QUIÉN SOY", G)
    a = ap(t, st("who1"), 0.9) * G
    text(d, (116, 260 + rise(a)), "João Pedro", bahn(120, "Bold"), TEXT, a, anchor="ls")
    a2 = ap(t, st("who1") + 0.4, 0.9) * G
    text(d, (120, 340 + rise(a2)), "Soares de Figueiredo", bahn(62, "Light"), TEXT, a2, anchor="ls")
    a3 = ap(t, st("who1") + 0.9, 0.9) * G
    text(d, (120, 410 + rise(a3)), "Full Stack Software Engineer", sans(32, "semi"), ACC, a3, anchor="ls")

    cards = [
        (st("who2") + 0.2, "4+", "años de experiencia", "desarrollo · automatización · soporte de TI"),
        (st("who2") + du("who2") * 0.15, "", "Ciencias de la Computación", "Centro Universitário UNIPÊ · 2025"),
        (st("who3") + 0.2, "", "Granada, España", "brasileño · trayectoria en Brasil y España"),
        (st("who3") + du("who3") * 0.35, "", "Máster Universitario en Gestión y Tecnologías de Procesos de Negocio",
         "Universidad de Granada · curso 2026–2027"),
    ]
    y = 170
    x0, x1 = 1040, 1800
    for t0, big, title, sub in cards:
        a = ap(t, t0, 0.8) * G
        tl = wrap(title, sans(30, "semi"), x1 - x0 - (200 if big else 64))
        h = 58 + 40 * len(tl) + 10
        yy = y + rise(a)
        box(d, x0, yy, x1, yy + h, a, 0.0)
        tx = x0 + 32
        if big:
            text(d, (x0 + 32, yy + h / 2 + 4), big, bahn(92, "Bold"), ACC, a, anchor="lm")
            tx = x0 + 180
        for i, ln in enumerate(tl):
            text(d, (tx, yy + 26 + i * 40), ln, sans(30, "semi"), TEXT, a)
        text(d, (tx, yy + 32 + 40 * len(tl)), sub, mono(17), MUTED, a)
        y += h + 22

    a = ap(t, st("who4"), 1.0) * G
    if a > 0:
        off = 120 * (1 - ap(t, st("who4"), 1.8))
        cy, r = 690, 140
        c1, c2 = (360 - off, cy), (560 + off, cy)
        d.ellipse((c1[0] - r, cy - r, c1[0] + r, cy + r), outline=col(ACC, a), width=3)
        d.ellipse((c2[0] - r, cy - r, c2[0] + r, cy + r), outline=col(TEXT, a * 0.8), width=3)
        text(d, (c1[0] - 50, cy - 14), "Ingeniería", sans(26, "semi"), TEXT, a, anchor="mm")
        text(d, (c1[0] - 50, cy + 18), "de software", sans(26, "semi"), TEXT, a, anchor="mm")
        text(d, (c2[0] + 50, cy - 14), "Procesos", sans(26, "semi"), TEXT, a, anchor="mm")
        text(d, (c2[0] + 50, cy + 18), "de negocio", sans(26, "semi"), TEXT, a, anchor="mm")
        m = ap(t, st("who4") + 1.6, 0.8) * a
        d.ellipse((460 - 7, cy - 7, 460 + 7, cy + 7), fill=col(ACC, m))


def scene3(fr, d, t, G):
    chrome(d, G)
    kicker(d, "02", "CÓMO TRABAJO", G)
    a = ap(t, st("how1"), 0.9) * G
    text(d, (120, 250 + rise(a)), "Entender el problema antes de escribir código.", serif(54), TEXT, a, anchor="ls")
    steps = ["Entender el problema", "Elegir la solución", "Modelar datos y componentes", "Implementar",
             "Integrar servicios", "Probar y optimizar", "Impacto operativo"]
    acts = [st("how1") + du("how1") * 0.55] + [st("how2") + du("how2") * (0.08 + 0.18 * i) for i in range(5)] + [st("how3") + du("how3") * 0.3]
    n = len(steps)
    stepw = (W - 240) / n
    nw = stepw - 26
    y0, y1 = 400, 600
    for i, s in enumerate(steps):
        x = 120 + i * stepw
        ai = ap(t, st("how1") + 0.6 + i * 0.12, 0.7) * G
        hl = ap(t, acts[i], 0.5)
        yy = y0 + rise(ai)
        box(d, x, yy, x + nw, yy + (y1 - y0), ai, hl)
        text(d, (x + 22, yy + 36), f"{i + 1:02}", mono(22), ACC if hl > 0.5 else DIM, ai, anchor="lm")
        for j, ln in enumerate(wrap(s, sans(23, "semi"), nw - 36)):
            text(d, (x + 22, yy + 82 + j * 32), ln, sans(23, "semi"), TEXT if hl > 0.5 else MUTED, ai)
        if i < n - 1:
            seg_line(d, (x + nw, y0 + 100), (x + stepw, y0 + 100), ap(t, acts[i] + 0.2, 0.4), ai, ACC)
    a = ap(t, st("how3"), 0.9) * G
    text(d, (120, 730 + rise(a)), "¿Qué cambia en la operación cuando esto funciona?", serif(46), ACC, a, anchor="ls")
    footnote(d, "Representación conceptual del proceso · no es una metodología formal idéntica en todos los proyectos", ap(t, st("how2"), 1) * G, y=800)


def scene4(fr, d, t, G):
    chrome(d, G)
    kicker(d, "03", "INGENIERÍA FULL STACK", G)
    tb = st("fs6") - 0.3
    A = G * (1 - ap(t, tb - 0.6, 0.6))
    if A > 0:
        a = ap(t, st("fs1"), 0.8) * A
        text(d, (120, 230 + rise(a)), "Distintas capas de un producto", bahn(58, "SemiBold"), TEXT, a, anchor="ls")
        rows = [
            ("Frontend", "interfaz", ["React", "TypeScript", "Next.js", "HTML / CSS"], st("fs3"), en("fs3")),
            ("Backend", "lógica · APIs", ["Java", "Spring Boot", "Node.js", "Python", "PHP"], st("fs2"), en("fs2")),
            ("Datos", "persistencia", ["SQL", "PostgreSQL", "MySQL", "Supabase", "Firebase"], st("fs4"), en("fs4")),
            ("Móvil", "multiplataforma", ["Capacitor", "iOS", "Android", "Web"], st("fs5"), st("fs5") + du("fs5") * 0.45),
            ("Integración", "servicios · infra", ["APIs REST", "Pagos", "Servicios externos", "VPS", "Nginx", "Docker"],
             st("fs5") + du("fs5") * 0.45, en("fs5") + 0.6),
        ]
        for i, (name, sub, chips, t0, t1) in enumerate(rows):
            y = 290 + i * 112
            ai = ap(t, st("fs1") + 0.3 + i * 0.12, 0.7) * A
            hl = win(t, t0, t1 + 0.4, 0.4, 0.6)
            box(d, 120, y, 1800, y + 92, ai, hl * 0.8)
            text(d, (152, y + 36), name, sans(30, "semi"), TEXT, ai, anchor="lm")
            text(d, (152, y + 66), sub, mono(16), MUTED, ai, anchor="lm")
            x = 480
            for j, c in enumerate(chips):
                ac = ap(t, t0 + 0.1 + j * 0.1, 0.5) * A
                x += chip(d, x, y + 23, c, ac, hl=hl) + 14
    B = G * ap(t, tb, 0.8)
    if B > 0:
        pw, ph = 1040, 585
        px, py = 120, 165
        ta, tb2 = st("fs6"), st("fs7")
        a1 = B * (1 - ap(t, tb2 - 0.3, 0.8))
        a2 = B * ap(t, tb2 - 0.3, 0.8)
        if a1 > 0:
            im = kb(IMG["codigo"], pw, ph, (t - ta) / 12, 1.0, 1.08, (0.45, 0.4), (0.4, 0.42))
            panel_img(fr, im, px, py, a1, "CAPTURA REAL · CÓDIGO DA VIDA · iOS / ANDROID / WEB")
        if a2 > 0:
            im = kb(IMG["ouse"], pw, ph, (t - tb2) / 12, 1.0, 1.1, (0.5, 0.35), (0.42, 0.4))
            panel_img(fr, im, px, py, a2, "CAPTURA REAL · PLATAFORMA OUSE PASSAR")
        d = ImageDraw.Draw(fr)
        text(d, (1250, 190), "Ouse Passar", bahn(48, "SemiBold"), TEXT, B, anchor="ls")
        text(d, (1250, 222), "Full Stack Developer · ene 2026 – jul 2026", mono(17), MUTED, B, anchor="ls")
        flow = [("Interfaz", "React · TypeScript · Capacitor", ta + du("fs6") * 0.25),
                ("Backend", "lógica · reglas de negocio", ta + du("fs6") * 0.6),
                ("Datos", "Supabase · PostgreSQL", ta + du("fs6") * 0.45),
                ("Servicios externos", "Hotmart · RevenueCat · OpenAI · Gemini", tb2 + du("fs7") * 0.2),
                ("Infraestructura", "VPS · Nginx · balanceo de carga · SQL", tb2 + du("fs7") * 0.5)]
        cx = 1525
        ys = [300 + i * 118 for i in range(5)]
        for i, (ttl, sub, th) in enumerate(flow):
            ai = ap(t, tb + 0.3 + i * 0.15, 0.6) * B
            hl = ap(t, th, 0.5)
            if i < 4:
                seg_line(d, (cx, ys[i] + 44), (cx, ys[i + 1] - 44), ap(t, tb + 0.5 + i * 0.15, 0.5), B)
            node(d, cx, ys[i], 550, 88, ttl, sub, ai, hl=hl * 0.9)
        for i in range(4):
            packet(d, (cx, ys[i] + 44), (cx, ys[i + 1] - 44), t * 0.9 + i * 0.25, B * ap(t, tb + 1.5, 0.6))


def scene5(fr, d, t, G):
    chrome(d, G)
    # P0 — frase
    p0 = G * win(t, SCENE_START[5], st("imp1") - 0.1, 0.6, 0.6)
    if p0 > 0:
        statement(d, ["La tecnología tiene valor", "cuando mejora algo concreto."], t, st("imp0"), p0, size=64)
    kick = G * ap(t, st("imp1") - 0.4, 0.6)
    kicker(d, "04", "IMPACTO REAL", kick)

    # P1 — E-PROCON antes/depois
    p1 = G * win(t, st("imp1") - 0.3, st("imp2") + 0.1, 0.7, 0.6)
    if p1 > 0:
        im = kb(IMG["campo"], 470, 625, (t - st("imp1")) / 14, 1.0, 1.1, (0.5, 0.3), (0.5, 0.45))
        panel_img(fr, im, 120, 175, p1, "PRUEBA DE CAMPO · E-PROCON")
        d = ImageDraw.Draw(fr)
        x = 700
        text(d, (x, 250), "E-PROCON", bahn(76, "Bold"), TEXT, p1, anchor="ls")
        text(d, (x, 290), "Inovatec-JP · PROCON-PB · Java · Spring Boot · BIRT · JasperReports", mono(18), MUTED, p1, anchor="ls")
        rows = [("ANTES", ["Papel y bolígrafo", "Registro manual", "Informe manual"], st("imp1") + du("imp1") * 0.35, 0.0),
                ("DESPUÉS", ["Inspección digital", "Backend Spring Boot", "Informes automáticos"], st("imp1") + du("imp1") * 0.6, 1.0)]
        for r, (lab, items, t0, hl) in enumerate(rows):
            y = 420 + r * 190
            ar = ap(t, t0, 0.7) * p1
            text(d, (x, y - 30), lab, mono(18), ACC if hl else DIM, ar, anchor="ls", track=3)
            nx = [x + 170 + i * 380 for i in range(3)]
            for i, it in enumerate(items):
                ai = ap(t, t0 + i * 0.35, 0.6) * p1
                node(d, nx[i], y + 40, 330, 86, it, None, ai, hl=hl, tsize=25)
                if i < 2:
                    arrow(d, (nx[i] + 170, y + 40), (nx[i + 1] - 170, y + 40), ap(t, t0 + i * 0.35 + 0.3, 0.4), ai, ACC if hl else LINE)
            if hl:
                for i in range(2):
                    packet(d, (nx[i] + 170, y + 40), (nx[i + 1] - 170, y + 40), t * 0.8 + i * 0.5, ar)
        text(d, (x, 820), "Diagrama ilustrativo del flujo · no representa la arquitectura oficial del sistema", mono(16), DIM, p1, anchor="lm")

    # P2 — 70%
    p2 = G * win(t, st("imp2") - 0.1, st("imp4") - 0.2, 0.7, 0.6)
    if p2 > 0:
        tc = st("imp2") + du("imp2") * 0.4
        v = int(round(70 * ease((t - tc) / 1.8)))
        metric(d, 120, 560, v, "%", p2 * ap(t, tc - 0.3, 0.5), size=300)
        x = 1010
        a = ap(t, tc + 0.6, 0.8) * p2
        text(d, (x, 300 + rise(a)), "menos tiempo de procesamiento", sans(44, "semi"), TEXT, a, anchor="ls")
        text(d, (x, 345 + rise(a)), "E-PROCON · inspecciones de campo · PROCON-PB", mono(19), MUTED, a, anchor="ls")
        # barras relativas
        ab = ap(t, tc + 1.0, 0.8) * p2
        bw = 640
        for i, (lab, frac) in enumerate((("Antes", 1.0), ("Después", 0.3))):
            y = 420 + i * 80
            text(d, (x, y + 22), lab, mono(18), MUTED, ab, anchor="lm")
            g = ease((t - tc - 1.0 - i * 0.6) / 1.4)
            if g > 0.01:
                d.rounded_rectangle((x + 130, y + 8, x + 130 + max(bw * frac * g, 12), y + 36), 6,
                                    fill=col(ACC if i else LINE, ab))
        text(d, (x, 600), "tiempo de procesamiento relativo · resultado informado en el proyecto", mono(16), DIM, ab, anchor="lm")
        cx = x
        for j, c in enumerate(("Trabajo en equipo", "Interoperabilidad entre sistemas públicos", "Protección de datos · LGPD")):
            aj = ap(t, st("imp3") + du("imp3") * (0.05 + 0.3 * j), 0.6) * p2
            w_ = chip(d, cx if j < 2 else x, 660 if j < 2 else 726, c, aj, hl=0.4)
            cx += w_ + 14

    # P3 — SiCAPS
    p3 = G * win(t, st("imp4") - 0.2, st("imp5") - 0.2, 0.7, 0.6)
    if p3 > 0:
        bx, by, bw_, bh = 120, 175, 860, 600
        box(d, bx, by, bx + bw_, by + bh, p3)
        rng = np.random.default_rng(7)
        pts = rng.uniform([bx + 60, by + 60], [bx + bw_ - 60, by + bh - 60], size=(14, 2))
        hubx, huby = bx + bw_ * 0.5, by + bh * 0.52
        for gx in range(bx + 40, bx + bw_, 40):
            for gy in range(by + 40, by + bh, 40):
                d.point((gx, gy), fill=col(LINE, p3))
        for i, (px_, py_) in enumerate(pts):
            ai = ap(t, st("imp4") + 0.3 + i * 0.18, 0.5) * p3
            seg_line(d, (px_, py_), (hubx, huby), ai, ai * 0.6, ACC_D)
            pulse = (t * 0.8 + i * 0.13) % 1
            rr = 6 + 18 * pulse
            d.ellipse((px_ - rr, py_ - rr, px_ + rr, py_ + rr), outline=col(ACC, ai * (1 - pulse)), width=2)
            d.ellipse((px_ - 5, py_ - 5, px_ + 5, py_ + 5), fill=col(ACC, ai))
        node(d, hubx, huby, 230, 70, "Panel en tiempo real", None, p3, hl=0.6, tsize=22)
        text(d, (bx, by + bh + 26), "VISUALIZACIÓN CONCEPTUAL · NO MUESTRA DATOS REALES", mono(17), MUTED, p3, anchor="lm")
        x = 1060
        text(d, (x, 260), "SiCAPS", bahn(76, "Bold"), TEXT, p3, anchor="ls")
        text(d, (x, 300), "PROCON-PB · co-desarrollo en equipo", mono(18), MUTED, p3, anchor="ls")
        for i, s in enumerate(("Recogida digital de precios", "Seguimiento por geolocalización en tiempo real", "Informes en tiempo real")):
            ai = ap(t, st("imp4") + du("imp4") * (0.2 + 0.2 * i), 0.6) * p3
            y = 390 + i * 90 + rise(ai)
            d.ellipse((x, y - 6, x + 12, y + 6), fill=col(ACC, ai))
            text(d, (x + 32, y), s, sans(32, "semi"), TEXT, ai, anchor="lm")

    # P4 — Sicredi 10%
    p4 = G * win(t, st("imp5") - 0.2, st("imp6") - 0.2, 0.7, 0.6)
    if p4 > 0:
        x = 1000
        tc = st("imp5") + du("imp5") * 0.62
        # foto real da equipe Sicredi à esquerda até a métrica ocupar esse espaço
        pf = p4 * (1 - ap(t, tc - 0.7, 0.6))
        if pf > 0:
            im = kb(IMG["sicredi"], 560, 560, (t - st("imp5")) / 8, 1.0, 1.06, (0.5, 0.5), (0.5, 0.45))
            panel_img(fr, im, 120, 175, pf, "EQUIPO · SICREDI EVOLUÇÃO")
            d = ImageDraw.Draw(fr)
        text(d, (x, 250), "Sicredi Evolução", bahn(64, "Bold"), TEXT, p4, anchor="ls")
        text(d, (x, 290), "Software Developer Intern · UiPath · Python", mono(18), MUTED, p4, anchor="ls")
        metric(d, 120, 560, int(round(10 * ease((t - tc) / 1.2))), "%", p4 * ap(t, tc - 0.4, 0.5), size=300)
        text(d, (124, 640), "capacidad operativa liberada", sans(40, "semi"), TEXT, p4 * ap(t, tc + 0.4, 0.6), anchor="ls")
        # fluxo manual -> robô
        af = ap(t, st("imp5") + 0.8, 0.7) * p4
        node(d, x + 170, 420, 340, 86, "Gestión manual", "cuentas inactivas", af, 0.0, 25)
        arrow(d, (x + 345, 420), (x + 455, 420), ap(t, st("imp5") + 1.6, 0.5), af, ACC)
        node(d, x + 630, 420, 340, 86, "Robot UiPath", "validaciones · Python", ap(t, st("imp5") + 1.8, 0.7) * p4, 1.0, 25)
        # barra de capacidade em 20 blocos
        ab = ap(t, tc, 0.6) * p4
        for i in range(20):
            bx = x + i * 38
            lit = i >= 18 and ease((t - tc - 0.3) / 1.0) > (i - 18) / 2
            d.rounded_rectangle((bx, 560, bx + 32, 620), 5, fill=col(ACC if lit else LINE, ab))
        text(d, (x, 660), "capacidad operativa (ilustración proporcional) · resultado informado · aprox.", mono(16), DIM, ab, anchor="lm")

    # P5 — PDF 5%
    p5 = G * win(t, st("imp6") - 0.2, st("imp7") - 0.2, 0.7, 0.6)
    if p5 > 0:
        x = 1000
        text(d, (x, 250), "Generador de PDF heredado", bahn(56, "Bold"), TEXT, p5, anchor="ls")
        text(d, (x, 290), "Sicredi · PHP · biblioteca obsoleta → tecnología moderna", mono(18), MUTED, p5, anchor="ls")
        tc = st("imp6") + du("imp6") * 0.55
        metric(d, 120, 560, int(round(5 * ease((t - tc) / 0.9))), "%", p5 * ap(t, tc - 0.4, 0.5), size=300)
        text(d, (124, 640), "menos tiempo de procesamiento", sans(40, "semi"), TEXT, p5 * ap(t, tc + 0.4, 0.6), anchor="ls")
        ab = ap(t, st("imp6") + 0.6, 0.6) * p5
        for i, (lab, frac) in enumerate((("Antes", 1.0), ("Después", 0.95))):
            y = 420 + i * 90
            text(d, (x, y + 22), lab, mono(18), MUTED, ab, anchor="lm")
            g = ease((t - st("imp6") - 0.8 - i * 0.8) / 1.4)
            if g > 0.01:
                d.rounded_rectangle((x + 130, y + 6, x + 130 + max(660 * frac * g, 12), y + 40), 6, fill=col(ACC if i else LINE, ab))
        text(d, (x, 640), "tiempo relativo de generación · resultado informado · aprox.", mono(16), DIM, ab, anchor="lm")

    # P6 — síntese
    p6 = G * ap(t, st("imp7") - 0.2, 0.7)
    if p6 > 0:
        statement(d, ["Encontrar el cuello de botella y actuar sobre él."], t, st("imp7"), p6, size=54, y=260)
        cards = [("70", "E-PROCON", "menos tiempo de procesamiento"),
                 ("10", "Sicredi · automatización", "capacidad operativa liberada"),
                 ("5", "Sicredi · PDF", "menos tiempo de procesamiento")]
        cw = 520
        for i, (v, ttl, sub) in enumerate(cards):
            ai = ap(t, st("imp7") + 0.5 + i * 0.25, 0.7) * p6
            x0 = 120 + i * (cw + 40)
            y0 = 380 + rise(ai)
            box(d, x0, y0, x0 + cw, y0 + 300, ai)
            metric(d, x0 + 36, y0 + 170, v, "%", ai, size=130)
            text(d, (x0 + 40, y0 + 220), ttl, sans(28, "semi"), TEXT, ai, anchor="ls")
            text(d, (x0 + 40, y0 + 256), sub, mono(17), MUTED, ai, anchor="ls")
        footnote(d, "Resultados informados en los proyectos · obtenidos en equipo · valores aproximados", p6, y=740)


def scene6(fr, d, t, G):
    chrome(d, G)
    p0 = G * win(t, SCENE_START[6], st("ai2") - 0.1, 0.6, 0.6)
    if p0 > 0:
        statement(d, ["La IA no es magia:", "es un componente más del sistema."], t, st("ai1"), p0, size=64)
    kicker(d, "05", "IA Y AUTOMATIZACIÓN", G * ap(t, st("ai2") - 0.4, 0.6))
    p1 = G * win(t, st("ai2") - 0.3, st("ai4") - 0.1, 0.7, 0.6)
    if p1 > 0:
        text(d, (120, 240), "Ouse Passar · agentes de IA y flujos automatizados", bahn(48, "SemiBold"), TEXT, p1, anchor="ls")
        T = st("ai2")
        N = {"datos": (250, 520), "n8n": (590, 520), "openai": (930, 430), "gemini": (930, 610),
             "backend": (1270, 520), "prod": (1630, 430), "ext": (1630, 610)}
        spec = [("datos", "Datos", "contenido · usuarios", 0.0), ("n8n", "n8n", "flujos automatizados", 0.12),
                ("openai", "OpenAI", "modelos · agentes", 0.25), ("gemini", "Gemini", "modelos · agentes", 0.3),
                ("backend", "Backend", "reglas de negocio", 0.45), ("prod", "Producto", "web · iOS · Android", 0.6),
                ("ext", "Servicios externos", "pagos · APIs", 0.7)]
        edges = [("datos", "n8n"), ("n8n", "openai"), ("n8n", "gemini"), ("openai", "backend"), ("gemini", "backend"),
                 ("backend", "prod"), ("backend", "ext")]
        for (u, v) in edges:
            (x0, y0), (x1, y1) = N[u], N[v]
            p0_ = (x0 + 135, y0)
            p1_ = (x1 - 135, y1)
            tt = T + du("ai2") * dict((s[0], s[3]) for s in spec)[v]
            seg_line(d, p0_, p1_, ap(t, tt - 0.2, 0.6), p1, LINE)
            packet(d, p0_, p1_, t * 0.7 + sum(map(ord, u + v)) % 7 * 0.13, p1 * ap(t, en("ai2"), 0.8))
        for key, ttl, sub, f in spec:
            ai = ap(t, T + du("ai2") * f, 0.6) * p1
            node(d, N[key][0], N[key][1], 270, 92, ttl, sub, ai, hl=0.9 if key in ("openai", "gemini", "n8n") else 0.2)
        footnote(d, "Diagrama ilustrativo · la IA integrada a datos, backend y servicios reales", p1, y=780)
    # painel "IA aplicada": cada cartão acende quando é citado na narração
    pc = G * win(t, st("ai4") - 0.3, st("ai3") - 0.1, 0.7, 0.6)
    if pc > 0:
        text(d, (120, 240), "IA aplicada · lo que construyo", bahn(48, "SemiBold"), TEXT, pc, anchor="ls")
        cards = [("Agentes de IA", "automatizan flujos de punta a punta", 0.06),
                 ("Asistentes con LLMs", "OpenAI · Gemini · datos y contexto", 0.27),
                 ("Generación de imágenes", "Gemini · integrada al producto", 0.47),
                 ("Integraciones n8n", "APIs · datos · servicios externos", 0.68)]
        cw, gap = 390, 40
        for i, (ttl, sub, f) in enumerate(cards):
            tc = st("ai4") + du("ai4") * f
            ai = ap(t, tc - 0.3, 0.6) * pc
            hl = ap(t, tc, 0.5) * 0.9
            x0 = 120 + i * (cw + gap)
            y0 = 360 + rise(ai)
            box(d, x0, y0, x0 + cw, y0 + 300, ai, hl)
            text(d, (x0 + 32, y0 + 64), f"0{i + 1}", mono(18), ACC, ai, anchor="ls")
            para(d, x0 + 32, y0 + 110, ttl, bahn(40, "SemiBold"), TEXT, ai, cw - 64, 46)
            para(d, x0 + 32, y0 + 214, sub, mono(17), MUTED, ai, cw - 64, 26)
        footnote(d, "La IA conectada a datos, reglas de negocio y productos reales", pc * ap(t, st("ai4") + 0.6, 0.6), y=760)
    p2 = G * ap(t, st("ai3") - 0.3, 0.7)
    if p2 > 0:
        text(d, (120, 240), "Sicredi · automatización de procesos", bahn(48, "SemiBold"), TEXT, p2, anchor="ls")
        cx, cy, r = 400, 540, 150
        ang = t * 160
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=col(LINE, p2), width=3)
        d.arc((cx - r, cy - r, cx + r, cy + r), ang, ang + 90, fill=col(MUTED, p2), width=5)
        text(d, (cx, cy - 16), "Tarea", sans(30, "semi"), TEXT, p2, anchor="mm")
        text(d, (cx, cy + 22), "repetitiva", sans(30, "semi"), TEXT, p2, anchor="mm")
        a1 = ap(t, st("ai3") + du("ai3") * 0.25, 0.6) * p2
        arrow(d, (cx + r + 20, cy), (790, cy), a1, a1, ACC)
        node(d, 990, cy, 380, 110, "Robot / script", "UiPath · Python", a1, 1.0)
        a2 = ap(t, st("ai3") + du("ai3") * 0.6, 0.6) * p2
        arrow(d, (1190, cy), (1340, cy), a2, a2, ACC)
        node(d, 1570, cy, 440, 110, "Tiempo liberado", "para otras tareas", a2, 0.5)


def scene7(fr, d, t, G):
    chrome(d, G)
    kicker(d, "06", "PROYECTOS Y CURIOSIDAD TÉCNICA", G)
    p1 = G * win(t, SCENE_START[7], st("pj3") - 0.1, 0.7, 0.6)
    if p1 > 0:
        im = kb(IMG["poster"], 900, 580, (t - st("pj1")) / 12, 1.0, 1.12, (0.5, 0.45), (0.53, 0.4))
        panel_img(fr, im, 120, 175, p1, "PRESENTACIÓN DEL PÓSTER · UNIPÊ")
        d = ImageDraw.Draw(fr)
        x = 1100
        a = ap(t, st("pj2"), 0.7) * p1
        text(d, (x, 230 + rise(a)), "TRABAJO DE FIN DE GRADO", mono(19), ACC, a, anchor="ls", track=3)
        y = para(d, x, 260 + rise(a), "Análisis comparativo de rendimiento entre frameworks Java para API", sans(38, "semi"), TEXT, a, 700, 50)
        # `y` já é o fim do parágrafo (com o rise); a linha de base precisa da altura da fonte de 60 px
        text(d, (x, y + 70), "Spring Boot vs Quarkus", bahn(60, "Bold"), ACC, a, anchor="ls")
        a2 = ap(t, st("pj2") + du("pj2") * 0.4, 0.7) * p1
        text(d, (x, y + 135), "En equipo con João Victor Nunes y Luiz Filipe Matos", sans(26, "light"), MUTED, a2, anchor="ls")
        text(d, (x, y + 175), "Calificación máxima · Ciencias de la Computación · UNIPÊ", mono(17), MUTED, a2, anchor="ls")
    p2 = G * win(t, st("pj3") - 0.2, st("pj5") - 0.1, 0.7, 0.6)
    if p2 > 0:
        text(d, (120, 250), "Memoria en reposo", bahn(56, "SemiBold"), TEXT, p2, anchor="ls")
        text(d, (120, 290), "APIs CRUD equivalentes · Kubernetes (GKE) · pruebas de carga con Apache JMeter", mono(18), MUTED, p2, anchor="ls")
        maxw = 1100
        bars = [("Spring Boot", 271, st("pj3") + du("pj3") * 0.3), ("Quarkus", 21, st("pj3") + du("pj3") * 0.72)]
        for i, (lab, v, tc) in enumerate(bars):
            y = 380 + i * 160
            a = ap(t, tc - 0.3, 0.5) * p2
            g = ease((t - tc) / 1.3)
            text(d, (120, y + 40), lab, sans(32, "semi"), TEXT, a, anchor="lm")
            bx1 = 440 + max(maxw * v / 271 * g, 10)
            d.rounded_rectangle((440, y + 8, bx1, y + 72), 8, fill=col(ACC if i else LINE, a))
            text(d, (bx1 + 24, y + 40), "≈", sans(40, "light"), MUTED, a, anchor="lm")
            text(d, (bx1 + 60, y + 40), f"{int(round(v * g))} MiB", bahn(48, "Bold"), ACC if i else TEXT, a, anchor="lm")
        # o trade-off do TCC: nenhum dos dois é "melhor" em tudo
        for j, c in enumerate(("Spring Boot · menor latencia y mayor throughput", "Quarkus · menos CPU y memoria · 3 pods frente a 10 con HPA")):
            aj = ap(t, st("pj4") + du("pj4") * (0.05 + 0.3 * j), 0.6) * p2
            chip(d, 120, 690 + j * 66, c, aj, hl=0.4 if j else 0.0)
        footnote(d, "Memoria en estado ocioso medida en el TFG · el resultado depende del perfil de carga y del entorno", p2 * ap(t, st("pj4"), 0.6), y=860)
    p3 = G * ap(t, st("pj5") - 0.2, 0.7)
    if p3 > 0:
        im = kb(IMG["shark"], 1040, 585, (t - st("pj5")) / 15, 1.0, 1.1, (0.5, 0.45), (0.5, 0.55))
        panel_img(fr, im, 120, 175, p3, "CAPTURA REAL · SHARK SMOKEHOUSE")
        d = ImageDraw.Draw(fr)
        x = 1240
        text(d, (x, 230), "Shark Smokehouse", bahn(58, "Bold"), TEXT, p3, anchor="ls")
        text(d, (x, 266), "diseño y desarrollo · e-commerce y gestión", mono(18), MUTED, p3, anchor="ls")
        chips_ = ["Next.js", "React", "TypeScript", "Firebase", "Mercado Pago"]
        cx, cy = x, 310
        for j, c in enumerate(chips_):
            aj = ap(t, st("pj5") + du("pj5") * 0.15 + j * 0.25, 0.5) * p3
            w_ = tw(L(c), sans(22, "regular")) + 36
            if cx + w_ > 1800:
                cx, cy = x, cy + 62
            chip(d, cx, cy, c, aj, hl=0.6)
            cx += w_ + 12
        # prova de uso real: número de usuários informado pelo painel admin (só o agregado, sem dados pessoais)
        tm = st("pj5") + du("pj5") * 0.72
        am = ap(t, tm - 0.4, 0.6) * p3
        metric(d, x, 580, int(round(61 * ease((t - tm) / 1.2))), "", am, size=130, prefix="")
        text(d, (x + 4, 622), "usuarios registrados · en producción", sans(26, "semi"), TEXT, am, anchor="ls")
        for i, s_ in enumerate(("Checkout transaccional en el servidor", "PIX con webhook firmado · Mercado Pago",
                                "Fidelidad · PDV · automatizaciones de marketing", "28 archivos de pruebas automatizadas · Vitest")):
            ai = ap(t, st("pj6") + du("pj6") * (0.2 + 0.18 * i), 0.5) * p3
            y = 690 + i * 44 + rise(ai, 12)
            d.ellipse((x, y - 5, x + 10, y + 5), fill=col(ACC, ai))
            text(d, (x + 28, y), s_, sans(24, "semi"), TEXT, ai, anchor="lm")
        text(d, (x, 890), "github.com/Jpsoaresfig/Shark_SmokeHouse", mono(17), MUTED, p3, anchor="lm")


def scene8(fr, d, t, G):
    chrome(d, G)
    kicker(d, "07", "TRAYECTORIA", G)
    p1 = G * win(t, SCENE_START[8], st("tr5") - 0.1, 0.7, 0.6)
    if p1 > 0:
        def m(y, mo):
            return (y - 2023) * 12 + (mo - 3)
        X0, X1, M = 640, 1800, 43
        rows = [("Dev Dynamos", "Software Developer · freelance", "mar 2023 – oct 2023", m(2023, 3), m(2023, 10) + 1, "tr2"),
                ("Sicredi Evolução", "Técnico de soporte de TI", "oct 2023 – may 2024", m(2023, 10), m(2024, 5) + 1, "tr3"),
                ("Sicredi Evolução", "Software Developer Intern", "may 2024 – sep 2025", m(2024, 5), m(2025, 9) + 1, "tr4"),
                ("Inovatec-JP", "Full Stack Developer", "oct 2025 – ago 2026", m(2025, 10), m(2026, 8) + 1, "tr4"),
                ("Ouse Passar", "Full Stack Developer", "ene 2026 – jul 2026", m(2026, 1), m(2026, 7) + 1, "tr4")]
        for yr in range(2023, 2027):
            xm = X0 + (X1 - X0) * max(m(yr, 1), 0) / M
            d.line((xm, 200, xm, 760), fill=col(LINE, p1 * 0.7), width=1)
            text(d, (xm + 8, 214), str(yr), mono(17), DIM, p1, anchor="lm")
        for i, (co, role, dates, a0, a1, key) in enumerate(rows):
            y = 270 + i * 100
            ai = ap(t, st("tr1") + 0.2 + i * 0.25, 0.6) * p1
            hl = win(t, st(key), en(key) + 0.5, 0.4, 0.6) if key != "tr4" else ap(t, st("tr4"), 0.5) * (1 - ap(t, st("tr5") - 0.5, 0.5))
            text(d, (120, y + 18), co, sans(28, "semi"), TEXT if hl > 0.3 else (200, 206, 214), ai, anchor="lm")
            text(d, (120, y + 52), f"{L(role)} · {L(dates)}", mono(16), MUTED, ai, anchor="lm")
            g = ease((t - st("tr1") - 0.4 - i * 0.25) / 1.0)
            xa = X0 + (X1 - X0) * a0 / M
            xb = xa + (X1 - X0) * (a1 - a0) / M * g
            fc = tuple(int(LINE[k] + (ACC[k] - LINE[k]) * hl) for k in range(3))
            d.rounded_rectangle((xa, y + 14, max(xb, xa + 6), y + 50), 8, fill=col(fc, ai))
        footnote(d, "Periodos tal como informados · algunas etapas se superponen", p1, y=800)
    p2 = G * win(t, st("tr5") - 0.2, st("tr6") - 0.1, 0.7, 0.6)
    if p2 > 0:
        x = (W - 1140) // 2  # bloco centralizado: sem foto aqui (a foto do Sicredi fica na cena 5)
        text(d, (x, 260), "Granada, España", bahn(76, "Bold"), TEXT, p2, anchor="ls")
        para(d, x, 290, "Máster Universitario en Gestión y Tecnologías de Procesos de Negocio · Universidad de Granada",
             sans(30, "semi"), MUTED, p2, 1100, 40)
        langs = [("Português", "nativo"), ("English", "C1 escrito · B2 oral"), ("Español", "B2 comprensión · B1 expresión oral y escrita")]
        for i, (lng, lvl) in enumerate(langs):
            ai = ap(t, st("tr5") + du("tr5") * 0.62 + i * 0.3, 0.6) * p2
            y = 460 + i * 96
            box(d, x, y, x + 1140, y + 76, ai)
            text(d, (x + 30, y + 38), lng, sans(30, "semi"), TEXT, ai, anchor="lm")
            text(d, (x + 330, y + 38), lvl, mono(20), ACC, ai, anchor="lm")
    p3 = G * ap(t, st("tr6") - 0.2, 0.7)
    if p3 > 0:
        statement(d, ["Entender cómo funcionan las cosas.", "Convertir ideas en sistemas reales.",
                      "Aprender lo necesario para resolver problemas en distintas capas."],
                  t, st("tr6"), p3, size=50, stagger=du("tr6") / 3.2)


def scene9(fr, d, t, G):
    te = en("end1") + 0.6
    A = G * (1 - ap(t, te, 0.7))
    if A > 0:
        statement(d, ["Si tienes un reto técnico, un producto que construir", "o un proceso que mejorar,", "me gustaría hablar contigo."],
                  t, st("end1"), A, size=52, stagger=du("end1") / 3.5)
    B = ap(t, te + 0.5, 1.2) * (1 - ap(t, TOTAL - 1.6, 1.5))
    if B > 0:
        e = ap(t, te + 0.5, 1.6)
        text(d, (W / 2, 330), "JOÃO PEDRO SOARES DE FIGUEIREDO", bahn(84, "Bold"), TEXT, B, anchor="mm", track=2 + 10 * (1 - e))
        text(d, (W / 2, 408), "FULL STACK SOFTWARE ENGINEER", mono(24), ACC, B, anchor="mm", track=6)
        lw = 600 * e
        d.line((W / 2 - lw / 2, 460, W / 2 + lw / 2, 460), fill=col(LINE, B), width=2)
        items = [("LINKEDIN", "linkedin.com/in/joaopedrosoaresfigueiredo"), ("GITHUB", "github.com/Jpsoaresfig"),
                 ("E-MAIL", "jpbusinesss@hotmail.com")]
        for i, (k, v) in enumerate(items):
            ai = ap(t, te + 1.2 + i * 0.3, 0.8) * B
            y = 545 + i * 86
            text(d, (W / 2 - 360, y), k, mono(18), MUTED, ai, anchor="rm", track=3)
            text(d, (W / 2 - 320, y), v, sans(38, "semi"), TEXT, ai, anchor="lm")
        text(d, (W / 2, 850), "Granada, España", mono(18), DIM, B, anchor="mm", track=3)


SCENES = {1: scene1, 2: scene2, 3: scene3, 4: scene4, 5: scene5, 6: scene6, 7: scene7, 8: scene8, 9: scene9}


def frame(i):
    t = i / FPS
    fr = BGIMG.copy()
    d = ImageDraw.Draw(fr)
    for k, fn in SCENES.items():
        s0, s1 = SCENE_START[k], SCENE_END[k]
        if s0 - 0.01 <= t < s1 + 0.01:
            G = min(ap(t, s0, 1.2 if k == 1 else 0.7), 1 - ap(t, s1 - 0.7, 0.7)) if k < 9 else ap(t, s0, 0.7)
            if G > 0:
                fn(fr, d, t, G)
    return fr.tobytes()


def ff():
    return imageio_ffmpeg.get_ffmpeg_exe()


def main():
    if "--stills" in sys.argv:
        out = os.path.join(BUILD, "stills")
        os.makedirs(out, exist_ok=True)
        for a in sys.argv[sys.argv.index("--stills") + 1:]:
            t = float(a)
            Image.frombytes("RGB", (W, H), frame(int(t * FPS))).save(os.path.join(out, f"t{t:07.2f}.png"))
            print("still", t)
        return
    n = int(TOTAL * FPS)
    clean = os.path.join(BUILD, "video_limpo.mp4")
    cmd = [ff(), "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-i", os.path.join(BUILD, "audio_mix.wav"), "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", clean]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    # RENDER_WORKERS limita os processos quando há pouca RAM livre (cada um carrega as imagens das cenas)
    with Pool(int(os.environ.get("RENDER_WORKERS", max(2, os.cpu_count() - 4)))) as pool:
        for k, buf in enumerate(pool.imap(frame, range(n), chunksize=8)):
            p.stdin.write(buf)
            if k % 300 == 0:
                print(f"frame {k}/{n}", flush=True)
    p.stdin.close()
    if p.wait() != 0:
        sys.exit("ffmpeg falhou na codificação")
    print("video limpo ok")

    os.makedirs(ENTREGA, exist_ok=True)
    tag = LANG.upper()
    shutil.copy(clean, os.path.join(ENTREGA, f"FROM_PROBLEMS_TO_SOFTWARE_{tag}_sem_legenda.mp4"))
    sub = BURN_SUBS[LANG]
    style = ("FontName=Segoe UI Semibold,FontSize=11,PrimaryColour=&H00F3EFEC,OutlineColour=&H8C000000,"
             "BorderStyle=3,Outline=4,Shadow=0,MarginV=22")
    subprocess.run([ff(), "-y", "-loglevel", "error", "-i", "video_limpo.mp4",
                    "-vf", f"subtitles=legendas_{sub}.srt:force_style='{style}'",
                    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
                    "-c:a", "copy", "-movflags", "+faststart", os.path.join(ENTREGA, f"FROM_PROBLEMS_TO_SOFTWARE_{tag}.mp4")],
                   cwd=BUILD, check=True)
    for f in os.listdir(BUILD):
        if f.startswith("legendas_") and f.endswith(".srt"):
            shutil.copy(os.path.join(BUILD, f), os.path.join(ENTREGA, f"{tag}_{f}"))
    print("entrega ok:", tag)


if __name__ == "__main__":
    main()
