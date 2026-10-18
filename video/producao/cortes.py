# -*- coding: utf-8 -*-
"""Versões curtas (60/30/15 s) e vertical 9:16, montadas a partir de frases completas do vídeo principal.

Uso: python cortes.py es|en|pt   (requer build/<lang>/video_limpo.mp4 gerado por render.py)
"""
import json, os, subprocess, sys
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

from roteiro import BURN_SUBS
from timeline import write_srt

LANG = sys.argv[1] if len(sys.argv) > 1 else "es"
HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "build", LANG)
ENTREGA = os.path.join(os.path.dirname(HERE), "entrega", "versoes_curtas")
FF = imageio_ffmpeg.get_ffmpeg_exe()

with open(os.path.join(BUILD, "timeline.json"), encoding="utf-8") as fh:
    TL = json.load(fh)
S = {s["id"]: s for s in TL["segments"]}
TOTAL = TL["total"]

# frases escolhidas para cada versão; "CARD" = tela final com contatos (sem narração)
CUTS = {
    "60s": ["open1", "who1", "who2", "fs1", "fs2", "imp2", "imp5", "ai1", "end1"],
    "30s": ["open1", "who1", "imp2", "end1"],
    "15s": ["open1", "who1", "CARD"],
}


def ranges(ids):
    out = []
    for i in ids:
        if i == "CARD":
            out.append((None, S["end1"]["end"] + 0.5, TOTAL))
        elif i == "end1":
            out.append((S[i], S[i]["start"] - 0.35, TOTAL))
        else:
            s = S[i]
            out.append((s, s["start"] - 0.35, s["end"] + min(s["pause"], 0.9)))
    return out


def cut(name, ids):
    rs = ranges(ids)
    parts, lab, segs, t = [], "", [], 0.0
    for k, (seg, a, b) in enumerate(rs):
        d = b - a
        parts.append(f"[0:v]trim=start={a:.3f}:end={b:.3f},setpts=PTS-STARTPTS,"
                     f"fade=t=in:st=0:d=0.2,fade=t=out:st={d - 0.25:.3f}:d=0.25[v{k}];"
                     f"[0:a]atrim=start={a:.3f}:end={b:.3f},asetpts=PTS-STARTPTS,"
                     f"afade=t=in:st=0:d=0.15,afade=t=out:st={d - 0.25:.3f}:d=0.25[a{k}];")
        lab += f"[v{k}][a{k}]"
        if seg:
            segs.append(dict(seg, start=t + seg["start"] - a, end=t + seg["end"] - a, pause=0.4))
        t += d
    graph = "".join(parts) + f"{lab}concat=n={len(rs)}:v=1:a=1[v][a]"
    clean = os.path.join(BUILD, f"corte_{name}.mp4")
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", os.path.join(BUILD, "video_limpo.mp4"),
                    "-filter_complex", graph, "-map", "[v]", "-map", "[a]",
                    "-c:v", "libx264", "-crf", "17", "-preset", "medium", "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "192k", clean], check=True)
    sub = BURN_SUBS[LANG]
    srt = f"corte_{name}_{sub}.srt"
    write_srt(segs, sub, os.path.join(BUILD, srt))
    return clean, srt, t


def burn_h(clean, srt, out):
    style = ("FontName=Segoe UI Semibold,FontSize=11,PrimaryColour=&H00F3EFEC,OutlineColour=&H8C000000,"
             "BorderStyle=3,Outline=4,Shadow=0,MarginV=22")
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", clean, "-vf", f"subtitles={srt}:force_style='{style}'",
                    "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "copy",
                    "-movflags", "+faststart", out], cwd=BUILD, check=True)


def vertical_frame():
    """Moldura 1080x1920: cabeçalho com nome e cargo; área da legenda abaixo do vídeo."""
    W, H = 1080, 1920
    im = Image.new("RGB", (W, H), (11, 13, 17))
    d = ImageDraw.Draw(im)
    for y in range(H):
        g = int(6 * (1 - y / H))
        d.line((0, y, W, y), fill=(9 + g, 11 + g, 15 + g * 2))
    bahn = ImageFont.truetype("bahnschrift.ttf", 96)
    bahn.set_variation_by_name("Bold")
    light = ImageFont.truetype("bahnschrift.ttf", 48)
    light.set_variation_by_name("Light")
    mono = ImageFont.truetype("consola.ttf", 28)
    d.text((W / 2, 250), "FROM PROBLEMS TO SOFTWARE", font=mono, fill=(77, 163, 255), anchor="mm")
    d.text((W / 2, 360), "JOÃO PEDRO", font=bahn, fill=(236, 239, 243), anchor="mm")
    d.text((W / 2, 440), "SOARES DE FIGUEIREDO", font=light, fill=(236, 239, 243), anchor="mm")
    d.line((W / 2 - 140, 500, W / 2 + 140, 500), fill=(77, 163, 255), width=3)
    d.text((W / 2, 1760), "github.com/Jpsoaresfig", font=mono, fill=(140, 150, 162), anchor="mm")
    path = os.path.join(BUILD, "moldura_vertical.png")
    im.save(path)
    return path


def vertical(clean, srt, out):
    frame = vertical_frame()
    style = ("FontName=Segoe UI Semibold,FontSize=9,PrimaryColour=&H00F3EFEC,OutlineColour=&H00000000,"
             "BorderStyle=1,Outline=0,Shadow=0,Alignment=2,MarginV=95,MarginL=12,MarginR=12")
    graph = ("[1:v]scale=1080:608[vid];[0:v][vid]overlay=0:600[base];"
             f"[base]subtitles={srt}:original_size=1080x1920:force_style='{style}'[v]")
    subprocess.run([FF, "-y", "-loglevel", "error", "-loop", "1", "-i", os.path.basename(frame), "-i", clean,
                    "-filter_complex", graph, "-map", "[v]", "-map", "1:a", "-shortest",
                    "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", "30",
                    "-c:a", "copy", "-movflags", "+faststart", out], cwd=BUILD, check=True)


if __name__ == "__main__":
    os.makedirs(ENTREGA, exist_ok=True)
    tag = LANG.upper()
    for name, ids in CUTS.items():
        clean, srt, dur = cut(name, ids)
        burn_h(clean, srt, os.path.join(ENTREGA, f"{tag}_{name}_16x9.mp4"))
        if name == "60s":
            vertical(clean, srt, os.path.join(ENTREGA, f"{tag}_{name}_9x16_vertical.mp4"))
        print(tag, name, f"{dur:.1f}s")
